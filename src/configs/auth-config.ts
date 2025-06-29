import "server-only";

import { env } from "~/env";
import { absoluteUrl } from "~/lib/helpers";

export const authConfig = {
  enableSignup: true,
  email: {
    enabled: true,
    requiredVerification: true,
    confirmationExpires: env.EMAIL_CONFIRMATION_EXPIRES * 1000,
  },
  magicLink: {
    enabeld: false,
  },
  google: {
    enabled: true,
    clientId: env.GOOGLE_CLIENT_ID,
    secret: env.GOOGLE_CLIENT_SECRET,
    redirectUri: absoluteUrl("/api/auth/callback/google"),
  },
  github: {
    enabled: false,
    clientId: "", //env.GITHUB_CLIENT_ID,
    secret: "", // env.GITHUB_CLIENT_SECRET,
    redirectUri: absoluteUrl("/api/auth/callback/github"),
  },
};
