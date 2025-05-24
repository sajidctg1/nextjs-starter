"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { siteConfig } from "~/configs/site-config";

import { useSignin } from "../api/sign-in";
import { AUTH_URI } from "../constants";
import { type SignInPayload, SignInSchema } from "../schemas";
import { AuthCard } from "./auth-card";

export const SignInForm = () => {
  const { mutate, isPending } = useSignin();

  const form = useForm<SignInPayload>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "test@test.com",
      password: "12345678",
    },
  });

  const handleSubmit = (data: SignInPayload) => {
    mutate(data);
  };

  return (
    <AuthCard
      title={`Login to ${siteConfig.name}`}
      desc="Choose your preferred sign in method"
      buttonLabel="Don't have an account?"
      buttonHref={AUTH_URI.signUp}
      showSocial
    >
      <GenericForm {...form} onSubmit={handleSubmit}>
        <FormInput<SignInPayload>
          name="email"
          type="email"
          placeholder="jhon@example.com"
          disabled={isPending}
        />
        <FormInput<SignInPayload>
          name="password"
          type="password"
          disabled={isPending}
          className="mb-0"
        />
        <Button
          size="sm"
          variant="link"
          className="size-auto p-0 font-normal text-blue-500"
          asChild
        >
          <Link href={AUTH_URI.forgotPassword}>Forgot password?</Link>
        </Button>
        <ButtonLoading loading={isPending} className="w-full">
          Login
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};
