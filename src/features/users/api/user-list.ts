import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";

import type { UserSearchParams } from "../schemas";

export const useUserList = (query: UserSearchParams) => {
  const trpc = useTRPC();
  return useQuery(trpc.user.list.queryOptions(query));
};
