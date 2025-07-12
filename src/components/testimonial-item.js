export default function TestimonialItem({
  logoSrc,
  logoAlt,
  quote,
  name,
  title,
  thumbnailSrc,
  thumbnailAlt,
}) {
  return (
    <div className="group flex w-full flex-col gap-3 container">
      <div className="relative overflow-hidden rounded-lg">
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "177.77777777777777%",
          }}
          data-radix-aspect-ratio-wrapper=""
        >
          <div
            className="w-full"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <div className="pointer-events-none absolute bottom-0 z-50 flex w-full flex-col gap-3 bg-black/30 p-2 py-4 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0 xs:p-5">
              <div className="relative flex h-6 w-24 items-start lg:h-[35px] lg:w-[150px]">
                <img
                  alt={logoAlt}
                  loading="lazy"
                  decoding="async"
                  className="object-contain object-left"
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
                  src={logoSrc || "/placeholder.svg"}
                />
              </div>
              <div className="flex flex-col text-white">
                <div className="flex h-[100px] items-center">
                  <q className="mb-3 text-sm font-medium xs:text-lg xs:font-semibold">
                    {quote}
                  </q>
                </div>
                <span className="text-sm font-semibold">{name}</span>
                <span className="text-sm font-medium">{title}</span>
              </div>
            </div>
            <div className="group size-full cursor-pointer overflow-hidden rounded-lg container">
              <div className="relative block size-full false">
                <div className="absolute right-2 top-2 z-40 -translate-y-0 select-none transition-all duration-200 ease-in-out group-hover:scale-95 xs:left-1/2 xs:right-auto xs:top-1/2 xs:-translate-x-1/2 xs:-translate-y-1/2">
                  <div className="inline-flex items-center justify-center rounded-full bg-black/50 p-2 backdrop-blur-lg xs:p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#fff"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-play size-4 text-white xs:size-6"
                    >
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 z-30 h-24 w-full bg-gradient-to-t from-primary/20 to-transparent"></div>
                <img
                  alt={thumbnailAlt}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none z-20 transition-all duration-700 ease-in-out group-hover:scale-105 object-cover"
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
                  src={thumbnailSrc || "/placeholder.svg"}
                />
              </div>
              <div className="relative size-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
