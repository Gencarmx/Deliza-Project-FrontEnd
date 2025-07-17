export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-white rounded-xl p-4 text-center shadow">
        <p className="text-2xl font-bold">02</p>
        <p className="text-xs text-gray-500 mt-1">ÓRDENES DE EJECUCIÓN</p>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow">
        <p className="text-2xl font-bold">05</p>
        <p className="text-xs text-gray-500 mt-1">SOLICITUDES COMPLETADAS</p>
      </div>
    </div>
  );
}
