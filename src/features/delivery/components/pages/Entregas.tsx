// src/features/components/pages/entregas.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/button";
import { ArrowLeft, MapPin, DollarSign, ChevronRight } from "lucide-react";
import { fetchAssignedOrders, acceptOrder } from "@/api/deliveryApi";
import { Truck } from "lucide-react";

interface AssignedOrder {
  id: string;
  restaurantName: string;
  clientAddress: string;
  total: number;
  tip: number;
  canAccept: boolean;
}

export default function Entregas() {
  const router = useRouter();
  const [orders, setOrders] = useState<AssignedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("Error al cargar órdenes:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAccept = async (id: string) => {
  try {
    await acceptOrder(id);                  // cambia en el back a "En camino"
    sessionStorage.setItem("activeOrderId", id);
    router.push("/delivery");               // redirige al dashboard
  } catch (err) {
    console.error(err);
  }
};

  if (loading) {
    return <p className="p-4">Cargando entregas…</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 relative shadow-sm">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-gray-500" />
        </button>
        <h1 className="text-center text-lg font-semibold">Entregas por realizar</h1>
      </header>

      <main className="flex-1 overflow-auto p-4 space-y-4">
        <div className="space-y-4 max-w-md mx-auto">
          {orders.map((o) => (
            <Card key={o.id} className="border border-yellow-400 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Pedido #{o.id}</p>
                  <p className="text-xs text-gray-500">
                    Restaurante {o.restaurantName}
                  </p>
                  <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>Cliente {o.clientAddress}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
                    <DollarSign size={16} />
                    <span>
                      ${o.total.toFixed(2)}{" "}
                      {o.tip > 0 && <>+ ${o.tip.toFixed(2)} de propina</>}
                    </span>
                  </div>
                </div>

                {o.canAccept && (
                  <Button size="sm" variant="primary" onClick={() => handleAccept(o.id)}>
                    Aceptar
                  </Button>
                )}
              </div>

              <button
                className="mt-3 text-sm text-gray-500 flex items-center space-x-1"
                onClick={() => router.push(`/delivery/entregas/${o.id}`)}
              >
                <span>Ver detalles</span>
                <ChevronRight size={16} />
              </button>
            </Card>
          ))}

          {orders.length === 0 && (
            <p className="text-center text-gray-500">No tienes entregas pendientes.</p>
          )}
        </div>
      </main>
    </div>
  );
}
