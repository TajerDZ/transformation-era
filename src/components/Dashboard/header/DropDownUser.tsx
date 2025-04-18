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
import { dir, t } from "i18next";
import { useNavigate } from "react-router-dom";

function DropDownUser() {
  const user = {
    name: "حمزة هاشم",
    email: "user.user@gmail.com",
  };
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
                src="https://s3-alpha-sig.figma.com/img/c09d/96f4/75773c7ca6c4519f4457986d459d77cb?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fEZ94Ytr3f8HXiHK4bT-hKm~ZfUhGyTzWwK4xf5Nu~VdE6UauTru2JMA2ZxTsVmPCVHyzkh75fZiO8U4b73cocWPCI2DBScbOZyMWz~FBp4N822Iu4qDmA81dkEEtEXZLfbgjwag7P3l2w~Fp5bIeQQ3mrmzZnK3hUMAscAD5alrIzhr2xGen9rrchA0h-pVCD2w4kGZsmwIyyfox2Ugr~qF9tzlCYUb8W39CVvVkcDoEYH20qaEe-RSIo2cM4xdr4Rqawvs1vyleLxqYhZYLDkgsdrru1kMSiNrCb5yeO8ePj5j4wgdvMY1gBicoNek7EQ6KXfiHFIdiwGX7UFYTA__"
                alt="user"
                className="w-8 h-8 object-cover rounded-full"
              />
              <p>{user.name}</p>
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
