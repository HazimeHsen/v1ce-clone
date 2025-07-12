"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Truck, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetailsForm({
  images,
  mainCarouselIndex,
  thumbCarouselIndex,
  handleMainPrev,
  handleMainNext,
  handleThumbnailClick,
}) {
  const [quantity, setQuantity] = useState(7);

  const mainCarouselRef = useRef(null);
  const thumbCarouselRef = useRef(null);

  useEffect(() => {
    if (mainCarouselRef.current) {
      const slideWidth = mainCarouselRef.current.children[0].offsetWidth + 16;
      mainCarouselRef.current.style.transform = `translate3d(-${
        mainCarouselIndex * slideWidth
      }px, 0px, 0px)`;
    }

    if (thumbCarouselRef.current) {
      const thumbWidth = thumbCarouselRef.current.children[0].offsetWidth + 16;
      const scrollPosition = thumbCarouselIndex * thumbWidth;
      thumbCarouselRef.current.parentElement.scrollLeft = scrollPosition;
    }
  }, [mainCarouselIndex, thumbCarouselIndex]);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 100000));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="relative flex w-full flex-col">
      <div
        className="sticky"
        style={{ top: "140px", transition: "top 0.4s ease-out" }}
      >
        <div className="relative z-10 mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                  24K Luxury Digital Business Card
                </h1>
                <h2 className="text-sm font-medium text-muted-foreground">
                  Invitation-only access. No public sales. Exclusive for
                  insiders. Request your invite.
                </h2>
              </div>
              <button type="button" className="reviews cursor-pointer">
                <div
                  className="flex items-center justify-items-center gap-2"
                  property="reviewRating"
                  typeof="Rating"
                >
                  <div className="flex">
                    <div className="relative">
                      <Star
                        className="lucide lucide-star w-5 fill-white stroke-white"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="relative">
                      <Star
                        className="lucide lucide-star w-5 fill-white stroke-white"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="relative">
                      <Star
                        className="lucide lucide-star w-5 fill-white stroke-white"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="relative">
                      <Star
                        className="lucide lucide-star w-5 fill-white stroke-white"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="relative">
                      <Star
                        className="lucide lucide-star w-5 fill-white stroke-white"
                        width="24"
                        height="24"
                      />
                    </div>
                  </div>
                  <span
                    property="ratingValue"
                    className="hidden text-sm font-medium"
                  >
                    5
                  </span>
                  <p className="text-l2 text-white" property="reviewCount">
                    (12)
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
                <span className="font-medium">Jul 17 - Jul 21</span>
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
                              alt="#default title"
                              type="button"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              className="h-auto w-full rounded-2xl"
                              src={
                                item.src + "&w=1920&q=100" || "/placeholder.svg"
                              }
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
                              alt="#default title"
                              loading="eager"
                              width="100"
                              height="100"
                              decoding="async"
                              className={`aspect-square h-auto w-full rounded-lg object-contain ${
                                mainCarouselIndex === index
                                  ? "border-2 border-primary"
                                  : "border border-neutral-200"
                              }`}
                              src={
                                item.src + "&w=256&q=75" || "/placeholder.svg"
                              }
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
                                alt="#default title 7"
                                loading="eager"
                                width="100"
                                height="100"
                                decoding="async"
                                className="aspect-square h-auto w-full rounded-lg border border-neutral-200 object-contain"
                                src={
                                  item.poster + "&w=256&q=75" ||
                                  "/placeholder.svg"
                                }
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
            <div className="flex flex-col gap-6"></div>
            <div className="quantity-selector-container flex flex-col gap-2">
              <div className="flex w-min items-center rounded-lg border border-neutral-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="h-full px-3"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <input
                  className="flex rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 h-[36px] w-14 border-none text-center font-medium text-primary shadow-none"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="quantity-selector"
                  min="1"
                  max="100000"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button
                  aria-label="Increase quantity"
                  className="h-full px-3"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="box-border overflow-hidden rounded-xl border container border-muted bg-background data-[state=open]:border-2 data-[state=open]:border-white data-[state=open]:bg-secondary">
                <div className="relative flex w-full flex-col">
                  <div className="flex w-full">
                    <div className="flex w-full cursor-pointer flex-row items-center justify-between">
                      <div className="flex w-full items-center gap-4 p-5">
                        <div className="aspect-square size-2 rounded-full ring-1 ring-muted ring-offset-4 bg-primary"></div>
                        <div className="flex w-full flex-row items-start justify-between">
                          <span className="text-left font-semibold leading-tight">
                            24K Luxury Digital Business Card
                          </span>
                          <div className="ml-2 text-right font-semibold">
                            د.إ1618.00
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden px-5 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="flex flex-col gap-2 pb-4">
                    <p className="text-sm">
                      No paper cards. No waste. Just one card for life.
                    </p>
                    <ul className="flex flex-col gap-2">
                      <li className="flex items-center gap-[15px] text-sm before:content-['•']">
                        Stop Losing Leads – Instantly share your contact and
                        save it in their phone.
                      </li>
                      <li className="flex items-center gap-[15px] text-sm before:content-['•']">
                        Save Their Details With One Click – Never wonder if
                        they'll reach out.
                      </li>
                      <li className="flex items-center gap-[15px] text-sm before:content-['•']">
                        Know Who's Interested – Analytics show who viewed your
                        card.
                      </li>
                      <li className="flex items-center gap-[15px] text-sm before:content-['•']">
                        Always Up to Date – Update details anytime, no need to
                        reprint.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-4" data-orientation="vertical"></div>
            </div>
            <div className="space-y-2">
              <button
                className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 h-14 w-full text-xl"
                disabled={true}
              >
                Invitation Only
              </button>
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
