"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import initTranslations from "@/app/i18n";
import { PageLoader } from "./ui/loader";

export function I18nProvider({ children, locale }) {
  const [i18n, setI18n] = useState(null);

  useEffect(() => {
    const initI18n = async () => {
      const { i18n: i18nInstance } = await initTranslations(locale, ["common"]);
      setI18n(i18nInstance);
    };

    initI18n();
  }, [locale]);

  if (!i18n) {
    return <PageLoader />;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
