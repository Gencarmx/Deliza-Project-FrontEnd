"use client";

import { useState } from "react";
import MenuButton from "./MenuButton";
import Sidebar, { MenuItem } from "./SideBar";
import { HiOutlineLogout } from "react-icons/hi";

type ProfileHeaderProps = {
  menuOpciones: MenuItem[];
};

export default function ProfileHeader({ menuOpciones }: ProfileHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative bg-[#efd191] rounded-b-3xl px-4 pt-4 pb-8 text-center">
        {/* Botón menú */}
        <div className="relative flex items-center justify-between mb-4">
        <MenuButton onClick={() => setIsSidebarOpen(true)} />
        </div>
        {/* Botón derecho (acción, logout, cámara, etc.) */}
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">
          <HiOutlineLogout className="text-black text-lg" />
        </button>

        {/* Título */}
        <h2 className="text-gray-800 font-medium mb-4">Mi perfil</h2>

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center">
          <svg
            className="w-12 h-12 text-[#e0662b]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuOpciones={menuOpciones}
      />
    </>
  );
}
