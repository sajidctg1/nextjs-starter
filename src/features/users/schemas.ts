import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import { z } from "zod";

import { ROLES } from "~/constants";
import {
  getBaseSearchParamsCache,
  getBaseSearchQuerySchema,
} from "~/lib/data-table/parsers";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(ROLES),
});
export type CreateUserPayload = z.infer<typeof createUserSchema>;

export const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(ROLES),
});
export type UpdateUserRolePayload = z.infer<typeof updateUserRoleSchema>;

export const userSearchParamsCache = createSearchParamsCache({
  ...getBaseSearchParamsCache<AuthUser>(),
  name: parseAsString,
  role: parseAsArrayOf(z.enum(ROLES)),
  status: parseAsArrayOf(z.enum(["banned", "active"])),
  createdAt: parseAsArrayOf(z.coerce.number()),
});
export type UserSearchParams = Awaited<
  ReturnType<typeof userSearchParamsCache.parse>
>;

export const userSearchQuerySchema = z.object({
  ...getBaseSearchQuerySchema(["createdAt", "name"] as Array<keyof AuthUser>),
  name: z.string().nullable(),
  role: z.enum(ROLES).array().nullable(),
  status: z.enum(["banned", "active"]).array().nullable(),
  createdAt: z.number().array().nullable(),
});
export type UserSearchQueryPayload = z.infer<typeof userSearchQuerySchema>;
