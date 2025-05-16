import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Ar from "@/assets/lang/ar.json";
import En from "@/assets/lang/en.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ar: {
        translation: Ar,
      },
      en: {
        translation: En,
      },
    },
    fallbackLng: "ar",
    debug: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
