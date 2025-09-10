// src/features/auth/components/RegisterForm.tsx
"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/button";
import { useRegister, RegisterFormValues } from "../hooks/useRegister";
import Image from "next/image";
import { LucideLanguages } from "lucide-react";

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

  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Español", "Ingles", "Frances", "Alemán"];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative isolate min-h-screen">
      <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/img/fondo3.jpg"
          alt="Background"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full md:w-1/2 bg-[#dad3cc] flex items-center justify-center p-6">
        <div className="absolute top-5 left-5">
          <h1 className="text-black text-4xl font-medium">GENCAR</h1>
        </div>
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer border-2 border-black text-black"
          >
            <LucideLanguages className="text-black size-6" />
            {selectedOption}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-32 z-10 ">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-black"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center h-full w-full">
          <Card className="w-full max-w-xl p-6 space-y-2 ">
            <h1 className="pb-8 text-xl font-semibold text text-black text-start">
              Crea tu cuenta
            </h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/** Datos de usuario */}
              <div>
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-15 bg-[#976b31]"></div>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => {
                      const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
                      if (regex.test(e.target.value)) {
                        handleChange("nombre")(e); 
                      }
                    }}
                    required
                    placeholder="Nombre Completo (Sin caracteres especiales)"
                    className="mt-1 block h-15 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                  />
                </div>
              </div>
              {/* <div>
                  <div className="flex items-center">
                  <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                  <input
                    type="text"
                    value={form.apellido_paterno}
                    onChange={handleChange("apellido_paterno")}
                    required
                    placeholder="Apellido Paterno"
                    className="mt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                  />
                </div>
                </div>
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                  <input
                    type="text"
                    value={form.apellido_materno}
                    onChange={handleChange("apellido_materno")}
                    required
                    placeholder="Apellido Materno"
                    className="mt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                  />
                </div> */}

              <div>
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-15 bg-[#976b31]"></div>
                  <input
                    type="email"
                    value={form.correo_electronico}
                    onChange={handleChange("correo_electronico")}
                    required
                    placeholder="Correo Electrónico"
                    className="mt-1 block h-15 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-15 bg-[#976b31]"></div>
                  <input
                    type="tel"
                    value={form.numero_telefono}
                    onChange={handleChange("numero_telefono")}
                    required
                    placeholder="Número de Teléfono"
                    className="mt-1 block h-15 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                  />
                </div>
              </div>

              <div className="pb-5">
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-15 bg-[#976b31]"></div>
                  <input
                    type="password"
                    value={form.contrasena}
                    onChange={handleChange("contrasena")}
                    required
                    placeholder="Contraseña"
                    className="mt-1 block h-15 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                  />
                </div>
              </div>

              {/* <div>
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                <select
                  value={form.tipo_usuario}
                  onChange={handleChange("tipo_usuario")}
                  className="mmt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                >
                  <option value="cliente">Cliente</option>
                  <option value="repartidor">Repartidor</option>
                </select>
              </div>
              </div> */}

              {/* Campos adicionales para repartidores */}

              {form.tipo_usuario === "repartidor" && (
                <div className="space-y-4 border-t pt-4">
                  Disponibilidad
                  <div>
                    <div className="flex items-center">
                      <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                      <input
                        type="text"
                        placeholder="Disponibilidad (ej. de 9:00am a 5:00pm)"
                        value={form.disponibilidad}
                        onChange={handleChange("disponibilidad")}
                        required
                        className="mt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                      />
                    </div>
                  </div>
                  {/* Tipo de vehículo */}
                  <div>
                    <div className="flex items-center">
                      <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                      <select
                        value={form.tipo_vehiculo}
                        onChange={handleChange("tipo_vehiculo")}
                        required
                        className="mt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                      >
                        <option value="">Selecciona tu vehiculo</option>
                        <option value="bicicleta">Bicicleta</option>
                        <option value="moto">Motocicleta</option>
                      </select>
                    </div>
                  </div>
                  {/* Matrícula */}
                  <div>
                    <div className="flex items-center">
                      <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                      <input
                        type="text"
                        placeholder="Matricula (Ej. ABC123)"
                        value={form.matricula}
                        onChange={handleChange("matricula")}
                        required
                        className="mt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                      />
                    </div>
                  </div>
                  {/* Licencia */}
                  <div>
                    <div className="flex items-center">
                      <div className=" mt-1 w-2 h-12 bg-[#976b31]"></div>
                      <input
                        type="text"
                        placeholder="Licencia (7–10 dígitos)"
                        value={form.licencia}
                        onChange={handleChange("licencia")}
                        required
                        className="mt-1 block h-12 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-18 py-2 text-black hover:bg-[#947955]"
                disabled={loading}
              >
                {loading ? "Creando…" : "Registrarse"}
              </Button>
            </form>

            <p className="text-lg text-center text-gray-600 pt-5">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-yellow-500 hover:underline">
                Inicia sesión
              </a>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
