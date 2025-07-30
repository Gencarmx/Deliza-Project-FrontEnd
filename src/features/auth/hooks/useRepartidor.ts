"use client";

import { useState, useCallback } from "react";
import { createRepartidor } from "@/api/deliveryApi";
import { useRouter } from "next/navigation";

export function useRepartidor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (form: Parameters<typeof createRepartidor>[0]) => {
      setLoading(true);
      setError(null);
      try {
        await createRepartidor(form);
        // Al crear con éxito, redirige al login
        router.push("/login");
      } catch (err: any) {
        setError(err.message || "Error al crear usuario");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { register, loading, error };
}
