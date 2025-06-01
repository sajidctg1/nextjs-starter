import "server-only";

import { and, asc, count, desc, eq, gt, ilike, inArray } from "drizzle-orm";

import { type UserSearchParams } from "~/features/users/schemas";
import { dateFilterSql, db, table } from "~/server/db/drizzle";
import { unstable_cache } from "~/server/lib/unstable-cache";

const REVALIDATION_INTERVAL = 20; // seconds

export const insertUser = async (data: typeof table.user.$inferInsert) => {
  return db.insert(table.user).values(data);
};

export const updateUser = async (
  id: AuthUser["id"],
  data: Partial<
    Pick<AuthUser, "name" | "email" | "image" | "emailVerified" | "role">
  >
) => {
  return db
    .update(table.user)
    .set({
      ...data,
      role: data.role ?? "user",
    })
    .where(eq(table.user.id, id));
};

export async function userPaginate(input: UserSearchParams) {
  const banned =
    input.status &&
    input.status.includes("banned") &&
    !input.status.includes("active");

  const where = and(
    input.name ? ilike(table.user.name, `%${input.name}%`) : undefined,
    input.role && input.role.length > 0
      ? inArray(table.user.role, input.role)
      : undefined,
    banned ? eq(table.user.banned, true) : undefined,
    input.createdAt
      ? dateFilterSql(table.user.createdAt, input.createdAt)
      : undefined
  );

  const orderBy =
    input.sort && input.sort.length > 0
      ? input.sort.map((item) =>
          item.desc ? desc(table.user[item.id]) : asc(table.user[item.id])
        )
      : [asc(table.user.createdAt)];

  const [data, total] = await db.transaction((tx) =>
    Promise.all([
      tx.query.user.findMany({
        where,
        limit: input.perPage && input.perPage > 0 ? input.perPage : undefined,
        offset:
          input.page && input.perPage && input.perPage > 0
            ? (input.page - 1) * input.perPage
            : undefined,
        orderBy,
      }),
      tx
        .select({
          count: count(),
        })
        .from(table.user)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0),
    ])
  );

  const pageCount =
    input.perPage && input.perPage > 0 ? Math.ceil(total / input.perPage) : 1;
  return { data, total, pageCount };
}

export async function getUserRoleCounts() {
  return unstable_cache(
    async () => {
      try {
        return await db
          .select({
            role: table.user.role,
            count: count(),
          })
          .from(table.user)
          .groupBy(table.user.role)
          .having(gt(count(), 0))
          .then((res) =>
            res.reduce(
              (acc, { role, count }) => {
                acc[role] = count;
                return acc;
              },
              {} as Record<NonNullable<AuthUser["role"]>, number>
            )
          );
      } catch (_err) {
        return {} as Record<NonNullable<AuthUser["role"]>, number>;
      }
    },
    ["user-role-counts"],
    {
      revalidate: REVALIDATION_INTERVAL,
      tags: ["users"],
    }
  )();
}
