import { timestamp, uuid } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const rowId = () =>
  uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
