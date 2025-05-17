import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { t } from "i18next";
import Database from "@/assets/icons/database.png";
import Domains from "@/assets/icons/domains.png";
import LandingPag from "@/assets/icons/landing-page.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/Icon";
import { useContext, useState } from "react";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import RenewalDialog from "./hosting/RenewalDialog";
import { Link } from "react-router-dom";
import { OrderGraphql } from "@/types/orders";
import { AllOrderClient_QUERY } from "@/graphql/queries/orders/AllOrderClient";
import { useQuery } from "@apollo/client";
import useStore from "@/store/useStore";
import { formatDate } from "@/utils/formatters";
import UpgradePlanDialog from "./hosting/upgrade/UpgradePlan";
import TableSkeleton from "@/components/ui/tableSkeleton";

function Main() {
  const [isOpenRenewal, setIsOpenRenewal] = useState(false);
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false);
  const [selectedItemRenewal, setSelectedItemRenewal] =
    useState<OrderGraphql | null>(null);
  const [itemsHosting_plan, setItemsHosting_plan] = useState<OrderGraphql[]>(
    []
  );
  const [itemsDomains, setItemsDomains] = useState<OrderGraphql[]>([]);
  const [itemsProducts_services, setItemsProducts_services] = useState<
    OrderGraphql[]
  >([]);
  const idUser = useStore((state: any) => state.idUser);
  const { loading } = useQuery(AllOrderClient_QUERY, {
    fetchPolicy: "network-only",
    variables: { idUser: idUser },
    onCompleted: ({ allOrderClient: { data } }) => {
      if (data.length > 0) {
        const hosting_plan = data.filter(
          (item: OrderGraphql) => item.section === "hosting_plan"
        );
        const domains = data.filter(
          (item: OrderGraphql) => item.section === "domains"
        );
        const products_services = data.filter(
          (item: OrderGraphql) => item.section === "products_services"
        );
        setItemsHosting_plan(hosting_plan);
        setItemsDomains(domains);
        setItemsProducts_services(products_services);
      }
    },
  });

  const handleRenewal = (item: OrderGraphql) => {
    setSelectedItemRenewal(item);
    setIsOpenRenewal(true);
  };

  const handleUpgrade = (item: OrderGraphql) => {
    setSelectedItemRenewal(item);
    setIsOpenUpgrade(true);
  };

  const onEdit = (data: OrderGraphql) => {
    setItemsHosting_plan((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
    setItemsDomains((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
    setItemsProducts_services((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
  };

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
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <Card
        className={cn(
          "shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 max-sm:!w-full",
          open && "max-lg:!w-[100%]"
        )}
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
          width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
        }}
      >
        <div>
          <div className="flex items-center gap-4 p-4">
            <img src={Database} alt="" />
            <h1>{t("products.table.hosting_plan")}</h1>
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
                {t("products.table.plan_name")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.expiration_date")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.status")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.movements")}
              </TableHead>
            </TableHeader>
            <TableBody>
              {itemsHosting_plan.length > 0 ? (
                itemsHosting_plan.map((item: OrderGraphql) => (
                  <TableRow className="divide-x-1" key={item.id}>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.domainName}
                    </TableCell>

                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.pricePlans?.key ?? 0}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.plan?.name}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {formatDate(item.renewalDate)}
                    </TableCell>
                    <TableCell className="text-start">
                      {item.status === "paid" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-[#E9FFF2] text-[#4CAF50]"
                        >
                          {t("products.table.paid")}
                        </Badge>
                      ) : item.status === "rejected" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-[#FFF2E9] text-[#FF6060]"
                        >
                          {t("products.table.rejected")}
                        </Badge>
                      ) : item.status === "due" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-blue-300/10 text-blue-400"
                        >
                          {t("products.table.due")}
                        </Badge>
                      ) : item.status === "pending" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-orange-300/30 text-orange-400"
                        >
                          {t("products.table.pending")}
                        </Badge>
                      ) : (
                        <Badge
                          variant="default"
                          className="text-xs bg-orange-300/30 text-orange-400"
                        >
                          {t("products.table.pending")}
                        </Badge>
                      )}
                      {/* <Badge
                    variant="default"
                    className="text-xs bg-[#FFF2E9] text-[#FF6060]"
                  >
                    {t("orders.table.inactive")}
                  </Badge> */}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {!item.updated && item.status != "pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            className="w-24 bg-primary-1 text-white rounded-full hover:bg-secondary-5"
                            onClick={() => handleRenewal(item)}
                          >
                            {t("products.table.renewal")}
                          </Button>
                          <Button
                            className="w-24 bg-secondary-2 text-white rounded-full hover:bg-secondary-1"
                            onClick={() => handleUpgrade(item)}
                          >
                            {t("products.table.promotion")}
                          </Button>
                          {item.domainName && (
                            <Button
                              asChild
                              variant="outline"
                              className="text-primary-2 border-primary-2 hover:text-secondary-1 hover:border-secondary-1"
                            >
                              <Link to={item.id}>
                                <Icon name="LayoutGrid" size={16} />
                                {t("products.table.dashboard")}
                              </Link>
                            </Button>
                          )}
                        </div>
                      ) : (
                        <span>{t("products.table.renewed")}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : loading ? (
                Array.from({ length: 2 }, (_, index) => (
                  <TableSkeleton key={index} columns={6} />
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
        </div>
      </Card>

      <Card
        className={cn(
          "shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 max-sm:!w-full",
          open && "max-lg:!w-[100%]"
        )}
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
          width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
        }}
      >
        <div>
          <div className="flex items-center gap-4 p-4">
            <img src={Domains} alt="" />
            <h1>{t("products.table.domains")}</h1>
          </div>
          <Table className="border border-x-0 border-b-0">
            <TableHeader className="border-b divide-x-1 ">
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.domain_name")}
              </TableHead>

              <TableHead className="text-muted-foreground text-center">
                {t("products.table.period")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.plan_name")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.expiration_date")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.status")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("details")}
              </TableHead>
            </TableHeader>
            <TableBody>
              {itemsDomains.length > 0 ? (
                itemsDomains.map((item: OrderGraphql) => (
                  <TableRow className="divide-x-1" key={item.id}>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.domainName}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.pricePlans?.key ?? 0}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.plan?.name}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {formatDate(item.renewalDate)}
                    </TableCell>
                    <TableCell className="text-start">
                      {item.status === "paid" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-[#E9FFF2] text-[#4CAF50]"
                        >
                          {t("products.table.paid")}
                        </Badge>
                      ) : item.status === "rejected" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-[#FFF2E9] text-[#FF6060]"
                        >
                          {t("products.table.rejected")}
                        </Badge>
                      ) : item.status === "due" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-blue-300/10 text-blue-400"
                        >
                          {t("products.table.due")}
                        </Badge>
                      ) : item.status === "pending" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-orange-300/30 text-orange-400"
                        >
                          {t("products.table.pending")}
                        </Badge>
                      ) : (
                        <Badge
                          variant="default"
                          className="text-xs bg-orange-300/30 text-orange-400"
                        >
                          {t("products.table.pending")}
                        </Badge>
                      )}
                      {/* <Badge
                    variant="default"
                    className="text-xs bg-[#FFF2E9] text-[#FF6060]"
                  >
                    {t("orders.table.inactive")}
                  </Badge> */}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {!item.updated && item.status != "pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            className="w-24 bg-primary-1 text-white rounded-full hover:bg-secondary-5"
                            onClick={() => handleRenewal(item)}
                          >
                            {t("products.table.renewal")}
                          </Button>
                          <Button
                            className="w-24 bg-secondary-2 text-white rounded-full hover:bg-secondary-1"
                            onClick={() => handleUpgrade(item)}
                          >
                            {t("products.table.promotion")}
                          </Button>
                        </div>
                      ) : (
                        <span>{t("products.table.renewed")}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : loading ? (
                Array.from({ length: 2 }, (_, index) => (
                  <TableSkeleton key={index} columns={6} />
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
        </div>
      </Card>

      <Card
        className={cn(
          "shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300 max-sm:!w-full",
          open && "max-lg:!w-[100%]"
        )}
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          overflowX: "auto",
        }}
      >
        <div>
          <div className="flex items-center gap-4 p-4">
            <img src={LandingPag} alt="" />
            <h1>{t("products.table.products&services")}</h1>
          </div>
          <Table className="border border-x-0 border-b-0">
            <TableHeader className="border-b  ">
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.product/service")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.price")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("products.table.renewal_date")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center">
                {t("status")}
              </TableHead>
              <TableHead className="text-muted-foreground text-center"></TableHead>
            </TableHeader>
            <TableBody>
              {itemsProducts_services.length > 0 ? (
                itemsProducts_services.map((item: OrderGraphql) => (
                  <TableRow className="divide-x-1" key={item.id}>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.product.name}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {item.pricePlans?.value ?? 0} ريال
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {formatDate(item.renewalDate)}
                    </TableCell>
                    <TableCell className="text-start">
                      {item.status === "paid" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-[#E9FFF2] text-[#4CAF50]"
                        >
                          {t("products.table.paid")}
                        </Badge>
                      ) : item.status === "rejected" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-[#FFF2E9] text-[#FF6060]"
                        >
                          {t("products.table.rejected")}
                        </Badge>
                      ) : item.status === "due" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-blue-300/10 text-blue-400"
                        >
                          {t("products.table.due")}
                        </Badge>
                      ) : item.status === "pending" ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-orange-300/30 text-orange-400"
                        >
                          {t("products.table.pending")}
                        </Badge>
                      ) : (
                        <Badge
                          variant="default"
                          className="text-xs bg-orange-300/30 text-orange-400"
                        >
                          {t("products.table.pending")}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-secondary-1 font-medium">
                      {!item.updated && item.status != "pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            className="w-24 bg-primary-1 text-white rounded-full hover:bg-secondary-5"
                            onClick={() => handleRenewal(item)}
                          >
                            {t("products.table.renewal")}
                          </Button>
                          <Button
                            className="w-24 bg-secondary-2 text-white rounded-full hover:bg-secondary-1"
                            onClick={() => handleUpgrade(item)}
                          >
                            {t("products.table.promotion")}
                          </Button>
                        </div>
                      ) : (
                        <span>{t("products.table.renewed")}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : loading ? (
                Array.from({ length: 2 }, (_, index) => (
                  <TableSkeleton key={index} columns={4} />
                ))
              ) : (
                <TableRow className="h-32">
                  <TableCell colSpan={5} className="text-center ">
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
        </div>
      </Card>

      {isOpenRenewal && selectedItemRenewal && (
        <RenewalDialog
          isOpen={isOpenRenewal}
          onOpen={setIsOpenRenewal}
          item={selectedItemRenewal}
          onEdit={onEdit}
        />
      )}

      {isOpenUpgrade && selectedItemRenewal && (
        <UpgradePlanDialog
          isOpen={isOpenUpgrade}
          onOpen={setIsOpenUpgrade}
          item={selectedItemRenewal}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}

export default Main;
