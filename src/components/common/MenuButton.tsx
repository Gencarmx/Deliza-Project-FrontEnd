"use client";

import { HiOutlineMenu } from "react-icons/hi";

type MenuButtonProps = {
  onClick: () => void;
};

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button onClick={onClick} className="p-2 rounded-md hover:bg-[#e0dbd3] transition-colors">
      <HiOutlineMenu className="text-2xl text-gray-800" />
    </button>
  );
}
