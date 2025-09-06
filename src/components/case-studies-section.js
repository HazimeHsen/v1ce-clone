import ArticleCard from "./article-card"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"

export default function CaseStudiesSection() {
  const { t } = useTranslations();
  return (
    <section className="center-narrow flex flex-col items-center py-12">
      <div className="flex w-full flex-col gap-4 py-8 md:grid md:grid-cols-2 md:gap-8">
        <ArticleCard
          href="/case-studies/adaptix-mibio-nfc-business-card-review-bulk-management"
          imageSrc="https://cdn.sanity.io/images/jvl9ycqq/production/5ddd7582ca7783b90e3bacce74d0dcb1d596941d-520x293.webp"
          imageAlt="How Adaptix Updated 500+ NFC Business Cards in Minutes with Mibio image"
          badgeText={t("caseStudies.adaptix.badge")}
          title={t("caseStudies.adaptix.title")}
          description={t("caseStudies.adaptix.description")}
          authorName="Haydn Price"
          authorAvatarSrc="https://cdn.sanity.io/images/jvl9ycqq/production/e57def69ba19ed255ef84e48cd030c8d4a6c8d7a-1054x1428.jpg"
          readTime={t("caseStudies.adaptix.readTime")}
        />
        <ArticleCard
          href="/case-studies/furniture-village-mibio-digital-business-card-review-cost-savings"
          imageSrc="https://cdn.sanity.io/images/jvl9ycqq/production/7108a14603f84cc4930b98db312f2adf571d957d-520x299.webp"
          imageAlt="How Furniture Village Cut Costs by 70% with Mibio Digital Business Cards image"
          badgeText={t("caseStudies.furnitureVillage.badge")}
          title={t("caseStudies.furnitureVillage.title")}
          description={t("caseStudies.furnitureVillage.description")}
          authorName="Haydn Price"
          authorAvatarSrc="https://cdn.sanity.io/images/jvl9ycqq/production/e57def69ba19ed255ef84e48cd030c8d4a6c8d7a-1054x1428.jpg"
          readTime={t("caseStudies.furnitureVillage.readTime")}
        />
      </div>
      <a href="/case-studies">
        <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
          {t("caseStudies.viewAll")} <MoveRight className="size-4" />
        </Button>
      </a>
    </section>
  )
}
