import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/services/auth/auth-client";
import { getQueryClient, useTRPC } from "~/trpc/react";

interface Input {
  userId: string;
  banReason?: string;
  banExpiresIn?: number;
}

export const useBanUser = () => {
  const queryClient = getQueryClient();
  const trpc = useTRPC();

  return useMutation({
    mutationFn: async (input: Input) => {
      const { data, error } = await authClient.admin.banUser({
        userId: input.userId,
        banReason: input.banReason,
        banExpiresIn: input.banExpiresIn,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.user.list.queryFilter());
    },
  });
};
