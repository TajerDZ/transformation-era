import Logo from "@/assets/logo.png";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { icons } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

function Item({
  open,
  item,
}: {
  open: boolean;
  item: {
    name: string;
    to: string;
    icon: keyof typeof icons;
  };
}) {
  const location = useLocation();
  const isActive =
    item.to == "/dashboard"
      ? location.pathname == "/dashboard"
      : location.pathname.includes(item.to);

  return (
    <Link
      to={item.to}
      className={cn(
        " mb-1 flex items-center justify-start gap-2  h-12   rounded-full hover:bg-gray-100 transition-all duration-300 text-gray-500 cursor-pointer",
        open ? "w-52 px-5" : "w-12 justify-center",
        isActive && "bg-primary-2/10 text-primary-2"
      )}
    >
      <Icon name={item.icon} size={20} />
      {open && <span className="font-medium ms-2">{t(item.name)}</span>}
    </Link>
  );
}

const items = [
  {
    group: [
      { name: "sidebar.dashboard", icon: "House", to: "/dashboard" },
      { name: "sidebar.products", icon: "Boxes", to: "products" },
      { name: "sidebar.store", icon: "Store", to: "store" },
      { name: "sidebar.bills", icon: "Files", to: "bills" },
    ],
    last: true,
  },
] as {
  group: {
    name: string;
    icon: keyof typeof icons;
    to: string;
  }[];
  last?: boolean;
}[];

function SideBar() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("SubSideBarContext is not provided");
  }
  const { open, setOpen } = context;
  return (
    <div
      className="relative bg-background"
      style={{
        boxShadow:
          i18n.language == "ar"
            ? "-11px 0px 20px 0px #79797914"
            : "rgba(121, 121, 121, 0.08) 11px 0 20px 0px",
        zIndex: 1,
      }}
    >
      <span className="absolute top-2 -end-3 cursor-pointer bg-white rounded-full p-1 shadow-md">
        <Icon
          name={
            open
              ? i18n.language == "ar"
                ? "ChevronRight"
                : "ChevronLeft"
              : i18n.language == "ar"
              ? "ChevronLeft"
              : "ChevronRight"
          }
          size={20}
          onClick={() => setOpen(!open)}
        />
      </span>
      <div
        className={cn(
          "flex flex-col items-center h-screen transation-all duration-300 ",
          open ? "w-64" : "w-24"
        )}
      >
        <div className="flex items-center justify-center  border-[#E4E7EC] p-2">
          <img src={Logo} alt="Logo" className="w-16 mx-auto mb-2" />
        </div>
        <div className="flex-1 flex flex-col justify-between overflow-y-auto ">
          {/* Add your sidebar content here */}
          <div>
            {items.map((item, index) => (
              <>
                <div key={index} className="mb-4 px-4">
                  {item.group.map((i, index) => (
                    <Item key={index} open={open} item={i} />
                  ))}
                </div>
                {!item.last && <Separator className="my-4" />}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
