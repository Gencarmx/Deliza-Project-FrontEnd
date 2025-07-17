"use client";

import { HiOutlineViewGrid, HiOutlineBell, HiOutlineUser, HiOutlinePlus } from "react-icons/hi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#fdf7ee] max-w-sm mx-auto px-6 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-2xl flex justify-between items-center z-50">
      <Link href="/" className="text-black hover:text-[#E5B752]">
        <HiOutlineViewGrid className="text-2xl" />
      </Link>

      <Link href="/" className="text-black hover:text-[#E5B752]">
        <HiOutlineMenuAlt2 className="text-2xl" />
      </Link>

      {/* Boton del centro */}
      <Link
        href="/"
        className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-[#E5B752] border-2 border-[#E5B752] -mt-10 shadow-md"
      >
        <HiOutlinePlus className="text-3xl" />
      </Link>

    {/* Notificaciones */}
      <Link href="/Notificaciones" className="text-black hover:text-[#E5B752]">
        <HiOutlineBell className="text-2xl" />
      </Link>

    {/* Perfil */}
      <Link href="/Perfil" className="text-black hover:text-[#E5B752]">
        <HiOutlineUser className="text-2xl" />
      </Link>
    </nav>
  );
}
