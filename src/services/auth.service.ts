import callApiUrl from "@/lib/axiosInstance";
import { LoginPayload, RegisterPayload } from "@/types/services";

export const login = async ({ email, password }: LoginPayload) => {
  const response = await callApiUrl.post("/api/v1/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await callApiUrl.post("/api/v1/logout");
  return response.data;
};

export const register = async ({
  email,
  password,
  fullname,
}: RegisterPayload) => {
  const response = await callApiUrl.post("/api/v1/register", {
    email,
    password,
    fullname,
  });
  return response.data;
};
