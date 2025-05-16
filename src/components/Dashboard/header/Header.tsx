import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import DropDownUser from "./DropDownUser";
import DropDownChangeLang from "./DropDownChangeLang";
import { useContext } from "react";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";

function Header() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div
      className={cn(
        "h-18 border-b fixed top-0 left-0 right-0 bg-background z-[10] transition-all duration-300",
        open ? "sm:ps-64" : "sm:ps-24"
      )}
    >
      <div className="flex items-center justify-between h-full px-4 max-sm:px-2 pe-10">
        <div>
          <img src={Logo} alt="Logo" className="w-12 mx-auto ms-2 sm:hidden" />
          <div
            className={cn("relative max-md:hidden", open && "max-lg:hidden")}
          >
            <Input
              type="text"
              placeholder={t("header.search_placeholder")}
              className="w-[400px] max-lg:w-[300px] h-10 rounded-full border ps-10"
            />
            <span className="absolute top-1/2 start-4 -translate-y-1/2 text-primary-1">
              <Icon name="Search" size={20} />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-0">
          <DropDownChangeLang />
          <DropDownUser />
        </div>
      </div>
    </div>
  );
}

export default Header;
