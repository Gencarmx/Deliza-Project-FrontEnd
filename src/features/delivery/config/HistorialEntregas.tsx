// src/features/delivery/components/config/HistorialEntregas.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Box } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/button";
import { Order, fetchDeliveredOrders } from "@/api/deliveryApi";

export default function HistorialEntregas() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveredOrders()
      .then((data) => setOrders(data))
      .catch((err) => {
        console.error("Error al cargar historial:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando historial…</p>;
  if (orders.length === 0) return <p className="p-4">No hay entregas completadas</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="text-gray-500 p-4 relative">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-center text-2xl font-bold text-black">
          Historial de Entregas
        </h1>
      </header>

      {/* Lista de entregas */}
      <main className="flex-1 overflow-auto p-4 space-y-4">
        <div className="space-y-4 max-w-md mx-auto">
          {orders.map((o) => (
            <Card key={o.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <Box size={20} className="text-gray-700" />
                  <div>
                    <p className="font-medium text-black">Pedido {o.id}</p>
                    <p className="text-sm text-gray-500">{o.restaurantName}</p>
                    <p className="text-xs text-gray-500 mt-1">Entregado en: {o.clientAddress}</p>
                    <p className="text-sm text-black mt-1">
                      ${o.total.toFixed(2)}
                      {o.tip != null && (
                        <span className="text-xs text-gray-500"> +${o.tip} propina</span>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-black border-gray-300 hover:bg-gray-100"
                  onClick={() => router.push(`/delivery/historial/${o.id}`)}
                >
                  Ver detalles
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
