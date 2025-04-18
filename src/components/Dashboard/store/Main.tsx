import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import WebHosting from "@/assets/WebHosting-1.png";
import CloudImg from "@/assets/Cloud.png";
import VpsImg from "@/assets/OBJECTS.png";
import SiteDesign from "@/assets/OBJECTS1.png";
import StoreDesign from "@/assets/Store_design.png";
import AppDesign from "@/assets/app_desing.png";
import { Link } from "react-router-dom";

const storeItems = [
  {
    id: 1,
    title: "استضافة المواقع",
    img: WebHosting,
    description:
      "استضافة سريعة وآمنة تناسب جميع أنواع المواقع، من الشخصية إلى التجارية.",
    to: "hosting",
  },
  {
    id: 2,
    title: "إستضافة السحابية",
    img: CloudImg,
    description:
      "مرونة عالية وأداء قوي يعتمد على تقنيات الكلاود الحديثة لتشغيل مشاريعك بكفاءة.",
  },
  {
    id: 3,
    title: "استضافة VPS",
    img: VpsImg,
    description:
      "تحكم كامل بخادمك الافتراضي مع أداء مميز وسرعة فائقة لمواقعك وتطبيقاتك.",
  },
  {
    id: 4,
    title: "تصميم المواقع",
    img: SiteDesign,
    description:
      "نصمم لك موقعاً يعكس هويتك ويقدم تجربة استخدام مريحة وجذابة لزوارك.",
    to: "website-design",
  },
  {
    id: 5,
    title: "تصميم المتاجر",
    img: StoreDesign,
    description:
      "نساعدك تطلق متجرك أونلاين بتصميم عصري، مع سهولة إدارة المنتجات والدفع والشحن.",
  },
  {
    id: 6,
    title: "تصميم التطبيقات",
    img: AppDesign,
    description:
      "تحوّل فكرتك إلى تطبيق احترافي يعمل على iOS وAndroid بسهولة وسلاسة.",
  },
];

function Main() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("store.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.title")}</li>
        </ul>
        <Separator
          className={cn(open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        {storeItems.map((item) => (
          <Card className="shadow-none rounded-lg p-2 max-md:p-2" key={item.id}>
            <div className="space-y-4 flex flex-col h-full">
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src={item.img} alt="" className="h-36" />
              </div>
              <div className="space-y-2 flex flex-col justify-between flex-1">
                <h1 className="text-lg font-bold  ">{item.title}</h1>
                <p className="text-sm  text-gray-500 ">{item.description}</p>
                <Button className="bg-button w-full rounded-full" asChild>
                  <Link to={item.to ? `/dashboard/store/${item.to}` : "#"}>
                    {t("store.explore_now")}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Main;
