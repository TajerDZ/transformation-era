import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeartCircle from "@/assets/icons/heart-circle.png";
import TabbyLogo from "@/assets/icons/tabby_logo.png";
import MadaLogo from "@/assets/icons/mada_logo.png";
import PayLogo from "@/assets/icons/pay_logo.png";
import MasterCardLogo from "@/assets/icons/mastercard_logo.png";
import VisaLogo from "@/assets/icons/visa_logo.png";

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
type PageProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function UpgradePlan({ setStep }: PageProps) {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-center">
          {t("products.dashboard.upgrade_page.title")}
        </h1>
        <div className="flex  items-center justify-between space-y-1">
          <span
            className="flex items-center space-x-2 text-sm font-semibold text-gray-500 cursor-pointer"
            onClick={() => setStep(0)}
          >
            <Icon name="ArrowRight" size={16} />
            {t("back")}
          </span>
          <p className="text-sm font-bold text-muted-foreground/70">
            {t("products.dashboard.upgrade_page.description")}
          </p>
          <div></div>
        </div>

        <Separator
          className={cn(open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div className="flex gap-3 max-lg:flex-col">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          <div>
            <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 overflow-hidden">
              <div>
                <div className="bg-primary-1 flex justify-center items-center h-10 text-white font-semibold text-sm">
                  {t("products.dashboard.upgrade_page.current_plan")}
                </div>
                <div className="bg-[#F2F3FF] p-4 space-y-4">
                  <div className="space-y-1">
                    <h1 className="font-semibold text-[#444444]">
                      {t("products.dashboard.upgrade_page.prime_location")}
                    </h1>
                    <span className="text-secondary-5 text-2xl font-bold block">
                      1500
                      <span className="text-sm">ريال</span>
                    </span>
                    <p className="text-sm font-semibold text-[#7C7C7C]">
                      كل شركة تحتاج إلى موقع، هذه الباقة لموقع تعريفي في صفحة
                      واحدة.
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
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 overflow-hidden">
              <div>
                <div className="bg-primary-2 flex justify-center items-center h-10 text-white font-semibold text-sm">
                  {t("products.dashboard.upgrade_page.proposed_plan")}
                </div>
                <div className="bg-[#F2F3FF] p-4 space-y-4">
                  <div className="space-y-1">
                    <h1 className="font-semibold text-[#444444]">
                      {t("products.dashboard.upgrade_page.integrated_website")}
                    </h1>
                    <span className="text-secondary-5 text-2xl font-bold block">
                      4500
                      <span className="text-sm">ريال</span>
                    </span>
                    <p className="text-sm font-semibold text-[#7C7C7C]">
                      موقع متكامل عربي وانجليزي متعدد الصفحات يناسب أغلب
                      الشركات.
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
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex-1 pb-5">
          <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300">
            <div className="p-2">
              <h1 className="text-xl text-primary-2 font-bold py-2 mb-5">
                ترقية خطة الإستضافة إلى موقع متكامل
              </h1>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">
                    {t("products.dashboard.upgrade_page.choose_payment_term")}
                  </Label>
                  <div className="relative">
                    <Input placeholder="Enter the code" className="pe-14" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">
                    {t("products.dialog.renewal.code_lable")}
                  </Label>
                  <div className="relative">
                    <Input placeholder="Enter the code" className="pe-14" />
                    <div className="flex absolute top-1/2 -translate-y-1/2 end-2 items-center gap-2">
                      <Separator
                        orientation="vertical"
                        className="!w-[2px] !h-6 bg-muted-foreground/30"
                      />
                      <p className="text-primary-1 text-sm cursor-pointer">
                        {t("status_item.active")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <Card className="p-0 max-md:p-0 shadow-none rounded-md flex-row justify-between bg-[#E0FFFA]">
                    <Table>
                      <TableBody>
                        <TableRow className="border-b-0">
                          <TableCell className="text-start text-muted-foreground w-1/2">
                            {t("products.dialog.renewal.expiration_date")}
                          </TableCell>
                          <TableCell className="text-end text-secondary-1 w-1/2">
                            2026-04-04
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-b-0">
                          <TableCell className="text-start text-muted-foreground w-1/2">
                            {t("products.dialog.renewal.subtotal")}
                          </TableCell>
                          <TableCell className="text-end text-secondary-1 w-1/2">
                            4500 ريال
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-b-0">
                          <TableCell className="text-start text-muted-foreground w-1/2">
                            {t("products.dialog.renewal.discount")}
                          </TableCell>
                          <TableCell className="text-end text-secondary-1 w-1/2">
                            0.000 ر.ع
                          </TableCell>
                        </TableRow>
                        <TableRow className="">
                          <TableCell className="text-start text-muted-foreground w-1/2">
                            {t("products.dialog.renewal.tax")}
                          </TableCell>
                          <TableCell className="text-end text-secondary-1 w-1/2">
                            15.00 ر.ع
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-b-0">
                          <TableCell className="text-start text-secondary-1 w-1/2">
                            {t("products.dialog.renewal.total")}
                          </TableCell>
                          <TableCell className="text-end text-secondary-1 w-1/2">
                            175.5 ر.ع
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>
                <Button className="w-full bg-button rounded-full">
                  {t("products.dashboard.upgrade_page.checkout_button")}
                </Button>
                <div className="relative mt-4 ">
                  <span className="bg-white absolute top-1/2 -translate-y-1/2 start-1/2 text-nowrap translate-x-1/2 text-muted-foreground text-sm font-medium px-2">
                    {t("products.dashboard.upgrade_page.pay_through")}
                  </span>
                  <Separator />
                </div>
                <div className="flex items-center justify-between gap-3 py-2">
                  <img src={TabbyLogo} alt="" />
                  <img src={MadaLogo} alt="" />
                  <img src={PayLogo} alt="" />
                  <img src={MasterCardLogo} alt="" />
                  <img src={VisaLogo} alt="" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default UpgradePlan;
