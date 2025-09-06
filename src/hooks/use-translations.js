"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function useTranslations(namespace = "common") {
  const params = useParams();
  const locale = params.locale || "en";
  const { t, i18n } = useTranslation(namespace);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return { t, locale };
}
