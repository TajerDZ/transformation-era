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
import UserAccount from "@/assets/icons/user-account.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CameraIcon from "@/assets/icons/Camera.png";

function Information() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("profile.info.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.info.title")}</li>
        </ul>
        <Separator
          className={cn(open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-3">
                  <img src={UserAccount} alt="padlock" />
                  <h1 className="text-lg font-bold text-primary-2">
                    {t("profile.info.title")}
                  </h1>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center justify-center gap-3 mb-10">
                  <div className="relative w-20 h-20 rounded-lg">
                    {" "}
                    <img
                      src="https://s3-alpha-sig.figma.com/img/c09d/96f4/75773c7ca6c4519f4457986d459d77cb?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dhkVEZWKrGKrKt9LbbIzYU283A0Y--xlBBRQbaX2w084h09LoMwghg3L-ap7jP~uxvTnvfEm72aA0fnWq7inNgwDGOPU9DYeKHyLigft8l473Bo97ncIdBKC-FV5XumvqpjpKrGU80hLnJwyhBBMsGrOSlASSpXRaJ6yIRt1acWR4lleFB97lyYoRGRrmHddECq~CqaAslFQZNoVRghm~az07Al8~h8Y7l79pXFWle17tuVyQLcyREeX-Oz2~2zg9qWeJsYFGpETGh4k7mc3px327lS6CvMeKsXwajIQRz7Rz08UosPE1sPefIB7d0i09uXl77Ukde~2NaUGouQrEA__"
                      alt=""
                      className="w-full h-full rounded-lg object-cover"
                    />
                    <span className="bg-primary-1 w-8 h-8 rounded-full absolute top-1/2 -translate-y-1/2 -start-3 flex items-center justify-center cursor-pointer ">
                      <img src={CameraIcon} alt="" className="w-5 " />
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("profile.info.first_name")}</Label>
                    <Input
                      placeholder={t("profile.info.first_name_placeholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("profile.info.last_name")}</Label>
                    <Input
                      placeholder={t("profile.info.last_name_placeholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("profile.info.email")}</Label>
                    <Input placeholder={t("profile.info.email_placeholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("profile.info.phone")}</Label>
                    <Input placeholder={t("profile.info.phone_placeholder")} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>{t("profile.info.language")}</Label>
                    <Select>
                      <SelectTrigger className="bg-input w-full">
                        <SelectValue
                          placeholder={t("profile.info.language_placeholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
    </div>
  );
}

export default Information;
