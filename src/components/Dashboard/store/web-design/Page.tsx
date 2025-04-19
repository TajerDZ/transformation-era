import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import HeartCircle from "@/assets/icons/heart-circle.png";

const planA = [
  "تصميم احترافي",
  "متجاوب لكل الأجهزة",
  "لغة واحدة",
  "صفحة واحدة",
  "SEO أساسي",
  "استضافة و نطاق",
  "ايميلات غير محدودة",
  "30 يوم دعم فني",
  "التسليم في 5-7 أيام",
];
function Page() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5 ">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("store.web_design.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.web_design.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-lg:grid-cols-2 max-lg:gap-5">
        {Array.from({ length: 3 }, (_, index) => (
          <Card
            className="shadow-none rounded-2xl p-4 max-md:p-4 bg-[#F2F3FF]"
            key={index}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="font-semibold text-[#444444]">خطة التقدم</h1>
                <span className="text-secondary-5 text-2xl font-bold block">
                  1500
                  <span className="text-sm">ريال</span>
                </span>
                <p className="text-sm font-semibold text-[#7C7C7C] mt-4">
                  كل شركة تحتاج إلى موقع، هذه الباقة لموقع تعريفي في صفحة واحدة.
                </p>
              </div>
              <div>
                <ul className="space-y-1">
                  {planA.map((item, index) => (
                    <li key={index}>
                      <div className="flex items-center space-x-2">
                        <img src={HeartCircle} alt="" />
                        <span className="text-sm font-medium text-[#444444]">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="outline"
                className="border-secondary-2 text-secondary-2 bg-transparent hover:bg-secondary-2 hover:text-white transition-all duration-200 ease-in-out w-full rounded-full"
              >
                {t("store.web_design.subscribe_now")}{" "}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
