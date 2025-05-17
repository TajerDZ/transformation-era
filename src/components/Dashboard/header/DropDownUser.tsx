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
import { avatarText } from "@/utils/formatters";
import { dir, t } from "i18next";
import { useNavigate } from "react-router-dom";

function DropDownUser() {
  const user = useStore((state: any) => state.userData);
  const logout = useStore((state: any) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    logout();
  };
  return (
    <DropdownMenu dir={dir()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="select-none h-12">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 object-cover rounded-full bg-primary-2 flex items-center justify-center text-white font-semibold">
                {avatarText(user.firstname)}
              </span>
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
