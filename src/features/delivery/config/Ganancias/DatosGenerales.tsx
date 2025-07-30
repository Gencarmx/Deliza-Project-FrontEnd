// src/features/delivery/components/DatosGenerales.tsx
"use client";

import React from "react";
import { useStats } from "../../hooks/useStats";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";

export default function DatosGenerales() {
  const router = useRouter();
  const { periodo, setPeriodo, stats, loading, error } = useStats("week");

  if (loading) return <p className="p-4 text-center">Cargando...</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;
  if (!stats)  return null;

  const totalHours = stats.tiempoPromedioEntrega;           // ej. 1.75
  const hrs        = Math.floor(totalHours);                // 1
  const mins       = Math.round((totalHours - hrs) * 60);   // 45
  const tiempoLabel = `${hrs}h ${mins.toString().padStart(2, "0")}m`; // "1h 45m"

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="text-gray-500 p-4 relative">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-gray-500" />
        </button>
        <h1 className="text-center text-lg font-semibold text-black">
          Panel de ganancias
        </h1>
      </header>

      <main className="flex-1 overflow-auto p-4 space-y-6">
        {/* Selector de periodo */}
        <div className="flex items-center space-x-2 max-w-md mx-auto bg-white border border-gray-300 rounded-lg px-4 py-2">
          <Calendar size={20} className="text-gray-700" />
          <select
            value={periodo}
            onChange={e => setPeriodo(e.target.value as "day" | "week" | "month")}
            className="flex-1 text-sm text-black outline-none"
          >
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex max-w-md mx-auto overflow-hidden rounded-lg border border-gray-300">
          <button className="flex-1 bg-blue-600 text-white py-2 text-center font-medium">
            Datos Generales
          </button>
          <button
            className="flex-1 bg-white text-gray-700 py-2 text-center font-medium hover:bg-gray-50"
            onClick={() => router.push("/delivery/config/ganancias/detalles")}
          >
            Ganancias
          </button>
        </div>

        {/* Tarjeta principal */}
        <Card className="bg-yellow-400 text-black max-w-md mx-auto p-4">
          <p className="text-xs">
            Tus ganancias de este{" "}
            {periodo === "day"
              ? "día"
              : periodo === "week"
              ? "semana"
              : "mes"}
            :
          </p>
          <p className="text-3xl font-bold">
            ${stats.totalEarnings.toFixed(2)}
          </p>
          {/* si no tienes % comparativo, quítalo o déjalo en 0 */}
        </Card>

        {/* Métricas secundarias */}
        <div className="space-y-4">
          <Card className="max-w-md mx-auto p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Total entregas</p>
            </div>
            <p className="text-2xl font-semibold text-black mt-2">
              {stats.totalDeliveries}
            </p>
          </Card>

          <Card className="max-w-md mx-auto p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Promedio por entrega</p>
            </div>
            <p className="text-2xl font-semibold text-black mt-2">
              ${stats.avgPerDelivery.toFixed(2)}
            </p>
          </Card>

          <Card className="max-w-md mx-auto p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Distancia recorrida (m)</p>
            </div>
            <p className="text-2xl font-semibold text-black mt-2">
              {stats.distanciaRecorrida.toFixed(2)}
            </p>
          </Card>

          <Card className="max-w-md mx-auto p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Calificación promedio</p>
            </div>
            <p className="text-2xl font-semibold text-black mt-2">
              {stats.promedioCalificacion.toFixed(1)}
            </p>
          </Card>

          <Card className="max-w-md mx-auto p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Tiempo promedio entrega</p>
            </div>
            <p className="text-2xl font-semibold text-black mt-2">
              {tiempoLabel}
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
