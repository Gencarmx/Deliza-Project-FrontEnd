export default function Reviews() {
  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">Reseñas</p>
        <p className="text-sm text-yellow-600">Ver reseñas</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-lg font-bold">4.9</p>
        <p className="text-sm text-gray-500">Total 20 Reseñas</p>
      </div>
    </div>
  );
}
