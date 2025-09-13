import Link from "next/link";
import ColorSwatches from "./color-swatches";
import PriceDisplay from "./ui/price-display";
import { useTranslations } from "@/hooks/use-translations";

export default function ProductCard({ product }) {
  const { t } = useTranslations();
  const { handle, thumbnail, title, variants } = product;

  const colorSwatches = variants?.map((variant) => {
    const combo = variant.title;
    const colors = combo.split("&").map((c) => c.trim().toLowerCase());
    return { title: combo, colors };
  });

  const hasPrice = variants && variants.length > 0;
  const price = hasPrice ? variants[0].calculated_price?.calculated_amount || 0 : null;

  return (
    <Link
      className="group relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[15px] border border-border/40 bg-card transition-all hover:border-primary"
      href={"/products/" + handle}
    >
      <div className="w-full">
        <div
          style={{ position: "relative", width: "100%", paddingBottom: "100%" }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <div className="relative size-full overflow-hidden">
              {product.tags?.length > 0 && (
                <div className="absolute left-3 top-3 z-10 flex gap-1 text-xs font-semibold lg:text-sm">
                  <div className="inline-flex items-center gap-[10px] rounded-full border border-border px-4 py-1 text-[14px] font-medium transition-colors focus:outline-none bg-background text-foreground">
                    {product.tags[0]}
                  </div>
                </div>
              )}

              <img
                alt={title}
                loading="eager"
                decoding="async"
                className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.02]"
                style={{ position: "absolute", inset: 0 }}
                src={thumbnail || "/placeholder.svg"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex size-full flex-col items-start justify-between gap-[10px] p-4">
        <div className="mb-2 flex flex-col items-start justify-between gap-2">
          <span className="text-h6">{title}</span>
        </div>

        <ColorSwatches swatches={colorSwatches} />

        <div className="flex items-center gap-2">
          <div className="text-l1 flex gap-1" id="price">
            {hasPrice ? (
              <PriceDisplay price={price} />
            ) : (
              <span>{t("product.contactForPrice")}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
