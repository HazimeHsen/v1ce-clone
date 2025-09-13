"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { useCurrency } from "@/context/currency-context";
import { useTranslations } from "@/hooks/use-translations";
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
  const { t } = useTranslations();
  const {
    selectedCurrency,
    changeCurrency,
    isLoading,
    ratesLoading,
    currencies,
  } = useCurrency();
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
        <span className="text-sm text-muted-foreground">{t('currencySwitcher.loading')}</span>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 h-auto text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
          disabled={ratesLoading || converting}
        >
          <div className="flex items-center gap-2">
            <Image
              src={selectedCurrency.flag}
              alt={`${selectedCurrency.name} flag`}
              width={24}
              height={16}
              className="rounded-[3px] object-cover"
            />
            <span className="font-medium">{selectedCurrency.code}</span>
          </div>
          {ratesLoading || converting ? (
            <Spinner size="sm" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 max-h-80 overflow-y-auto space-y-1"
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {t('currencySwitcher.selectCurrency')}
        </div>
        <DropdownMenuSeparator />

        {currencies.map((currency) => {
          const isSelected = selectedCurrency.code === currency.code;
          return (
            <DropdownMenuItem
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className={`flex items-center justify-between px-3 py-2 outline-none cursor-pointer transition-colors ${
                isSelected 
                  ? 'bg-primary/10 font-semibold' 
                  : 'hover:bg-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={currency.flag}
                  alt={`${currency.name} flag`}
                  width={24}
                  height={16}
                  className="rounded-[3px] object-cover flex-shrink-0"
                />
                <div className="flex flex-col">
                  <div className="text-sm font-medium">{currency.name}</div>
                  <div className="text-xs text-muted-foreground">{currency.code}</div>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
