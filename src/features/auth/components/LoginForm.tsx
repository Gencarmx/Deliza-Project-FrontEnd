"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <h1 className="text-2xl font-semibold text text-black text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label className="text-black">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded border px-3 py-2 text-black"
        />
      </div>
      <div>
        <label className="text-black">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded border px-3 py-2 text-black"
        />
      </div>
      <Button
        type="submit"
        className="w-full py-2 bg-yellow-400 text-black hover:bg-yellow-500"
        disabled={loading}
      >
        {loading ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
        <p className="text-sm text-center text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-yellow-500 hover:underline">
            Regístrate
            </a>
        </p>
      </Card>
    </div>
  );
}