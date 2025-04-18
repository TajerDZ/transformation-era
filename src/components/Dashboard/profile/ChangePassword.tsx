import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import PadLock from "@/assets/icons/padlock.png";

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
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-3">
                <img src={PadLock} alt="padlock" />
                <h1 className="text-lg font-bold text-primary-2">
                  {t("profile.password.title")}
                </h1>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("profile.password.new_password")}</Label>
                <Input type="password" placeholder="*********" />
              </div>
              <div className="space-y-2">
                <Label>{t("profile.password.confirm_new_password")}</Label>
                <Input type="password" placeholder="*********" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-3">
              <Button className="bg-button">
                {t("profile.password.save_changes")}
              </Button>
              <Button variant="outline" className="bg-white text-gray-500">
                {t("profile.password.cancel")}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ChangePassword;
