// src/features/auth/hooks/useRegister.ts
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createUser, CreateUserPayload, User } from "@/api/userApi";
import { createRepartidor, CreateRepartidorPayload } from "@/api/deliveryApi";

export interface RegisterFormValues {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo_electronico: string;
  numero_telefono: string;
  contrasena: string;
  tipo_usuario: "cliente" | "repartidor";
  // — sólo para repartidor —
  tipo_vehiculo?: string;
  matricula?: string;
  licencia?: string;
  disponibilidad?: string;
}

export function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (form: RegisterFormValues) => {
        console.log('🔔 Register payload:', form);
      setLoading(true);
      setError(null);
      try {
        // 1) Creamos el usuario
        const user: User = await createUser({
          nombre: form.nombre,
          apellido_paterno: form.apellido_paterno,
          apellido_materno: form.apellido_materno,
          correo_electronico: form.correo_electronico,
          numero_telefono: form.numero_telefono,
          contrasena: form.contrasena,
          tipo_usuario: form.tipo_usuario,
        } as CreateUserPayload);

        // 2) Si es repartidor, creamos su perfil
        if (form.tipo_usuario === "repartidor") {
          await createRepartidor({
            usuario_id: user.id,
            tipo_vehiculo: form.tipo_vehiculo!,
            disponibilidad: form.disponibilidad!,
            matricula: form.matricula!,
            licencia: form.licencia!,
          } as CreateRepartidorPayload);
        }

        // 3) Redirigimos al login
        router.push("/login");
      } catch (err: any) {
        setError(err.message || "Error al crear la cuenta");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { register, loading, error };
}
