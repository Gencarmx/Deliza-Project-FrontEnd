export default function IncomeChart() {
  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs text-gray-500">Ingresos totales</p>
          <p className="text-lg font-bold">$2,241</p>
        </div>
        <div className="text-xs text-gray-500">Diarios ▾</div>
      </div>
      <div className="h-24 bg-gradient-to-t from-yellow-200 to-white rounded-md flex justify-center items-center">
        <span className="text-sm bg-black text-white px-2 py-1 rounded-full">$500</span>
      </div>
      <p className="text-right text-xs mt-1 text-yellow-600">Ver detalles</p>
    </div>
  );
}
