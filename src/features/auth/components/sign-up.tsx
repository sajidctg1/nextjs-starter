"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { siteConfig } from "~/configs/site-config";

import { useSignup } from "../api/sign-up";
import { AUTH_URI } from "../constants";
import { type SignUpPayload, SignUpSchema } from "../schemas";
import { AuthCard } from "./auth-card";

export const SignUpForm = () => {
  const { mutate, isPending } = useSignup();

  const form = useForm<SignUpPayload>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "Sajid",
      email: "test@test.com",
      password: "12345678",
    },
  });

  const handleSubmit = (data: SignUpPayload) => {
    mutate(data);
  };

  return (
    <AuthCard
      title={`Register to ${siteConfig.name}`}
      desc="Choose your preferred sign up method"
      buttonLabel="Already have an account?"
      buttonHref={AUTH_URI.signIn}
      showSocial
    >
      <GenericForm {...form} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput<SignUpPayload>
            name="name"
            placeholder="Jhon Doe"
            disabled={isPending}
          />
          <FormInput<SignUpPayload>
            name="email"
            type="email"
            placeholder="jhon@example.com"
            disabled={isPending}
          />
          <FormInput<SignUpPayload>
            name="password"
            type="password"
            disabled={isPending}
          />
        </div>
        <ButtonLoading loading={isPending} className="w-full">
          Register
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};
