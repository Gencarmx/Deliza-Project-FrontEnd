"use client";

import BottomNav from "@/components/common/BottomNav";
import CommonHeader from "@/components/common/CommonHeader";
import InfoItemList from "@/components/common/ItemList";
import GppMaybeIcon from "@mui/icons-material/GppMaybeOutlined";
import AddCardIcon from "@mui/icons-material/AddCardOutlined";
import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import NotificationIcon from "@mui/icons-material/NotificationsOutlined";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import BugReportIcon from "@mui/icons-material/BugReportOutlined"
import ErrorIcon from "@mui/icons-material/ErrorOutline";

export default function ConfigPage() {
  return (
   <main className="min-h-screen bg-[#eae2d7] text-gray-900 p-4 pb-24 px-6">
      <CommonHeader encabezado="Configuracion"
      menuOpciones={[
        {titulo: "Notificaciones", href: "/Notificaciones"}
      ]}/>
      
      <h1>Configuraciones de cuenta</h1>
      <InfoItemList items={[
          {
            icon: <GppMaybeIcon/>,
            title: "Seguridad",
            showArrow: true,
          },
          {
            icon: <AddCardIcon style={{color: '#6EABFB'}}/>,
            title: "Metodo de pago",
            showArrow: true,
          },
          {
            icon:  <LanguageIcon/>,
            title: "Idioma",
            showArrow: false,
          },
          {
            icon: <NotificationIcon style={{color: "#F8D17C"}}/>,
            title: "Notificaciones",
            showArrow: false,
          }
          ]}/>

           <h1>Más</h1>
           <InfoItemList items={[
          {
            icon: <ArticleIcon/>,
            title: "Politicas de privacidad",
            showArrow: true,
          },
          {
            icon: <ErrorIcon style={{color: "#FF6B6B"}}/>,
            title: "Sobre nosotros",
            showArrow: true,
            href: "./SobreNosotros"
          },
          {
            icon: <BugReportIcon/>,
            title: "Reporte de errores",
            showArrow: true,
            href: "./ReporteErrores"
          }
          ]}/>
      <BottomNav/>
    </main>
  );
}