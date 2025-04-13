import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import DropDownUser from "./DropDownUser";
import DropDownChangeLang from "./DropDownChangeLang";

function Header() {
  return (
    <div className="h-18 border-b">
      <div className="flex items-center justify-between h-full px-4 pe-10">
        <div className="relative">
          <Input
            type="text"
            placeholder={t("header.search_placeholder")}
            className="w-[400px] max-lg:w-[300px] h-10 rounded-full border ps-10"
          />
          <span className="absolute top-1/2 start-4 -translate-y-1/2 text-primary-1">
            <Icon name="Search" size={20} />
          </span>
        </div>
        <div className="flex items-center gap-0">
          <span className="relative ">
            <span className="absolute bottom-1 start-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-xs text-white z-1" />
            <Icon name="Bell" size={26} className="text-muted-foreground" />
          </span>
          <DropDownChangeLang />
          <DropDownUser />
        </div>
      </div>
    </div>
  );
}

export default Header;
