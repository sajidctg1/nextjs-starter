import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { getQueryClient, useTRPC } from "~/trpc/react";

export const useRemoveProfileImage = () => {
  const trpc = useTRPC();
  const queryClient = getQueryClient();

  return useMutation(
    trpc.user.removeImage.mutationOptions({
      onSuccess: () => {
        toast.success("Profile updated!");
        queryClient.invalidateQueries({ queryKey: ["session"] });
      },
    })
  );
};
