import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.png";
import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import useDynamicForm from "@/hooks/useDynamicForm";
import { useState } from "react";
import { emailValidator } from "@/utils/validators";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "@/graphql/queries/Login";
import useStore from "@/store/useStore";
type FormData = {
  email: string;
  password: string;
};
function Login() {
  const [error, setError] = useState<string | null>(null);
  const updateToken = useStore((state: any) => state.updateToken);
  const updateUserData = useStore((state: any) => state.updateUserData);

  const [validationSchema] = useState({
    email: {
      active: true,
      rules: [(value: string) => emailValidator(value)],
    },
  });

  const { formState, handleInputChange, isChanged, validateForm, errors } =
    useDynamicForm<FormData>(
      {
        email: "",
        password: "",
      },
      validationSchema
    );
  const [logIn, { loading }] = useLazyQuery(LOGIN_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: ({ logIn: { token, user } }) => {
      updateToken(token);
      updateUserData(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      const networkError = error.networkError as any;
      setError(networkError?.result?.errors?.[0]?.message);
    },
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isChanged && !loading && validateForm()) {
      await logIn({
        variables: {
          content: formState,
        },
      });
    }
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
          {error && (
            <p className="text-sm text-red-500 mb-3 border border-red-500 bg-red-500/10 rounded-md p-2 flex items-center gap-2">
              <Icon name="CircleAlert" className="w-4 h-4 mr-2" />
              {t("login.error")}
            </p>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>{t("login.email")}</Label>
              <Input
                type="email"
                value={formState.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={t("login.email_placeholder")}
                error={errors.email}
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
              <Input
                type="password"
                value={formState.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="******"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label htmlFor="remember" className="text-sm">
                {t("login.remember_me")}
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full mt-4 bg-button"
              disabled={loading || !isChanged}
            >
              {t("login.login")}
              {loading && <span className="ml-2 animate-spin">⏳</span>}
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
