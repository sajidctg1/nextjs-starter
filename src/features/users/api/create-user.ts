import { useMutation } from "@tanstack/react-query";

import { getQueryClient, useTRPC } from "~/trpc/react";

export const useCreateUser = () => {
  const trpc = useTRPC();
  const queryClient = getQueryClient();

  return useMutation(
    trpc.user.create.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries(trpc.user.list.queryFilter());
      },
    })
  );
};
