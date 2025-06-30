import { db } from "~/db/drizzle";
import {
  getUserRoleCounts,
  updateUser,
  userPaginate,
} from "~/db/repositories/user-repository";
import { auth } from "~/services/auth/better-auth";
import { createTRPCRouter, protectedProcedure } from "~/trpc/init";

import {
  createUserSchema,
  updateUserRoleSchema,
  userSearchQuerySchema,
} from "../schemas";

export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      await auth.api.createUser({
        headers: ctx.headers,
        body: {
          name: input.name,
          email: input.email,
          role: input.role,
          password: input.password,
        },
      });
    }),

  list: protectedProcedure
    .input(userSearchQuerySchema)
    .query(async ({ input }) => {
      const data = await userPaginate(input);
      return data ?? null;
    }),

  updateRole: protectedProcedure
    .input(updateUserRoleSchema)
    .mutation(async ({ ctx, input }) => {
      await auth.api.setRole({
        headers: ctx.headers,
        body: {
          userId: input.userId,
          role: input.role,
        },
      });
    }),

  userRoleCounts: protectedProcedure.query(async () => {
    const data = await getUserRoleCounts();
    return data ?? null;
  }),

  latest: protectedProcedure.query(async () => {
    const data = await db.query.user.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return data ?? null;
  }),

  removeImage: protectedProcedure.mutation(async ({ ctx }) => {
    await updateUser(ctx.user.id, { image: null });
  }),
});
