export default function ProductCard({
  href,
  imageSrc,
  imageAlt,
  badgeText,
  title,
  description,
  price,
  colorSwatches,
}) {
  return (
    <a
      className="group relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[15px] border border-border/40 bg-card transition-all hover:border-primary"
      href={href}
    >
      <div className="w-full">
        <div
          style={{ position: "relative", width: "100%", paddingBottom: "100%" }}
          data-radix-aspect-ratio-wrapper=""
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
              {badgeText && (
                <div className="absolute left-3 top-3 z-10 flex gap-1 text-xs font-semibold lg:text-sm">
                  <div className="inline-flex items-center gap-[10px] rounded-full border border-border px-4 py-1 text-[14px] font-medium transition-colors focus:outline-none bg-background text-foreground">
                    {badgeText}
                  </div>
                </div>
              )}
              <button
                data-state="closed"
                className="group/tooltip absolute bottom-3 right-3 z-10"
                aria-label="Customize product"
              >
                <div className="flex size-[30px] items-center justify-center rounded-full border border-border bg-background">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-palette transition-all duration-200 ease-in-out hover:stroke-neutral-600"
                  >
                    <circle
                      cx="13.5"
                      cy="6.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <circle
                      cx="17.5"
                      cy="10.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <circle
                      cx="8.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <circle
                      cx="6.5"
                      cy="12.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                  </svg>
                </div>
              </button>
              <img
                alt={imageAlt}
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
                src={imageSrc || "/placeholder.svg"}
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
            <span className="">{price}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
