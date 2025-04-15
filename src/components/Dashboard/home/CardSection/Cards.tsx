import CardItem from "./CardItem";
import CloudServe from "@/assets/icons/cloud-server.png";
import WorldWide from "@/assets/icons/world-wide.png";
import Invoice from "@/assets/icons/invoice1.png";
function Cards() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <CardItem
          item={{
            title: "home.services_and_products",
            icon: CloudServe,
            count: 10,
          }}
        />
        <CardItem
          item={{
            title: "home.domains",
            icon: WorldWide,
            count: 20,
          }}
        />
        <CardItem
          item={{
            title: "home.bills",
            icon: Invoice,
            count: 30,
          }}
        />
      </div>
    </div>
  );
}

export default Cards;
