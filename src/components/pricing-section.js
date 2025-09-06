"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function PricingSection() {
  const { t } = useTranslations();
  const [isYearly, setIsYearly] = useState(true);

  const pricingPlans = [
    {
      id: "plus",
      name: t("pricing.plans.plus.name"),
      badge: t("pricing.plans.plus.badge"),
      tagline: t("pricing.plans.plus.tagline"),
      price: isYearly
        ? t("pricing.plans.plus.priceYearly")
        : t("pricing.plans.plus.priceMonthly"),
      description: t("pricing.plans.plus.description"),
      cta: t("pricing.plans.plus.cta"),
      ctaVariant: "default",
      features: [
        t("pricing.plans.plus.features.0"),
        t("pricing.plans.plus.features.1"),
        t("pricing.plans.plus.features.2"),
        t("pricing.plans.plus.features.3"),
        t("pricing.plans.plus.features.4"),
        t("pricing.plans.plus.features.5"),
        t("pricing.plans.plus.features.6"),
        t("pricing.plans.plus.features.7"),
      ],
      highlighted: true,
    },
    {
      id: "free",
      name: t("pricing.plans.free.name"),
      badge: t("pricing.plans.free.badge"),
      tagline: t("pricing.plans.free.tagline"),
      price: t("pricing.plans.free.price"),
      description: t("pricing.plans.free.description"),
      cta: t("pricing.plans.free.cta"),
      ctaVariant: "outline",
      features: [
        t("pricing.plans.free.features.0"),
        t("pricing.plans.free.features.1"),
        t("pricing.plans.free.features.2"),
        t("pricing.plans.free.features.3"),
        t("pricing.plans.free.features.4"),
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="center-narrow py-16">
      <div className="flex flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
          <div className="flex max-w-[600px] flex-col items-center gap-3 px-6 text-center">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              {t("pricing.title")}
            </h2>
            <p className="text-center text-lg text-muted-foreground max-w-2xl">
              {t("pricing.subtitle")}
            </p>
          </div>
        </div>

          <div className="flex items-center bg-card rounded-full p-1 shadow-sm border border-border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                !isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("pricing.toggle.monthly")}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors relative ${
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("pricing.toggle.yearly")}
            </button>
          </div>

        <div className="flex items-end justify-center md:flex-row flex-col gap-8 w-full max-w-4xl pt-5">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card rounded-2xl shadow-lg p-8 border w-full ${
                plan.highlighted
                  ? "border-primary"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    {t("pricing.recommended")}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-xl font-bold text-foreground mr-2">
                    {plan.name}
                  </h3>
                  <Badge
                    variant={plan.id === "free" ? "secondary" : "default"}
                    className={
                      plan.id === "free"
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground"
                    }
                  >
                    {plan.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.tagline}
                </p>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {plan.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" variant={plan.ctaVariant}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t("pricing.additionalInfo")}
          </p>
        </div>
      </div>
    </section>
  );
}
