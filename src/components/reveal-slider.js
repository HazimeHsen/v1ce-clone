"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import SliderImageCard from "./slider-image-card";

const sliderImages = [
  {
    before:
      "https://cdn.shopify.com/s/files/1/0559/6246/8523/files/wave_nfc_card_front_1024x1024.webp?v=1729256771",
    after:
      "https://wavecnct.com/cdn/shop/articles/Best_nfc_business_card_750x.webp?v=1737334142",
  },
  {
    before:
      "https://cdn.shopify.com/s/files/1/0559/6246/8523/files/wave_nfc_card_front_1024x1024.webp?v=1729256771",
    after:
      "https://wavecnct.com/cdn/shop/articles/Best_nfc_business_card_750x.webp?v=1737334142",
  },
  {
    before:
      "https://cdn.shopify.com/s/files/1/0559/6246/8523/files/wave_nfc_card_front_1024x1024.webp?v=1729256771",
    after:
      "https://wavecnct.com/cdn/shop/articles/Best_nfc_business_card_750x.webp?v=1737334142",
  },
];

const allSliderImages = [
  ...sliderImages,
  ...sliderImages,
  ...sliderImages,
  ...sliderImages,
  ...sliderImages,
];

export default function RevealSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const initialMouseX = useRef(0);
  const initialSliderPosition = useRef(50);
  const containerRef = useRef(null);

  const [translateX, setTranslateX] = useState(0);
  const animationFrameId = useRef(null);
  const lastTime = useRef(null);
  const scrollSpeed = 0.05;

  const animateScroll = useCallback((time) => {
    if (lastTime.current !== null) {
      const deltaTime = time - lastTime.current;
      setTranslateX((prevX) => {
        let newX = prevX - scrollSpeed * deltaTime;
        const singleSetWidth = sliderImages.length * 216;
        if (newX < -singleSetWidth) {
          newX += singleSetWidth;
        }
        return newX;
      });
    }
    lastTime.current = time;
    animationFrameId.current = requestAnimationFrame(animateScroll);
  }, []);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateScroll]);

  const handlePointerDown = useCallback(
    (event) => {
      setIsDragging(true);
      initialMouseX.current = event.clientX;
      initialSliderPosition.current = sliderPosition;
      event.currentTarget.setPointerCapture(event.pointerId);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    },
    [sliderPosition]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!isDragging || !containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const deltaX = event.clientX - initialMouseX.current;
      let newPosition =
        initialSliderPosition.current + (deltaX / containerWidth) * 100;

      newPosition = Math.max(0, Math.min(100, newPosition));
      setSliderPosition(newPosition);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (event) => {
      setIsDragging(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
      if (!animationFrameId.current) {
        lastTime.current = null;
        animationFrameId.current = requestAnimationFrame(animateScroll);
      }
    },
    [animateScroll]
  );

  return (
    <div
      className="pointer-events-none relative my-14 mt-8 flex w-full select-none flex-col items-center"
      ref={containerRef}
    >
      <div
        className="w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div
          className="flex"
          style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
        >
          {allSliderImages.map((item, index) => (
            <SliderImageCard
              key={`before-${index}`}
              imageSrc={item.before}
              imageAlt={`Before ${index}`}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute z-10 h-[calc(100%+20px)] w-[10px] -mt-[10px] rounded-full bg-white shadow-[0_0_20px_5px_rgba(5,130,255,0.75)] cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      ></div>
      <div
        className="absolute inset-0 w-full overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <div
          className="flex"
          style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
        >
          {allSliderImages.map((item, index) => (
            <SliderImageCard
              key={`after-${index}`}
              imageSrc={item.after}
              imageAlt={`After ${index}`}
              isAfter={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
