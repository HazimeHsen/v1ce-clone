"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useTranslations } from "@/hooks/use-translations";

export default function ShippingAndReturnsPage() {
  const { t } = useTranslations("shippingAndReturns");
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          {t("title")}
        </h1>

        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center">{t("policies.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("shipping.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("shipping.processingTime.title")}
                  </h3>
                  <p>
                    {t("shipping.processingTime.description", { days: t("shipping.processingTime.days") })}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("shipping.shippingMethods.title")}
                  </h3>
                  <p>
                    {t("shipping.shippingMethods.description")}
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <strong>{t("shipping.shippingMethods.options.standard.title")}</strong> {t("shipping.shippingMethods.options.standard.description")}
                    </li>
                    <li>
                      <strong>{t("shipping.shippingMethods.options.expedited.title")}</strong> {t("shipping.shippingMethods.options.expedited.description")}
                    </li>
                    <li>
                      <strong>{t("shipping.shippingMethods.options.international.title")}</strong> {t("shipping.shippingMethods.options.international.description")}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("shipping.tracking.title")}
                  </h3>
                  <p>
                    {t("shipping.tracking.description")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("returns.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("returns.eligibility.title")}
                  </h3>
                  <p>
                    {t("returns.eligibility.description", { days: t("returns.eligibility.days") })}
                  </p>
                  <p className="mt-2">
                    <strong>{t("returns.eligibility.nonReturnableTitle")}</strong>
                  </p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>{t("returns.eligibility.nonReturnableItems.personalized")}</li>
                    <li>{t("returns.eligibility.nonReturnableItems.digital")}</li>
                    <li>{t("returns.eligibility.nonReturnableItems.finalSale")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("returns.initiate.title")}
                  </h3>
                  <p>
                    {t("returns.initiate.description", { 
                      email: (
                        <Link
                          href={`mailto:${t("returns.initiate.email")}`}
                          className="text-primary hover:underline"
                        >
                          {t("returns.initiate.email")}
                        </Link>
                      )
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("returns.refunds.title")}
                  </h3>
                  <p>
                    {t("returns.refunds.description")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("exchanges.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("exchanges.exchanging.title")}
                  </h3>
                  <p>
                    {t("exchanges.exchanging.description")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("exchanges.damaged.title")}
                  </h3>
                  <p>
                    {t("exchanges.damaged.description")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("exchanges.shippingCosts.title")}
                  </h3>
                  <p>
                    {t("exchanges.shippingCosts.description")}
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-8 text-center text-muted-foreground">
              <p>
                {t("contact.description")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
