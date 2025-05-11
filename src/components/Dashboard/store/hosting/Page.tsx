import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProductGraphql } from "@/types/product";
import { useQuery } from "@apollo/client";
import { Product_QUERY } from "@/graphql/queries/products/Product";
import { useParams } from "react-router-dom";
import SubDialog from "./SubDialog";

function Page() {
  const { idProduct } = useParams();
  const [item, setItem] = useState<ProductGraphql>();
  const [isOpenSub, setIsOpenSub] = useState(false);
  const [selectPlan, setSelectPlan] = useState<
    ProductGraphql["plans"][0] | null
  >(null);

  /*const { loading } =*/ useQuery(Product_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      productId: idProduct,
    },
    onCompleted: ({ product: data }) => {
      setItem(data);
    },
  });
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;

  const handleSelectPlan = (plan: ProductGraphql["plans"][0]) => {
    setSelectPlan(plan);
    setIsOpenSub(true);
  };
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{item?.name}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{item?.name}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-lg:gap-5">
        {item?.plans.map((plan) => (
          <Card
            className="shadow-none rounded-2xl p-4 max-md:p-4 bg-[#F2F3FF]"
            key={plan.id}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="font-semibold text-[#444444]">{plan.name}</h1>
                <span className="text-secondary-5 text-2xl font-bold block">
                  {plan.prices[0].value}{" "}
                  <span className="text-sm">ريال/ سنويًا</span>
                </span>
                <p className="text-sm font-semibold text-[#7C7C7C] mt-4">
                  حزمة اقتصادية مثالية للمشاريع الصغيرة
                </p>
              </div>
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
              <Button
                variant="outline"
                className="border-secondary-2 text-secondary-2 bg-transparent hover:bg-secondary-2 hover:text-white transition-all duration-200 ease-in-out w-full rounded-full"
                onClick={() => handleSelectPlan(plan)}
              >
                {t("store.hosting.subscribe_now")}{" "}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {isOpenSub && selectPlan && item && (
        <SubDialog
          item={selectPlan}
          isOpen={isOpenSub}
          onOpen={setIsOpenSub}
          idProduct={item?.id}
        />
      )}
    </div>
  );
}

export default Page;
