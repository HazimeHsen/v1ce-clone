import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function QuoteSection2() {
  return (
    <section className="w-full bg-secondary">
      <div className="center-narrow flex flex-col items-center gap-5 py-10">
        <Badge className="inline-flex items-center gap-[10px] rounded-full border px-4 py-1 text-[14px] font-medium transition-colors focus:outline-none border-transparent bg-primary/10 text-primary">
          Case Study
        </Badge>
        <a
          className="max-w-[700px] text-center text-2xl font-bold hover:underline md:text-3xl"
          href="/case-studies/dillard-s-reimagines-retail-networking-with-mibio-digital-business-cards"
        >
          <q>
            Our team shared profiles instantly, scanned badges, and synced leads in real time. No missed follow-ups, no
            data entry.
          </q>
        </a>
        <div className="flex items-center gap-2">
          <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-11">
            <AvatarImage
              className="aspect-square h-full w-full object-cover"
              alt="Chris Sarjant"
              src="https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/84d64f5f-e61b-4bc3-f967-09e0e5b37200/thumbnail"
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">Chris Sarjant</span>
            <p className="text-muted-foreground">AGM - Dillards</p>
          </div>
        </div>
      </div>
    </section>
  )
}
