import api from "../../../api/apiAuth";
import { LoginResponse, User } from "../types/auth";

export async function LoginUser(
    userName: string,
    password: string
): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/login", {
        userName,
        password,
    });
    return data;
}

export async function getProfile(): Promise<User> {
    const { data } = await api.get<User>("/profile");
    return data;
}