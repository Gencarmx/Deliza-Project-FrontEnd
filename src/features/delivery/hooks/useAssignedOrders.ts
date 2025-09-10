// src/features/delivery/hooks/useAssignedOrders.ts
"use client";

import { useState, useEffect } from "react";
import {
  fetchAssignedOrders,
  updateOrderStatus,
  Order
} from "@/api/deliveryApi";

export function useAssignedOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchAssignedOrders()
      .then(data => {
        if (mounted) setOrders(data);
      })
      .catch(err => {
        console.error(err);
        if (mounted) setError(err.message || "Error cargando entregas");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const acceptOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "En camino");
      setOrders(prev =>
        prev.map(o =>
          o.id === orderId ? { ...o, estatus: "En camino" } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo aceptar el pedido");
    }
  };

  return { orders, loading, error, acceptOrder };
}
