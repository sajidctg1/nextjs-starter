import type {
  SessionWithImpersonatedBy,
  UserWithRole,
} from "better-auth/plugins";

import type { ROLES } from "./constants";
import type { table } from "./server/db/drizzle";

declare global {
  type UserRole = (typeof ROLES)[number];

  type Session = Prettify<
    Omit<SessionWithImpersonatedBy, "impersonatedBy"> & {
      impersonatedBy?: SessionWithImpersonatedBy["impersonatedBy"] | null;
    }
  >;

  type AuthUser = Prettify<
    Omit<UserWithRole, "role"> & {
      role?: UserRole | null;
    }
  >;

  type User = typeof table.user.$inferSelect;
}
