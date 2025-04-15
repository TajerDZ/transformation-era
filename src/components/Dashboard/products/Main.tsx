import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { t } from "i18next";
import Database from "@/assets/icons/database.png";
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
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("products.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("products.title")}</li>
        </ul>
        <Separator className="" />
      </div>
      <Card className="shadow-none rounded-lg p-0 max-md:p-0">
        <div>
          <div className="flex items-center gap-4 p-4">
            <img src={Database} alt="" />
            <h1>{t("products.title")}</h1>
          </div>
          <Table className="border border-x-0 border-b-0">
            <TableHeader className="border-b divide-x-1 ">
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.hosting")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.period")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.expiration_date")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.movements")}
              </TableHead>
            </TableHeader>
            <TableBody>
              <TableRow className="divide-x-1">
                <TableCell className="text-center text-secondary-1 font-medium">
                  Plus Hosting
                </TableCell>
                <TableCell className="text-center text-secondary-1 font-medium">
                  12 شهر
                </TableCell>
                <TableCell className="text-center text-secondary-1 font-medium">
                  01-04-2025
                </TableCell>
                <TableCell className="text-center text-secondary-1 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Button className="w-24 bg-primary-1 text-white rounded-full hover:bg-secondary-5">
                      {t("products.table.renewal")}
                    </Button>
                    <Button className="w-24 bg-secondary-2 text-white rounded-full hover:bg-secondary-1">
                      {t("products.table.promotion")}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default Main;
