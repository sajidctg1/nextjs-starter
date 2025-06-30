import { useMutation } from "@tanstack/react-query";

import { getQueryClient, useTRPC } from "~/trpc/react";

export const useUpdateRole = () => {
  const trpc = useTRPC();
  const queryClient = getQueryClient();

  return useMutation(
    trpc.user.updateRole.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries(trpc.user.list.queryFilter());
      },
    })
  );
};
