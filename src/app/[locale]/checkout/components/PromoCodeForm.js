"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tag, X, Check, AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/loader";
import PriceDisplay from "@/components/ui/price-display";

export default function PromoCodeForm({ 
  cart, 
  setCart, 
  formatPrice, 
  t 
}) {
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const appliedPromotions = cart?.promotions || [];
  
  // Debug promotion structure
  console.log("Applied promotions:", appliedPromotions);

  const addPromoCode = async () => {
    if (!promoCode.trim()) {
      setError(t("checkout.promoCode.enterCode"));
      return;
    }

    if (!cart?.id) {
      setError(t("checkout.promoCode.noCart"));
      return;
    }

    // Check if there's already a promo code applied
    if (appliedPromotions.length > 0) {
      setError(t("checkout.promoCode.onlyOneAllowed"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BASE_URL}/store/carts/${cart.id}/promotions`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          promo_codes: [promoCode.trim()],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("checkout.promoCode.invalidCode"));
      }

      setCart(data.cart);
      setPromoCode("");
    } catch (err) {
      console.error("Failed to apply promo code:", err);
      setError(err.message || t("checkout.promoCode.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const removePromoCode = async (code) => {
    if (!cart?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BASE_URL}/store/carts/${cart.id}/promotions`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
        },
        body: JSON.stringify({
          promo_codes: [code],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("checkout.promoCode.removeError"));
      }

      setCart(data.cart);
    } catch (err) {
      console.error("Failed to remove promo code:", err);
      setError(err.message || t("checkout.promoCode.removeError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addPromoCode();
    }
  };

  return (
    <Card className="bg-card/80 border-border/50">
      <CardHeader className="border-b border-border/50 bg-secondary/20">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          {t("checkout.promoCode.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code Input - Only show if no promotions are applied */}
        {appliedPromotions.length === 0 && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t("checkout.promoCode.placeholder")}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={addPromoCode}
                disabled={isLoading || !promoCode.trim()}
                className="px-6"
                loading={isLoading}
              >
                {t("checkout.promoCode.apply")}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

          </div>
        )}

        {/* Applied Promotions */}
        {appliedPromotions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              {t("checkout.promoCode.appliedPromotions")}
            </h4>
            {appliedPromotions.map((promotion, index) => {
              // Get the actual discount amount from cart
              const discountAmount = cart?.discount_total || 0;
              
              // Calculate discount percentage from cart subtotal
              const subtotal = cart?.items?.reduce((sum, item) => sum + (item.unit_price || 0) * item.quantity, 0) || 0;
              const discountPercentage = subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;
              
              // Debug
              console.log("Promotion details:", {
                promotion,
                discountAmount,
                subtotal,
                discountPercentage
              });
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/10 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {promotion.code}
                    </Badge>
                    <span className="text-sm text-foreground">
                      {discountAmount > 0 ? (
                        discountPercentage > 0 ? (
                          `${discountPercentage}% ${t("checkout.promoCode.off")}`
                        ) : (
                          `${formatPrice(discountAmount)} ${t("checkout.promoCode.off")}`
                        )
                      ) : (
                        t("checkout.promoCode.applied")
                      )}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePromoCode(promotion.code)}
                    disabled={isLoading}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
