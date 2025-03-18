import { createContext, useContext, useState, useEffect } from "react";
import { IAuthContext, IUser } from "@/types/context";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const signIn = (userData: IUser, token: string) => {
    setUser(userData);
    setToken(token);
    sessionStorage.setItem("USER_DATA", JSON.stringify(userData));
    sessionStorage.setItem("USER_TOKEN", JSON.stringify(token));
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("USER_DATA");
    sessionStorage.removeItem("USER_TOKEN");
    queryClient.clear();
  };

  useEffect(() => {
    const userData = sessionStorage.getItem("USER_DATA");
    const token = sessionStorage.getItem("USER_TOKEN");
    if (userData && token) {
      setUser(JSON.parse(userData));
      setToken(JSON.parse(token));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  return useContext(AuthContext);
};
