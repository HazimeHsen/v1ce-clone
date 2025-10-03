"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Truck } from "lucide-react";

export default function ShippingMethodForm({
  shippingOptions,
  selectedShippingOption,
  setSelectedShippingOption,
  addShippingMethod,
  formatPrice,
  refetchingShipping,
  t
}) {
  console.log("ShippingMethodForm shippingOptions", shippingOptions);
  console.log("ShippingMethodForm selectedShippingOption", selectedShippingOption);
  console.log("ShippingMethodForm refetchingShipping", refetchingShipping);

  const handleShippingOptionChange = async (optionId) => {
    const option = shippingOptions.find(opt => opt.id === optionId);
    if (option) {
      setSelectedShippingOption(option);
      await addShippingMethod(option.id);
    }
  };

  if (!shippingOptions || shippingOptions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card/80 border-border/50 sticky top-8">
      <CardHeader className="border-b border-border/50 bg-secondary/20">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          {t("checkout.shippingMethod")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup
          value={selectedShippingOption?.id}
          onValueChange={handleShippingOptionChange}
          className="space-y-3"
        >
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-border/50 bg-secondary/5 hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex flex-col items-start cursor-pointer">
                  <span className="font-medium text-foreground">{option.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {option.description || t("checkout.estimatedDelivery")}
                  </span>
                </Label>
              </div>
               <div className="text-right">
                 {refetchingShipping ? (
                   <Skeleton className="h-5 w-20 ml-auto" />
                 ) : (
                   <span className="font-medium text-foreground">
                     {option.amount === 0 ? (
                       <span className="text-primary">{t("checkout.free")}</span>
                     ) : (
                       `${formatPrice(option.amount)}`
                     )}
                   </span>
                 )}
               </div>
            </div>
          ))}
        </RadioGroup>
        {shippingOptions.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            {t("checkout.noShippingOptions")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
