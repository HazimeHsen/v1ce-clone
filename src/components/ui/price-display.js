"use client";

import { useCurrency } from "@/context/currency-context";
import { Skeleton } from "./skeleton";

export default function PriceDisplay({
  price,
  fromCurrency = "AMD",
  className = "",
  showLoading = true,
}) {
  const {
    formatPrice,
    isLoading: rateLoading,
    selectedCurrency,
  } = useCurrency();

  const isLoading =
    showLoading && rateLoading && selectedCurrency.code !== "AMD";

  if (isLoading) {
    return (
      <Skeleton className={`h-5 w-20 ${className}`} />
    );
  }

  return (
    <span className={className}>
      {formatPrice(price, selectedCurrency, fromCurrency)}
    </span>
  );
}
