import { HiOutlineMenu } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";

export default function ProductHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <HiOutlineMenu className="text-2xl" />
      <h1 className="font-semibold text-lg">Detalles del producto</h1>
      <button className="text-yellow-600 font-semibold text-sm flex items-center gap-1">
        EDITAR <FiEdit2 />
      </button>
    </div>
  );
}
