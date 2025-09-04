"use client";

import { cn } from "@/lib/utils";

export const Spinner = ({ size = "md", color = "text-primary", className }) => {
  const barCount = 12;
  const animationDuration = 1.2;
  const animationDelayStep = animationDuration / barCount;

  const barWidth = {
    sm: "w-[1.5px]",
    md: "w-[2px]",
    lg: "w-[2.5px]",
  }[size];

  const barHeight = {
    sm: "h-[6px]",
    md: "h-[8px]",
    lg: "h-[10px]",
  }[size];

  const translateYValue = {
    sm: 8,
    md: 10,
    lg: 12,
  }[size];

  const containerSize = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
  }[size];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={cn("relative", containerSize, className)}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full bg-current left-1/2 top-1/2",
            barWidth,
            barHeight,
            color,
            "animate-[ios-loader-fade_1.2s_linear_infinite]"
          )}
          style={{
            transform: `translate(-50%, -50%) rotate(${
              i * (360 / barCount)
            }deg) translateY(-${translateYValue}px)`,
            animationDelay: `${i * animationDelayStep - animationDuration}s`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
};

export function PageLoader({ 
  title = "Loading...", 
  description,
  className 
}) {
  return (
    <div className={cn(
      "flex h-screen w-full items-center justify-center",
      className
    )}>
      <div className="text-center space-y-4">
        <Spinner size="lg" className="mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductPageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-full">
        <Spinner size="lg" />
    </div>
  );
}

export function ProductsPageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-full">
        <Spinner size="lg" />
    </div>
  );
} 