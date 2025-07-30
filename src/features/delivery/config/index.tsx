"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import { LogOut } from "lucide-react"; 
import {ArrowLeft, User, Bell, DollarSign, ClipboardList, Shield, HelpCircle, ChevronRight,} from 'lucide-react';
import { useProfile } from "@/features/auth/hooks/useProfile";

export default function DeliveryConfigPage() {
  const { user, loading } = useProfile();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header amarillo con back, avatar y campana */}
      <header className="bg-yellow-400 p-4 flex items-center justify-between">
        {/* Botón de cerrar sesión */}
        <button onClick={handleLogout} className="p-2">
          <LogOut size={24} className="text-black" />
        </button>

        {/* Avatar y nombre */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={60} className="text-black" />
          </div>
          <p className="mt-4 text-lg font-medium text-black">
            {loading ? 'Cargando...' : `${user?.nombre} ${user?.apellido_paterno}`}
          </p>
        </div>

        {/* Icono de notificaciones → entrega */}
        <button
          onClick={() => router.push('/delivery/entregas')}
          aria-label="Ver entregas"
          className="p-2"
        >
          <Bell size={24} className="text-black hover:text-gray-800" />
        </button>
      </header>

      <main className="flex-1 overflow-auto bg-gray-100 p-4 space-y-6">
        {/* Sección Perfil */}
        <section>
          <p className="text-sm font-medium text-gray-500 mb-2">Perfil</p>
          <Card className="space-y-2">
            <button
              onClick={() => router.push('/delivery/config/datos')}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <User size={20} className="text-gray-700" />
                <div>
                  <p className="font-medium  text-black">Configurar Datos Personales</p>
                  <p className="text-xs text-gray-500">Usuario, Teléfono, Correo y más</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button
              onClick={() => router.push('/delivery/config/notificaciones')}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-gray-700" />
                <div>
                  <p className="font-medium  text-black">Notificaciones</p>
                  <p className="text-xs text-gray-500">Todo lo que pasa con DLizza</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </Card>
        </section>

        {/* Sección Entregas */}
        <section>
          <p className="text-sm font-medium text-gray-500 mb-2">Entregas</p>
          <Card className="space-y-2">
            <button
              onClick={() => router.push('/delivery/config/ganancias')}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <DollarSign size={20} className="text-gray-700" />
                <div>
                  <p className="font-medium  text-black">Ganancias</p>
                  <p className="text-xs text-gray-500">Registro de ingresos</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button
              onClick={() => router.push('/delivery/config/historial')}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <ClipboardList size={20} className="text-gray-700" />
                <div>
                  <p className="font-medium  text-black">Historial de Entregas</p>
                  <p className="text-xs text-gray-500">Registro de entregas realizadas</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </Card>
        </section>

        {/* Sección Soporte */}
        <section>
          <p className="text-sm font-medium text-gray-500 mb-2">Soporte</p>
          <Card className="space-y-2">
            <button
              onClick={() => router.push('/delivery/config/seguridad')}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
            >
              
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-gray-700" />
                <div>
                  <p className="font-medium  text-black">Centro de seguridad</p>
                  <p className="text-xs text-gray-500">Cambiar contraseña y más</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button
              onClick={() => router.push('/delivery/config/ayuda')}
              className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg"
            >
                 <div className="flex items-center space-x-3">
              <HelpCircle size={20} className="text-gray-700" />
              <div>
                <p className="font-medium  text-black">Ayuda</p>
                <p className="text-xs text-gray-500">Prefuntas frecuentes</p>
              </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </Card>
        </section>
      </main>
    </div>
  );
}
