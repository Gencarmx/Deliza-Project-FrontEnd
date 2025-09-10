"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/features/auth/types/auth";
import { LoginUser } from "@/features/auth/Services/authServices";
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
    if (!token) {
      setLoading(false);
      return;
    }

  }, []);


  const login = async (userName: string, password: string) => {
    setLoading(true);
    try {
      const { token } = await LoginUser(userName, password);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      //Quita el comentario para comprobar que el login se genera
      // console.log("Token obtenido:", token); 

      router.push("/restaurante");
    } catch (err: unknown) {
      // manejo seguro del unknown
      if (err instanceof Error) {
        console.error("Error en login:", err.message);
      } else {
        console.error("Error desconocido en login:", err);
      }
      // re-lanzamos para que el LoginForm lo capture si quiere
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
