"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Workflow, RefreshCw, GitGraph, ContactRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Import useState

export default function AfterEventSection() {
  const accordionItems = [
    {
      value: "item-1",
      icon: Workflow,
      title: "Automated Follow-Ups",
      description:
        "Send post-event follow-ups right inside your V1CE dashboard. Keep conversations warm and move leads further down your funnel without lifting a finger.",
      imageSrc:
        "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/3266f3bb-f934-442c-8323-15b64c8a4c00/public",
    },
    {
      value: "item-2",
      icon: RefreshCw,
      title: "Auto-Save to Your CRM",
      description:
        "Automatically sync new contacts and lead data directly to your CRM, eliminating manual entry and ensuring data accuracy.",
      imageSrc:
        "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/84d64f5f-e61b-4bc3-f967-09e0e5b37200/thumbnail", // Placeholder image
    },
    {
      value: "item-3",
      icon: GitGraph,
      title: "Track What Works",
      description:
        "Gain insights into your networking efforts with detailed analytics on profile views, lead captures, and follow-up effectiveness.",
      imageSrc:
        "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4030f710-bbce-4a18-5591-66121185e100/thumbnail", // Placeholder image
    },
    {
      value: "item-4",
      icon: ContactRound,
      title: "Smart Contact Book",
      description:
        "Build a comprehensive digital contact book with rich profiles for every person you meet, including notes and follow-up history.",
      imageSrc:
        "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/e57def69ba19ed255ef84e48cd030c8d4a6c8d7a-1054x1428.jpg", // Placeholder image
    },
  ];

  const [activeItem, setActiveItem] = useState("item-1"); // Set default active item to "item-1"

  const currentImageSrc =
    accordionItems.find((item) => item.value === activeItem)?.imageSrc ||
    accordionItems[0].imageSrc;

  return (
    <section id="after" className="w-full" style={{ scrollMarginTop: "100px" }}>
      <div className="center-narrow flex flex-col gap-8 rounded-xl p-5 py-16 md:p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex max-w-[750px] flex-col items-center gap-2">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              After The Event
            </h2>
            <p className="text-center text-muted-foreground">
              Automate outreach, sync leads, and track engagement.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:max-w-full">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="flex flex-col p-0"
              onValueChange={setActiveItem}
            >
              {accordionItems.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className={`flex flex-col p-0 border-b-0 px-4 ${
                    item.value === activeItem
                      ? "rounded-r-lg border-l-2 border-primary bg-primary/10"
                      : ""
                  }`}
                >
                  <AccordionTrigger className="-mx-2 flex w-full items-center justify-between rounded-lg border-border/20 px-2 py-4 text-left text-lg font-semibold transition-all duration-300 ease-out data-[state=open]:border-b-0">
                    <div className="flex items-center gap-2">
                      <item.icon className="size-6" />
                      <span className="pr-4">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col pb-4 text-left text-muted-foreground">
                    {item.description && (
                      <p className="pb-4">{item.description}</p>
                    )}
                    {item.imageSrc && (
                      <div className="relative flex aspect-video w-full md:hidden">
                        <div className="w-full">
                          <div className="aspect-square overflow-hidden rounded-2xl border border-border">
                            <img
                              alt={item.title}
                              loading="lazy"
                              width="600"
                              height="600"
                              decoding="async"
                              className="size-full object-cover"
                              style={{ color: "transparent" }}
                              src={item.imageSrc || "/placeholder.svg"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* Desktop-only image */}
          <div className="relative hidden aspect-video w-full items-center md:flex">
            <div className="w-full">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border">
                <img
                  alt="Automated Follow-Ups"
                  loading="lazy"
                  width="600"
                  height="600"
                  decoding="async"
                  className="size-full object-cover"
                  style={{ color: "transparent" }}
                  src={currentImageSrc || "/placeholder.svg"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <a href="/collections/tap-business-cards">
            <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
              Get Your Smart Card
            </Button>
          </a>
          <p className="text-sm text-muted-foreground">
            100% Lifetime Guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
