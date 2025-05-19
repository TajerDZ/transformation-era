import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { t } from "i18next";
import { useEffect, useState } from "react";
type Props = {
  setFilter: React.Dispatch<React.SetStateAction<any[]>>;
};
function AutocompleteFilter({ setFilter }: Props) {
  const [search, setSearch] = useState<string>();
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const filter = [
      ...(price
        ? [{ field: "totalPrice", operator: "$eq", value: price }]
        : []),

      ...(search
        ? [{ field: "numberInvoice", operator: "$eq", value: search }]
        : []),
    ];
    if (filter) {
      setFilter(filter);
    }
  }, [price, search]);
  return (
    <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
      <div>
        <Popover modal={false}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className="rounded-full bg-primary-2/20 text-primary-2"
            >
              <Icon name="Funnel" size={16} />
              {t("bills.filter")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-4">
            <div className="space-y-4">
              <h1 className="font-bold">{t("bills.filter_results")}</h1>
              <div className="space-y-4 ">
                <div className="space-y-2">
                  <Label>{t("bills.table.bill_amount")}</Label>
                  <Input
                    type="text"
                    placeholder={t("bills.table.bill_amount")}
                    className="bg-input"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    value={price || ""}
                  />
                </div>
                <div className="flex items-center  gap-2">
                  <Button
                    variant="outline"
                    className="text-primary-2 border-primary-2 rounded-full w-full"
                    onClick={() => {
                      setPrice(null);
                      setFilter([]);
                    }}
                  >
                    {t("bills.clear_filter")}
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="بحث"
          className="max-w-sm bg-card ps-10 rounded-full w-[400px] max-sm:w-[300px]"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <span className="absolute top-1/2 start-3 transform -translate-y-1/2">
          <Icon name="Search" size={16} />
        </span>
      </div>
    </div>
  );
}

export default AutocompleteFilter;
