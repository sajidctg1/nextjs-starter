import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { ROLES } from "~/constants";

import { rowId, timestamps } from "./index";

type RoleName = (typeof ROLES)[number];

export const roles = sqliteTable("role", {
  name: text("name", { enum: ROLES }).unique().$type<RoleName>().notNull(),
  permissions: text("permissions", { mode: "json" }).$type<any>(),
  ...timestamps,
});

export const users = sqliteTable("user", {
  id: rowId(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
  image: text("image"),
  role: text("role", { enum: ROLES }).$type<RoleName>().notNull(),
  banned: integer("banned", { mode: "boolean" }),
  banReason: text("banReason"),
  banExpires: integer("banExpires", { mode: "timestamp" }),
  ...timestamps,
});

export const accounts = sqliteTable("account", {
  id: rowId(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  idToken: text("idToken"),
  password: text("password"),
  ...timestamps,
});

export const verifications = sqliteTable("verification", {
  id: rowId(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  ...timestamps,
});

export const sessions = sqliteTable("session", {
  id: rowId(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  ...timestamps,
});
