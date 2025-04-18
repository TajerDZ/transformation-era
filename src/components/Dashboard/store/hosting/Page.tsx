import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function Page() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("store.hosting.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.hosting.title")}</li>
        </ul>
        <Separator
          className={cn(open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-lg:gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <Card
            className="shadow-none rounded-2xl p-4 max-md:p-4 bg-[#F2F3FF]"
            key={index}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="font-semibold text-[#444444]">خطة التقدم</h1>
                <span className="text-secondary-5 text-2xl font-bold block">
                  1500
                  <span className="text-sm">ريال/ سنويًا</span>
                </span>
                <p className="text-sm font-semibold text-[#7C7C7C] mt-4">
                  حزمة اقتصادية مثالية للمشاريع الصغيرة
                </p>
              </div>
              <div>
                <Table>
                  <TableBody>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        الرام العشوائي
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        500mb
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        الهارد ديسك
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        unlimited
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        الترافيك
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        MHZ 1000
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        عدد الملفات
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        100000
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        عدد الإتصالات في اللحظة
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        100
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        عدد الملفات
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        100
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        عدد الإيميلات
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        غير محدد
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        عدد قواعد البيانات
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        1
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        شهادة ssl
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        غير متوفر
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        access ssl
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        غير متوفر
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2 font-medium">
                        دعم فني 24 ساعة
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2 font-medium">
                        مجاناً
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <Button
                variant="outline"
                className="border-secondary-2 text-secondary-2 bg-transparent hover:bg-secondary-2 hover:text-white transition-all duration-200 ease-in-out w-full rounded-full"
              >
                {t("store.hosting.subscribe_now")}{" "}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
