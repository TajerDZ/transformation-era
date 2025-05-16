import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.png";
import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import useDynamicForm from "@/hooks/useDynamicForm";
import { emailValidator, requiredValidator } from "@/utils/validators";
import { useMutation } from "@apollo/client";
import { ForgetPassword_Mutation } from "@/graphql/mutation/users/ForgetPassword";
import { CheckOTPPassword_Mutation } from "@/graphql/mutation/users/CheckOTPPassword";
import { ChangePassword_Mutation } from "@/graphql/mutation/users/ChangePassword";
type FormData = {
  email: string;
  code: string;
  password: string;
};
function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [validationSchema, setValidationSchema] = useState({
    email: {
      active: true,
      rules: [(value: string) => emailValidator(value)],
    },
    code: {
      active: false,
      rules: [(value: string) => (value.length === 6 ? "" : "Invalid code")],
    },
    password: {
      active: false,
      rules: [(value: string) => requiredValidator(value)],
    },
  });
  const { formState, handleInputChange, isChanged, validateForm, errors } =
    useDynamicForm<FormData>(
      {
        email: "",
        code: "",
        password: "",
      },
      validationSchema
    );

  const [forgetPassword, { loading }] = useMutation(ForgetPassword_Mutation, {
    fetchPolicy: "network-only",
    variables: {
      email: formState.email,
    },

    onCompleted: ({ forgetPassword: { status } }) => {
      if (status) {
        setStep(2);
      }
    },
    onError: (error) => {
      const networkError = error.networkError as any;
      setError(networkError?.result?.errors?.[0]?.message);
    },
  });
  const [checkOTPPassword, { loading: loadingCheck }] = useMutation(
    CheckOTPPassword_Mutation,
    {
      fetchPolicy: "network-only",
      variables: {
        email: formState.email,
        code: formState.code,
      },

      onCompleted: ({ checkOTPPassword: { status } }) => {
        if (status) {
          setStep(3);
        } else {
          setError("Invalid code");
        }
      },
      onError: (error) => {
        const networkError = error.networkError as any;
        setError(networkError?.result?.errors?.[0]?.message);
      },
    }
  );

  const [changePassword, { loading: loadingChange }] = useMutation(
    ChangePassword_Mutation,
    {
      fetchPolicy: "network-only",
      variables: {
        content: {
          email: formState.email,
          code: formState.code,
          password: formState.password,
        },
      },

      onCompleted: ({ changePassword: { status } }) => {
        if (status) {
          navigate("/");
        }
      },
      onError: (error) => {
        const networkError = error.networkError as any;
        setError(networkError?.result?.errors?.[0]?.message);
      },
    }
  );

  const nextStep = async () => {
    if (
      isChanged &&
      (!loading || !loadingCheck || !loadingChange) &&
      validateForm()
    ) {
      if (step === 1) {
        await forgetPassword();
      } else if (step === 2) {
        await checkOTPPassword();
      } else if (step === 3) {
        await changePassword();
        // Handle password reset logic here
        // Redirect to login page after password reset
      }
    }
  };

  useEffect(() => {
    if (step === 1) {
      setValidationSchema((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          active: true,
        },
        code: {
          ...prev.code,
          active: false,
        },
        password: {
          ...prev.password,
          active: false,
        },
      }));
    }
    if (step === 2) {
      setValidationSchema((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          active: false,
        },
        code: {
          ...prev.code,
          active: true,
        },
        password: {
          ...prev.password,
          active: false,
        },
      }));
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    if (step === 3) {
      setValidationSchema((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          active: false,
        },
        code: {
          ...prev.code,
          active: false,
        },
        password: {
          ...prev.password,
          active: true,
        },
      }));
    }
  }, [step]);
  return (
    <div className="h-screen flex items-center justify-center bg-[#FCFEFF]">
      <div className="absolute top-5 end-10 max-sm:hidden">
        <img src={Logo} alt="Logo" className="w-16 mx-auto mb-4" />
      </div>
      <Card className="w-[500px] p-6 shadow-none">
        <CardHeader>
          {
            {
              1: (
                <>
                  <h1 className="text-primary-navy text-center text-2xl font-bold">
                    {t("forget_password.title")}
                  </h1>
                  <p className="text-center text-gray-500">
                    {t("forget_password.subtitle")}
                  </p>
                </>
              ),
              2: (
                <>
                  <h1 className="text-primary-navy text-center text-2xl font-bold">
                    {t("forget_password.verify_code_title")}
                  </h1>
                  <p className="text-center text-gray-500">
                    {t("forget_password.verify_code_subtitle")}
                  </p>
                </>
              ),
              3: (
                <>
                  <h1 className="text-primary-navy text-center text-2xl font-bold">
                    {t("forget_password.reset_password")}
                  </h1>
                  <p className="text-center text-gray-500">
                    {t("forget_password.reset_password_subtitle")}
                  </p>
                </>
              ),
            }[step]
          }
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0">
          <form className="w-full flex flex-col gap-4">
            {
              {
                1: (
                  <div className="space-y-2">
                    <Label>{t("forget_password.email")}</Label>
                    <Input
                      type="email"
                      placeholder={t("forget_password.email_placeholder")}
                      required
                      value={formState.email}
                      onChange={(e) => {
                        handleInputChange("email", e.target.value);
                      }}
                      error={errors.email}
                    />
                  </div>
                ),
                2: (
                  <div className="space-y-2 flex justify-center" dir="ltr">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      value={formState.code}
                      onChange={(e) => {
                        handleInputChange("code", e);
                      }}
                    >
                      <InputOTPGroup
                        className={cn(
                          "mx-2",
                          (errors.code || error) && "border-red-500"
                        )}
                      >
                        <InputOTPSlot index={0} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup
                        className={cn(
                          "mx-2",
                          (errors.code || error) && "border-red-500"
                        )}
                      >
                        <InputOTPSlot index={1} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup
                        className={cn(
                          "mx-2",
                          (errors.code || error) && "border-red-500"
                        )}
                      >
                        <InputOTPSlot index={2} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup
                        className={cn(
                          "mx-2",
                          (errors.code || error) && "border-red-500"
                        )}
                      >
                        <InputOTPSlot index={3} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup
                        className={cn(
                          "mx-2",
                          (errors.code || error) && "border-red-500"
                        )}
                      >
                        <InputOTPSlot index={4} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup
                        className={cn(
                          "mx-2",
                          (errors.code || error) && "border-red-500"
                        )}
                      >
                        <InputOTPSlot index={5} className="h-12 w-12" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                ),
                3: (
                  <>
                    <div className="space-y-2">
                      <Label>{t("forget_password.new_password")}</Label>
                      <Input
                        type="password"
                        placeholder="*******"
                        required
                        value={formState.password}
                        onChange={(e) => {
                          handleInputChange("password", e.target.value);
                        }}
                        error={errors.password}
                      />
                    </div>
                  </>
                ),
              }[step]
            }

            <Button
              type="button"
              className="w-full mt-4 bg-button"
              onClick={() => nextStep()}
              disabled={loading || loadingCheck || loadingChange || !isChanged}
            >
              {
                {
                  1: t("forget_password.send_otp"),
                  2: t("forget_password.verify_code"),
                  3: t("forget_password.reset_password"),
                }[step]
              }
              {(loading || loadingCheck || loadingChange) && (
                <span className="ml-2 animate-spin">⏳</span>
              )}
            </Button>
            {step === 2 && (
              <div className="flex justify-center items-center">
                <Button
                  variant="link"
                  disabled={isResendDisabled}
                  onClick={() => {
                    setIsResendDisabled(true);
                    setTimer(60);
                    setStep(2); // Resend the OTP
                  }}
                  className={cn(
                    "text-sm text-blue-500 hover:underline",
                    isResendDisabled && "cursor-not-allowed"
                  )}
                >
                  {isResendDisabled
                    ? `${t("forget_password.resend_otp")} ${timer}s`
                    : t("forget_password.resend_otp")}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgetPassword;
