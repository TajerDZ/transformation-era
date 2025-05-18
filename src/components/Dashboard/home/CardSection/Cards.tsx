import CardItem from "./CardItem";
import CloudServe from "@/assets/icons/cloud-server.png";
import WorldWide from "@/assets/icons/world-wide.png";
import Invoice from "@/assets/icons/invoice1.png";
type Props = {
  data: {
    clientStatistics: {
      numberProductsServices: number;
      numberDomains: number;
      numberHostingPlan: number;
      numberInvoices: number;
    };
  };
  loading: boolean;
};
function Cards({ data }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <CardItem
          item={{
            title: "home.services_and_products",
            icon: CloudServe,
            count: data?.clientStatistics?.numberProductsServices || 0,
            to: "/dashboard/products",
          }}
        />
        <CardItem
          item={{
            title: "home.domains",
            icon: WorldWide,
            count: data?.clientStatistics?.numberDomains || 0,
            to: "/dashboard/products",
          }}
        />
        <CardItem
          item={{
            title: "home.hostings",
            icon: WorldWide,
            count: data?.clientStatistics?.numberHostingPlan || 0,
            to: "/dashboard/products",
          }}
        />
        <CardItem
          item={{
            title: "home.bills",
            icon: Invoice,
            count: data?.clientStatistics?.numberInvoices || 0,
            to: "/dashboard/bills",
          }}
        />
      </div>
    </div>
  );
}

export default Cards;
