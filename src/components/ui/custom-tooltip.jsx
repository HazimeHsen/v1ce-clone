"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CustomTooltip({ children, content, side = "top", className }) {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipClasses = cn(
    "absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg md:whitespace-nowrap",
    "opacity-0 pointer-events-none transition-all duration-200 ease-in-out",
    isVisible && "opacity-100 pointer-events-auto",
    {
      "bottom-full left-1/2 transform -translate-x-1/2 mb-2 max-w-[calc(100vw-2rem)]":
        side === "top",
      "top-full left-1/2 transform -translate-x-1/2 mt-2 max-w-[calc(100vw-2rem)]":
        side === "bottom",
      "right-full top-1/2 transform -translate-y-1/2 mr-2 max-w-[calc(100vw-2rem)]":
        side === "left",
      "left-full top-1/2 transform -translate-y-1/2 ml-2 max-w-[calc(100vw-2rem)]":
        side === "right",
    },
    className
  );

  const arrowClasses = cn("absolute w-2 h-2 bg-gray-900 transform rotate-45", {
    "top-full left-1/2 transform -translate-x-1/2 -mt-1": side === "top",
    "bottom-full left-1/2 transform -translate-x-1/2 -mb-1": side === "bottom",
    "top-1/2 left-full transform -translate-y-1/2 -ml-1": side === "left",
    "top-1/2 right-full transform -translate-y-1/2 -mr-1": side === "right",
  });

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <div className={tooltipClasses}>
        {content}
        <div className={arrowClasses} />
      </div>
    </div>
  );
}
