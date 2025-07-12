export default function ComparisonCard({
  title,
  bgColorClass,
  textColorClass,
  imageSrc,
  imageAlt,
  imagePositionClass,
  features,
}) {
  return (
    <div className="relative flex flex-col">
      <img
        alt={imageAlt}
        loading="lazy"
        width="500"
        height="500"
        decoding="async"
        className={`absolute -bottom-14 hidden w-[270px] object-cover sm:block md:w-[300px] lg:-bottom-28 lg:w-[270px] xl:-bottom-32 xl:w-[310px] ${imagePositionClass}`}
        style={{ color: "transparent" }}
        src={imageSrc || "/placeholder.svg"}
      />
      <div
        className={`flex h-full w-full flex-1 flex-col gap-3 rounded-lg p-3 ${bgColorClass} ${textColorClass}`}
      >
        <h3 className="text-center text-xl font-semibold">{title}</h3>
        <ul className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-card p-4 pb-0 text-card-foreground sm:pb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check mt-1 aspect-square size-5 rounded-full bg-primary p-0.5 text-white"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <div className="flex w-full flex-col gap-2">
                <h4 className="font-medium leading-tight">{feature.title}</h4>
                {feature.description && (
                  <p className="text-sm leading-tight">{feature.description}</p>
                )}
              </div>
            </li>
          ))}
          {title === "Paper Business Card" && (
            <img
              alt={imageAlt}
              loading="lazy"
              width="500"
              height="500"
              decoding="async"
              className={`-ml-6 mt-auto block w-full object-cover sm:hidden ${imagePositionClass}`}
              style={{ color: "transparent" }}
              src={imageSrc || "/placeholder.svg"}
            />
          )}
          {title === "V1CE Smart Business Card" && (
            <img
              alt={imageAlt}
              loading="lazy"
              width="500"
              height="500"
              decoding="async"
              className={`-ml-6 mt-auto block w-full object-cover sm:hidden ${imagePositionClass}`}
              style={{ color: "transparent" }}
              src={imageSrc || "/placeholder.svg"}
            />
          )}
        </ul>
      </div>
    </div>
  );
}
