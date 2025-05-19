import { Card } from "@/components/ui/card";
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
import Icon from "@/components/ui/Icon";
import { InvoiceGraphql } from "@/types/orders";
import TableSkeleton from "@/components/ui/tableSkeleton";
import { format } from "date-fns";
type PropsTableContent = {
  handleDetails: (item: InvoiceGraphql) => void;
  items: InvoiceGraphql[];
  loading: boolean;
  handelNextPage: () => void;
  handelPrevPage: () => void;
  countItems: number;
  page: number;
  limit: number;
};
function TableContent({
  items,
  loading,
  handelNextPage,
  handelPrevPage,
  countItems,
  page,
  limit,
  handleDetails,
}: PropsTableContent) {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <Card
      className={cn(
        "shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 max-sm:!w-full",
        open && "max-lg:!w-[100%]"
      )}
      style={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
        width: open ? "calc(100vw - 19.6rem)" : "calc(100vw - 9.6rem)",
      }}
    >
      <div>
        <Table className="border border-x-0 border-b-0">
          <TableHeader className="border-b  ">
            <TableHead className="text-muted-foreground text-start">
              {t("bills.table.bill_number")}
            </TableHead>
            <TableHead className="text-muted-foreground text-center">
              {t("bills.table.bill_date")}
            </TableHead>

            <TableHead className="text-muted-foreground text-center">
              {t("bills.table.bill_amount")}
            </TableHead>
            <TableHead className="text-muted-foreground text-center"></TableHead>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-start">
                    # {item.numberInvoice}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.date ? format(item.date, "dd-MM-yyyy") : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.totalPrice} ريال
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="secondary"
                      className="text-primary-2"
                      onClick={() => handleDetails(item)}
                    >
                      {t("bills.table.edit_bill")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : loading ? (
              Array.from({ length: 6 }, (_, index) => (
                <TableSkeleton
                  key={index}
                  columns={5}
                  className="border-b border-gray-200"
                />
              ))
            ) : (
              <TableRow className="h-32">
                <TableCell colSpan={6} className="text-center ">
                  <div className="flex flex-col justify-center items-center gap-5">
                    <img src="/emptyData.svg" alt="" className="w-20" />
                    <h1 className="text-muted-foreground">
                      {t("No data available in the table")}
                    </h1>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="pb-2">
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              onClick={() => handelPrevPage()}
              disabled={page === 1 || loading}
              variant="ghost"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
            >
              <Icon name="ChevronRight" className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handelNextPage()}
              disabled={
                countItems == 0 ||
                page === Math.ceil(countItems / limit) ||
                loading
              }
              variant="ghost"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
            >
              <Icon name="ChevronLeft" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TableContent;
