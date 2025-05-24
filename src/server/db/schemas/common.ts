import { integer, text } from "drizzle-orm/sqlite-core";

export const timestamps = {
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
};

export const rowId = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
