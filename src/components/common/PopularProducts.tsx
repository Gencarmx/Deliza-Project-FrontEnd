export default function PopularProducts() {
  return (
    <div className="bg-white rounded-xl p-4 mb-20 shadow">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">Productos populares de la semana</p>
        <p className="text-sm text-yellow-600">Ver todo</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-300 h-24 rounded-md" />
        <div className="bg-gray-300 h-24 rounded-md" />
      </div>
    </div>
  );
}
