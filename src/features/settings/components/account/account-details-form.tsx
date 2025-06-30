"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ProfilePictureUploader } from "~/components/profile-picture-uploader";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Skeleton } from "~/components/ui/skeleton";
import { useSession } from "~/features/auth/api/session";

import { useRemoveProfileImage } from "../../api/remove-profile-image";
import { useUpdateProfile } from "../../api/update-profile";
import { type UpdateProfilePayload, updateProfileSchema } from "../../schemas";

export const AccountDetailsForm = () => {
  const { data: auth, isPending } = useSession();

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: removeImage } = useRemoveProfileImage();

  const form = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: auth?.user?.name,
      image: auth?.user?.image ?? undefined,
    },
  });

  const handleSubmit = (data: UpdateProfilePayload) => {
    updateProfile(data);
  };

  const formAvatar = form.getValues("image");

  return (
    <GenericForm
      {...form}
      onSubmit={handleSubmit}
      className="grid gap-6 space-y-0 md:grid-cols-2"
    >
      <div>
        <p className="mb-4 text-sm font-medium">Profile picture</p>
        {isPending ? (
          <Skeleton className="size-[200px] rounded-full border" />
        ) : formAvatar ? (
          <div className="flex gap-4">
            <Image
              src={formAvatar}
              height={150}
              width={150}
              alt="user avatar"
              className="size-[200px] rounded-full border object-cover shadow-md"
            />
            <Button
              variant={"destructive"}
              size={"icon"}
              className="size-8"
              disabled={isUpdating}
              onClick={() => removeImage()}
            >
              <XIcon />
            </Button>
          </div>
        ) : (
          <ProfilePictureUploader
            maxSize={1} // 1MB
            onUpload={(files) => form.setValue("image", files[0] ?? null)}
          />
        )}
      </div>
      <div className="md:col-span-2">
        <FormInput disabled={isPending || isUpdating} name="name" />
      </div>
      <div className="md:col-span-2">
        <ButtonLoading loading={isUpdating}>Update</ButtonLoading>
      </div>
    </GenericForm>
  );
};
