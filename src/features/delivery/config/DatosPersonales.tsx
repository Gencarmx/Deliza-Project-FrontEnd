// src/features/delivery/components/DatosPersonales.tsx
"use client";

import { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useRouter } from 'next/navigation';
import Button from "@/components/ui/button";
import { UpdateUserPayload } from "@/api/userApi";
import { ArrowLeft } from "lucide-react";

export default function DatosPersonales() {
  const router = useRouter();
  const { profile, loading, error, saveProfile } = useProfile();
  const [form, setForm] = useState<UpdateUserPayload>({
    id: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo_electronico: "",
    numero_telefono: "",
  });

  // Cuando cargue el perfil, rellenamos el formulario
  useEffect(() => {
    if (profile) {
      setForm({
        id: profile.id,
        nombre: profile.nombre,
        apellido_paterno: profile.apellido_paterno,
        apellido_materno: profile.apellido_materno,
        correo_electronico: profile.correo_electronico,
        numero_telefono: profile.numero_telefono,
        
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await saveProfile(form);
      alert("¡Guardado!");
    } catch {
      alert("No se pudo guardar cambios");
    }
  };

  if (loading) return <p>Cargando…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-yellow-400 p-6 relative">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-center text-lg font-semibold text-black">Notificaciones</h1>
      </header>

      <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
        <label className="block mb-1 text-sm font-medium text-black">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black"
        />
        <label className="block mb-1 text-sm font-medium text-black">Apellido Paterno</label>
        <input
          name="apellido_paterno"
          value={form.apellido_paterno}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black"
        />
        <label className="block mb-1 text-sm font-medium text-black">Apellido Materno</label>
        <input
          name="apellido_materno"
          value={form.apellido_materno}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black"
        />
        <label className="block mb-1 text-sm font-medium text-black">Correo Electrónico</label>
        <input
          name="correo_electronico"
          value={form.correo_electronico}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4 text-black"
        />
        <label className="block mb-1 text-sm font-medium text-black">Número Telefónico</label>
        <input
          name="numero_telefono"
          value={form.numero_telefono}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-6 text-black"
        />

        <Button onClick={handleSave} className="w-full bg-yellow-500 text-black hover:bg-gray-600">
          GUARDAR CAMBIOS
        </Button>
      </div>
    </div>
  );
} 
