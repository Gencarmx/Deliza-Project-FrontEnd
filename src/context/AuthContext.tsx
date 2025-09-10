"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/features/auth/types/auth";
import { LoginUser, getProfile } from "@/features/auth/Services/authServices";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    console.log("Token:", token)
    if (token) {
      getProfile()
        .then((profile) => setUser(profile))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
    setLoading(false);
  }, []);



  const login = async (userName: string, password: string) => {
    const { token, user } = await LoginUser(userName, password);
     if (typeof window !== "undefined") localStorage.setItem("token", token);
    setUser(user);
    router.push("/restaurante");
  };

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
