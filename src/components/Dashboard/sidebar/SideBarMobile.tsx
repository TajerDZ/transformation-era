import Icon from "@/components/ui/Icon";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Item({
  item,
}: {
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
        "w-12 justify-center",
        isActive && "bg-primary-2/10 text-primary-2"
      )}
    >
      <Icon name={item.icon} size={20} />
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

function SideBarMobile() {
  return (
    <div
      className="relative bg-background h-18 flex items-center "
      style={{
        boxShadow:
          i18n.language == "ar"
            ? "-11px 0px 20px 0px #79797914"
            : "rgba(121, 121, 121, 0.08) 11px 0 20px 0px",
        zIndex: 1,
      }}
    >
      <div className="w-full">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between px-5">
            {item.group.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBarMobile;
