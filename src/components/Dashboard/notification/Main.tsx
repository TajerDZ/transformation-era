import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
const notifications = [
  {
    title: "تنبيه بانتهاء الاشتراك",
    description:
      "ينتهي اشتراك الاستضافة الخاص بك خلال 5 أيام. يرجى التجديد لتجنب توقف موقعك.",
    time: "10:30 صباحاً",
    read: false,
  },
  {
    title: "تم تجديد الاشتراك بنجاح",
    description:
      "تم تجديد اشتراكك في خدمة الاستضافة حتى 01-04-2026. شكرًا لاستخدامك خدماتنا!",
    time: "10:30 صباحاً",
    read: false,
  },
  {
    title: "فشل في عملية الدفع",
    description:
      "لم نتمكن من معالجة دفعتك الأخيرة. يرجى التحقق من وسيلة الدفع والمحاولة مرة أخرى.",
    time: "10:30 صباحاً",
    read: true,
  },
  {
    title: "نشاط غير معتاد",
    description:
      "تم تسجيل دخول إلى حسابك من جهاز جديد. إذا لم تكن أنت من قام بذلك، يرجى تغيير كلمة المرور فورًا.",
    time: "10:30 صباحاً",
    read: true,
  },
  {
    title: "رد جديد على تذكرتك",
    description:
      "م الرد على تذكرتك رقم #45123 من قِبل فريق الدعم الفني. اضغط هنا للاطلاع على الرد.",
    time: "10:30 صباحاً",
    read: true,
  },
  {
    title: "ميزة جديدة مضافة",
    description:
      "أصبح بإمكانك الآن تفعيل CDN لحماية وتسريع موقعك من خلال لوحة التحكم مباشرة.",
    time: "10:30 صباحاً",
    read: true,
  },
  {
    title: "تنبيه بانتهاء الاشتراك",
    description:
      "ينتهي اشتراك الاستضافة الخاص بك خلال 5 أيام. يرجى التجديد لتجنب توقف موقعك.",
    time: "10:30 صباحاً",
    read: true,
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
        <h1 className="text-xl font-bold ">{t("notifications.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("notifications.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <Card className="p-4 max-md:p-4 ">
        <div className="divide-y space-y-1">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center relative p-2"
            >
              <div>
                <h1>{item.title}</h1>
                <p className="text-xs text-muted-foreground/80">
                  {item.description}
                </p>
              </div>
              <div className=" h-full">
                <p className="text-xs font-bold text-muted-foreground/90">
                  10:30 صباحاً
                </p>
              </div>
              {!item.read && (
                <span className="block w-2 h-2 bg-primary-1 rounded-full absolute top-2 end-0" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Main;
