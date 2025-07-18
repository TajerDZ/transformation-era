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
import UserAccount from "@/assets/icons/user-account.png";

import { emailValidator, requiredValidator } from "@/utils/validators";
import useDynamicForm from "@/hooks/useDynamicForm";
import useStore from "@/store/useStore";
import { useMutation } from "@apollo/client";
import { UpdateUser_Mutation } from "@/graphql/mutation/users/UpdateUser";
import { toast } from "sonner";
type FormData = {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
};
function Information() {
  const [validationSchema] = useState({
    email: {
      active: true,
      rules: [(value: string) => emailValidator(value)],
    },
    phone: {
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
  });
  const user = useStore((state: any) => state.userData);

  const { formState, handleInputChange, isChanged, validateForm, errors } =
    useDynamicForm<FormData>(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
      },
      validationSchema
    );
  const idUser = useStore((state: any) => state.idUser);
  const updateUserData = useStore((state: any) => state.updateUserData);
  const [updateUser, { loading }] = useMutation(UpdateUser_Mutation);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() || !isChanged || loading) {
      await updateUser({
        variables: {
          updateUserId: idUser,
          content: formState,
        },
        onCompleted: ({ updateUser: { status, data } }) => {
          if (status) {
            toast("Information updated successfully", {
              description: "Information updated successfully",
              descriptionClassName: "!text-muted-foreground",
            });
            updateUserData(data);
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
        <h1 className="text-xl font-bold ">{t("profile.info.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("profile.info.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.6rem)" : "calc(100vw - 9.6rem)",
          }}
        />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-3">
                  <img src={UserAccount} alt="padlock" />
                  <h1 className="text-lg font-bold text-primary-2">
                    {t("profile.info.title")}
                  </h1>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("profile.info.first_name")}</Label>
                    <Input
                      placeholder={t("profile.info.first_name_placeholder")}
                      value={formState.firstname}
                      onChange={(e) =>
                        handleInputChange("firstname", e.target.value)
                      }
                      error={errors.firstname}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("profile.info.last_name")}</Label>
                    <Input
                      placeholder={t("profile.info.last_name_placeholder")}
                      value={formState.lastname}
                      onChange={(e) =>
                        handleInputChange("lastname", e.target.value)
                      }
                      error={errors.lastname}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("profile.info.email")}</Label>
                    <Input
                      placeholder={t("profile.info.email_placeholder")}
                      value={formState.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      error={errors.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("profile.info.phone")}</Label>
                    <Input
                      placeholder={t("profile.info.phone_placeholder")}
                      value={formState.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      error={errors.phone}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-3">
                <Button className="bg-button" disabled={loading || !isChanged}>
                  {t("profile.info.save_changes")}
                  {loading && <span className="ml-2 animate-spin">⏳</span>}
                </Button>
                {/* <Button variant="outline" className="bg-white text-gray-500">
                  {t("profile.password.cancel")}
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Information;
