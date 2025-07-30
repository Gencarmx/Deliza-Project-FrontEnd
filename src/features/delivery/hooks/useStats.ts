// src/features/delivery/hooks/useStats.ts
"use client";

import { useState, useEffect } from "react";
import { fetchStats, Periodo } from "@/api/deliveryApi";
import type { Stats } from "@/api/deliveryApi";

export function useStats(initialPeriodo: Periodo = "week") {
  const [periodo, setPeriodo] = useState<Periodo>(initialPeriodo);
  const [stats, setStats]     = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchStats(periodo)
      .then((data) => {
        if (isMounted) setStats(data);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setError(err.message || "Error al cargar estadísticas");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [periodo]);

  return { periodo, setPeriodo, stats, loading, error };
}
