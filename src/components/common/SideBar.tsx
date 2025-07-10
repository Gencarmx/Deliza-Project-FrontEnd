"use client";

import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";

export type MenuItem = {
  titulo: string;
  href: string;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  menuOpciones: MenuItem[];
};

export default function Sidebar({ isOpen, onClose, menuOpciones }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#eae2d7] shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Menú</h2>
        <button onClick={onClose}>
          <HiOutlineX className="text-2xl text-gray-600" />
        </button>
      </div>

      <ul className="p-4 space-y-4">
        {menuOpciones.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="block text-[#E5B752] font-medium hover:text-[#c69f3a] transition-colors"
              onClick={onClose}
            >
              {item.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
