import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/services/auth.service";
import { LoginPayload, RegisterPayload } from "@/types/services";

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: async (data: LoginPayload) => {
      const response = await login(data);
      return response;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterPayload) => {
      const response = await register(data);
      return response;
    },
  });

  return { loginMutation, registerMutation };
};
