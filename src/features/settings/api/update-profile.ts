import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/services/auth/auth-client";
import { getQueryClient } from "~/trpc/react";

interface Input {
  name?: string;
  image?: string | null;
}

export const useUpdateProfile = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async ({ name, image }: Input) => {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
