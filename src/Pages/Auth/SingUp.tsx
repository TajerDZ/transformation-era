import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.png";
import Facebook from "@/assets/facebook.png";
import Google from "@/assets/google.png";
import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { emailValidator, requiredValidator } from "@/utils/validators";
import useDynamicForm from "@/hooks/useDynamicForm";
import { useMutation } from "@apollo/client";
import { SingUp_Mutation } from "@/graphql/mutation/users/SingUp";
import { UserInput } from "@/types/user";

function SingUp() {
  const [, setError] = useState<string | null>(null);

  const [validationSchema] = useState({
    email: {
      active: true,
      rules: [(value: string) => emailValidator(value)],
    },
    password: {
      active: true,
      rules: [(value: string) => requiredValidator(value)],
    },
    firstname: {
      active: true,
      rules: [(value: string) => requiredValidator(value)],
    },
    lastname: {
      active: true,
      rules: [(value: string) => requiredValidator(value)],
    },
    phone: {
      active: true,
      rules: [(value: string) => requiredValidator(value)],
    },
  });

  const { formState, handleInputChange, isChanged, validateForm, errors } =
    useDynamicForm<Omit<UserInput, "thumbnail">>(
      {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        role: "user",
      },
      validationSchema
    );
  const [singUp, { loading }] = useMutation(SingUp_Mutation, {
    fetchPolicy: "network-only",
    onCompleted: ({}) => {
      navigate("/");
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
      await singUp({
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
            {t("register.title")}
          </h1>
          <p className="text-center text-gray-500">{t("register.subtitle")}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
              <div className="space-y-2">
                <Label>{t("register.first_name")}</Label>
                <Input
                  type="text"
                  placeholder={t("register.first_name_placeholder")}
                  value={formState.firstname}
                  onChange={(e) =>
                    handleInputChange("firstname", e.target.value)
                  }
                  error={errors.firstname}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("register.last_name")}</Label>
                <Input
                  type="text"
                  placeholder={t("register.last_name_placeholder")}
                  required
                  value={formState.lastname}
                  onChange={(e) =>
                    handleInputChange("lastname", e.target.value)
                  }
                  error={errors.lastname}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("register.phone")}</Label>
              <Input
                type="text"
                placeholder={t("register.phone_placeholder")}
                required
                value={formState.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={errors.phone}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("register.email")}</Label>
              <Input
                type="email"
                placeholder={t("register.email_placeholder")}
                required
                value={formState.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("register.password")}</Label>
              <Input
                type="password"
                placeholder="******"
                required
                value={formState.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-button"
              disabled={loading || !isChanged}
            >
              {t("register.login")}
              {loading && <span className="ml-2 animate-spin">⏳</span>}
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
                type="button"
                variant="outline"
                className="w-full text-muted-foreground"
              >
                <img src={Google} alt="Google" className="w-4 h-4 me-2" />
                {t("login.google")}
              </Button>
              <Button
                type="button"
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
