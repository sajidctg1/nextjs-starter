import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";
import { getQueryClient, useTRPC } from "~/trpc/react";

export const useUnbanUser = () => {
  const queryClient = getQueryClient();
  const trpc = useTRPC();

  return useMutation({
    mutationFn: async (input: { userId: string }) => {
      const { data, error } = await authClient.admin.unbanUser({
        userId: input.userId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.user.list.queryFilter());
    },
  });
};
