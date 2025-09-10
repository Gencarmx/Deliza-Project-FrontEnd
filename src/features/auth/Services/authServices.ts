import api from "../../../api/apiAuth";
import { LoginResponse, LoginResult } from "../types/auth";

export interface LoginResponseApi {
  code: string;
  message: string;
  data: {
    token: string;
  };
}

export async function LoginUser(
    userName: string,
    password: string
): Promise<LoginResult> {
    const res = await api.post<LoginResponse>("/login", {
    userName,
    password,
  });

    const token = res.data?.data?.token;
  if (!token) {
    throw new Error("No se recibió token del servidor");
  }

  return { token };
  
}