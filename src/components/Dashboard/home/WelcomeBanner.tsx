import { Card, CardContent } from "@/components/ui/card";
import ImgBanner from "@/assets/imgBanner.png";
import { t } from "i18next";
import useStore from "@/store/useStore";
function WelcomeBanner() {
  const user = useStore((state: any) => state.userData);
  return (
    <Card className="bg-banner  p-0">
      <CardContent className="flex  justify-between items-top h-48 p-4 relative ">
        <div>
          <div>
            <h1 className="text-2xl font-bold text-primary-2">
              {t("home.welcome.title")} {user.firstname + " " + user.lastname}{" "}
              👋
            </h1>
            <p className="">{t("home.welcome.description")}</p>
          </div>
          {/* <div className="flex flex-wrap gap-2 mt-4 items-end">
            <div className="bg-white rounded-lg p-3 flex flex-col gap-1 w-44">
              <div className="flex gap-2 items-center ">
                <img src={ImgClock} alt="" />
                <p className="text-muted-foreground font-semibold">
                  {t("home.welcome.dateEnd")}:
                </p>
              </div>
              <p className="text-primary-2 font-bold">12/12/2023</p>
            </div>
            <div className="bg-white rounded-lg p-3 flex flex-col gap-1 w-44">
              <div className="flex gap-2 items-center ">
                <img src={ImgSchedule} alt="" />
                <p className="text-muted-foreground font-semibold text-nowrap">
                  {t("home.welcome.remainingDays")}:
                </p>
              </div>
              <p className="text-primary-2 font-bold">15 {t("day")}</p>
            </div>
            <Button className="bg-button text-white font-semibold rounded-full px-10 py-2">
              {t("home.welcome.renewal")}
            </Button>
          </div> */}
        </div>
        <img
          src={ImgBanner}
          alt="Welcome Banner"
          className="absolute -top-11 end-10 w-[15rem] max-lg:hidden"
        />
      </CardContent>
    </Card>
  );
}

export default WelcomeBanner;
