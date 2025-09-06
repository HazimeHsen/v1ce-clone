import ComparisonCard from "./comparison-card";
import { useTranslations } from "@/hooks/use-translations";

export default function BeforeAfterSection() {
  const { t } = useTranslations();
  const paperCardFeatures = [
    {
      title: t("beforeAfter.paperFeatures.shareContact.title"),
      description: t("beforeAfter.paperFeatures.shareContact.description"),
    },
    {
      title: t("beforeAfter.paperFeatures.hopeFollowUp.title"),
      description: t("beforeAfter.paperFeatures.hopeFollowUp.description"),
    },
    { title: t("beforeAfter.paperFeatures.crickets.title") },
  ];

  const mibioCardFeatures = [
    {
      title: t("beforeAfter.mibioFeatures.shareEverything.title"),
      description: t("beforeAfter.mibioFeatures.shareEverything.description"),
    },
    {
      title: t("beforeAfter.mibioFeatures.captureDetails.title"),
      description: t("beforeAfter.mibioFeatures.captureDetails.description"),
    },
    {
      title: t("beforeAfter.mibioFeatures.syncToCrm.title"),
      description: t("beforeAfter.mibioFeatures.syncToCrm.description"),
    },
    {
      title: t("beforeAfter.mibioFeatures.automateFollowUps.title"),
      description: t("beforeAfter.mibioFeatures.automateFollowUps.description"),
    },
    {
      title: t("beforeAfter.mibioFeatures.updateAnytime.title"),
      description: t("beforeAfter.mibioFeatures.updateAnytime.description"),
    },
    {
      title: t("beforeAfter.mibioFeatures.seeWhoViewed.title"),
      description: t("beforeAfter.mibioFeatures.seeWhoViewed.description"),
    },
  ];

  return (
    <section className="center-narrow flex flex-col items-center space-y-10 self-center !px-6 py-12">
      <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex max-w-[600px] flex-col items-center gap-3 px-6 text-center">
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            {t("beforeAfter.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("beforeAfter.description")}
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <ComparisonCard
          title={t("beforeAfter.paperCard")}
          bgColorClass="bg-secondary"
          textColorClass="text-foreground"
          imageSrc="/assets/images/before-and-after-1.png"
          imageAlt="Paper Business Card"
          imagePositionClass="-right-6 lg:-left-14 xl:-left-20"
          features={paperCardFeatures}
        />
        <ComparisonCard
          title={t("beforeAfter.mibioCard")}
          bgColorClass="bg-primary"
          textColorClass="text-white"
          imageSrc="/assets/images/before-and-after-2.png"
          imageAlt="Mibio Smart Business Card"
          imagePositionClass="-right-6 lg:-right-5 xl:-right-10"
          features={mibioCardFeatures}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <a href="/collections/tap-business-cards">
          <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
            {t("beforeAfter.cta")}
          </button>
        </a>
        <p className="text-sm text-muted-foreground">{t("beforeAfter.guarantee")}</p>
      </div>
    </section>
  );
}
