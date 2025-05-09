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
import { RenewOrder_Mutation } from "@/graphql/mutation/orders/RenewOrder";
import useDynamicForm from "@/hooks/useDynamicForm";
import { cn } from "@/lib/utils";
import { OrderGraphql } from "@/types/orders";
import { useMutation } from "@apollo/client";
import { t } from "i18next";
import { toast } from "sonner";
import { addMonths, format } from "date-fns";
import { useState } from "react";

type PropsDialog = {
  isOpen: boolean;
  item: OrderGraphql;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: (data: OrderGraphql) => void;
};
function RenewalDialog({ isOpen, onOpen, item, onEdit }: PropsDialog) {
  const [selectPrice, setSelectPrice] = useState<
    OrderGraphql["pricePlans"] | null
  >(null);
  const { formState, handleInputChange, isChanged } = useDynamicForm<any>({
    idOrder: item.id,
    idPlan: item.plan.id,
    idPrice: "",
    dueDate: item.renewalDate,
  });
  const [renewOrder, { loading }] = useMutation(RenewOrder_Mutation);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged || !loading) {
      await renewOrder({
        variables: {
          idOrder: item.id,
          idPrice: formState.idPrice,
          dueDate: formState.dueDate,
        },
        onCompleted: ({ renewOrder: { data, status } }) => {
          if (status) {
            toast("Order created successfully", {
              description: "Order created successfully",
              descriptionClassName: "!text-muted-foreground",
            });
            onEdit(data);
            onOpen(false);
          }
        },
      });
    } else {
      console.log("Form is invalid");
    }
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
              {t("products.dialog.renewal.title")} -{" "}
              <span className="font-normal">notchpal.com</span>
            </p>
          </DialogTitle>
          <DialogDescription>
            {t("products.dialog.renewal.description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                    formState.idPrice == price.id && "border-primary-2"
                  )}
                  onClick={() => {
                    handleInputChange("idPrice", price.id);
                    setSelectPrice(price);
                    if (new Date(item.renewalDate) > new Date()) {
                      handleInputChange(
                        "dueDate",
                        addMonths(new Date(item.renewalDate), price.duration)
                      );
                    } else {
                      handleInputChange(
                        "dueDate",
                        addMonths(new Date(), price.duration)
                      );
                    }
                  }}
                  key={price.id}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "border border-gray-300 h-5 w-5 flex justify-center items-center rounded-full",
                        formState.idPrice == price.id && "border-primary-2"
                      )}
                    >
                      {formState.idPrice == price.id && (
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

            <div className="">
              <Card className="p-0 max-md:p-0 shadow-none rounded-md flex-row justify-between bg-[#E0FFFA]">
                <Table>
                  <TableBody>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2">
                        {t("products.dialog.renewal.expiration_date")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {format(formState.dueDate, "dd-MM-yyyy")}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2">
                        {t("products.dialog.renewal.subtotal")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {selectPrice ? selectPrice.value : "-"} ر.ع
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-muted-foreground w-1/2">
                        {t("products.dialog.renewal.discount")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {selectPrice
                          ? (selectPrice.discount * selectPrice.value) / 100
                          : "-"}{" "}
                        ر.ع
                      </TableCell>
                    </TableRow>
                    <TableRow className="">
                      <TableCell className="text-start text-muted-foreground w-1/2">
                        {t("products.dialog.renewal.tax")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {selectPrice ? (15 * selectPrice.value) / 100 : "-"} ر.ع
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0">
                      <TableCell className="text-start text-secondary-1 w-1/2">
                        {t("products.dialog.renewal.total")}
                      </TableCell>
                      <TableCell className="text-end text-secondary-1 w-1/2">
                        {selectPrice
                          ? selectPrice.value -
                            (selectPrice.discount * selectPrice.value) / 100 +
                            (15 * selectPrice.value) / 100
                          : "-"}{" "}
                        ر.ع
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-2 w-full">
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit;
                }}
                className="bg-button rounded-full w-1/2"
                disabled={loading || !isChanged}
              >
                {t("products.dialog.renewal.save")}
                {loading && <span className="ml-2 animate-spin">⏳</span>}
              </Button>
              <Button
                type="button"
                variant="outline"
                className=" rounded-full w-1/2"
              >
                {t("products.dialog.renewal.cancel")}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenewalDialog;
