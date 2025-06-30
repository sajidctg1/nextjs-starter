import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";

export const useUserRoleCounts = () => {
  const trpc = useTRPC();
  return useQuery(trpc.user.userRoleCounts.queryOptions());
};
