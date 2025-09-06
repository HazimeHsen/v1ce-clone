import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function Footer() {
  const { t } = useTranslations();
  return (
    <footer className="pt-12">
      <div className="flex flex-col gap-[40px]">
        <div className="center-wide flex w-full flex-col justify-center gap-4 gap-y-10 lg:flex-row lg:justify-between lg:gap-10">
          <div className="flex flex-col items-center justify-between gap-4 lg:items-start">
            <div className="flex flex-col items-center justify-center gap-4 text-center lg:items-start lg:justify-start lg:text-left">
              <Link className="" href="/">
                <Image
                  alt="Mibio logo"
                  width={90}
                  height={32}
                  src="/assets/images/logo-dark.svg"
                  priority={false}
                />
              </Link>
              <p className="text-center leading-[18px] text-foreground lg:max-w-[360px] lg:text-left">
                {t("footer.description")}
              </p>
              <div className="flex w-full flex-row items-center justify-center gap-4 text-muted-foreground lg:w-auto lg:justify-normal">
                <a
                  target="_blank"
                  aria-label="Facebook"
                  className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                  href="https://www.facebook.com/mibioconnections/"
                  rel="noreferrer"
                >
                  <Facebook className="size-6" />
                </a>
                <a
                  target="_blank"
                  aria-label="Instagram"
                  className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                  href="https://www.instagram.com/mibioconnections"
                  rel="noreferrer"
                >
                  <Instagram className="size-6" />
                </a>
                <a
                  target="_blank"
                  aria-label="X.com"
                  className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                  href="https://x.com/mibioconnections"
                  rel="noreferrer"
                >
                  <Twitter className="size-6" />
                </a>
                <a
                  target="_blank"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                  href="https://www.linkedin.com/company/mibioconnections/"
                  rel="noreferrer"
                >
                  <Linkedin className="size-6" />
                </a>
                <a
                  target="_blank"
                  aria-label="Youtube"
                  className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                  href="https://www.youtube.com/@mibio345"
                  rel="noreferrer"
                >
                  <Youtube className="size-6" />
                </a>
              </div>
            </div>
            <Image
              src="/assets/images/payment.png"
              width={300}
              height={24}
              alt="Mibio Payment Methods"
              priority={false}
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 lg:w-fit lg:justify-end lg:gap-8">
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">{t("footer.mibio")}</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/collections/all-products"
              >
                <p className="text-sm">{t("footer.products")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/features"
              >
                <p className="text-sm">{t("footer.features")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/pricing"
              >
                <p className="text-sm">{t("footer.pricing")}</p>
              </Link>
              <a
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="https://ecologi.com/mibio"
                rel="noreferrer"
              >
                <p className="text-sm">{t("footer.sustainability")}</p>
              </a>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/our-story"
              >
                <p className="text-sm">{t("footer.ourStory")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/digital-business-card-reviews"
              >
                <p className="text-sm">{t("footer.reviews")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/case-studies"
              >
                <p className="text-sm">{t("footer.caseStudies")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/blog"
              >
                <p className="text-sm">{t("footer.blogs")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/partners"
              >
                <p className="text-sm">{t("footer.partners")}</p>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">{t("footer.products")}</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/digital-business-cards"
              >
                <p className="text-sm">{t("footer.digitalBusinessCards")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/original-nfc-business-card"
              >
                <p className="text-sm">{t("footer.originalNfcCards")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/bamboo-nfc-business-cards"
              >
                <p className="text-sm">{t("footer.bambooNfcCards")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/metal-nfc-business-cards"
              >
                <p className="text-sm">{t("footer.metalNfcCards")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/nfc-phone-cards"
              >
                <p className="text-sm">{t("footer.tapPhoneCards")}</p>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">{t("footer.help")}</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/contact-sales"
              >
                <p className="text-sm">{t("footer.contactSales")}</p>
              </Link>
              <a
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="https://mibiohelp.zohodesk.eu/portal/en/home"
                rel="noreferrer"
              >
                <p className="text-sm">{t("footer.helpCenter")}</p>
              </a>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/business-card-design"
              >
                <p className="text-sm">{t("footer.designGuidelines")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/faq"
              >
                <p className="text-sm">{t("footer.faqs")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/policies/shipping-and-returns"
              >
                <p className="text-sm">{t("footer.shippingReturns")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/policies/warranty"
              >
                <p className="text-sm">{t("footer.warranty")}</p>
              </Link>
              <Link
                href="/feature-requests"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
              >
                <p className="text-sm">{t("footer.featureRequests")}</p>
              </Link>
              <Link
                href="/roadmap"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
              >
                <p className="text-sm">{t("footer.roadmap")}</p>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">{t("footer.compare")}</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/compare/blinq-vs-mibio-digital-business-card"
              >
                <p className="text-sm">{t("footer.vsBlinq")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/compare/linq-vs-mibio-digital-business-card"
              >
                <p className="text-sm">{t("footer.vsLinq")}</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/compare/mobilo-vs-mibio-digital-business-card"
              >
                <p className="text-sm">{t("footer.vsMobilo")}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-black py-1 text-white">
          <div className="center-wide flex w-full flex-col justify-between gap-2 md:flex-row">
            <p className="text-sm font-medium">
              © {"2025"} Mibio LTD. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/policies/terms-of-service">
                <p className="text-sm font-medium underline">
                  {t("footer.termsOfService")}
                </p>
              </Link>
              <Link href="/policies/privacy-policy">
                <p className="text-sm font-medium underline">{t("footer.privacyPolicy")}</p>
              </Link>
              <Link href="/policies/cookies">
                <p className="text-sm font-medium underline">{t("footer.cookiePolicy")}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
