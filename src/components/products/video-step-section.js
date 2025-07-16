"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ShoppingBasket, Brush, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

const STEP_DURATION_MS = 6800;
const PROGRESS_INTERVAL_MS = 100;

export default function VideoStepSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [stepProgress, setStepProgress] = useState(0);
  const timeoutRef = useRef(null);

  const startStepTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const startTime = Date.now();
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;

      const newProgress = Math.min(
        100,
        Math.floor((elapsed / STEP_DURATION_MS) * 100)
      );

      setStepProgress(newProgress);

      if (newProgress < 100) {
        timeoutRef.current = setTimeout(animateProgress, PROGRESS_INTERVAL_MS);
      } else {
        setActiveStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
        setStepProgress(0);
      }
    };

    timeoutRef.current = setTimeout(animateProgress, PROGRESS_INTERVAL_MS);
  }, []);

  useEffect(() => {
    startStepTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeStep, startStepTimer]);

  const handleStepClick = (step) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveStep(step);
    setStepProgress(0);
  };

  const overallProgress =
    (activeStep - 1) * (100 / 3) + (stepProgress / 100) * (100 / 3);

  const steps = [
    {
      id: 1,
      icon: ShoppingBasket,
      title: "1. Pick Your Card",
      description:
        "Choose a card that matches your brand: classic, bold, or eco-friendly.",
    },
    {
      id: 2,
      icon: Brush,
      title: "2. Place Your Order",
      description:
        "Fill out a quick design form. We'll create your card for free.",
    },
    {
      id: 3,
      icon: Share2,
      title: "3. Share",
      description: "Get your card fast and ready to share. No apps needed.",
    },
  ];

  return (
    <section className="py-[50px] md:py-20">
      <div className="max-w-4xl mx-auto px-4 space-y-6 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-3">
          <Badge variant="accent">Easy As 1-2-3</Badge>
          <h2 className="text-3xl font-bold md:text-5xl">
            {" "}
            Order In 3 Easy Steps
          </h2>
          <p className="text-lg lg:max-w-[70%]">
            We design all orders in-house for free because your first impression
            is ours too.
          </p>
          <Link href="/collections/tap-business-cards">
            <Button variant="default">Get Your V1CE Card</Button>
          </Link>
        </div>
        <div className="flex flex-col-reverse gap-6 sm:flex-col w-full">
          <div className="flex flex-col sm:flex-row md:flex-row gap-2 md:gap-4 justify-center">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "flex basis-1/3 cursor-pointer flex-col rounded-lg border border-transparent p-4 text-left transition-all duration-150",
                  activeStep === step.id
                    ? "bg-secondary opacity-100"
                    : "opacity-50"
                )}
              >
                <div className="flex flex-col items-center gap-2 sm:flex-row md:flex-col md:items-start">
                  <step.icon
                    className={cn(
                      "size-5",
                      activeStep === step.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-center text-[20px] font-semibold sm:text-left lg:text-[30px]">
                    {step.title}
                  </span>
                </div>
                <p className="hidden sm:block">{step.description}</p>
              </button>
            ))}
          </div>
          <Progress value={overallProgress} className="h-1 w-full" />
          <div className="w-full overflow-hidden rounded-lg border border-neutral-200">
            <AspectRatio ratio={16 / 9}>
              <iframe
                title="Video stream of tutorial video steps"
                src={`https://iframe.cloudflarestream.com/30e25ed8c64647e736bb13d83ecedbfb?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false`}
                frameBorder="0"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              ></iframe>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
