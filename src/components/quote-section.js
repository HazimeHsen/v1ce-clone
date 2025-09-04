import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function QuoteSection() {
  return (
    <section className="w-full bg-secondary">
      <div className="center-narrow flex flex-col items-center gap-5 py-10">
        <Badge className="inline-flex items-center gap-[10px] rounded-full border px-4 py-1 text-[14px] font-medium transition-colors focus:outline-none border-transparent bg-primary/10 text-primary">
          Case Study
        </Badge>
        <a
          className="max-w-[700px] text-center text-2xl font-bold hover:underline md:text-3xl"
          href="/case-studies/furniture-village-mibio-digital-business-card-review-cost-savings"
        >
          <q>
            Managing cards for 40+ staff was chaos. Mibio made setup fast and
            lead capture automatic.
          </q>
        </a>
        <div className="flex items-center gap-2">
          <Avatar className="relative flex shrink-0 overflow-hidden rounded-full size-11">
            <AvatarImage
              className="aspect-square h-full w-full object-cover"
              alt="Charlie Harrison"
              src="https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4030f710-bbce-4a18-5591-66121185e100/thumbnail"
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">Charlie Harrison</span>
            <p className="text-muted-foreground">CEO - Furniture Village</p>
          </div>
        </div>
      </div>
    </section>
  );
}
