import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/Icon";
import useStore from "@/store/useStore";
import { dir, t } from "i18next";
import { useNavigate } from "react-router-dom";

function DropDownUser() {
  const user = useStore((state: any) => state.userData);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    navigate("/");
  };
  return (
    <DropdownMenu dir={dir()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="select-none h-12">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img
                src={
                  user.thumbnail ??
                  "https://s3-alpha-sig.figma.com/img/c09d/96f4/75773c7ca6c4519f4457986d459d77cb?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dhkVEZWKrGKrKt9LbbIzYU283A0Y--xlBBRQbaX2w084h09LoMwghg3L-ap7jP~uxvTnvfEm72aA0fnWq7inNgwDGOPU9DYeKHyLigft8l473Bo97ncIdBKC-FV5XumvqpjpKrGU80hLnJwyhBBMsGrOSlASSpXRaJ6yIRt1acWR4lleFB97lyYoRGRrmHddECq~CqaAslFQZNoVRghm~az07Al8~h8Y7l79pXFWle17tuVyQLcyREeX-Oz2~2zg9qWeJsYFGpETGh4k7mc3px327lS6CvMeKsXwajIQRz7Rz08UosPE1sPefIB7d0i09uXl77Ukde~2NaUGouQrEA__"
                }
                alt="user"
                className="w-8 h-8 object-cover rounded-full"
              />
              <p>
                {user.firstname} {user.lastname}{" "}
              </p>
            </div>
            <span>
              <Icon
                name="ChevronDown"
                size={20}
                className="text-muted-foreground"
              />
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user.name}
          <p className=" text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-primary-2"
            onClick={() => navigate("/dashboard/profile")}
          >
            <Icon name="User" size={20} className="text-primary-2" />
            {t("header.profile")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-primary-2"
            onClick={() => navigate("/dashboard/profile/change-password")}
          >
            <Icon name="ListStart" size={20} className="text-primary-2" />
            {t("header.password")}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-primary-2">
            <Icon name="CircleAlert" size={20} className="text-primary-2" />
            {t("header.support")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <Button
          variant="outline"
          className="w-full mt-2 rounded-full text-primary-1"
          onClick={handleLogout}
        >
          <Icon name="LogOut" size={20} />
          {t("header.logout")}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownUser;
