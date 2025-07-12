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
    <div className="flex flex-col gap-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-4">
          {images.map((item, index) => (
            <CarouselItem key={index} className="pl-4 cursor-pointer">
              {item.type === "image" ? (
                <Image
                  alt="#default title"
                  width={700}
                  height={700}
                  src={item.src || "/placeholder.svg"}
                  className="h-auto w-full rounded-2xl"
                  priority={index === 0}
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  className="h-auto w-full rounded-2xl"
                >
                  <track kind="captions" label="English" />
                </video>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-3 right-4 flex gap-2">
          <CarouselPrevious className="static translate-x-0 translate-y-0 rounded-full border border-neutral-200 bg-background p-1 hover:bg-secondary" />
          <CarouselNext className="static translate-x-0 translate-y-0 rounded-full border border-neutral-200 bg-background p-1 hover:bg-secondary" />
        </div>
      </Carousel>
      <Carousel setApi={setThumbApi} className="w-full">
        <CarouselContent className="-ml-4">
          {images.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 relative basis-[15%] cursor-pointer"
            >
              {item.type === "image" ? (
                <Image
                  alt="#default title"
                  width={100}
                  height={100}
                  src={item.src || "/placeholder.svg"}
                  className={`aspect-square h-auto w-full rounded-lg object-contain ${
                    selectedIndex === index
                      ? "border-2 border-primary"
                      : "border border-neutral-200"
                  }`}
                  priority={index === 0}
                  onClick={() => api.scrollTo(index)}
                />
              ) : (
                <div
                  className={`aspect-square h-auto w-full rounded-lg object-contain ${
                    selectedIndex === index
                      ? "border-2 border-primary"
                      : "border border-neutral-200"
                  }`}
                  onClick={() => api.scrollTo(index)}
                >
                  <Image
                    alt="#default title 7"
                    width={100}
                    height={100}
                    src={item.poster || "/placeholder.svg"}
                    className="aspect-square h-auto w-full rounded-lg border border-neutral-200 object-contain"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 ml-4 flex items-center justify-center">
                    <Play
                      className="lucide lucide-play size-8 text-white"
                      fill="white"
                    />
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
