"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Rocket,
  Trees,
  ChromeIcon as ChartNoAxesColumn,
  Wrench,
  Nfc,
  Boxes,
  Radio,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Save 10+ Hours a Month",
    description: "Let Mibio handle follow-ups for you.",
  },
  {
    icon: Rocket,
    title: "Never Miss a Lead",
    description: "Stay updated and connect to your CRM fast.",
  },
  {
    icon: Trees,
    title: "Eco-Friendly and Saves Money",
    description: "Use less paper and save more cash.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Track Data Instantly",
    description: "See who's interested and act quickly.",
  },
  {
    icon: Wrench,
    title: "Simple Team and Brand Tools",
    description: "Keep links updated and manage everything fast.",
  },
  {
    icon: Nfc,
    title: "Impress on First Tap",
    description: "Modern, sleek, and memorable.",
  },
  {
    icon: Boxes,
    title: "Built-In Lead Capture",
    description: "Collect emails or contacts.",
  },
  {
    icon: Radio,
    title: "Real-Time Profile Edits",
    description: "Update your links, info, and branding.",
  },
];

export function FeaturesSlider() {
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

  const duplicatedFeatures = [...features, ...features];

  return (
    <section className="overflow-hidden bg-secondary py-14">
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-2xl font-bold max-w-xs px-8 text-center text-primary-foreground">
          Get More Than a Business Card
        </h2>

        <div
          className="relative w-full"
          role="region"
          aria-roledescription="carousel"
        >
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-hidden"
              style={{ scrollBehavior: "auto" }}
            >
              {duplicatedFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    role="group"
                    aria-roledescription="slide"
                    className="shrink-0 flex min-w-[350px] select-none items-center gap-4 px-4"
                  >
                    <IconComponent className="size-8 min-w-8 text-white" />
                    <div>
                      <h3 className="text-nowrap text-base font-semibold leading-6 text-primary-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-4 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
        >
          Create My NFC Card
        </Button>
      </div>
    </section>
  );
}
