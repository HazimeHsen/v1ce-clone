import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-12">
      <div className="flex flex-col gap-[40px]">
        <div className="center-wide flex w-full flex-col justify-center gap-4 gap-y-10 lg:flex-row lg:justify-between lg:gap-10">
          <div className="flex flex-col items-center justify-between gap-4 lg:items-start">
            <div className="flex flex-col items-center justify-center gap-4 text-center lg:items-start lg:justify-start lg:text-left">
              <Link className="" href="/">
                <img
                  alt="Mibio logo"
                  loading="lazy"
                  width="90"
                  height="32"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/logo-dark.svg"
                />
              </Link>
              <p className="text-center leading-[18px] text-foreground lg:max-w-[360px] lg:text-left">
                Mibio is your all-in-one smart, contactless business card
                designed to turn every meeting into money.
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
            <img
              src="/payment.png"
              width="300"
              height="24"
              alt="Mibio Payment Methods"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 lg:w-fit lg:justify-end lg:gap-8">
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">V1CE</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/collections/all-products"
              >
                <p className="text-sm">Products</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/features"
              >
                <p className="text-sm">Features</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/pricing"
              >
                <p className="text-sm">Pricing</p>
              </Link>
              <a
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="https://ecologi.com/mibio"
                rel="noreferrer"
              >
                <p className="text-sm">Sustainability</p>
              </a>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/our-story"
              >
                <p className="text-sm">Our Story</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/digital-business-card-reviews"
              >
                <p className="text-sm">Reviews</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/case-studies"
              >
                <p className="text-sm">Case Studies</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/blog"
              >
                <p className="text-sm">Blogs</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/partners"
              >
                <p className="text-sm">Partners</p>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">Products</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/digital-business-cards"
              >
                <p className="text-sm">Digital Business Cards</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/original-nfc-business-card"
              >
                <p className="text-sm">Original NFC Cards</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/bamboo-nfc-business-cards"
              >
                <p className="text-sm">Bamboo NFC Cards</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/metal-nfc-business-cards"
              >
                <p className="text-sm">Metal NFC Cards</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/product/nfc-phone-cards"
              >
                <p className="text-sm">Tap Phone Cards</p>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">Help</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/contact-sales"
              >
                <p className="text-sm">Contact Sales</p>
              </Link>
              <a
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="https://mibiohelp.zohodesk.eu/portal/en/home"
                rel="noreferrer"
              >
                <p className="text-sm">Help Center</p>
              </a>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/business-card-design"
              >
                <p className="text-sm">Design Guidelines</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/faq"
              >
                <p className="text-sm">FAQs</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/policies/shipping-and-returns"
              >
                <p className="text-sm">Shipping &amp; Returns</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/policies/warranty"
              >
                <p className="text-sm">Warranty</p>
              </Link>
              <Link
                href="/feature-requests"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
              >
                <p className="text-sm">Feature Requests</p>
              </Link>
              <Link
                href="/roadmap"
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
              >
                <p className="text-sm">Roadmap</p>
              </Link>
            </div>
            <div className="flex w-full flex-col gap-4 text-muted-foreground lg:w-auto">
              <p className="font-semibold text-foreground">Compare</p>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/compare/blinq-vs-mibio-digital-business-card"
              >
                <p className="text-sm">vs Blinq</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/compare/linq-vs-mibio-digital-business-card"
              >
                <p className="text-sm">vs Linq</p>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm font-medium leading-[19px] text-foreground underline-offset-4 hover:underline"
                href="/compare/mobilo-vs-mibio-digital-business-card"
              >
                <p className="text-sm">vs Mobilo</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-black py-1 text-white">
          <div className="center-wide flex w-full flex-col justify-between gap-2 md:flex-row">
            <p className="text-sm font-medium">
              © {"2025"} Mibio LTD. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/policies/terms-of-service">
                <p className="text-sm font-medium underline">
                  Terms of Service
                </p>
              </Link>
              <Link href="/policies/privacy-policy">
                <p className="text-sm font-medium underline">Privacy Policy</p>
              </Link>
              <Link href="/policies/cookies">
                <p className="text-sm font-medium underline">Cookie Policy</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
