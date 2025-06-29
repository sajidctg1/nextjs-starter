import { and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import type { PgColumn } from "drizzle-orm/pg-core";
import { Pool } from "pg";

import { env } from "~/env";

import * as schema from "./schemas";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Pool | undefined;
};

export const client =
  globalForDb.client ?? new Pool({ connectionString: env.DB_URL });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle({ client, schema });
export const table = schema;

export function dateFilterSql(column: PgColumn, input: number[]) {
  return input.length > 0
    ? and(
        input[0]
          ? gte(
              column,
              (() => {
                const date = new Date(input[0]);
                date.setHours(0, 0, 0, 0);
                return date;
              })()
            )
          : undefined,
        input[1]
          ? lte(
              column,
              (() => {
                const date = new Date(input[1]);
                date.setHours(23, 59, 59, 999);
                return date;
              })()
            )
          : undefined
      )
    : undefined;
}
