//src/features/delivery/components/pages/entregasEnCamino.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Order, fetchInTransitOrders } from '@/api/deliveryApi';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';

export default function EntregasEnCamino() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchInTransitOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando entregas en camino…</p>;
  if (orders.length === 0) return <p className="p-4">No hay entregas en camino</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Entregas en camino</h1>
      <ul className="space-y-2">
        {orders.map(order => (
          <li key={order.id} className="flex justify-between items-center p-4 bg-white shadow rounded">
            <div>
              <p className="font-medium">{order.restaurantName}</p>
              <p className="text-sm text-gray-600">{order.clientAddress}</p>
              <p className="text-sm text-gray-500">${order.total}</p>
            </div>
            <Button
              onClick={() => {
                sessionStorage.setItem('activeOrderId', order.id);
                router.push('/delivery'); // o ruta que uses para el mapa
              }}
            >
              Ver ruta
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
