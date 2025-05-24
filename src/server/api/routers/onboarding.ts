import { onboardingSchema } from "~/features/onboarding/schemas";
import { NotFoundError } from "~/lib/exceptions";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { auth } from "~/server/lib/auth";
import { findAnyUser, updateUser } from "~/server/repositories/user-repository";

export const onboardingRouter = createTRPCRouter({
  create: publicProcedure
    .input(onboardingSchema)
    .mutation(async ({ input }) => {
      const user = await findAnyUser();
      if (user) throw new NotFoundError();

      const res = await auth.api.signUpEmail({
        body: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      await updateUser(res.user.id, { emailVerified: true, role: "admin" });
    }),
});
