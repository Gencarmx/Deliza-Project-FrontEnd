export default function ProductInfo() {
  return (
    <div>
      <h2 className="font-bold text-xl">Panuchos de pollo</h2>
      <p className="font-semibold">$10</p>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          <p className="text-gray-600">Tipo de comida</p>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">
            Mexicana
          </span>
        </div>
        <div>
          <p className="text-gray-600">Tipo de pedido</p>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">
            Recoger
          </span>
        </div>
        <div>
          <p className="text-gray-600">
            ⭐ 4.9 <span className="text-gray-400">(10 Reseñas)</span>
          </p>
        </div>
        <div>
          <p className="text-gray-800 font-medium mt-2">Descripción</p>
          <p className="text-sm text-gray-700">
            Clásicos panuchos yucatecos, acompañados de pollo y otros
            ingredientes que forman un suculento platillo clásico para disfrutar
            en una gran comida (no se me ocurrió algo mejor)
          </p>
        </div>
      </div>
    </div>
  );
}
