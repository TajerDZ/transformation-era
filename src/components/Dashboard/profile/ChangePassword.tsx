import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext, useState } from "react";
import PadLock from "@/assets/icons/padlock.png";
import { requiredValidator } from "@/utils/validators";
import useDynamicForm from "@/hooks/useDynamicForm";
import { useMutation } from "@apollo/client";
import { UpdateMyPassword_Mutation } from "@/graphql/mutation/users/UpdateMyPassword";
import useStore from "@/store/useStore";
import { toast } from "sonner";
type FormData = {
  oldPassword: string;
  password: string;
};
function ChangePassword() {
  const [validationSchema] = useState({
    oldPassword: {
      active: true,
      rules: [(value: string) => requiredValidator(value)],
    },
    password: {
      active: true,
      rules: [(value: string) => requiredValidator(value)],
    },
  });
  const { formState, handleInputChange, isChanged, validateForm, errors } =
    useDynamicForm<FormData>(
      {
        oldPassword: "",
        password: "",
      },
      validationSchema
    );
  const idUser = useStore((state: any) => state.idUser);
  const [updatePasword, { loading }] = useMutation(UpdateMyPassword_Mutation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() || !isChanged || loading) {
      await updatePasword({
        variables: {
          updateMyPasswordId: idUser,
          content: formState,
        },
        onCompleted: ({ updateMyPassword: { status } }) => {
          if (status) {
            toast("Password updated successfully", {
              description: "Password updated successfully",
              descriptionClassName: "!text-muted-foreground",
            });
          }
        },
      });
    } else {
      console.log("Form is invalid");
    }
  };
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h1 className="text-xl font-bold ">{t("profile.password.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.password.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.6rem)" : "calc(100vw - 9.6rem)",
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-3">
                <img src={PadLock} alt="padlock" />
                <h1 className="text-lg font-bold text-primary-2">
                  {t("profile.password.title")}
                </h1>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("profile.password.old_password")}</Label>
                <Input
                  type="password"
                  placeholder="*********"
                  value={formState.oldPassword}
                  onChange={(e) =>
                    handleInputChange("oldPassword", e.target.value)
                  }
                  error={errors.oldPassword}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("profile.password.new_password")}</Label>
                <Input
                  type="password"
                  placeholder="*********"
                  value={formState.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  error={errors.password}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-3">
              <Button className="bg-button" disabled={loading || !isChanged}>
                {t("profile.password.save_changes")}
                {loading && <span className="ml-2 animate-spin">⏳</span>}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ChangePassword;
