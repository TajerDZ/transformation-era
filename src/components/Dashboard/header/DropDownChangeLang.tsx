import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/lib/i18n";
import { dir, t } from "i18next";
import EnImg from "@/assets/en.png";
import ArImg from "@/assets/ar.png";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });

function DropDownChangeLang() {
  const handelChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    cookies.set("lang", i18n.language, { path: "/" });
    const htmlElement = document.querySelector("html");

    if (htmlElement) {
      htmlElement.setAttribute("dir", i18n.dir());
    }
  };
  return (
    <DropdownMenu dir={dir()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="select-none">
          <div className="cursor-pointer">
            <img
              src={i18n.language === "en" ? EnImg : ArImg}
              alt={"language flag"}
              className="w-7 h-7 object-cover"
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuItem
          className="text-primary-2"
          onClick={() => {
            handelChangeLanguage("en");
          }}
        >
          <div className="flex items-center gap-2">
            <img src={EnImg} alt={"language flag"} className="w-5 h-5" />
            {t("header.english")}
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-primary-2"
          onClick={() => {
            handelChangeLanguage("ar");
          }}
        >
          <div className="flex items-center gap-2">
            <img src={ArImg} alt={"language flag"} className="w-5 h-5" />
            {t("header.arabic")}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownChangeLang;
