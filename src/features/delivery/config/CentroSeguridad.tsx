"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

export default function CentroSeguridad() {
  const router = useRouter();
  const [trackLocation, setTrackLocation] = useState(false);
  const [authCode, setAuthCode] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 relative shadow-sm">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-gray-500" />
        </button>
        <h1 className="text-center text-lg font-semibold">Centro de seguridad</h1>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <Card className="max-w-md mx-auto bg-white rounded-t-2xl overflow-hidden">
          <div className="p-4 space-y-6">
            {/* Contraseña */}
            <section>
              <p className="text-sm font-medium text-blue-600 mb-2">Contraseña</p>
              <input
                type="password"
                value="****************"
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
            </section>

            {/* Seguimiento de ubicación */}
            <section>
              <p className="text-sm font-medium text-blue-600 mb-2">Seguimiento de ubicación</p>
              <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between">
                <span className="text-xs text-black">Permite el seguimiento de ubicación</span>
                <ToggleSwitch
                  checked={trackLocation}
                  onChange={() => setTrackLocation(prev => !prev)}
                />
              </div>
            </section>

            {/* Autenticación por código */}
            <section>
              <p className="text-sm font-medium text-blue-600 mb-2">Autenticación por código</p>
              <div className="bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between">
                <span className="text-xs text-black">Enviar código de autenticación por SMS</span>
                <ToggleSwitch
                  checked={authCode}
                  onChange={() => setAuthCode(prev => !prev)}
                />
              </div>
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
}
