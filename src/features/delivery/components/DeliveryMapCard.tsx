// src/app/delivery/components/DeliveryMapCard.tsx
'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/button';
import { Bike } from 'lucide-react';
import { updateOrderStatus } from '@/api/deliveryApi';

export type OrderInfo = {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  address: string;
  courierName: string;
  courierId: string;
  total: number;
  eta: string;
  status: 'Por aceptar' | 'En camino' | 'Entregado';
};

interface DeliveryMapCardProps {
  order: OrderInfo;
  onDelivered?: () => void;
}

const DeliveryMapCard: React.FC<DeliveryMapCardProps> = ({
  order,
  onDelivered,
}) => {
  const handleDeliver = async () => {
    if (order.status === 'En camino') {
      await updateOrderStatus(order.id, 'Entregado');
      onDelivered?.();
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 bg-yellow-400">
        <h3 className="text-lg font-semibold text-black">
          {order.restaurantName}
        </h3>
        <p className="text-sm text-black opacity-75">
          {order.restaurantAddress}
        </p>
      </div>

      {/* Body */}
      <div className="bg-white px-4 py-3 flex flex-col space-y-3">
        {/* Fila 1 */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-700">{order.address}</p>
            <p className="text-sm text-gray-700 font-medium">
              {order.courierName}
            </p>
            <p className="text-xs text-gray-500">{order.courierId}</p>
          </div>
          <p className="text-lg font-bold text-black">${order.total}</p>
        </div>

        {/* Fila 2 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 text-xs text-gray-700">
            <Bike size={16} />
            <span>{order.eta}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className={
              order.status === 'En camino'
                ? 'bg-black text-white border-transparent hover:bg-gray-800'
                : ''
            }
            onClick={handleDeliver}
          >
            {order.status === 'En camino' ? 'Entregar' : order.status}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DeliveryMapCard;
