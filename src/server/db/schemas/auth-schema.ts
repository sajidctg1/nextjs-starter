import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { ROLES } from "~/constants";

import { rowId, timestamps } from "./index";

type RoleName = (typeof ROLES)[number];

export const roles = pgTable("role", {
  name: text("name", { enum: ROLES }).unique().$type<RoleName>().notNull(),
  permissions: jsonb("permissions").$type<any>(),
  ...timestamps,
});

export const users = pgTable("user", {
  id: rowId(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: text("role", { enum: ROLES }).$type<RoleName>().notNull(),
  banned: boolean("banned"),
  banReason: text("banReason"),
  banExpires: timestamp("banExpires", { withTimezone: true }),
  ...timestamps,
});

export const accounts = pgTable("account", {
  id: rowId(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", {
    withTimezone: true,
  }),
  scope: text("scope"),
  idToken: text("idToken"),
  password: text("password"),
  ...timestamps,
});

export const verifications = pgTable("verification", {
  id: rowId(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  ...timestamps,
});

export const sessions = pgTable("session", {
  id: rowId(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  ...timestamps,
});
