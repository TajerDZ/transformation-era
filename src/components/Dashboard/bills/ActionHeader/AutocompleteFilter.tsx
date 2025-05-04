import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dir, t } from "i18next";

function AutocompleteFilter() {
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
                  <Label>{t("bills.table.service")}</Label>
                  <Select dir={dir()}>
                    <SelectTrigger className="bg-input w-full border-">
                      <SelectValue placeholder={t("bills.table.service")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clear" disabled>
                        {t("bills.clear_filter")}
                      </SelectItem>
                      <SelectItem value="service1">
                        استضافة مشتركة - سنة
                      </SelectItem>
                      <SelectItem value="service2">
                        استضافة مشتركة - 6 شهور
                      </SelectItem>
                      <SelectItem value="service3">
                        استضافة مشتركة - 3 شهور
                      </SelectItem>
                      <SelectItem value="service4">
                        استضافة مشتركة - شهر
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("bills.table.bill_amount")}</Label>
                  <Input
                    type="text"
                    placeholder={t("bills.table.bill_amount")}
                    className="bg-input"
                  />
                </div>
                <div className="flex items-center  gap-2">
                  <Button className="bg-button rounded-full w-1/2">
                    {t("bills.search_button")}
                  </Button>
                  <Button
                    variant="outline"
                    className="text-primary-2 border-primary-2 rounded-full w-1/2"
                  >
                    {t("bills.search_cancel")}
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
        />
        <span className="absolute top-1/2 start-3 transform -translate-y-1/2">
          <Icon name="Search" size={16} />
        </span>
      </div>
    </div>
  );
}

export default AutocompleteFilter;
