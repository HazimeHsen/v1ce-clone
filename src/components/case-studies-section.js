import ArticleCard from "./article-card"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"

export default function CaseStudiesSection() {
  return (
    <section className="center-narrow flex flex-col items-center py-12">
      <div className="flex w-full flex-col gap-4 py-8 md:grid md:grid-cols-2 md:gap-8">
        <ArticleCard
          href="/case-studies/adaptix-v1ce-nfc-business-card-review-bulk-management"
          imageSrc="https://cdn.sanity.io/images/jvl9ycqq/production/5ddd7582ca7783b90e3bacce74d0dcb1d596941d-520x293.webp"
          imageAlt="How Adaptix Updated 500+ NFC Business Cards in Minutes with V1CE image"
          badgeText="Sustainability"
          title="How Adaptix Updated 500+ NFC Business Cards in Minutes with V1CE"
          description="See how Adaptix streamlined their networking by updating over 500 NFC business cards in minutes using V1CE."
          authorName="Haydn Price"
          authorAvatarSrc="https://cdn.sanity.io/images/jvl9ycqq/production/e57def69ba19ed255ef84e48cd030c8d4a6c8d7a-1054x1428.jpg"
          readTime="10 min read"
        />
        <ArticleCard
          href="/case-studies/furniture-village-v1ce-digital-business-card-review-cost-savings"
          imageSrc="https://cdn.sanity.io/images/jvl9ycqq/production/7108a14603f84cc4930b98db312f2adf571d957d-520x299.webp"
          imageAlt="How Furniture Village Cut Costs by 70% with V1CE Digital Business Cards image"
          badgeText="Retail"
          title="How Furniture Village Cut Costs by 70% with V1CE Digital Business Cards"
          description="Furniture Village saved 3,000 admin hours and 75,000 paper cards using V1CE digital business cards. Discover their sustainable success."
          authorName="Haydn Price"
          authorAvatarSrc="https://cdn.sanity.io/images/jvl9ycqq/production/e57def69ba19ed255ef84e48cd030c8d4a6c8d7a-1054x1428.jpg"
          readTime="8 min read"
        />
      </div>
      <a href="/case-studies">
        <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
          View All Case Studies <MoveRight className="size-4" />
        </Button>
      </a>
    </section>
  )
}
