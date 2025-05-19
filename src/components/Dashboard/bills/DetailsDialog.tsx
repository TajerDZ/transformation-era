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

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { InvoiceGraphql } from "@/types/orders";
import { formatPrice } from "@/utils/formatters";
import { format } from "date-fns";
import { t } from "i18next";

type PropsDialog = {
  isOpen: boolean;
  item: InvoiceGraphql;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function DetailsDialog({ isOpen, onOpen, item }: PropsDialog) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = item.file;
    link.target = "_blank";
    link.setAttribute("download", "my-document.pdf"); // optional filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
              {t("bills.details.title")} -{" "}
              <span className="font-normal">{item?.numberInvoice}</span>
            </p>
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 justify-between">
              <span>{t("products.dialog.renewal.description")}</span>
              {item.file && (
                <Button
                  className="bg-button rounded-full"
                  onClick={handleDownload}
                >
                  <Icon name="Download" size={16} className="me-2" />
                  {t("bills.details.save_bill")}
                </Button>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <Card className="p-0 max-md:p-0 shadow-none rounded-md">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-start text-secondary-1">
                        {t("bills.table.bill_number")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1">
                        {item.numberInvoice}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-start text-secondary-1">
                        {t("bills.table.bill_date")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1">
                        {item.date ? format(item.date, "dd-MM-yyyy") : "-"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>

            <div className="">
              <Card className="p-0 max-md:p-0 shadow-none rounded-md flex-row justify-between bg-[#E0FFFA]">
                <Table>
                  <TableBody>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2">
                        {t("bills.details.subtotal")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {formatPrice(
                          item.totalPrice - (15 * item.totalPrice) / 100
                        )}{" "}
                        ريال
                      </TableCell>
                    </TableRow>

                    <TableRow className="">
                      <TableCell className="text-start text-muted-foreground w-1/2">
                        {t("bills.details.tax")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {formatPrice((15 * item.totalPrice) / 100)} ريال
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-secondary-1 w-1/2">
                        {t("bills.details.total")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {formatPrice(item.totalPrice)} ريال
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-2 w-full">
              {/* <Button
                type="button"
                variant="outline"
                className=" rounded-full w-full bg-button text-white"
              >
                <Icon name="Download" size={16} className="me-2" />
                {t("bills.details.save_bill")}
              </Button> */}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DetailsDialog;
