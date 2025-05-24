import { createContext, useContext } from "react";

import { authClient } from "~/lib/auth-client";

interface Context {
  user?: AuthUser;
  session?: Session;
}

const AuthContext = createContext<Context>({});

export const useAuthContext = () => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { data } = authClient.useSession();

  return (
    <AuthContext.Provider
      value={{ user: data?.user as AuthUser, session: data?.session }}
    >
      {children}
    </AuthContext.Provider>
  );
};
