import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";

function ChangePassword() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("profile.password.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.password.title")}</li>
        </ul>
        <Separator
          className={cn(open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div>
        <Card>
          
        </Card>
      </div>
    </div>
  );
}

export default ChangePassword;
