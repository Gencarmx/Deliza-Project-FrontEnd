"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

export default function Notificaciones() {
  const router = useRouter();
  const [appNotifs, setAppNotifs] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(false);
  const [appUpdates, setAppUpdates] = useState(true);
  const [pwChange, setPwChange] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-100 p-4 relative">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-center text-lg font-semibold text-black">Notificaciones</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4 space-y-6">
        {/* Permitir notificaciones */}
        <section>
          <p className="text-sm font-medium text-blue-900 mb-2 max-w-md mx-auto text-left">
            Permitir notificaciones
          </p>
          <div className="bg-white border border-gray-300 rounded-lg p-3 max-w-md mx-auto flex items-center justify-between">
            <span className="text-xs text-black">
              Recibe notificaciones de la aplicación
            </span>
            <ToggleSwitch
              checked={appNotifs}
              onChange={() => setAppNotifs(prev => !prev)}
            />
          </div>
        </section>

        {/* Actualizaciones de pedidos */}
        <section>
          <p className="text-sm font-medium text-blue-900 mb-2 max-w-md mx-auto text-left">
            Actualizaciones de pedidos
          </p>
          <div className="bg-white border border-gray-300 rounded-lg p-3 max-w-md mx-auto flex items-center justify-between">
            <span className="text-xs text-black">
              Recibe notificaciones cuando sean reasignados
            </span>
            <ToggleSwitch
              checked={orderUpdates}
              onChange={() => setOrderUpdates(prev => !prev)}
            />
          </div>
        </section>

        {/* Actualizaciones de aplicación */}
        <section>
          <p className="text-sm font-medium text-blue-900 mb-2 max-w-md mx-auto text-left">
            Actualizaciones de aplicación
          </p>
          <div className="bg-white border border-gray-300 rounded-lg p-3 max-w-md mx-auto flex items-center justify-between">
            <span className="text-xs text-black">
              Recibe notificaciones sobre actualizaciones
            </span>
            <ToggleSwitch
              checked={appUpdates}
              onChange={() => setAppUpdates(prev => !prev)}
            />
          </div>
        </section>

        {/* Notificar cambio de contraseña */}
        <section>
          <p className="text-sm font-medium text-blue-900 mb-2 max-w-md mx-auto text-left">
            Notificar cambio de contraseña
          </p>
          <div className="bg-white border border-gray-300 rounded-lg p-3 max-w-md mx-auto flex items-center justify-between">
            <span className="text-xs text-black">
              Recibe notificaciones cuando se cambie la contraseña
            </span>
            <ToggleSwitch
              checked={pwChange}
              onChange={() => setPwChange(prev => !prev)}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
