import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.png";
import Facebook from "@/assets/facebook.png";
import Google from "@/assets/google.png";
import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/dashboard");
  };
  return (
    <div className="h-screen flex items-center justify-center bg-[#FCFEFF]">
      <div className="absolute top-5 end-10 max-sm:hidden">
        <img src={Logo} alt="Logo" className="w-16 mx-auto mb-4" />
      </div>
      <Card className="w-[500px] p-6 shadow-none">
        <CardHeader>
          <img src={Logo} alt="Logo" className="w-24 mx-auto mb-4" />
          <h1 className="text-primary-navy text-center text-2xl font-bold">
            {t("login.title")}
          </h1>
          <p className="text-center text-gray-500">{t("login.subtitle")}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>{t("login.email")}</Label>
              <Input
                type="email"
                placeholder={t("login.email_placeholder")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                {t("login.password")}
                <Link
                  to="/forget-password"
                  className="text-sm  hover:underline text-muted-foreground"
                >
                  {t("login.forgot_password")}
                </Link>
              </Label>
              <Input type="password" placeholder="******" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label htmlFor="remember" className="text-sm">
                {t("login.remember_me")}
              </Label>
            </div>
            <Button type="submit" className="w-full mt-4 bg-button">
              {t("login.login")}
            </Button>

            <p className="text-center text-sm text-gray-500 ">
              {t("login.no_account")}
              <Link
                to="/signup"
                className="text-primary-navy font-bold hover:underline ms-1 "
              >
                {t("login.register")}
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

export default Login;
