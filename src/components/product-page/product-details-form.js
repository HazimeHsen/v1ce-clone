"use client";
import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Truck,
  Star,
  StarHalf,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ColorSwatches from "@/components/color-swatches";
import { useStore } from "@/context/store-context";
import { useCurrency } from "@/context/currency-context";
import { useTranslations } from "@/hooks/use-translations";
import { Skeleton } from "@/components/ui/skeleton";
import { getDeliveryDateRange } from "@/lib/delivery-utils";
import PriceDisplay from "@/components/ui/price-display";
import { getLocalizedTitle, getLocalizedSubtitle, getLocalizedDescription } from "@/lib/translation-utils";
import { useParams } from "next/navigation";

export default function ProductDetailsForm({
  product,
  images,
  mainCarouselIndex,
  thumbCarouselIndex,
  handleMainPrev,
  handleMainNext,
  handleThumbnailClick,
  selectedColor,
  setSelectedColor,
  quantityBundles = [],
  firstOption,
  accordionOptions = [],
  selectedBundle,
  setSelectedBundle,
  quantity,
  setQuantity,
  incrementQuantity,
  decrementQuantity,
}) {
  const { t } = useTranslations();
  const { locale } = useParams();
  
  // Get localized content
  const localizedTitle = getLocalizedTitle(product, locale);
  const localizedSubtitle = getLocalizedSubtitle(product, locale);
  const localizedDescription = getLocalizedDescription(product, locale);
  
  // Use props for quantity and selectedBundle instead of local state
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [cartSuccess, setCartSuccess] = useState(false);

  const { addToCart, error: storeError, openCart } = useStore();
  const { formatPrice, convertPrice, selectedCurrency, isLoading: rateLoading } = useCurrency();

  const mainCarouselRef = useRef(null);
  const thumbCarouselRef = useRef(null);

  const colorSwatches = product?.variants?.map((variant) => {
    const combo = variant.title;
    const colors = combo.split("&").map((c) => c.trim().toLowerCase());
    return { title: combo, colors };
  });

  const stickyRef = useRef(null);
  const stickyInnerRef = useRef(null);
  const actionRef = useRef(null);
  const rafIdRef = useRef(null);

  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const computeNegativeTop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const stickyInnerEl = stickyInnerRef.current || stickyRef.current;
        const actionEl = actionRef.current;

        const stickyInnerHeight = stickyInnerEl
          ? stickyInnerEl.getBoundingClientRect().height
          : 0;
        const actionHeight = actionEl
          ? actionEl.getBoundingClientRect().height
          : 0;

        const margin = 8;
        const desiredVisible = actionHeight + margin;

        let topToUse = -(stickyInnerHeight - desiredVisible);

        if (topToUse > 0) topToUse = 0;

        const maxNeg = -Math.max(
          0,
          stickyInnerHeight - window.innerHeight + 40
        );
        if (topToUse < maxNeg) topToUse = maxNeg;

        setStickyTop(Math.round(topToUse));
      });
    };

    computeNegativeTop();

    const observers = [];

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(computeNegativeTop);
      const stickyInnerEl = stickyInnerRef.current || stickyRef.current;
      if (stickyInnerEl) ro.observe(stickyInnerEl);
      const actionEl = actionRef.current;
      if (actionEl) ro.observe(actionEl);
      observers.push(ro);
    }

    window.addEventListener("resize", computeNegativeTop);

    return () => {
      observers.forEach((o) => o.disconnect && o.disconnect());
      window.removeEventListener("resize", computeNegativeTop);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handleSwatchSelect = (swatch, index) => {
    if (selectedColor === swatch.title) {
      setSelectedColor(null);
    } else {
      setSelectedColor(swatch.title);
    }
  };

  const selectedSwatchIndex = colorSwatches.findIndex(
    (swatch) => swatch.title === selectedColor
  );

  const selectedVariant = product?.variants?.find(
    (v) => v.title === selectedColor
  );

  const basePrice = selectedVariant?.calculated_price?.calculated_amount || 25;

  // Calculate total price for free shipping check
  const selectedQuantityBundle = quantityBundles.find(
    (b) => b.id === selectedBundle
  );
  const bundleQuantity = selectedQuantityBundle?.quantity || 1;
  const totalQuantity = bundleQuantity * quantity;
  const totalPrice = basePrice * totalQuantity;

  // Free shipping threshold in AMD
  const FREE_SHIPPING_THRESHOLD_AMD = 15000;

  // quantityBundles now comes from props


  useEffect(() => {
    if (mainCarouselRef.current) {
      const firstChild = mainCarouselRef.current.children[0];
      const slideWidth = firstChild ? firstChild.offsetWidth + 16 : 0;
      mainCarouselRef.current.style.transform = `translate3d(-${
        mainCarouselIndex * slideWidth
      }px, 0px, 0px)`;
    }
    if (thumbCarouselRef.current) {
      const firstThumbChild = thumbCarouselRef.current.children[0];
      const thumbWidth = firstThumbChild ? firstThumbChild.offsetWidth + 16 : 0;
      const scrollPosition = thumbCarouselIndex * thumbWidth;
      thumbCarouselRef.current.parentElement.scrollLeft = scrollPosition;
    }
  }, [mainCarouselIndex, thumbCarouselIndex]);

  // selectedBundle is now managed by parent component

  useEffect(() => {
    if (colorSwatches.length > 0 && !selectedColor) {
      setSelectedColor(colorSwatches[0].title);
    }
  }, [colorSwatches, selectedColor, setSelectedColor]);

  // quantity management is now handled by parent component

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

      setCartSuccess(true);
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
    <section className="relative flex w-full flex-col">
      <div ref={stickyRef} className="sticky" style={{ top: `${stickyTop}px` }}>
        <div
          ref={stickyInnerRef}
          className="relative z-10 mb-6 flex flex-col gap-4"
        >
          <div className="hidden md:flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
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
                          className="lucide lucide-star w-5 fill-white stroke-white"
                          width="24"
                          height="24"
                        />
                      </div>
                    ))}
                    <div className="relative">
                      <div className="relative top-0">
                        <Star
                          className="lucide lucide-star absolute w-5 stroke-white"
                          width="24"
                          height="24"
                        />
                        <StarHalf
                          className="lucide lucide-star-half w-5 fill-white stroke-white"
                          width="24"
                          height="24"
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
                  <p className="text-l2 text-white" property="reviewCount">
                    (518)
                  </p>
                </div>
              </button>
            </div>
            <div className="flex flex-row items-center gap-1.5">
              <div className="flex items-center gap-2 rounded-full bg-primary p-1.5">
                <Truck
                  className="lucide lucide-truck size-5"
                  width="24"
                  height="24"
                  stroke="white"
                />
              </div>
              <p>
                <span>{t("product.orderTodayForDelivery")} </span>
                <span className="font-medium">
                  {getDeliveryDateRange(1, 3)}
                </span>
              </p>
            </div>
            <div className="hidden">
              <div className="flex flex-col gap-4">
                <div
                  className="relative"
                  role="region"
                  aria-roledescription="carousel"
                >
                  <div className="overflow-hidden">
                    <div
                      ref={mainCarouselRef}
                      className="flex -ml-4"
                      style={{
                        transform: `translate3d(-${
                          mainCarouselIndex * (700 + 16)
                        }px, 0px, 0px)`,
                        transition: "transform 0.5s ease-in-out",
                      }}
                    >
                      {images.map((item, index) => (
                        <div
                          key={index}
                          role="group"
                          aria-roledescription="slide"
                          className="min-w-0 shrink-0 grow-0 basis-full pl-4 cursor-pointer"
                        >
                          {item.type === "image" ? (
                            <img
                              alt={`Product image ${index + 1}`}
                              type="button"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              className="h-auto w-full rounded-2xl"
                              src={item.src || "/placeholder.svg"}
                              srcSet={`${item.src}&w=750&q=100 1x, ${item.src}&w=1920&q=100 2x`}
                              width="700"
                              height="700"
                              decoding="async"
                              loading={index === 0 ? "eager" : "lazy"}
                              style={{ color: "transparent" }}
                            />
                          ) : (
                            <video
                              src={item.src}
                              poster={item.poster}
                              controls
                              className="h-auto w-full rounded-2xl"
                              type="button"
                            >
                              <track kind="captions" label="English" />
                            </video>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-4 flex gap-2">
                    <button
                      type="button"
                      aria-label="Scroll to previous item"
                      className="rounded-full border border-neutral-200 bg-background p-1 hover:bg-secondary"
                      onClick={handleMainPrev}
                    >
                      <ChevronLeft
                        className="lucide lucide-chevron-left"
                        width="16"
                        height="16"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="Scroll to next item"
                      className="rounded-full border border-neutral-200 bg-background p-1 hover:bg-secondary"
                      onClick={handleMainNext}
                    >
                      <ChevronRight
                        className="lucide lucide-chevron-right"
                        width="16"
                        height="16"
                      />
                    </button>
                  </div>
                </div>
                <div
                  className="relative"
                  role="region"
                  aria-roledescription="carousel"
                >
                  <div className="overflow-hidden">
                    <div
                      ref={thumbCarouselRef}
                      className="flex -ml-4"
                      style={{
                        transform: `translate3d(-${
                          thumbCarouselIndex * (100 + 16)
                        }px, 0px, 0px)`,
                        transition: "transform 0.5s ease-in-out",
                      }}
                    >
                      {images.map((item, index) => (
                        <div
                          key={index}
                          role="group"
                          aria-roledescription="slide"
                          className="min-w-0 shrink-0 grow-0 pl-4 relative basis-[15%] cursor-pointer"
                          onClick={() => handleThumbnailClick(index)}
                        >
                          {item.type === "image" ? (
                            <img
                              alt={`Thumbnail ${index + 1}`}
                              loading="eager"
                              width="100"
                              height="100"
                              decoding="async"
                              className={`aspect-square h-auto w-full rounded-lg object-contain ${
                                mainCarouselIndex === index
                                  ? "border-2 border-primary"
                                  : "border border-neutral-200"
                              }`}
                              src={item.src || "/placeholder.svg"}
                              srcSet={`${item.src}&w=128&q=75 1x, ${item.src}&w=256&q=75 2x`}
                              style={{ color: "transparent" }}
                            />
                          ) : (
                            <div
                              className={`aspect-square h-auto w-full rounded-lg object-contain ${
                                mainCarouselIndex === index
                                  ? "border-2 border-primary"
                                  : "border border-neutral-200"
                              }`}
                            >
                              <img
                                alt={`Video thumbnail ${index + 1}`}
                                loading="eager"
                                width="100"
                                height="100"
                                decoding="async"
                                className="aspect-square h-auto w-full rounded-lg border border-neutral-200 object-contain"
                                src={item.poster || "/placeholder.svg"}
                                srcSet={`${item.poster}&w=128&q=75 1x, ${item.poster}&w=256&q=75 2x`}
                                style={{ color: "transparent" }}
                              />
                              <div className="absolute inset-0 ml-4 flex items-center justify-center">
                                <Play
                                  className="lucide lucide-play size-8 text-white"
                                  width="24"
                                  height="24"
                                  fill="white"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-small text-muted-foreground">
                  {t("product.quantityBundles.colour")}{" "}
                  <span className="font-medium text-white">
                    {selectedColor || t("product.quantityBundles.noneSelected")}
                  </span>
                </label>
                <div className="ml-1.5">
                  <ColorSwatches
                    swatches={colorSwatches}
                    size={28}
                    selectedSwatch={
                      selectedSwatchIndex >= 0 ? selectedSwatchIndex : null
                    }
                    onSwatchSelect={handleSwatchSelect}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-small text-muted-foreground">
                  {t("product.quantityBundles.quantity")}
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 rounded-full p-0"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="min-w-[3rem] text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 rounded-full p-0"
                    onClick={incrementQuantity}
                    disabled={quantity >= 100}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="space-y-4">
                {/* First Option - Outside Accordion */}
                {firstOption && (
                  <div className="w-full">
                    <div
                      className={`box-border overflow-hidden rounded-xl border border-muted p-5 cursor-pointer transition-colors duration-150 ease-out ${
                        selectedBundle === firstOption.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => {
                        if (selectedBundle !== firstOption.id) {
                          setSelectedBundle(firstOption.id);
                        }
                      }}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex w-full items-center gap-4">
                          <div
                            className={`aspect-square size-2 rounded-full ring-1 ring-muted ring-offset-4 ${
                              selectedBundle === firstOption.id
                                ? "bg-primary"
                                : "bg-white"
                            }`}
                          ></div>
                          <span className="text-left font-semibold leading-tight">
                            {firstOption.name}
                          </span>
                        </div>
                        <div className="ml-2 text-right font-semibold">
                          <PriceDisplay price={firstOption.price} />
                        </div>
                      </div>
                      
                      {/* Description for first option */}
                      {selectedBundle === firstOption.id && (
                        <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {firstOption.description.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Accordion for Other Options */}
                {accordionOptions && accordionOptions.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    value={selectedBundle}
                    onValueChange={(value) => {
                      if (value && value !== selectedBundle) {
                        setSelectedBundle(value);
                      }
                    }}
                  >

                    <div className="mt-4 rounded-xl bg-secondary p-4 border">
                      <h3 className="font-semibold mb-4 text-center">
                        {t("product.quantityBundles.limitedTimeOnly")}
                      </h3>
                      {accordionOptions.map((bundle, index) => (
                        <AccordionItem
                          key={bundle.id}
                          value={bundle.id}
                          className={`box-border overflow-hidden rounded-xl border border-muted data-[state=open]:border-2 data-[state=open]:bg-background transition-all duration-300 ease-out ${
                            index > 0 ? "mt-4" : ""
                          } ${
                            selectedBundle === bundle.id
                              ? "border-primary bg-background"
                              : "bg-background"
                          }`}
                        >
                          <AccordionTrigger
                            arrow={false}
                            className="relative flex w-full flex-col p-0 hover:no-underline data-[state=open]:no-underline transition-all duration-300"
                          >
                            {bundle.popular && (
                              <div className="flex w-full justify-center rounded-t-xl border-transparent bg-primary/10 py-1 font-semibold text-primary">
                                {t("product.quantityBundles.mostPopular")}
                              </div>
                            )}
                            <div className="flex w-full">
                              <div className="flex w-full cursor-pointer flex-row items-center justify-between p-5">
                                <div className="flex w-full items-center gap-4">
                                  <div
                                    className={`aspect-square size-2 rounded-full ring-1 ring-muted ring-offset-4 ${
                                      selectedBundle === bundle.id
                                        ? "bg-primary"
                                        : "bg-white"
                                    }`}
                                  ></div>
                                  <span className="text-left font-semibold leading-tight">
                                    {bundle.name}
                                  </span>
                                </div>
                                <div className="ml-2 text-right font-semibold">
                                  {bundle.originalPrice && bundle.originalPrice !== bundle.price ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-muted-foreground line-through">
                                        <PriceDisplay price={bundle.originalPrice} />
                                      </span>
                                      <PriceDisplay price={bundle.price} />
                                    </div>
                                  ) : (
                                    <PriceDisplay price={bundle.price} />
                                  )}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300">
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                              {bundle.description.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </div>
                  </Accordion>
                )}
              </div>
            </div>

            <div className="space-y-2" ref={actionRef}>
              <Button
                className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 h-14 w-full text-xl"
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                loading={isAddingToCart}
                loadingText={t("product.adding")}
              >
                {t("product.addToCart")}
              </Button>

              {(!selectedBundle || !selectedColor) && (
                <p className="text-center text-sm text-yellow-500 font-medium">
                  {t("product.selectColorAndQuantity")}
                </p>
              )}

              {(cartError || storeError) && (
                <p className="text-center text-sm text-red-500 font-medium">
                  {cartError || storeError}
                </p>
              )}

              <p className="min-w-full text-center text-xs font-medium text-muted-foreground">
                {t("product.shippingCalculated")} 
                {rateLoading && selectedCurrency?.code !== "AMD" ? (
                  <Skeleton className="inline-block h-3 w-16 ml-1" />
                ) : (
                  ` ${formatPrice(FREE_SHIPPING_THRESHOLD_AMD)}`
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
