import type {
  SessionWithImpersonatedBy,
  UserWithRole,
} from "better-auth/plugins";

declare global {
  interface Role {
    name: "admin" | "user";
    permissions: any;
    createdAt: Date;
    updatedAt: Date;
  }

  type Session = Prettify<
    Omit<SessionWithImpersonatedBy, "impersonatedBy"> & {
      impersonatedBy?: SessionWithImpersonatedBy["impersonatedBy"] | null;
    }
  >;

  type AuthUser = Prettify<
    Omit<UserWithRole, "role"> & {
      role?: Role["name"] | null;
    }
  >;
}
