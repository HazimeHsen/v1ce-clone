"use client"

import { useTranslations } from "@/hooks/use-translations"
import { getLocalizedDescription } from "@/lib/translation-utils";
import { useParams } from "next/navigation";

export default function DetailsContent({ product }) {
  const { t } = useTranslations();
  const { locale } = useParams();
  
  // Get localized description
  const localizedDescription = getLocalizedDescription(product, locale);
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
          {localizedDescription && (
            <div className="mb-6">
              <h6>
                <strong>{t("product.details.description")}</strong>
              </h6>
              <div dangerouslySetInnerHTML={{ __html: localizedDescription }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
