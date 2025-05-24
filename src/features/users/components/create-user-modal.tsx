"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { FormSelect } from "~/components/form/form-select";
import { GenericForm } from "~/components/form/generic-form";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "~/components/ui-ext/modal";
import { api } from "~/trpc/react";

import { type CreateUserPayload, createUserSchema } from "../schemas";

export const CreateUserModal = () => {
  const [open, setOpen] = useState(false);

  const { mutate: createUser, isPending } = api.user.create.useMutation();

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "Test",
      email: "test@test.com",
      password: "12345678",
      role: "user",
    },
  });

  const handleSubmit = (data: CreateUserPayload) => {
    createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button size="sm">
          <PlusIcon className="size-4" aria-hidden="true" />
          New user
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create user</ModalTitle>
          <ModalDescription>
            Fill in the details below to create a new user.
          </ModalDescription>
        </ModalHeader>
        <GenericForm {...form} onSubmit={handleSubmit}>
          <FormInput<CreateUserPayload> name="name" disabled={isPending} />
          <FormInput<CreateUserPayload>
            name="email"
            type="email"
            disabled={isPending}
          />
          <FormInput<CreateUserPayload>
            name="password"
            type="password"
            disabled={isPending}
          />
          <FormSelect<CreateUserPayload>
            name="role"
            options={["admin", "user"].map((i) => ({ label: i, value: i }))}
            disabled={isPending}
          />
          <ModalFooter className="gap-2 pt-2 sm:space-x-0">
            <ModalClose asChild>
              <Button variant="outline">Cancel</Button>
            </ModalClose>
            <ButtonLoading loading={isPending}>Create</ButtonLoading>
          </ModalFooter>
        </GenericForm>
      </ModalContent>
    </Modal>
  );
};
