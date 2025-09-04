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
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [cartSuccess, setCartSuccess] = useState(false);

  const {
    addToCart,
    error: storeError,
    openCart,
  } = useStore();

  const mainCarouselRef = useRef(null);
  const thumbCarouselRef = useRef(null);

  const colorSwatches =
    product?.variants?.map((variant) => {
      const title = variant.title || "Default";

      const colorMap = {
        "Red & Pink": ["#dc2626", "#ec4899"],
        "Blue & White": ["#2563eb", "#ffffff"],
        "black & Green": ["#000000", "#16a34a"],
      };

      return {
        title,
        colors: colorMap[title] || ["#6b7280", "#9ca3af"],
      };
    }) || [];

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

  const quantityBundles = [
    {
      id: "1-item",
      name: "1 Item",
      quantity: 1,
      price: "€25.00",
      pricePerItem: "€25.00",
      save: null,
      popular: false,
      description: [
        "Perfect for individual use",
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
    {
      id: "4-items",
      name: "4 Items",
      quantity: 4,
      price: "€100.00",
      pricePerItem: "€25.00",
      save: null,
      popular: false,
      description: [
        "Perfect starter pack for personal use",
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
    {
      id: "8-items",
      name: "8 Items",
      quantity: 8,
      price: "€200.00",
      pricePerItem: "€25.00",
      save: null,
      popular: true,
      description: [
        "Great for small teams or frequent networking",
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Smarter Follow-Ups - Send follow-ups from your V1CE dashboard or CRM.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
    {
      id: "12-items",
      name: "12 Items",
      quantity: 12,
      price: "€300.00",
      pricePerItem: "€25.00",
      save: null,
      popular: false,
      description: [
        "Best value for businesses and heavy networkers",
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Smarter Follow-Ups - Send follow-ups from your V1CE dashboard or CRM.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
  ];

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

  useEffect(() => {
    if (quantityBundles.length > 0 && !selectedBundle) {
      setSelectedBundle(quantityBundles[0].id);
    }
  }, [selectedBundle]);

  useEffect(() => {
    if (colorSwatches.length > 0 && !selectedColor) {
      setSelectedColor(colorSwatches[0].title);
    }
  }, [colorSwatches, selectedColor, setSelectedColor]);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 100000));
  };
  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

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

      console.log("[v0] Successfully added to cart:", {
        variant: selectedVariant.title,
        bundleQuantity,
        userQuantity: quantity,
        totalQuantity,
      });
    } catch (error) {
      console.error("[v0] Add to cart error:", error);
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
    <section
      className="relative flex w-full flex-col"
    >
      <div
        className="sticky"
        style={{ top: "-161px", transition: "top 0.4s ease-out" }}
      >
        <div className="relative z-10 mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                  {product?.title || "Metal Digital Business Card"}
                </h1>
                <h2 className="text-sm font-medium text-muted-foreground">
                  {product?.description ||
                    "A premium metal card that instantly shares your details with just a tap, no app needed."}
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
                <span>Order today for delivery: </span>
                <span className="font-medium">Jul 23 - Jul 25</span>
              </p>
            </div>
            <div className="block md:hidden">
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-small text-muted-foreground">
                  Colour:{" "}
                  <span className="font-medium text-white">
                    {selectedColor || "None selected"}
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
                  Quantity:
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
            <div>
              <div
                className="space-y-4"
              >
                <Accordion
                  type="single"
                  collapsible
                  value={selectedBundle}
                  onValueChange={setSelectedBundle}
                >
                  {/* Single Item Option - Standalone */}
                  {quantityBundles
                    .filter((bundle) => bundle.id === "1-item")
                    .map((bundle) => (
                      <AccordionItem
                        key={bundle.id}
                        value={bundle.id}
                        className={`box-border overflow-hidden rounded-xl border border-muted data-[state=open]:border-2 data-[state=open]:bg-secondary ${
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
                                {bundle.price}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5">
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {bundle.description.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}

                  <div className="mt-4 rounded-xl bg-secondary p-4 border">
                    <h3 className="font-semibold mb-4 text-center">
                      Limited Time Only
                    </h3>
                    {quantityBundles
                      .filter((bundle) => bundle.id !== "1-item")
                      .map((bundle, index) => (
                        <AccordionItem
                          key={bundle.id}
                          value={bundle.id}
                          className={`box-border overflow-hidden rounded-xl border border-muted data-[state=open]:border-2 data-[state=open]:bg-background ${
                            index > 0 ? "mt-4" : ""
                          } ${
                            selectedBundle === bundle.id
                              ? "border-primary bg-background"
                              : "bg-background"
                          }`}
                        >
                          <AccordionTrigger
                            arrow={false}
                            className="relative flex w-full flex-col p-0 hover:no-underline data-[state=open]:no-underline"
                          >
                            {bundle.popular && (
                              <div className="flex w-full justify-center rounded-t-xl border-transparent bg-primary/10 py-1 font-semibold text-primary">
                                Most Popular
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
                                  {bundle.price}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-5">
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
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 h-14 w-full text-xl"
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled}
                loading={isAddingToCart}
                loadingText="Adding..."
              >
                Add To Cart
              </Button>

              {(!selectedBundle || !selectedColor) && (
                <p className="text-center text-sm text-yellow-500 font-medium">
                  Please select both a color and quantity to continue
                </p>
              )}

              {(cartError || storeError) && (
                <p className="text-center text-sm text-red-500 font-medium">
                  {cartError || storeError}
                </p>
              )}

              <p className="min-w-full text-center text-xs font-medium text-muted-foreground">
                Shipping Calculated at Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
