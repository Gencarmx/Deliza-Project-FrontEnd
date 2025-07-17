import ProfileHeader from "@/components/common/ProfileHeader";
import InfoItemList from "@/components/common/ItemList";
import BottomNav from "@/components/common/BottomNav";

export default function PerfilPage() {
  const menuOpciones = [
    { titulo: "Inicio", href: "/" },
    { titulo: "Configuración", href: "/Configuraciones" },
  ];

  return (
   <main className="min-h-screen bg-[#eae2d7] text-gray-900 p-4 pb-24 px-6">
      <ProfileHeader menuOpciones={menuOpciones}/>
      <div className="px-4 mt-6 space-y-4">
      <InfoItemList items={[
          {
            icon: ".",
            title: "Seguridad",
            showArrow: true,
          }]}/>
        </div>
      <BottomNav/>
    </main>
  );
}
