// src/features/auth/hooks/useAuth.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://192.168.0.105:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico: email, contrasena: password }),
      });

      // **Lee TODO el JSON una única vez**
      const payload = await res.json();

      if (!res.ok) {
        // payload.message viene del backend en { message: "Usuario no encontrado" }
        throw new Error(payload.message || "Error al hacer login");
      }

      // extrae el user correcto (recuerda que tu backend devuelve {user, repartidor})
      const loggedUser = payload.user ?? payload;
      localStorage.setItem("userId", loggedUser.id);

      router.push("/delivery/config");
    } catch (err: any) {
      // aquí sí mostramos el error en pantalla
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
