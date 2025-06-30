import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "~/services/auth/auth-client";

import { AUTH_URI } from "../constants";

export const useSignOut = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            router.push(AUTH_URI.signIn);
          },
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Sign out successfull!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
