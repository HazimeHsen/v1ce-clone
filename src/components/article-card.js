import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";

export default function ArticleCard({
  href,
  imageSrc,
  imageAlt,
  badgeText,
  title,
  description,
  authorName,
  authorAvatarSrc,
  readTime,
}) {
  return (
    <a
      href={href}
      className="group flex h-fit basis-1/3 flex-col items-start overflow-hidden rounded-xl p-4 container hover:bg-secondary"
    >
      <div className="w-full">
        <div className="relative w-full pb-[56.25%]">
          <div className="overflow-hidden rounded-lg absolute inset-0">
            <div className="relative size-full overflow-hidden">
              <img
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03] absolute h-full w-full inset-0"
                src={imageSrc || "/placeholder.svg"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex size-full flex-col items-start gap-4 pb-2 pt-5">
        <div className="flex h-14 flex-wrap items-start justify-start gap-2 overflow-hidden">
          <Badge className="inline-flex items-center gap-[10px] rounded-full border px-4 py-1 transition-colors focus:outline-none border-transparent bg-primary/10 text-primary cursor-pointer whitespace-nowrap text-xs font-medium">
            {badgeText}
          </Badge>
        </div>
        <h3 className="text-2xl font-semibold leading-[1.625rem]">{title}</h3>
        <div className="flex size-full flex-col items-start gap-2">
          <p className="font-medium leading-[17px] text-muted-foreground">
            {description}
          </p>
          <div className="mt-auto flex w-full items-end justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <AvatarImage
                  className="aspect-square h-full w-full object-cover"
                  alt={authorName}
                  src={authorAvatarSrc || "/placeholder.svg"}
                />
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="whitespace-nowrap font-medium">
                  {authorName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {readTime}
                </span>
              </div>
            </div>
            <ArrowUpRight className="size-7" />
          </div>
        </div>
      </div>
    </a>
  );
}
