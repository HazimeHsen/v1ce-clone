export default function ProductCard({ product }) {
  const { handle, thumbnail, title, description, variants } = product;

  const colorSwatches = product.options?.map((opt) => {
    return {
      alt: opt.title,
      src: product.images?.[0]?.url || "/placeholder.svg",
    };
  });

  const price = "Contact for Price";

  return (
    <a
      className="group relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[15px] border border-border/40 bg-card transition-all hover:border-primary"
      href={"/product/" + handle}
    >
      <div className="w-full">
        <div
          style={{ position: "relative", width: "100%", paddingBottom: "100%" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <div className="relative size-full overflow-hidden">
              {/* Badge example */}
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
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                src={thumbnail || "/placeholder.svg"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex size-full flex-col items-start justify-between gap-[10px] p-4">
        <div className="mb-2 flex flex-col items-start justify-between gap-2">
          <span className="text-h6">{title}</span>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {colorSwatches && colorSwatches.length > 0 && (
          <div className="flex w-full flex-wrap gap-1.5">
            {colorSwatches.map((swatch, index) => (
              <button
                key={index}
                aria-disabled="false"
                title={swatch.alt}
                className="relative aspect-square overflow-hidden rounded-full"
                style={{ width: "20px", height: "20px" }}
              >
                <img
                  alt={swatch.alt}
                  loading="eager"
                  width="20"
                  height="20"
                  decoding="async"
                  className="rounded-full"
                  style={{ color: "transparent" }}
                  src={swatch.src || "/placeholder.svg"}
                />
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="text-l1 flex gap-1" id="price">
            <span>{price}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
