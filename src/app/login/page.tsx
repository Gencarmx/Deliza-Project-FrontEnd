import React from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Iniciar Sesión",
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}