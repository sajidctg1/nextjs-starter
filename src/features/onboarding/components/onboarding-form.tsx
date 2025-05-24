"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { api } from "~/trpc/react";

import { type OnboardingPayload, onboardingSchema } from "../schemas";

export const OnboardingForm = () => {
  const { mutate: createUser, isPending } = api.onboarding.create.useMutation();

  const form = useForm<OnboardingPayload>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "Test",
      email: "test@test.com",
      password: "12345678",
    },
  });

  const handleSubmit = (data: OnboardingPayload) => {
    createUser(data);
  };

  return (
    <GenericForm {...form} onSubmit={handleSubmit}>
      <FormInput<OnboardingPayload> name="name" disabled={isPending} />
      <FormInput<OnboardingPayload>
        name="email"
        type="email"
        disabled={isPending}
      />
      <FormInput<OnboardingPayload>
        name="password"
        type="password"
        disabled={isPending}
      />
      <FormInput<OnboardingPayload>
        name="password"
        type="password"
        disabled={isPending}
      />
      <FormInput<OnboardingPayload>
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        disabled={isPending}
      />
      <ButtonLoading loading={isPending} className="w-full">
        Save
      </ButtonLoading>
    </GenericForm>
  );
};
