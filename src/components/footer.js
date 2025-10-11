import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Mail, Phone, Twitter } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function Footer() {
  const { t } = useTranslations();
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="center-wide">
        <div className="flex flex-col justify-between lg:flex-row gap-8 mb-8">
          {/* Company Information - Left Side */}
          <div className="">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/images/logo-dark.svg"
                width={120}
                height={22}
                alt="Mibio's dark logo"
                loading="lazy"
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white leading-relaxed max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Three Columns - Right Side */}
          <div className="">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Resources Column */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">{t("footer.resources")}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/pages/contact" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.contactUs")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections/all" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.products")}
                    </Link>
                  </li>
                  <li>
                    <a href="https://status.mibio.am" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.status")}
                    </a>
                  </li>
                  <li>
                    <Link href="/blogs/news" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.blog")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Policies Column */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">{t("footer.policies")}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/policies/privacy-policy" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.privacyPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/terms-of-service" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.termsOfService")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/legal-notice" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.legalNotice")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/shipping-policy" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.shippingPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/refund-policy" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.refundPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/contact-information" className="text-sm text-white hover:text-gray-300 transition-colors">
                      {t("footer.contactInformation")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">{t("footer.contact")}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white" />
                    <a href="tel:+37455228252" className="text-sm text-white hover:text-gray-300 transition-colors">
                      +374 55 228252
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-white" />
                    <a href="mailto:support@mibio.am" className="text-sm text-white hover:text-gray-300 transition-colors">
                      support@mibio.am
                    </a>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <a href="https://www.facebook.com/mibio.am" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-gray-300 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com/mibio.am" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-gray-300 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="https://wa.me/+37455228252" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white hover:text-gray-300 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                    <a href="https://www.x.com/mibio_am" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white hover:text-gray-300 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white">{t("footer.copyright")}</span>
            </div>
              <Image src="/assets/images/payment.png" alt="Payment Methods" width={220} height={30} className="brightness-0 invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}
