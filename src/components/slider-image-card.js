export default function SliderImageCard({
  imageSrc,
  imageAlt,
  isAfter = false,
}) {
  return (
    <div className="relative ml-4 h-[260px] w-[200px] shrink-0 grow-0 basis-auto rounded-xl border border-border bg-secondary">
      <img
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className={`object-contain object-center ${isAfter ? "p-2" : "p-0"}`}
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
  );
}
