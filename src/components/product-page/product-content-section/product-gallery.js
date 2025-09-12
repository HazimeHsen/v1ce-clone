"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

export default function ProductGallery({
  images,
  api,
  setApi,
  thumbApi,
  setThumbApi,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api || !thumbApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      thumbApi.scrollTo(api.selectedScrollSnap());
    };

    const onThumbSelect = () => {
      api.scrollTo(thumbApi.selectedScrollSnap());
    };

    api.on("select", onSelect);
    thumbApi.on("select", onThumbSelect);

    setSelectedIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
      thumbApi.off("select", onThumbSelect);
    };
  }, [api, thumbApi]);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Main Image Carousel */}
      <Carousel 
        setApi={setApi} 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <div className="relative aspect-square md:aspect-auto overflow-hidden rounded-xl md:rounded-2xl bg-neutral-50">
                {item.type === "image" ? (
                  <Image
                    alt={`Product image ${index + 1}`}
                    width={700}
                    height={700}
                    src={item.src || "/placeholder.svg"}
                    className="h-full w-full object-cover md:object-contain transition-transform duration-300 hover:scale-105 md:hover:scale-100"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    draggable={false}
                  />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls
                    className="h-full w-full object-cover md:object-contain"
                    playsInline
                    preload="metadata"
                  >
                    <track kind="captions" label="English" />
                  </video>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation buttons - responsive positioning */}
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-4 flex gap-1.5 md:gap-2">
          <CarouselPrevious className="static translate-x-0 translate-y-0 rounded-full border border-neutral-200 bg-background/90 backdrop-blur-sm hover:bg-secondary transition-colors h-8 w-8 md:h-10 md:w-10 shadow-sm" />
          <CarouselNext className="static translate-x-0 translate-y-0 rounded-full border border-neutral-200 bg-background/90 backdrop-blur-sm hover:bg-secondary transition-colors h-8 w-8 md:h-10 md:w-10 shadow-sm" />
        </div>
      </Carousel>
      {/* Thumbnail Carousel - responsive design */}
      <Carousel 
        setApi={setThumbApi} 
        className="w-full"
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 relative basis-[20%] sm:basis-[16.66%] md:basis-[15%] lg:basis-[12.5%]"
            >
              <button
                type="button"
                className="relative w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-md md:rounded-lg"
                onClick={() => api && api.scrollTo(index)}
                aria-label={`View ${item.type === 'image' ? 'image' : 'video'} ${index + 1}`}
              >
                {item.type === "image" ? (
                  <Image
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    src={item.src || "/placeholder.svg"}
                    className={`aspect-square h-auto w-full rounded-md md:rounded-lg object-cover transition-all duration-200 ${
                      selectedIndex === index
                        ? "border-2 border-primary ring-1 ring-primary/30 shadow-md"
                        : "border border-neutral-200 hover:border-neutral-300 active:scale-95"
                    }`}
                    sizes="(max-width: 640px) 20vw, (max-width: 768px) 16vw, (max-width: 1024px) 15vw, 12vw"
                    draggable={false}
                  />
                ) : (
                  <div
                    className={`relative aspect-square h-auto w-full rounded-md md:rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedIndex === index
                        ? "border-2 border-primary ring-1 ring-primary/30 shadow-md"
                        : "border border-neutral-200 hover:border-neutral-300 active:scale-95"
                    }`}
                  >
                    <Image
                      alt={`Video thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      src={item.poster || "/placeholder.svg"}
                      className="aspect-square h-auto w-full object-cover"
                      sizes="(max-width: 640px) 20vw, (max-width: 768px) 16vw, (max-width: 1024px) 15vw, 12vw"
                      draggable={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                      <Play
                        className="size-3 sm:size-4 md:size-5 text-white drop-shadow-lg"
                        fill="white"
                      />
                    </div>
                  </div>
                )}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
