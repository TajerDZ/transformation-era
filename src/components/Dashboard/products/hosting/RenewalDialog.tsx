import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/Icon";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { OrderGraphql } from "@/types/orders";
import { t } from "i18next";
import { useState } from "react";

type PropsDialog = {
  isOpen: boolean;
  item: OrderGraphql;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function RenewalDialog({ isOpen, onOpen, item }: PropsDialog) {
  const [selectPrice, setSelectPrice] = useState<string>("");
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpen(open);
      }}
    >
      <DialogContent close={false} className="!max-w-2xl">
        <span
          className="text-red-500 border border-red-500 rounded-full h-6 w-6 flex justify-center items-center absolute end-2 top-5 cursor-pointer"
          onClick={() => onOpen(false)}
        >
          <Icon name="X" size={16} />
        </span>
        <DialogHeader>
          <DialogTitle>
            <p className="text-secondary-2">
              {t("products.dialog.renewal.title")} -{" "}
              <span className="font-normal">notchpal.com</span>
            </p>
          </DialogTitle>
          <DialogDescription>
            {t("products.dialog.renewal.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Card className="p-0 max-md:p-0 shadow-none rounded-md">
              <Table>
                <TableHeader className="divide-x border-b">
                  <TableHead className="text-center w-1/2 text-muted-foreground">
                    {t("products.dialog.renewal.subscription_number")}
                  </TableHead>
                  <TableHead className="text-center w-1/2 text-muted-foreground">
                    {t("products.dialog.renewal.service")}
                  </TableHead>
                </TableHeader>
                <TableBody>
                  <TableRow className="divide-x">
                    <TableCell className="text-center text-secondary-1">
                      {item?.id}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1">
                      {item?.product?.name}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
          <div className="space-y-2">
            {item?.plan.prices.map((price) => (
              <Card
                className={cn(
                  "p-2 max-md:p-2 shadow-none flex-row justify-between rounded-md hover:bg-primary-1/10 cursor-pointer",
                  selectPrice == price.id && "border-primary-2"
                )}
                onClick={() => setSelectPrice(price.id)}
                key={price.id}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "border border-gray-300 h-5 w-5 flex justify-center items-center rounded-full",
                      selectPrice == price.id && "border-primary-2"
                    )}
                  >
                    {selectPrice == price.id && (
                      <span className="bg-primary-2 w-3 h-3 block rounded-full" />
                    )}
                  </span>
                  <p>{price.key}</p>
                </div>
                <Badge className="text-[10px] bg-primary-1">
                  {price.value} ريال
                </Badge>
              </Card>
            ))}
          </div>
          {/* <div className="space-y-2">
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
          </div> */}
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
        </div>
        <DialogFooter>
          <div className="flex items-center gap-2 w-full">
            <Button className="bg-button rounded-full w-1/2">
              {t("products.dialog.renewal.save")}
            </Button>
            <Button variant="outline" className=" rounded-full w-1/2">
              {t("products.dialog.renewal.cancel")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenewalDialog;
