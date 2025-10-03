"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, X } from "lucide-react";
import { Spinner } from "@/components/ui/loader";
import PriceDisplay from "@/components/ui/price-display";

export default function OrderSummary({ 
  displayItems,
  loadingCartItems,
  cartItems,
  cart,
  updatingItems,
  handleDecrease,
  handleIncrease,
  handleRemove,
  totalItems,
  subtotal,
  shipping,
  refetchingShipping,
  refetchingCart,
  getItemImage,
  getItemTitle,
  getItemVariantTitle,
  t
}) {
  // Debug cart data
  console.log("OrderSummary cart data:", {
    cart,
    discountTotal: cart?.discount_total,
    promotions: cart?.promotions,
    total: cart?.total,
    subtotal,
    shipping
  });
  return (
    <Card className="bg-card/80 border-border/50 sticky top-8">
      <CardHeader className="border-b border-border/50 bg-secondary/20">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          {t("checkout.orderSummary")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loadingCartItems ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <Spinner size="sm" />
              <p className="text-muted-foreground">{t("cart.loading")}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 border border-border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
              >
                <div className="relative">
                  <Image
                    src={getItemImage(item)}
                    alt={getItemTitle(item)}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  >
                    {item.quantity}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {getItemTitle(item)}
                  </h3>
                  {getItemVariantTitle(item) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {getItemVariantTitle(item)}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 transition-all duration-200 border-secondary/50 hover:bg-secondary/30 ${
                          updatingItems.has(item.id) ? 'opacity-70' : 'opacity-100'
                        }`}
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className={`text-sm font-medium min-w-[24px] text-center transition-all duration-200 ${
                        updatingItems.has(item.id) ? 'opacity-60 scale-95' : 'opacity-100 scale-100'
                      }`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 transition-all duration-200 border-secondary/50 hover:bg-secondary/30 ${
                          updatingItems.has(item.id) ? 'opacity-70' : 'opacity-100'
                        }`}
                        onClick={() => handleIncrease(item.id, item.quantity)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        const originalItem = cartItems.find(ci => ci.id === item.id) || item;
                        handleRemove(originalItem.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  {refetchingCart ? (
                    <>
                      <Skeleton className="h-4 w-16 ml-auto mb-1" />
                      <Skeleton className="h-5 w-20 ml-auto" />
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        <PriceDisplay price={item.unit_price || 0} /> each
                      </p>
                      <p className="font-semibold text-foreground">
                        <PriceDisplay price={(item.unit_price || 0) * item.quantity} />
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Separator className="bg-border/50" />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("checkout.subtotal")} ({totalItems} items)</span>
            {refetchingCart ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <span className="text-foreground"><PriceDisplay price={subtotal} /></span>
            )}
          </div>
          
          {(cart?.discount_total && cart.discount_total > 0) ?(
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("checkout.discount")}
                {cart?.promotions && cart.promotions.length > 0 && ` (${cart.promotions[0].code})`}
              </span>
              {refetchingCart ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                <span className="text-green-600">
                  -<PriceDisplay price={cart.discount_total} />
                </span>
              )}
            </div>
          ) : null}
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("checkout.shipping")}</span>
            {refetchingShipping ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <span className="text-foreground">
                {shipping === 0 ? (
                  <span className="text-primary">{t("checkout.free")}</span>
                ) : (
                  <PriceDisplay price={shipping} />
                )}
              </span>
            )}
          </div>
          <Separator className="bg-border/50" />
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>{t("checkout.total")}</span>
            {refetchingShipping || refetchingCart ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <span className="text-primary">
                <PriceDisplay price={subtotal - (cart?.discount_total || 0) + shipping} />
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 