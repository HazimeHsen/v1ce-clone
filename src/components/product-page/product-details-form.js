"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Truck, Star, StarHalf } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function ProductDetailsForm({
  images, // Now received dynamically from parent
  mainCarouselIndex,
  thumbCarouselIndex,
  handleMainPrev,
  handleMainNext,
  handleThumbnailClick,
  selectedColor, // Received from parent
  setSelectedColor, // Received from parent
}) {
  const [quantity, setQuantity] = useState(1)
  // Initialize selectedBundle to the ID of the "Most Popular" bundle, which is "Trio Pack"
  const [selectedBundle, setSelectedBundle] = useState("Trio Pack")

  const mainCarouselRef = useRef(null)
  const thumbCarouselRef = useRef(null)

  useEffect(() => {
    if (mainCarouselRef.current) {
      const firstChild = mainCarouselRef.current.children[0]
      const slideWidth = firstChild ? firstChild.offsetWidth + 16 : 0 // 16px for ml-4
      mainCarouselRef.current.style.transform = `translate3d(-${mainCarouselIndex * slideWidth}px, 0px, 0px)`
    }
    if (thumbCarouselRef.current) {
      const firstThumbChild = thumbCarouselRef.current.children[0]
      const thumbWidth = firstThumbChild ? firstThumbChild.offsetWidth + 16 : 0 // 16px for pl-4
      const scrollPosition = thumbCarouselIndex * thumbWidth
      thumbCarouselRef.current.parentElement.scrollLeft = scrollPosition
    }
  }, [mainCarouselIndex, thumbCarouselIndex])

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 100000))
  }
  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  const colors = [
    {
      name: "Black & Silver",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/b11654ac-1312-4322-cbd0-53b9ad424900/public",
    },
    {
      name: "Black & Gold",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/34b02b68-5cbf-4a32-4724-39a279065400/public",
    },
    {
      name: "Silver & Black",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/dd8c329d-2802-4074-37bf-140af372ee00/public",
    },
    {
      name: "Blue & Silver",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4e9a2f65-ee53-4a03-28d9-8f6d257a0200/public",
    },
    {
      name: "Blue & Gold",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/91ba856c-62e3-4eaa-1321-611ab6fd6700/public",
    },
    {
      name: "White & Silver",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/0ecf26b0-285c-42be-14e1-d7f6d8cfde00/public",
    },
    {
      name: "White & Gold",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/dde8f2e0-4d82-4f24-d074-545534eee100/public",
    },
    {
      name: "Green & Silver",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/e2c44054-8db9-4ecd-bbd6-9db2a4b7a000/public",
    },
    {
      name: "Green & Gold",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/501fe84a-bdfb-4d86-5922-c0e10b56af00/public",
    },
    {
      name: "Red & Silver",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/a941f7a6-bfb2-46ef-0b9a-e03f41356000/public",
    },
    {
      name: "Red & Gold",
      src: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/ed7a0815-c805-482c-3e8c-1e59a46a2000/public",
    },
  ]

  const bundles = [
    {
      id: "1 x V1CE Business Card",
      name: "1 x V1CE Business Card",
      cards: 1,
      save: null,
      price: "د.إ499.00",
      priceEach: null,
      shipping: null,
      popular: false,
      description: [
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Smarter Follow-Ups - Send follow-ups from your V1CE dashboard or CRM.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
    {
      id: "Trio Pack",
      name: "Trio Pack",
      cards: 3,
      save: "13%",
      price: "د.إ1311.00",
      priceEach: "د.إ437.00",
      shipping: "Free Shipping Included",
      popular: true,
      description: [
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Smarter Follow-Ups - Send follow-ups from your V1CE dashboard or CRM.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
    {
      id: "Team Pack",
      name: "Team Pack",
      cards: 5,
      save: "20%",
      price: "د.إ2016.00",
      priceEach: "د.إ403.20",
      shipping: "Free Shipping Included",
      popular: false,
      description: [
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Smarter Follow-Ups - Send follow-ups from your V1CE dashboard or CRM.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
    {
      id: "Pro Pack",
      name: "Pro Pack",
      cards: 10,
      save: "24%",
      price: "د.إ3830.00",
      priceEach: "د.إ383.00",
      shipping: "Free Shipping Included",
      popular: false,
      description: [
        "Never Lose a Lead Again - Tap to instantly share and capture contact info.",
        "Smarter Follow-Ups - Send follow-ups from your V1CE dashboard or CRM.",
        "Always Up to Date - Edit your info anytime. No reprints needed.",
      ],
    },
  ]

  return (
    <section className="relative flex w-full flex-col" data-sentry-component="ProductFormContainer">
      <div className="sticky" style={{ top: "-161px", transition: "top 0.4s ease-out" }}>
        <div className="relative z-10 mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">Metal Digital Business Card</h1>
                <h2 className="text-sm font-medium text-muted-foreground">
                  A premium metal card that instantly shares your details with just a tap, no app needed.
                </h2>
              </div>
              <button className="reviews cursor-pointer" type="button">
                <div className="flex items-center justify-items-center gap-2" property="reviewRating" typeof="Rating">
                  <div className="flex">
                    {/* Render 4 full stars */}
                    {[...Array(4)].map((_, i) => (
                      <div key={`star-full-${i}`} className="relative">
                        <Star className="lucide lucide-star w-5 fill-white stroke-white" width="24" height="24" />
                      </div>
                    ))}
                    {/* Render 1 half star */}
                    <div className="relative">
                      <div className="relative top-0">
                        <Star className="lucide lucide-star absolute w-5 stroke-white" width="24" height="24" />
                        <StarHalf
                          className="lucide lucide-star-half w-5 fill-white stroke-white"
                          width="24"
                          height="24"
                        />
                      </div>
                    </div>
                  </div>
                  <span property="ratingValue" className="hidden text-sm font-medium">
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
                <Truck className="lucide lucide-truck size-5" width="24" height="24" stroke="white" />
              </div>
              <p>
                <span>Order today for delivery: </span>
                <span className="font-medium">Jul 23 - Jul 25</span>
              </p>
            </div>
            <div className="block md:hidden">
              <div className="flex flex-col gap-4">
                <div className="relative" role="region" aria-roledescription="carousel">
                  <div className="overflow-hidden">
                    <div
                      ref={mainCarouselRef}
                      className="flex -ml-4"
                      style={{
                        transform: `translate3d(-${mainCarouselIndex * (700 + 16)}px, 0px, 0px)`,
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
                      <ChevronLeft className="lucide lucide-chevron-left" width="16" height="16" />
                    </button>
                    <button
                      type="button"
                      aria-label="Scroll to next item"
                      className="rounded-full border border-neutral-200 bg-background p-1 hover:bg-secondary"
                      onClick={handleMainNext}
                    >
                      <ChevronRight className="lucide lucide-chevron-right" width="16" height="16" />
                    </button>
                  </div>
                </div>
                <div className="relative" role="region" aria-roledescription="carousel">
                  <div className="overflow-hidden">
                    <div
                      ref={thumbCarouselRef}
                      className="flex -ml-4"
                      style={{
                        transform: `translate3d(-${thumbCarouselIndex * (100 + 16)}px, 0px, 0px)`,
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
                                mainCarouselIndex === index ? "border-2 border-primary" : "border border-neutral-200"
                              }`}
                              src={item.src || "/placeholder.svg"}
                              srcSet={`${item.src}&w=128&q=75 1x, ${item.src}&w=256&q=75 2x`}
                              style={{ color: "transparent" }}
                            />
                          ) : (
                            <div
                              className={`aspect-square h-auto w-full rounded-lg object-contain ${
                                mainCarouselIndex === index ? "border-2 border-primary" : "border border-neutral-200"
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
                  Colour: <span className="font-medium text-white">{selectedColor}</span>
                </label>
                <div className="ml-1.5 flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      aria-disabled="false"
                      title={color.name}
                      className={`relative aspect-square overflow-hidden rounded-full ${
                        selectedColor === color.name ? "outline outline-[2px] outline-offset-[3px] outline-primary" : ""
                      }`}
                      onClick={() => setSelectedColor(color.name)} // Use setSelectedColor from props
                    >
                      <Image
                        alt={color.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                        src={color.src || "/placeholder.svg"}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="quantity-selector-container flex flex-col gap-2">
              <label htmlFor="quantity-selector" className="text-small text-muted-foreground">
                Quantity:
              </label>
              <div className="flex w-min items-center rounded-lg border border-neutral-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="h-full px-3"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <Input
                  className="h-[36px] w-14 border-none text-center font-medium shadow-none bg-transparent"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  max="100000"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button aria-label="Increase quantity" className="h-full px-3" onClick={incrementQuantity}>
                  +
                </button>
              </div>
            </div>
            <div>
              <div
                className="space-y-4"
                data-sentry-component="PriceOptions"
                data-sentry-source-file="price-options.tsx"
              >
                <Accordion type="single" collapsible value={selectedBundle} onValueChange={setSelectedBundle}>
                  {bundles[0] && (
                    <AccordionItem
                      key={bundles[0].id}
                      value={bundles[0].id}
                      className="box-border overflow-hidden rounded-xl border border-muted data-[state=open]:border-2 data-[state=open]:bg-secondary"
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
                                  selectedBundle === bundles[0].id ? "bg-primary" : "bg-white"
                                }`}
                              ></div>
                              <span className="text-left font-semibold leading-tight">{bundles[0].name}</span>
                            </div>
                            <div className="ml-2 text-right font-semibold">{bundles[0].price}</div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5">
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {bundles[0].description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <div className="relative rounded-xl bg-secondary p-4 mt-4">
                    <div className="mb-4 w-full text-center font-semibold">Flash Bundles — Save up to 24%</div>
                    <div className="space-y-4" data-orientation="vertical">
                      {bundles.slice(1).map((bundle) => (
                        <AccordionItem
                          key={bundle.id}
                          value={bundle.id}
                          className="box-border rounded-xl border @container border-muted bg-background data-[state=open]:border-2 data-[state=open]:bg-secondary"
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
                              <div className="flex w-full cursor-pointer flex-row items-center justify-between p-5 pb-0 pr-1 pt-2">
                                <div className="flex w-full items-start gap-4">
                                  <div
                                    className={`mt-2 aspect-square size-2 rounded-full ring-1 ring-muted ring-offset-4 ${
                                      selectedBundle === bundle.id ? "bg-primary" : "bg-white"
                                    }`}
                                  ></div>
                                  <div className="flex flex-col items-start gap-1">
                                    <span className="text-left text-base font-semibold leading-tight md:text-lg">
                                      {bundle.name}{" "}
                                      {bundle.cards > 1 && (
                                        <span className="pl-2 text-left font-semibold leading-tight">
                                          ({bundle.cards} Cards)
                                        </span>
                                      )}
                                    </span>
                                    {bundle.shipping && (
                                      <span className="text-left text-xs font-normal italic text-muted-foreground md:text-sm">
                                        {bundle.shipping}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex h-full flex-col items-end justify-start">
                                  {bundle.save && (
                                    <div className="m-2 mb-0 whitespace-nowrap rounded-xl bg-black px-3 py-1 text-xs text-white md:px-5">
                                      Save {bundle.save}
                                    </div>
                                  )}
                                  <div className="flex flex-col items-center justify-end gap-1 text-nowrap px-5 text-right text-[20px] font-bold md:text-xl pt-2">
                                    <span>{bundle.price}</span>
                                    {bundle.priceEach && (
                                      <span className="text-left text-xs font-normal text-muted-foreground md:text-sm">
                                        {bundle.priceEach} each
                                      </span>
                                    )}
                                  </div>
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
                  </div>
                </Accordion>
              </div>
              <div className="space-y-2">
                <button
                  className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-blue text-blue-foreground hover:bg-blue/80 px-8 py-4 h-14 w-full text-xl font-semibold"
                  data-sentry-element="Button"
                  data-sentry-component="AddToCart"
                  data-sentry-source-file="add-to-cart.tsx"
                >
                  Add To Cart
                </button>
                <p
                  className="min-w-full text-center text-xs font-medium text-muted-foreground"
                  data-sentry-component="ShippingFootnote"
                  data-sentry-source-file="shipping-footnote.tsx"
                >
                  Shipping Calculated at Checkout
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 h-14 w-full text-xl">
                Add To Cart
              </Button>
              <p className="min-w-full text-center text-xs font-medium text-muted-foreground">
                Shipping Calculated at Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
