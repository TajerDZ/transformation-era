import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext, useState } from "react";

import AutocompleteFilter from "./ActionHeader/AutocompleteFilter";
import TableContent from "./TableContent";
import { InvoiceGraphql } from "@/types/orders";
import { useQuery } from "@apollo/client";
import { AllInvoice_QUERY } from "@/graphql/queries/orders/AllInvoice";
import DetailsDialog from "./DetailsDialog";
function Main() {
  const [selectedItem, setSelectedItem] = useState<InvoiceGraphql | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [items, setItems] = useState<InvoiceGraphql[]>([]);
  const [page, setPage] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const limit = 10;
  const [filter, setFilter] = useState<any[]>([]);
  const { loading } = useQuery(AllInvoice_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      filter: filter,
      pagination: {
        page: page,
        limit: limit,
      },
    },
    onCompleted: ({ allInvoice: { data, total } }) => {
      setItems(data);
      setCountItems(total);
    },
  });
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;

  const handelNextPage = () => {
    if (page < Math.ceil(countItems / limit)) {
      setPage(page + 1);
    }
  };
  const handelPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDetails = (item: InvoiceGraphql) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("bills.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("bills.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div className="space-y-3">
        <AutocompleteFilter setFilter={setFilter} />
        <TableContent
          handleDetails={handleDetails}
          items={items}
          loading={loading}
          handelNextPage={handelNextPage}
          handelPrevPage={handelPrevPage}
          countItems={countItems}
          page={page}
          limit={limit}
        />
      </div>
      {isDetailsOpen && selectedItem && (
        <DetailsDialog
          isOpen={isDetailsOpen}
          onOpen={setIsDetailsOpen}
          item={selectedItem}
        />
      )}
    </div>
  );
}

export default Main;
