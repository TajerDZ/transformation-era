import CardItem from "./CardItem";
import CloudServe from "@/assets/icons/cloud-server.png";
import WorldWide from "@/assets/icons/world-wide.png";
import Invoice from "@/assets/icons/invoice1.png";
type Props = {
  data: {
    numberProductsServices: number;
    numberDomains: number;
    numberHostingPlan: number;
    numberInvoices: number;
  };
  loading: boolean;
};
function Cards({ data }: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <CardItem
          item={{
            title: "home.services_and_products",
            icon: CloudServe,
            count: data?.numberProductsServices || 0,
          }}
        />
        <CardItem
          item={{
            title: "home.domains",
            icon: WorldWide,
            count: data?.numberDomains || 0,
          }}
        />
        <CardItem
          item={{
            title: "home.bills",
            icon: Invoice,
            count: data?.numberInvoices || 0,
          }}
        />
      </div>
    </div>
  );
}

export default Cards;
