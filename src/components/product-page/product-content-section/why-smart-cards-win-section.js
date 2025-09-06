"use client"

import Image from "next/image"
import { X, Check } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function WhySmartCardsWinSection() {
  const { t } = useTranslations("productPage");
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-secondary p-3 lg:gap-8 lg:p-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-bold md:text-4xl">{t("whySmartCardsWin.title")}</h2>
        <p className="text-center text-sm text-muted-foreground">
          {t("whySmartCardsWin.description")}
        </p>
      </div>
      <div className="flex w-full gap-3 lg:gap-8">
        <article className="flex w-[calc(50%-0.375rem)] min-w-0 shrink-0 flex-col gap-4 lg:w-[calc(50%-1rem)]">
          <Image
            alt="card"
            loading="lazy"
            width={300}
            height={300}
            src="/placeholder.svg?height=300&width=300"
            className="aspect-square w-full rounded-xl object-cover"
          />
          <ul className="flex flex-col gap-2">
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-black">
                <X className="lucide lucide-x size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.paperCards.cantBeUpdated")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-black">
                <X className="lucide lucide-x size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.paperCards.easyToLose")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-black">
                <X className="lucide lucide-x size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.paperCards.mustTypeContacts")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-black">
                <X className="lucide lucide-x size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.paperCards.noFollowUps")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-black">
                <X className="lucide lucide-x size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.paperCards.onlyBasicInfo")}</p>
            </li>
          </ul>
        </article>
        <article className="flex w-[calc(50%-0.375rem)] min-w-0 shrink-0 flex-col gap-4 lg:w-[calc(50%-1rem)]">
          <Image
            alt="Mibio card"
            loading="lazy"
            width={300}
            height={300}
            src="/placeholder.svg?height=300&width=300"
            className="aspect-square w-full rounded-xl object-cover"
          />
          <ul className="flex flex-col gap-2">
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-primary">
                <Check className="lucide lucide-check size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.viceCards.updateAnytime")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-primary">
                <Check className="lucide lucide-check size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.viceCards.worksAnywhere")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-primary">
                <Check className="lucide lucide-check size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.viceCards.savesContacts")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-primary">
                <Check className="lucide lucide-check size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.viceCards.automaticFollowUps")}</p>
            </li>
            <li className="flex h-10 items-center gap-2 md:h-min">
              <div className="rounded-full p-0.5 bg-primary">
                <Check className="lucide lucide-check size-3 text-white" />
              </div>
              <p className="text-sm lg:text-base">{t("whySmartCardsWin.viceCards.shareMore")}</p>
            </li>
          </ul>
        </article>
      </div>
    </div>
  )
}
