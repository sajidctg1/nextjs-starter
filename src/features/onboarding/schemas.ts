import { z } from "zod";

export const onboardingSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password not matched",
    path: ["confirmPassword"],
  });
export type OnboardingPayload = z.infer<typeof onboardingSchema>;
