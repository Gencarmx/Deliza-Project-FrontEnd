"use client";

import { useState } from "react";
import MenuButton from "./MenuButton";
import Sidebar, { MenuItem } from "./SideBar";

type encabezadoProps = {
  encabezado: string;
  menuOpciones: MenuItem[];
};

export default function CommonHeader({ encabezado, menuOpciones }: encabezadoProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-between mb-4">
        <MenuButton onClick={() => setIsSidebarOpen(true)} />

        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-lg">
          {encabezado}
        </h1>
        
        <div className="w-8" />
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuOpciones={menuOpciones}
      />
    </>
  );
}
