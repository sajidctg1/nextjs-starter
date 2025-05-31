import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, createAuthMiddleware, emailOTP } from "better-auth/plugins";

import { siteConfig } from "~/configs/site-config";
import VerifyOTPEmail from "~/emails/verify-otp";
import { env } from "~/env";
import { AUTH_URI, UNVERIFIED_EMAIL_COOKIE } from "~/features/auth/constants";

import { authConfig } from "../configs/auth-config";
import { db } from "../db/drizzle";
import { sendEmail } from "./email-sender";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", usePlural: false }),
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.context.returned instanceof Error) return;

      if (ctx.path.includes(AUTH_URI.verifyEmail)) {
        ctx.setCookie(UNVERIFIED_EMAIL_COOKIE, "", {
          httpOnly: true,
          maxAge: 0,
          secure: env.NODE_ENV === "production",
          path: "/",
        });
      }

      if (ctx.path.startsWith(AUTH_URI.signUp)) {
        ctx.setCookie(UNVERIFIED_EMAIL_COOKIE, ctx.body.email, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          secure: env.NODE_ENV === "production",
          path: "/",
        });
      }
    }),
  },
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
    generateId: () => crypto.randomUUID(),
  },
  emailAndPassword: {
    enabled: authConfig.email.enabled,
    requireEmailVerification: authConfig.email.requiredVerification,
  },
  socialProviders: {
    google: {
      enabled: authConfig.google.enabled,
      clientId: authConfig.google.clientId,
      clientSecret: authConfig.google.secret,
    },
    github: {
      enabled: authConfig.github.enabled,
      clientId: authConfig.github.clientId,
      clientSecret: authConfig.github.secret,
    },
  },
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      disableSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        console.log({ otp });
        if (type === "email-verification" || type === "forget-password") {
          await sendEmail(
            email,
            `Verify your email for ${siteConfig.name}`,
            VerifyOTPEmail({
              code: otp,
              appUrl: siteConfig.url,
              appName: siteConfig.name,
              expiration: authConfig.email.confirmationExpires,
              companyName: siteConfig.companyName,
              companyAddr: siteConfig.companyAddr,
            })
          );
        }
      },
    }),
    admin(),
  ],
});
