'use client';

import React, { useEffect, useState } from 'react';
import DeliveryMapCard, { OrderInfo } from '../delivery/components/DeliveryMapCard';
import MapWithRoute from '@/components/MapWithRoute';
import Button from '@/components/ui/button';
import { Menu, Power, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  fetchOrderById,
  fetchProfile,
  fetchRouteForOrder,
  OrderDetails,
  Profile,
} from '@/api/deliveryApi';

export default function DashboardD() {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [routeData, setRouteData] = useState<null | {
    distancia_km: string;
    tiempo_min: string;
    ruta: { type: string; coordinates: [number, number][] };
  }>(null);
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);

  // visibilidad de elementos
  const [showCard, setShowCard] = useState(true);
  const [showRoute, setShowRoute] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);

  function mapStatus(e: OrderDetails['estatus']): OrderInfo['status'] {
    return e === 'En camino' ? 'En camino' : e;
  }

  useEffect(() => {
    const id = sessionStorage.getItem('activeOrderId');
    if (!id) {
      router.push('/delivery/entregas');
      return;
    }

    fetchOrderById(id)
      .then(async (o) => {
        const profile = await fetchProfile();
        const route = await fetchRouteForOrder(o.id);

        setRouteData(route);
        const coords = route.ruta.coordinates;
        setOrigin(coords[0]);
        setDestination(coords[coords.length - 1]);

        setOrderInfo({
          id:                 o.id,
          restaurantName:     o.restaurantName,
          restaurantAddress:  o.restaurantAddress,
          address:            o.address,
          courierName:        `${profile.nombre} ${profile.apellido_paterno}`,
          courierId:          `#${profile.id.slice(0, 6)}`,
          total:              o.total,
          eta:                `${route.tiempo_min} • ${route.distancia_km}`,
          status:             mapStatus(o.estatus),
        });
      })
      .catch(() => {
        router.push('/delivery/entregas');
      });
  }, [router]);

  const handleDelivered = () => {
    // ocultar tarjeta, ruta y marcadores al entregar
    setShowCard(false);
    setShowRoute(false);
    setShowMarkers(false);
  };

  if (!orderInfo || !origin || !destination) {
    return <p className="p-4">Cargando pedido…</p>;
  }

  return (
    <div className="relative h-screen">
      {/* Mapa */}
      <MapWithRoute
  origin={origin}
  destination={destination}
  routeGeoJSON={routeData!.ruta}
/>

      {/* Tarjeta de la orden */}
      {showCard && (
        <div className="absolute bottom-28 left-4 right-4">
          <DeliveryMapCard
            order={orderInfo}
            onDelivered={handleDelivered}
          />
        </div>
      )}

      {/* Botón menú */}
      <div className="absolute top-4 left-4">
        <Button
          variant="outline"
          onClick={() => router.push('/delivery/config')}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Botón “En camino” */}
      <div className="absolute top-4 right-24">
        <Button
          onClick={() => router.push('/delivery/enCamino')}
          className="flex items-center space-x-1 bg-yellow-500 text-black hover:bg-gray-600"
        >
          <Truck size={20} />
          <span className="text-sm font-medium">En camino</span>
        </Button>
      </div>

      {/* Botón “Entregas” */}
      <div className="absolute top-4 right-4">
        <Button
          size="sm"
          onClick={() => router.push('/delivery/entregas')}
          className="flex items-center space-x-1 bg-yellow-500 text-black hover:bg-gray-600"
        >
          <span className="text-sm font-medium">Entregas</span>
        </Button>
      </div>

      {/* Botón logout */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          shape="circle"
          size="lg"
          className="bg-gray-600 hover:bg-yellow-500"
          onClick={() => {
            localStorage.clear();
            sessionStorage.removeItem('activeOrderId');
            router.push('/');
          }}
        >
          <Power size={24} />
        </Button>
      </div>
    </div>
  );
}
