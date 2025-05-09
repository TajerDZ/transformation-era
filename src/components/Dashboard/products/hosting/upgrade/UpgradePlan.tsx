import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/Icon";
import { dir, t } from "i18next";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderGraphql } from "@/types/orders";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import useDynamicForm from "@/hooks/useDynamicForm";
import { UpgradeOrder_Mutation } from "@/graphql/mutation/orders/UpgradeOrder";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addMonths, format } from "date-fns";

type PropsDialog = {
  isOpen: boolean;
  item: OrderGraphql;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: (data: OrderGraphql) => void;
};
function UpgradePlanDialog({ isOpen, onOpen, item, onEdit }: PropsDialog) {
  const [plan, setPlan] = useState<OrderGraphql["product"]["plans"][0] | null>(
    null
  );
  const [selectPrice, setSelectPrice] = useState<
    OrderGraphql["product"]["plans"][0]["prices"][0] | null
  >(null);
  const { formState, handleInputChange, isChanged } = useDynamicForm<any>({
    idOrder: item.id,
    idPlan: "",
    idPrice: "",
    dueDate: item.renewalDate,
  });
  const [upgradeOrder, { loading }] = useMutation(UpgradeOrder_Mutation);
  const handleSubmit = async () => {
    if (!isChanged || !loading) {
      await upgradeOrder({
        variables: {
          idOrder: item.id,
          idPrice: formState.idPrice,
          idPlan: formState.idPlan,
          dueDate: formState.dueDate,
        },
        onCompleted: ({ upgradeOrder: { data, status } }) => {
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
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent close={false} className="!max-w-7xl !w-full">
        <span
          className="text-red-500 border border-red-500 rounded-full h-6 w-6 flex justify-center items-center absolute end-2 top-5 cursor-pointer"
          onClick={() => onOpen(false)}
        >
          <Icon name="X" size={16} />
        </span>
        <DialogHeader>
          <DialogTitle>
            <p className="text-secondary-2">
              {t("products.dialog.upgrade.title")}
            </p>
          </DialogTitle>
          <DialogDescription>
            {t("products.dashboard.upgrade_page.description")}
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex gap-3 max-lg:flex-col"
          style={{
            maxHeight: "calc(100vh - 15rem)",
            overflowY: "auto",
          }}
        >
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
            {item?.product?.plans.map((plan) => (
              <div>
                <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 overflow-hidden">
                  <div>
                    <div className="bg-primary-1 flex justify-center items-center h-10 text-white font-semibold text-sm">
                      {plan.name}
                    </div>
                    <div className="bg-[#F2F3FF] p-4 space-y-4">
                      <div className="space-y-1">
                        <h1 className="font-semibold text-[#444444]">
                          {plan.prices[0].key}
                        </h1>
                        <span className="text-secondary-5 text-2xl font-bold block">
                          {plan.prices[0].value}{" "}
                          <span className="text-sm">ريال</span>
                        </span>
                        <p className="text-sm font-semibold text-[#7C7C7C]">
                          كل شركة تحتاج إلى موقع، هذه الباقة لموقع تعريفي في
                          صفحة واحدة.
                        </p>
                      </div>
                      <div>
                        <div>
                          <Table>
                            <TableBody>
                              {plan.details.map((detail) => (
                                <TableRow key={detail.id}>
                                  <TableCell className="text-sm font-semibold text-[#444444]">
                                    {detail.key}
                                  </TableCell>
                                  <TableCell className="text-sm font-semibold text-[#444444]">
                                    {detail.value}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="flex-1 pb-5">
            <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300">
              <div className="p-2">
                <h1 className="text-xl text-primary-2 font-bold py-2 mb-5">
                  {t("products.dialog.upgrade.title")}
                </h1>
                <div className="space-y-4">
                  <div className="space-y-2 col-span-2">
                    <Label>{t("products.dialog.upgrade.plan")}</Label>
                    <Select
                      dir={dir()}
                      value={formState.idPlan}
                      onValueChange={(value) => {
                        handleInputChange("idPlan", value);
                        setPlan(
                          item.product?.plans.find(
                            (item) => item.id === value
                          ) || null
                        );
                        handleInputChange("idPrice", "");
                        setSelectPrice(null);
                      }}
                    >
                      <SelectTrigger className="bg-input w-full border- !py-5">
                        <SelectValue
                          placeholder={t(
                            "products.dialog.upgrade.plan_placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {item?.product?.plans ?? [].length > 0
                          ? item?.product?.plans.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))
                          : null}
                      </SelectContent>
                    </Select>
                  </div>
                  {plan && plan.prices.length > 0 && (
                    <div className="space-y-2 col-span-2">
                      <Label>
                        {t("products.dialog.upgrade.price&duration")}
                      </Label>
                      <Select
                        dir={dir()}
                        value={formState.idPrice}
                        onValueChange={(value) => {
                          handleInputChange("idPrice", value);
                          const price =
                            plan?.prices.find((item) => item.id === value) ||
                            null;

                          setSelectPrice(price);

                          if (new Date(item.renewalDate) > new Date()) {
                            handleInputChange(
                              "dueDate",
                              addMonths(
                                new Date(item.renewalDate),
                                price?.duration ?? 0
                              )
                            );
                          } else {
                            handleInputChange(
                              "dueDate",
                              addMonths(new Date(), price?.duration ?? 0)
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="bg-input w-full border- !py-5">
                          <SelectValue
                            placeholder={t(
                              "products.dialog.upgrade.price&duration_placeholder"
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {plan?.prices ?? [].length > 0
                            ? plan?.prices.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.key} - {item.value} ريال
                                </SelectItem>
                              ))
                            : null}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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
                                ? (selectPrice.discount * selectPrice.value) /
                                  100
                                : "-"}{" "}
                              ر.ع
                            </TableCell>
                          </TableRow>
                          <TableRow className="">
                            <TableCell className="text-start text-muted-foreground w-1/2">
                              {t("products.dialog.renewal.tax")}
                            </TableCell>
                            <TableCell className="text-end text-secondary-1 w-1/2">
                              {selectPrice
                                ? (15 * selectPrice.value) / 100
                                : "-"}{" "}
                              ر.ع
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-b-0">
                            <TableCell className="text-start text-secondary-1 w-1/2">
                              {t("products.dialog.renewal.total")}
                            </TableCell>
                            <TableCell className="text-end text-secondary-1 w-1/2">
                              {selectPrice
                                ? selectPrice.value -
                                  (selectPrice.discount * selectPrice.value) /
                                    100 +
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
              </div>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center gap-2 w-full">
            <Button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-button rounded-full w-1/2"
              disabled={loading || !isChanged}
            >
              {t("products.dialog.upgrade.save")}

              {loading && <span className="ml-2 animate-spin">⏳</span>}
            </Button>
            <Button
              type="button"
              variant="outline"
              className=" rounded-full w-1/2"
            >
              {t("products.dialog.upgrade.cancel")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpgradePlanDialog;
