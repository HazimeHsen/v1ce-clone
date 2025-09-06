"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Rocket,
  Trees,
  ChromeIcon as ChartNoAxesColumn,
  Wrench,
  Nfc,
  Boxes,
  Radio,
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export function FeaturesSlider() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Clock,
      title: t("featuresSlider.features.0.title"),
      description: t("featuresSlider.features.0.description"),
    },
    {
      icon: Rocket,
      title: t("featuresSlider.features.1.title"),
      description: t("featuresSlider.features.1.description"),
    },
    {
      icon: Trees,
      title: t("featuresSlider.features.2.title"),
      description: t("featuresSlider.features.2.description"),
    },
    {
      icon: ChartNoAxesColumn,
      title: t("featuresSlider.features.3.title"),
      description: t("featuresSlider.features.3.description"),
    },
    {
      icon: Wrench,
      title: t("featuresSlider.features.4.title"),
      description: t("featuresSlider.features.4.description"),
    },
    {
      icon: Nfc,
      title: t("featuresSlider.features.5.title"),
      description: t("featuresSlider.features.5.description"),
    },
    {
      icon: Boxes,
      title: t("featuresSlider.features.6.title"),
      description: t("featuresSlider.features.6.description"),
    },
    {
      icon: Radio,
      title: t("featuresSlider.features.7.title"),
      description: t("featuresSlider.features.7.description"),
    },
  ];
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollContainer.scrollLeft += scrollSpeed;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const duplicatedFeatures = [...features, ...features];

  return (
    <section className="overflow-hidden bg-secondary py-14">
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-2xl font-bold max-w-xs px-8 text-center text-primary-foreground">
          {t("featuresSlider.title")}
        </h2>

        <div
          className="relative w-full"
          role="region"
          aria-roledescription="carousel"
        >
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-hidden"
              style={{ scrollBehavior: "auto" }}
            >
              {duplicatedFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    role="group"
                    aria-roledescription="slide"
                    className="shrink-0 flex min-w-[350px] select-none items-center gap-4 px-4"
                  >
                    <IconComponent className="size-8 min-w-8 text-white" />
                    <div>
                      <h3 className="text-nowrap text-base font-semibold leading-6 text-primary-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-4 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
        >
          {t("featuresSlider.cta")}
        </Button>
      </div>
    </section>
  );
}
