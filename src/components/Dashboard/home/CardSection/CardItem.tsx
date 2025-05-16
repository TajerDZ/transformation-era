import { Card } from "@/components/ui/card";
import { t } from "i18next";
import { Button } from "@/components/ui/button";
function CardItem({
  item,
}: {
  item: {
    title: string;
    icon: string;
    count: number;
  };
}) {
  return (
    <Card className="bg-card-1 p-0 ">
      <div className="flex flex-col  gap-4 p-4">
        <div className="flex gap-2 justify-start items-center">
          <span className="bg-white p-2 rounded-full h-14 w-14 flex justify-center items-center">
            <img src={item.icon} alt="Icon" />
          </span>
          <h1 className="text-white font-bold text-lg ml-2">{t(item.title)}</h1>
        </div>
        <h1 className="text-white font-bold text-2xl">{item.count}</h1>
        <Button className="bg-white text-secondary-2 font-semibold rounded-full px-10 py-2 hover:bg-secondary-2 hover:text-white transition duration-300 ease-in-out">
          {t("details")}
        </Button>
      </div>
    </Card>
  );
}

export default CardItem;
