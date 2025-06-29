import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/services/auth/auth-client";
import { getQueryClient, useTRPC } from "~/trpc/react";

export const useRemoveUser = () => {
  const queryClient = getQueryClient();
  const trpc = useTRPC();

  return useMutation({
    mutationFn: async (input: { userId: string }) => {
      const { data, error } = await authClient.admin.removeUser({
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
