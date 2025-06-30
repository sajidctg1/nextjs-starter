import type { ROLES } from "./constants";
import type { table } from "./db/drizzle";

declare global {
  type UserRole = (typeof ROLES)[number];

  interface AuthUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role?: UserRole | null;
  }

  interface AuthSession {
    id: string;
    token: string;
    expiresAt: Date;
  }

  interface AuthResponse {
    user: AuthUser | null;
    session: AuthSession | null;
  }

  type User = typeof table.user.$inferSelect;
  type Account = typeof table.account.$inferSelect;
  type Session = typeof table.session.$inferSelect;
}
