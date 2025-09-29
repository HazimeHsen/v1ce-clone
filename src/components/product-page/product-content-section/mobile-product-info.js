"use client";

import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import ColorSwatches from "@/components/color-swatches";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "@/hooks/use-translations";
import { getLocalizedTitle, getLocalizedSubtitle } from "@/lib/translation-utils";
import { useParams } from "next/navigation";
import { useStore } from "@/context/store-context";
import { useState } from "react";
import { Spinner } from "@/components/ui/loader";
import { useCurrency } from "@/context/currency-context";
import PriceDisplay from "@/components/ui/price-display";

export default function MobileProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  selectedBundle,
  setSelectedBundle,
  quantityBundles,
  colorSwatches,
  formatPrice,
  basePrice,
  selectedSwatchIndex,
  handleSwatchSelect,
  decrementQuantity,
  incrementQuantity,
}) {
  const { locale } = useParams();
  
  // Get localized content
  const localizedTitle = getLocalizedTitle(product, locale);
  const localizedSubtitle = getLocalizedSubtitle(product, locale);
  const { t } = useTranslations();
  const { addToCart, openCart } = useStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartError, setCartError] = useState(null);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      setCartError(null);

      if (!product?.variants?.length) {
        throw new Error("No product variants available");
      }

      if (!selectedBundle) {
        throw new Error("Please select a quantity option");
      }

      if (!selectedColor) {
        throw new Error("Please select a color");
      }

      const selectedVariant = product.variants.find(
        (v) => v.title === selectedColor
      );

      if (!selectedVariant) {
        throw new Error("Please select a valid color");
      }

      const selectedQuantityBundle = quantityBundles.find(
        (b) => b.id === selectedBundle
      );
      const bundleQuantity = selectedQuantityBundle?.quantity || 1;
      const totalQuantity = bundleQuantity * quantity;

      await addToCart(selectedVariant.id, totalQuantity);

      setTimeout(() => {
        openCart();
      }, 500);

      console.log("Successfully added to cart:", {
        variant: selectedVariant.title,
        bundleQuantity,
        userQuantity: quantity,
        totalQuantity,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      setCartError(error.message || "Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isAddToCartDisabled =
    isAddingToCart ||
    !product?.variants?.length ||
    !selectedBundle ||
    !selectedColor;

  return (
    <div className="flex flex-col gap-4 md:hidden">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-semibold">
            {localizedTitle || t("product.quantityBundles.defaultTitle")}
          </h1>
          <h2 className="text-sm font-medium text-muted-foreground">
            {localizedSubtitle}
          </h2>
        </div>
        
        <button className="reviews cursor-pointer" type="button">
          <div
            className="flex items-center justify-items-center gap-2"
            property="reviewRating"
            typeof="Rating"
          >
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <div key={`star-full-${i}`} className="relative">
                  <Star
                    className="lucide lucide-star w-4 fill-white stroke-white"
                    width="20"
                    height="20"
                  />
                </div>
              ))}
              <div className="relative">
                <div className="relative top-0">
                  <Star
                    className="lucide lucide-star absolute w-4 stroke-white"
                    width="20"
                    height="20"
                  />
                  <StarHalf
                    className="lucide lucide-star-half w-4 fill-white stroke-white"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
            </div>
            <span
              property="ratingValue"
              className="hidden text-sm font-medium"
            >
              4.89
            </span>
            <p className="text-sm text-white" property="reviewCount">
              (518)
            </p>
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted-foreground">
          {t("product.quantityBundles.colour")}{" "}
          <span className="font-medium text-white">
            {selectedColor || t("product.quantityBundles.noneSelected")}
          </span>
          {selectedColor && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({formatPrice(basePrice)})
            </span>
          )}
        </label>
        <div className="ml-1.5">
          <ColorSwatches
            swatches={colorSwatches}
            size={24}
            selectedSwatch={
              selectedSwatchIndex >= 0 ? selectedSwatchIndex : null
            }
            onSwatchSelect={handleSwatchSelect}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-muted-foreground">
          {t("product.quantityBundles.quantity")}
        </label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="min-w-[2rem] text-center text-base font-semibold">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
            onClick={incrementQuantity}
            disabled={quantity >= 100}
          >
            +
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Accordion
          type="single"
          collapsible
          value={selectedBundle}
          onValueChange={setSelectedBundle}
          className="w-full"
        >
          {quantityBundles
            .filter((bundle) => bundle.id === "1-item")
            .map((bundle) => (
              <AccordionItem
                key={bundle.id}
                value={bundle.id}
                className={`box-border border rounded-lg data-[state=open]:border-2 data-[state=open]:bg-secondary transition-colors duration-150 ease-out ${
                  selectedBundle === bundle.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
              >
                <AccordionTrigger
                  arrow={false}
                  className="relative flex w-full flex-col p-0 hover:no-underline data-[state=open]:no-underline"
                >
                  <div className="flex w-full">
                    <div className="flex w-full cursor-pointer flex-row items-center justify-between p-4">
                      <div className="flex w-full items-center gap-3">
                        <div
                          className={`aspect-square size-2 rounded-full ring-1 ring-muted ring-offset-2 ${
                            selectedBundle === bundle.id
                              ? "bg-primary"
                              : "bg-white"
                          }`}
                        ></div>
                        <span className="text-left text-sm font-semibold leading-tight">
                          {bundle.name}
                        </span>
                      </div>
                      <div className="ml-2 text-right text-sm font-semibold">
                        <PriceDisplay price={bundle.price} />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="mx-4 space-y-2 text-xs text-muted-foreground">
                    {bundle.description.map((desc, index) => (
                      <p key={index}>• {desc}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        <div className="rounded-xl bg-secondary px-2 py-3 border space-y-2">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-foreground">
              {t("product.quantityBundles.limitedTimeOnly")}
            </h3>
          </div>
          <Accordion
            type="single"
            collapsible
            value={selectedBundle}
            onValueChange={setSelectedBundle}
            className="w-full space-y-2"
          >
            {quantityBundles
              .filter((bundle) => bundle.id !== "1-item")
              .map((bundle) => (
                <AccordionItem
                  key={bundle.id}
                  value={bundle.id}
                  className={`box-border overflow-hidden rounded-lg border border-muted data-[state=open]:border-2 data-[state=open]:bg-background bg-background transition-colors duration-150 ease-out ${
                    selectedBundle === bundle.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <AccordionTrigger
                    arrow={false}
                    className="relative flex w-full flex-col p-0 hover:no-underline data-[state=open]:no-underline"
                  >
                    {bundle.popular && (
                      <div className="flex w-full justify-center rounded-t-lg border-transparent bg-primary/10 py-1 font-semibold text-primary">
                        {t("product.quantityBundles.mostPopular")}
                      </div>
                    )}
                    <div className="flex w-full">
                      <div className="flex w-full cursor-pointer flex-row items-center justify-between p-3">
                        <div className="flex w-full items-center gap-3">
                          <div
                            className={`aspect-square size-2 rounded-full ring-1 ring-muted ring-offset-2 ${
                              selectedBundle === bundle.id
                                ? "bg-primary"
                                : "bg-white"
                            }`}
                          ></div>
                          <div className="flex flex-col items-start">
                            <span className="text-left text-sm font-semibold leading-tight">
                              {bundle.name}
                            </span>
                            {bundle.save && (
                              <span className="text-xs font-medium text-green-600">
                                {bundle.save}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-2 text-right">
                          <div className="text-sm font-semibold">
                            <PriceDisplay price={bundle.price} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <div className="mx-3 space-y-2 text-xs text-muted-foreground">
                      {bundle.description.map((desc, index) => (
                        <p key={index}>• {desc}</p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              {t("product.addingToCart")}
            </div>
          ) : (
            t("product.addToCart")
          )}
        </Button>

        {cartError && (
          <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-md">
            {cartError}
          </div>
        )}

      </div>
    </div>
  );
}
