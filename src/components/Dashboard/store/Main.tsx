import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AllProduct_QUERY } from "@/graphql/queries/products/AllProduct";
import { ProductGraphql } from "@/types/product";
import CardSkeleton from "./CardSkeleton";

function Main() {
  const [items, setItems] = useState<ProductGraphql[]>([]);

  const { loading } = useQuery(AllProduct_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: ({ allProduct: { data } }) => {
      setItems(data);
    },
  });
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("store.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("store.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 ">
          {items.map((item) => (
            <Card
              className="shadow-none rounded-lg p-2 max-md:p-2"
              key={item.id}
            >
              <div className="space-y-4 flex flex-col h-full">
                <div className="border rounded-lg p-2 flex items-center justify-center">
                  <img src={item.thumbnail} alt="" className="h-36" />
                </div>
                <div className="space-y-2 flex flex-col justify-between flex-1">
                  <h1 className="text-lg font-bold  ">{item.name}</h1>
                  <p className="text-sm  text-gray-500 ">{item.description}</p>
                  <Button className="bg-button w-full rounded-full" asChild>
                    <Link to={item.id ? `/dashboard/store/${item.id}` : "#"}>
                      {t("store.explore_now")}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 ">
          {Array.from({ length: 6 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5 h-64">
          <img src="/emptyData.svg" alt="" className="w-20" />
          <h1 className="text-muted-foreground">
            {t("No data available in the table")}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Main;
