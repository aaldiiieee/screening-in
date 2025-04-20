import { createContext, useContext, useState } from "react";
import { IAuthContext } from "@/types/context";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("USER_TOKEN"));
  const queryClient = useQueryClient();

  const signIn = (token: string) => {
    setToken(token);
    sessionStorage.setItem("USER_TOKEN", token);
  };

  const signOut = () => {
    setToken(null);
    sessionStorage.removeItem("USER_TOKEN");
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  return useContext(AuthContext);
};
