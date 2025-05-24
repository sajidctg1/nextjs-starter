"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";

import { useChangePassword } from "../../api/change-password";
import {
  type UpdatePasswordPayload,
  updatePasswordSchema,
} from "../../schemas";

export const PasswordUpdateForm = () => {
  const { mutate: changePassword, isPending: isUpdatingPass } =
    useChangePassword();

  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "12345678",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  return (
    <GenericForm
      {...form}
      onSubmit={(v) =>
        changePassword({
          currentPassword: v.currentPassword,
          newPassword: v.password,
        })
      }
    >
      <FormInput<UpdatePasswordPayload>
        name="currentPassword"
        label="Current Password"
        type="password"
        disabled={isUpdatingPass}
      />
      <FormInput<UpdatePasswordPayload>
        name="password"
        label="New Password"
        type="password"
        disabled={isUpdatingPass}
      />
      <FormInput<UpdatePasswordPayload>
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        disabled={isUpdatingPass}
      />
      <ButtonLoading loading={isUpdatingPass}>Update</ButtonLoading>
    </GenericForm>
  );
};
