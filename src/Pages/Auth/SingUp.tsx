import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.png";
import Facebook from "@/assets/facebook.png";
import Google from "@/assets/google.png";
import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function SingUp() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FCFEFF]">
      <div className="absolute top-5 end-10 max-sm:hidden">
        <img src={Logo} alt="Logo" className="w-16 mx-auto mb-4" />
      </div>
      <Card className="w-[500px] p-6 shadow-none">
        <CardHeader>
          <img src={Logo} alt="Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-primary-navy text-center text-2xl font-bold">
            {t("register.title")}
          </h1>
          <p className="text-center text-gray-500">{t("register.subtitle")}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0">
          <form className="w-full flex flex-col gap-4">
            <div className="space-y-2">
              <Label>{t("register.name")}</Label>
              <Input
                type="text"
                placeholder={t("register.name_placeholder")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{t("register.phone")}</Label>
              <Input
                type="text"
                placeholder={t("register.phone_placeholder")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{t("register.email")}</Label>
              <Input
                type="email"
                placeholder={t("register.email_placeholder")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{t("register.password")}</Label>
              <Input type="password" placeholder="******" required />
            </div>
            <div className="space-y-2">
              <Label>{t("register.confirm_password")}</Label>
              <Input type="password" placeholder="******" required />
            </div>

            <Button type="submit" className="w-full mt-4 bg-button">
              {t("register.login")}
            </Button>

            <p className="text-center text-sm text-gray-500 ">
              {t("register.have_account")}
              <Link
                to="/"
                className="text-primary-navy font-bold hover:underline ms-1"
              >
                {t("register.login")}
              </Link>
            </p>

            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
              <Button
                variant="outline"
                className="w-full text-muted-foreground"
              >
                <img src={Google} alt="Google" className="w-4 h-4 me-2" />
                {t("login.google")}
              </Button>
              <Button
                variant="outline"
                className="w-full text-muted-foreground"
              >
                <img src={Facebook} alt="Facebook" className="w-4 h-4 me-2" />
                {t("login.facebook")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingUp;
