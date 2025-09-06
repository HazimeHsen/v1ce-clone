"use client"

import { useTranslations } from "@/hooks/use-translations"

export default function DetailsContent() {
  const { t } = useTranslations();
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      tabIndex={0}
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
    >
      <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-5">
        <div className="prose w-full text-base leading-[1.25] text-gray-300 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-white prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h3:font-medium prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-white prose-a:underline hover:prose-a:text-neutral-300 prose-blockquote:bg-secondary prose-blockquote:py-4 prose-blockquote:font-light prose-strong:text-white prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 prose-img:rounded-lg prose-img:border prose-img:border-white prose-img:drop-shadow-2xl">
          <h6>
            <strong>{t("product.details.title")}</strong>
          </h6>
          <ul>
            <li>
              <strong>{t("product.details.size")}</strong>: {t("product.details.sizeValue")}.
            </li>
            <li>
              <strong>{t("product.details.weight")}</strong>: {t("product.details.weightValue")}.
            </li>
            <li>
              <strong>{t("product.details.material")}</strong>: {t("product.details.materialValue")}.
            </li>
            <li>
              <strong>{t("product.details.durability")}</strong>: {t("product.details.durabilityValue")}.
            </li>
            <li>
              <strong>{t("product.details.printing")}</strong>: {t("product.details.printingValue")}.
            </li>
            <li>
              <strong>{t("product.details.design")}</strong>: {t("product.details.designValue")}.
            </li>
          </ul>
          <h6>
            <strong>{t("product.details.howItWorks")}</strong>
          </h6>
          <ol>
            <li>
              <strong>{t("product.details.tapOrScan")}</strong>: {t("product.details.tapOrScanDescription")}
            </li>
            <li>
              <strong>{t("product.details.shareInfo")}</strong>: {t("product.details.shareInfoDescription")}
            </li>
            <li>
              <strong>{t("product.details.captureLeads")}</strong>: {t("product.details.captureLeadsDescription")}
            </li>
          </ol>
          <h6>
            <strong>{t("product.details.howToDesign")}</strong>
          </h6>
          <ol>
            <li>
              <strong>{t("product.details.chooseCard")}</strong>: {t("product.details.chooseCardDescription")}.
            </li>
            <li>
              <strong>{t("product.details.designBrief")}</strong>: {t("product.details.designBriefDescription")}.
            </li>
            <li>
              <strong>{t("product.details.mockupDesign")}</strong>: {t("product.details.mockupDesignDescription")}.
            </li>
            <li>
              <strong>{t("product.details.unlimitedRevisions")}</strong>: {t("product.details.unlimitedRevisionsDescription")}.
            </li>
            <li>
              <strong>{t("product.details.printingShipping")}</strong>: {t("product.details.printingShippingDescription")}.
            </li>
          </ol>
          <h6>
            <strong>
              How to Design Your{" "}
              <a href="https://mibio.co/digital-business-cards" title="digital business card">
                Digital Business Card
              </a>
            </strong>
          </h6>
          <ol>
            <li>
              <strong>Activate</strong>: Tap your card on a phone to start.
            </li>
            <li>
              <strong>Create</strong>: Add your name, details, and links.
            </li>
            <li>
              <strong>Customize</strong>: Upload a photo, video and bio.
            </li>
            <li>
              <strong>Preview</strong>: Check your card and make changes.
            </li>
            <li>
              <strong>Share</strong>: Tap or use the QR code to share.
            </li>
          </ol>
          <h6>
            <strong>Compatibility</strong>
          </h6>
          <ol>
            <li>
              <strong>NFC</strong>&nbsp;on iPhones (tap the top of the phone).
            </li>
            <li>
              <strong>NFC</strong>&nbsp;on Androids (tap the middle of the phone).
            </li>
            <li>
              <strong>QR Code</strong>: Scan the code with your camera.
              <br />
            </li>
          </ol>
          <h6>Why Choose 24K Gold?</h6>
          <ul>
            <li>
              <strong>Luxury Look</strong>: Stunning 24K gold plating for unmatched elegance.
            </li>
            <li>
              <strong>Unique Design</strong>: Laser-etched black on gold creates a bold, timeless finish.
            </li>
            <li>
              <strong>Signal Clarity</strong>: PVC backing ensures NFC works perfectly.
            </li>
          </ul>
          <h6>
            <strong>Shipping and Delivery</strong>
          </h6>
          <ul>
            <li>
              <strong>Quick Design</strong>: Our team completes designs in 6 hours on average.
            </li>
            <li>
              <strong>Fast Shipping</strong>: Next-day delivery available from offices in the UK, USA, or UAE.
              <br />
            </li>
          </ul>
          <p>Ready to take your networking to the next level? Your perfect card is just a few clicks away!</p>
        </div>
      </div>
    </div>
  )
}
