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

function ForgetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const nextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Handle password reset logic here
      navigate("/"); // Redirect to login page after password reset
    }
  };

  useEffect(() => {
    if (step === 2) {
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
                    />
                  </div>
                ),
                2: (
                  <div className="space-y-2 flex justify-center" dir="ltr">
                    <InputOTP
                      maxLength={4}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup className="mx-2">
                        <InputOTPSlot index={0} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup className="mx-2">
                        <InputOTPSlot index={1} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup className="mx-2">
                        <InputOTPSlot index={2} className="h-12 w-12" />
                      </InputOTPGroup>
                      <InputOTPGroup className="mx-2">
                        <InputOTPSlot index={3} className="h-12 w-12" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                ),
                3: (
                  <>
                    <div className="space-y-2">
                      <Label>{t("forget_password.new_password")}</Label>
                      <Input type="password" placeholder="*******" required />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("forget_password.confirm_new_password")}</Label>
                      <Input type="password" placeholder="*******" required />
                    </div>
                  </>
                ),
              }[step]
            }

            <Button
              type="button"
              className="w-full mt-4 bg-button"
              onClick={() => nextStep()}
            >
              {
                {
                  1: t("forget_password.send_otp"),
                  2: t("forget_password.verify_code"),
                  3: t("forget_password.reset_password"),
                }[step]
              }
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
