"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/button";
import { LucideLanguages } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/features/auth/hooks/useAuth"

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("intentando login:",userName, password)
      await login(userName, password);
      console.log("Login exitoso")
      const token = localStorage.getItem("token");
      console.log("Token en localStorage:", token);

    } catch (err: unknown) {
    
    if (err instanceof Error) {
      console.error("Error en login:", err.message);
      setError("Credenciales incorrectas");
    } else {
      console.error("Error desconocido en login:", err);
      setError("Ocurrió un error inesperado");
    }
  }
};

  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Español", "Ingles", "Frances", "Alemán"];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); 
  };

  return (
    <div className="relative isolate min-h-screen">
      <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/img/fondo3.jpg"
          alt="Background"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full md:w-1/2 bg-[#dad3cc] flex items-center justify-center p-6">
        <div className="absolute top-5 left-5">
          <h1 className="text-black text-4xl font-medium">GENCAR</h1>
        </div>
        <div className="absolute top-5 right-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer border-2 border-black text-black"
          >
            <LucideLanguages className="text-black size-6"/>
            {selectedOption}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-32 z-10 ">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-black"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center h-full ">
          <Card className="w-full max-w-xl p-6 space-y-2 ">
            <h1 className="text-4xl font-semibold text text-black text-start">
              Bienvenido de vuelta!
            </h1>
            <p className="text-black pb-15 text-base">
              Hoy es un gran y nuevo dia para realizar un pedido. Comienza ya a
              ordenar tus platillos favoritos con nosotros. 
            </p>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div>
                
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-25 bg-[#976b31]"></div>
                <input
                  type="text"
                  value={userName}
                  placeholder="correo electronico"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="mt-1 block h-25 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]" 
                />
                </div>
              </div>
              <div className="pb-15">       
                <div className="flex items-center">
                  <div className=" mt-1 w-2 h-25 bg-[#976b31]"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="contraseña"
                  className="mt-1 block h-25 w-full rounded-r border border-black px-3 py-2 text-black focus:outline-none focus:bg-[#bdbdbd]"
                />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-20 py-2 text-black hover:bg-[#947955]"
                disabled={loading}
              >
                {loading ? "Ingresando…" : "Iniciar Sesión"}
              </Button>
            </form>
            <p className="text-lg text-center text-gray-600 pt-6">
               ¿No tienes cuenta?{" "} 
              <a href="/register" className="text-yellow-600 hover:underline pr-2">
                Regístrate  
              </a>
              
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
