// src/features/delivery/components/Ganancias.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Truck } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar,} from "recharts";
import Card from "@/components/ui/Card";
import { useStats } from "../../hooks/useStats";      // ajusta la ruta según tu estructura
import type { Periodo } from "@/api/deliveryApi";

export default function Ganancias() {
  const router = useRouter();
  const { periodo, setPeriodo, stats, loading, error } = useStats("week");

  if (loading) return <p className="p-4 text-center">Cargando...</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;
  if (!stats)  return null;

  // aquí tu array dinámico, directamente desde el backend
  const dataGrafica = stats.breakdown;

  // solo las 5 primeras entregas recientes
  const últimos = stats.recentDeliveries.slice(0, 5);

  // título dinámico para el eje X
  const ejeXLabel =
    periodo === "day" ? "Hora"
    : periodo === "week" ? "Día"
    : "Semana del mes";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="text-gray-500 p-4 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4"
        >
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
            onChange={(e) => setPeriodo(e.target.value as Periodo)}
            className="flex-1 text-sm text-black outline-none"
          >
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex max-w-md mx-auto overflow-hidden rounded-lg border border-gray-300">
          <button
            className="flex-1 bg-white text-gray-700 py-2 text-center font-medium hover:bg-gray-50"
            onClick={() => router.push("/delivery/config/ganancias")}
          >
            Datos Generales
          </button>
          <button className="flex-1 bg-blue-600 text-white py-2 text-center font-medium">
            Ganancias
          </button>
        </div>

        {/* Gráfico */}
        <Card className="bg-white max-w-md mx-auto p-4">
          <h2 className="text-sm font-medium mb-2">
            Ganancias por {ejeXLabel}
          </h2>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataGrafica}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Últimas entregas */}
        <section className="max-w-md mx-auto space-y-4">
          <p className="text-sm font-medium text-black mb-2 text-left">
            Tus últimas 5 entregas
          </p>
          <div className="space-y-4">
            {últimos.map((d, i) => (
            <Card key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Truck size={20} className="text-yellow-500" />
                <div>
                  <p className="font-medium text-black">{d.address}</p>
                  <p className="text-xs text-gray-500">{d.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-black">
                  ${d.amount.toFixed(2)}
                </p>
                {d.tip > 0 && (
                  <p className="text-xs text-yellow-600">
                    +${d.tip.toFixed(2)} propina
                  </p>
                )}
              </div>
            </Card>
          ))}
          </div>
        </section>
      </main>
    </div>
  );
}
