import { Star, StarHalf } from "lucide-react";

export default function Ratings({
  rating,
  size = 20,
  fillColorClass = "fill-primary",
  strokeColorClass = "stroke-primary",
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center justify-items-center gap-2"
      property="reviewRating"
      typeof="Rating"
    >
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <div key={`full-${i}`} className="relative">
            <Star
              className={`w-${size / 4} h-${
                size / 4
              } ${strokeColorClass} ${fillColorClass}`}
            />
          </div>
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={`absolute w-${size / 4} h-${
                size / 4
              } ${strokeColorClass}`}
            />
            <StarHalf
              className={`w-${size / 4} h-${
                size / 4
              } ${strokeColorClass} ${fillColorClass}`}
            />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <div key={`empty-${i}`} className="relative">
            <Star
              className={`w-${size / 4} h-${size / 4} ${strokeColorClass}`}
            />
          </div>
        ))}
      </div>
      <span property="ratingValue" className="hidden text-sm font-medium">
        {rating}
      </span>
    </div>
  );
}
