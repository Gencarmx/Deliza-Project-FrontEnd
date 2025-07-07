import ProductHeader from "@/components/productos/ProductHeader";
import ProductImage from "@/components/productos/ProductImage";
import ProductInfo from "@/components/productos/ProductInfo";
import BottomNav from "@/components/common/BottomNav";

export default function ProductDetailPage() {
  return (
    <main className="min-h-screen bg-[#eae2d7] text-gray-900 p-4 pb-24 px-6">
      <ProductHeader />
      <ProductImage />
      <ProductInfo />
      <BottomNav />
    </main>
  );
}
