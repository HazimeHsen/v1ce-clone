"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/loader";

export default function CurrencySwitcher() {
  const { selectedCurrency, changeCurrency, isLoading, ratesLoading, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [converting, setConverting] = useState(false);

  const handleCurrencyChange = async (currencyCode) => {
    setConverting(true);
    await changeCurrency(currencyCode);
    setConverting(false);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <Spinner size="sm" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 h-auto text-sm font-medium text-muted-foreground hover:text-primary"
          disabled={ratesLoading || converting}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {selectedCurrency.name}
          </span>
          <span className="sm:hidden">
            {selectedCurrency.name}
          </span>
          {(ratesLoading || converting) ? (
            <Spinner size="sm" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Select Currency
        </div>
        <DropdownMenuSeparator />
        
        {/* Popular currencies first */}
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Popular
        </div>
        {currencies.slice(0, 10).map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => handleCurrencyChange(currency.code)}
            className="flex items-center justify-between px-3 py-2 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-medium">{currency.name}</div>
                <div className="text-xs text-muted-foreground">{currency.code}</div>
              </div>
            </div>
            {selectedCurrency.code === currency.code && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {/* All other currencies */}
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          All Currencies
        </div>
        {currencies.slice(10).map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => handleCurrencyChange(currency.code)}
            className="flex items-center justify-between px-3 py-2 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-medium">{currency.name}</div>
                <div className="text-xs text-muted-foreground">{currency.code}</div>
              </div>
            </div>
            {selectedCurrency.code === currency.code && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
