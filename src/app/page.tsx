import DashboardHeader from "@/components/common/DashboardHeader"
import StatsCards from "@/components/common/StatsCards";
import IncomeChart from "@/components/common/IncomeChart";
import Reviews from "@/components/common/Reviews";
import PopularProducts from "@/components/common/PopularProducts";
import BottomNav from "@/components/common/BottomNav";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#eae2d7] text-gray-900 p-4 pb-24 max-w-sm mx-auto lg:max-w-full lg:px-8">
      <DashboardHeader encabezado="UBICACION" ubicacion="Izamal, Yucatan"/>
      <StatsCards />
      <IncomeChart />
      <Reviews />
      <PopularProducts />
      <BottomNav />
    </main>
  );
}
