"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { authClient } from "~/lib/auth-client";

import { useDeleteAccount } from "../../api/delete-account";

const schema = z.object({
  password: z.string().min(6),
});

export const DeleteAccountDialog = () => {
  const { data: auth } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const { mutate: deleteAccoount, isPending } = useDeleteAccount();

  const form = useForm<{ password: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "123456",
    },
  });

  const handleDelete = async () => {
    if (!auth?.session.token) return;
    deleteAccoount({
      token: auth.session.token,
      password: form.getValues("password"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <ButtonLoading
          loading={isPending}
          variant={"destructive"}
          onClick={handleDelete}
        >
          Delete Account
        </ButtonLoading>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
        <DialogDescription>
          Once your account is deleted, all of its resources and data will also
          be permanently deleted. Please enter your password to confirm you
          would like to permanently delete your account.
        </DialogDescription>
        <GenericForm {...form} onSubmit={handleDelete}>
          <div className="grid gap-2">
            <FormInput name="password" type="password" disabled={isPending} />
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>

            <ButtonLoading variant="destructive" loading={isPending}>
              Delete account
            </ButtonLoading>
          </DialogFooter>
        </GenericForm>
      </DialogContent>
    </Dialog>
  );
};
