"use client";

const ColorSwatches = ({
  swatches,
  size = 20,
  selectedSwatch,
  onSwatchSelect = () => {},
}) => {
  if (!swatches || swatches.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {swatches.map((swatch, index) => (
        <button
          key={index}
          aria-disabled="false"
          title={swatch.title}
          onClick={() => onSwatchSelect(swatch, index)}
          className={`relative aspect-square rounded-full border rotate-45 transition-all ${
            selectedSwatch === index
              ? "border-black border-2 ring-2 ring-black ring-offset-2"
              : "border-border hover:border-gray-400"
          }`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `linear-gradient(90deg, ${swatch.colors[0]} 50%, ${
              swatch.colors[1] || swatch.colors[0]
            } 50%)`,
          }}
        />
      ))}
    </div>
  );
};

export default ColorSwatches;
