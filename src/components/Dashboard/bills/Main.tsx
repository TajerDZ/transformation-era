import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
function Main() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("products.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("products.title")}</li>
        </ul>
        <Separator
          className={cn(open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div>
        <Card
          className={cn(
            "shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300",
            open && "max-lg:!w-[100%]"
          )}
          style={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        >
          <Table className="border border-x-0 border-b-0">
            <TableHeader className="border-b  ">
              <TableHead className="text-muted-foreground text-center">
                {t("bills.table.bill_number")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("bills.table.bill_date")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("bills.table.service")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("bills.table.due_date")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("bills.table.bill_amount")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center"></TableHead>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">INV-20250401</TableCell>
                <TableCell className="text-center">01-04-2025</TableCell>
                <TableCell className="text-center">
                  استضافة مشتركة - سنة
                </TableCell>
                <TableCell className="text-center">01-04-2026</TableCell>
                <TableCell className="text-center">4500 ريال</TableCell>
                <TableCell className="text-center">
                  <Button variant="secondary" className="text-primary-2">
                    {t("bills.table.edit_bill")}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export default Main;
