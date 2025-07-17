type encabezadoProps ={
  encabezado: string;
  ubicacion: string;
}

export default function DashboardHeader({encabezado, ubicacion}: encabezadoProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <p className="text-xs text-yellow-600 font-semibold">{encabezado}</p>
        <p className="text-sm font-medium">{ubicacion}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border">
        <span className="text-lg">👤</span>
      </div>
    </div>
  );
}
