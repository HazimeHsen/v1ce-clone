"use client";
import Image from "next/image";
import { Play, Brush, ShieldPlus, Ship } from "lucide-react";

export default function TestimonialsSection({ testimonials }) {
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <>
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <li className="flex flex-col rounded-lg bg-secondary p-4">
          <div className="mb-2">
            <Brush className="lucide lucide-brush size-6" />
          </div>
          <h3 className="mb-1 text-lg font-medium leading-tight">
            Free Professional Design
          </h3>
          <p className="text-sm text-muted-foreground">
            We handle the design for you—no extra cost.
          </p>
        </li>
        <li className="flex flex-col rounded-lg bg-secondary p-4">
          <div className="mb-2">
            <ShieldPlus className="lucide lucide-shield-plus size-6" />
          </div>
          <h3 className="mb-1 text-lg font-medium leading-tight">
            Money Back Promise
          </h3>
          <p className="text-sm text-muted-foreground">
            Try it risk-free with our money-back guarantee.
          </p>
        </li>
        <li className="flex flex-col rounded-lg bg-secondary p-4">
          <div className="mb-2">
            <Ship className="lucide lucide-ship size-6" />
          </div>
          <h3 className="mb-1 text-lg font-medium leading-tight">
            Fast &amp; Secure Delivery
          </h3>
          <p className="text-sm text-muted-foreground">
            1-3 days shipping from the UK, US, or UAE.
          </p>
        </li>
      </ul>

      <InfiniteSlider testimonials={duplicatedTestimonials} />

      <div
        dir="ltr"
        className="relative overflow-hidden"
        style={{
          position: "relative",
          "--radix-scroll-area-corner-width": "0px",
          "--radix-scroll-area-corner-height": "0px",
        }}
      >
        <style>{`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}</style>
        <div
          data-radix-scroll-area-viewport=""
          className="size-full rounded-[inherit]"
          style={{ overflow: "scroll" }}
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="mb-3 flex h-fit select-none gap-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group flex w-full flex-col gap-3 container min-w-56"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "177.778%",
                      }}
                    >
                      <div
                        className="w-full"
                        style={{
                          position: "absolute",
                          inset: "0px",
                        }}
                      >
                        <div className="pointer-events-none absolute bottom-0 z-50 flex w-full flex-col gap-3 bg-black/30 p-2 py-4 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0 xs:p-5">
                          <div className="relative flex h-6 w-24 items-start lg:h-[35px] lg:w-[150px]">
                            <Image
                              alt="Logo"
                              loading="lazy"
                              fill
                              src={testimonial.logo || "/placeholder.svg"}
                              className="object-contain object-left"
                            />
                          </div>
                          <div className="flex flex-col text-white">
                            <div className="flex h-[100px] items-center">
                              <q className="mb-3 text-sm font-medium xs:text-lg xs:font-semibold">
                                {testimonial.quote}
                              </q>
                            </div>
                            <span className="text-sm font-semibold">
                              {testimonial.name}
                            </span>
                            <span className="text-sm font-medium">
                              {testimonial.title}
                            </span>
                          </div>
                        </div>
                        <div className="group size-full cursor-pointer overflow-hidden rounded-lg container">
                          <div className="relative block size-full false">
                            <div className="absolute right-2 top-2 z-40 -translate-y-0 select-none transition-all duration-200 ease-in-out group-hover:scale-95 xs:left-1/2 xs:right-auto xs:top-1/2 xs:-translate-x-1/2 xs:-translate-y-1/2">
                              <div className="inline-flex items-center justify-center rounded-full bg-black/50 p-2 backdrop-blur-lg xs:p-4">
                                <Play
                                  className="lucide lucide-play size-4 text-white xs:size-6"
                                  fill="#fff"
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-0 z-30 h-24 w-full bg-gradient-to-t from-primary/20 to-transparent"></div>
                            <Image
                              alt="Thumbnail"
                              loading="lazy"
                              width={300}
                              height={300}
                              src={testimonial.thumbnail || "/placeholder.svg"}
                              className="pointer-events-none z-20 transition-all duration-700 ease-in-out group-hover:scale-105 object-cover"
                            />
                          </div>
                          <div className="relative size-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useRef } from "react";

function InfiniteSlider({ testimonials }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollContainer.scrollLeft += scrollSpeed;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const duplicated = [...testimonials, ...testimonials];

  return (
    <div className="relative flex flex-col items-center gap-4 rounded-md py-4 font-medium overflow-hidden">
      <p className="z-10">TRUSTED BY LEADING BRANDS</p>

      <div
        ref={scrollRef}
        className="w-full overflow-hidden whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="inline-flex">
          {duplicated.map((brand, i) => (
            <div key={i} className="flex-none w-[100px] px-4 h-full">
              <div className="relative h-[50px] w-full flex items-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain object-left"
                  blurDataURL={brand.logo}
                  placeholder="blur"
                  quality={100}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
