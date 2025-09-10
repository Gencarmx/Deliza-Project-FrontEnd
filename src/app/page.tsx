
// src/app/page.tsx
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};

export default function RootPage() {
  // Nada más llegar, redirigimos al login
  redirect("/login");
}

