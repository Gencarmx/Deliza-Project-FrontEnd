// src/features/auth/components/RegisterForm.tsx
"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/button";
import { useRegister, RegisterFormValues } from "../hooks/useRegister";

export default function RegisterForm() {
  const { register, loading, error } = useRegister();
  const [form, setForm] = useState<RegisterFormValues>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo_electronico: "",
    numero_telefono: "",
    contrasena: "",
    tipo_usuario: "cliente",
    tipo_vehiculo: "",
    matricula: "",
    licencia: "",
    disponibilidad: "",
  });

  const handleChange =
    (key: keyof RegisterFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center text-black">Crear Cuenta</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/** Datos de usuario */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={handleChange("nombre")}
                required
                className="mt-1 block w-full rounded border px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Apellido Paterno
              </label>
              <input
                type="text"
                value={form.apellido_paterno}
                onChange={handleChange("apellido_paterno")}
                required
                className="mt-1 block w-full rounded border px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Apellido Materno
              </label>
              <input
                type="text"
                value={form.apellido_materno}
                onChange={handleChange("apellido_materno")}
                required
                className="mt-1 block w-full rounded border px-3 py-2 text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={form.correo_electronico}
              onChange={handleChange("correo_electronico")}
              required
              className="mt-1 block w-full rounded border px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Teléfono</label>
            <input
              type="tel"
              value={form.numero_telefono}
              onChange={handleChange("numero_telefono")}
              required
              className="mt-1 block w-full rounded border px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Contraseña</label>
            <input
              type="password"
              value={form.contrasena}
              onChange={handleChange("contrasena")}
              required
              className="mt-1 block w-full rounded border px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Registrarme como</label>
            <select
              value={form.tipo_usuario}
              onChange={handleChange("tipo_usuario")}
              className="mt-1 block w-full rounded border px-3 py-2 text-black"
            >
              <option value="cliente">Cliente</option>
              <option value="repartidor">Repartidor</option>
            </select>
          </div>

          {form.tipo_usuario === "repartidor" && (
            <div className="space-y-4 border-t pt-4">
              {/* Disponibilidad */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Disponibilidad
                </label>
                <input
                  type="text"
                  placeholder="Ej. 08:00-18:00"
                  value={form.disponibilidad}
                  onChange={handleChange("disponibilidad")}
                  required
                  className="mt-1 block w-full rounded border px-3 py-2 text-black"
                />
              </div>

              {/* Tipo de vehículo */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Tipo de vehículo
                </label>
                <select
                  value={form.tipo_vehiculo}
                  onChange={handleChange("tipo_vehiculo")}
                  required
                  className="mt-1 block w-full rounded border px-3 py-2 text-black"
                >
                  <option value="">Selecciona uno</option>
                  <option value="bicicleta">Bicicleta</option>
                  <option value="moto">Motocicleta</option>
                </select>
              </div>

              {/* Matrícula */}
              <div>
                <label className="block text-sm font-medium text-black">Matrícula</label>
                <input
                  type="text"
                  placeholder="Ej. ABC123"
                  value={form.matricula}
                  onChange={handleChange("matricula")}
                  required
                  className="mt-1 block w-full rounded border px-3 py-2 text-black"
                />
              </div>

              {/* Licencia */}
              <div>
                <label className="block text-sm font-medium text-black">Licencia</label>
                <input
                  type="text"
                  placeholder="7–10 dígitos"
                  value={form.licencia}
                  onChange={handleChange("licencia")}
                  required
                  className="mt-1 block w-full rounded border px-3 py-2 text-black"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-black hover:bg-yellow-500"
            disabled={loading}
          >
            {loading ? "Creando…" : "Crear cuenta"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-yellow-500 hover:underline">
            Inicia sesión
          </a>
        </p>
      </Card>
    </div>
  );
}
