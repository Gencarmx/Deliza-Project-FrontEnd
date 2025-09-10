"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/button';

const faqs = [
  '¿Cómo actualizo mi información bancaria?',
  '¿Qué hago si el cliente no está en la dirección?',
  '¿Cómo reporto un problema con un pedido?',
  '¿Cómo funcionan los pagos?',
  '¿Qué hago si la aplicación no funciona correctamente?'
];

export default function Ayuda() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 relative shadow-sm">
        <button onClick={() => router.back()} className="absolute top-4 left-4">
          <ArrowLeft size={24} className="text-gray-500" />
        </button>
        <h1 className="text-center text-lg font-semibold">Ayuda</h1>
      </header>

      <main className="flex-1 overflow-auto p-4 space-y-6">
        {/* Preguntas frecuentes */}
        <section>
          <p className="text-sm font-medium text-blue-900 mb-2 max-w-md mx-auto text-left">Preguntas frecuentes</p>
          <Card className="max-w-md mx-auto p-4 space-y-3">
            {faqs.map((q, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <HelpCircle size={16} className="text-gray-700 mt-1" />
                <p className="text-xs text-black">{q}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* Soporte técnico */}
        <section>
          <p className="text-sm font-medium text-blue-900 mb-2 max-w-md mx-auto text-left">Soporte técnico</p>
          <Card className="max-w-md mx-auto p-4">
            <p className="text-sm text-black">Contacto: 8888888888</p>
            <Button
              className="mt-4 bg-yellow-400 text-black w-full"
              onClick={() => window.open('tel:8888888888')}
            >
              Llamar ahora
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
}
