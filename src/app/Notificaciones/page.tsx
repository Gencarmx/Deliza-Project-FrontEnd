"use client";

import { useState } from "react";
import CommonHeader from "@/components/common/CommonHeader";
import BottomNav from "@/components/common/BottomNav";

function NotificacionesNormales() {
  return <div>Aquí van las notificaciones normales</div>;
}

function Mensajes() {
  return <div>Aquí van los mensajes</div>;
}

export default function Notificaciones() {
  const [tab, setTab] = useState<"notificaciones" | "mensajes">("notificaciones");

  return (
    <main className="min-h-screen bg-[#eae2d7] text-gray-900 p-4 pb-24 px-6">
      <CommonHeader
        encabezado="Notificaciones"
        menuOpciones={[{ titulo: "Configuración", href: "/Configuraciones" }]}
      />

      <nav className="flex border-b mt-4">
        <button
          className={`flex-1 py-2 text-center ${
            tab === "notificaciones"
              ? "border-b-2 border-[#E5B752] text-[#E5B752] font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setTab("notificaciones")}
        >
          Notificaciones
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            tab === "mensajes"
              ? "border-b-2 border-[#E5B752] text-[#E5B752] font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setTab("mensajes")}
        >
          Mensajes
        </button>
      </nav>

      <section className="mt-4">
        {tab === "notificaciones" && <NotificacionesNormales />}
        {tab === "mensajes" && <Mensajes />}
      </section>
      <BottomNav/>
    </main>
  );
}
