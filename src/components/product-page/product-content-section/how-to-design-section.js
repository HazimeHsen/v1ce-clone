"use client"

import { useTranslations } from "@/hooks/use-translations"

export default function HowToDesignSection() {
  const { t } = useTranslations("productPage");
  return (
    <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-xl bg-secondary p-5 md:p-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-bold md:text-4xl">{t("howToDesign.title")}</h2>
        <p className="text-center text-sm text-muted-foreground">{t("howToDesign.description")}</p>
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-2">
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <div className="text-h5 flex size-[50px] items-center justify-center rounded-full bg-primary text-[24px] font-semibold leading-[102%] text-white">
            1
          </div>
          <h3 className="text-h6">{t("howToDesign.steps.placeOrder.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("howToDesign.steps.placeOrder.description")}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <div className="text-h5 flex size-[50px] items-center justify-center rounded-full bg-primary text-[24px] font-semibold leading-[102%] text-white">
            2
          </div>
          <h3 className="text-h6">{t("howToDesign.steps.weDesign.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("howToDesign.steps.weDesign.description")}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <div className="text-h5 flex size-[50px] items-center justify-center rounded-full bg-primary text-[24px] font-semibold leading-[102%] text-white">
            3
          </div>
          <h3 className="text-h6">{t("howToDesign.steps.printShip.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("howToDesign.steps.printShip.description")}
          </p>
        </div>
      </div>
    </div>
  )
}
