"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nfc, Scan, Mail, ToggleRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Import useState
import { useTranslations } from "@/hooks/use-translations";

export default function DuringEventSection() {
  const { t } = useTranslations();
  const accordionItems = [
    {
      value: "item-1",
      icon: Nfc,
      title: t("duringEvent.items.shareDetails.title"),
      description: t("duringEvent.items.shareDetails.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/c59cef20fc4ccf0e84b5e28cd5fafeff?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-2",
      icon: Scan,
      title: t("duringEvent.items.scanCards.title"),
      description: t("duringEvent.items.scanCards.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/f32f56a27580fcbba0574bac25f89e9e?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-3",
      icon: Mail,
      title: t("duringEvent.items.sendEmails.title"),
      description: t("duringEvent.items.sendEmails.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/59bcd7afe25721306454cba71985e99e?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-4",
      icon: ToggleRight,
      title: t("duringEvent.items.switchProfiles.title"),
      description: t("duringEvent.items.switchProfiles.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/a56f2d45a10b250bf07a7d5fdd092695?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-5",
      icon: Map,
      title: t("duringEvent.items.mappedMemories.title"),
      description: t("duringEvent.items.mappedMemories.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/a56f2d45a10b250bf07a7d5fdd092695?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
  ];

  const [activeItem, setActiveItem] = useState("item-1"); // Set default active item to "item-1"

  const currentVideoSrc =
    accordionItems.find((item) => item.value === activeItem)?.videoSrc ||
    accordionItems[0].videoSrc;

  return (
    <section
      id="during"
      className="w-full"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="center-narrow flex flex-col gap-8 rounded-xl p-5 py-16 md:p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex max-w-[750px] flex-col items-center gap-2">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              {t("duringEvent.title")}
            </h2>
            <p className="text-center text-muted-foreground">
              {t("duringEvent.description")}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-10">
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
                  className={`flex flex-col p-0 px-4 border-b-0 ${
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
                    {item.videoSrc && (
                      <div className="relative flex aspect-video w-full md:hidden">
                        <div className="w-full">
                          <div className="relative aspect-square size-full overflow-hidden rounded-2xl border border-border">
                            <div
                              className="bg-black"
                              style={{
                                position: "relative",
                                paddingTop: "100%",
                              }}
                            >
                              <iframe
                                src={item.videoSrc}
                                title={`Video stream for ${item.title}`}
                                frameBorder="0"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                allowFullScreen
                                style={{
                                  position: "absolute",
                                  inset: "0px",
                                  height: "100%",
                                  width: "100%",
                                }}
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* Desktop-only video */}
          <div className="relative hidden aspect-video w-full items-center md:flex">
            <div className="w-full">
              <div className="relative aspect-square size-full overflow-hidden rounded-2xl border border-border">
                <div
                  className="bg-black"
                  style={{ position: "relative", paddingTop: "100%" }}
                >
                  <iframe
                    src={currentVideoSrc}
                    title="Video stream of digital business card sharing methods"
                    frameBorder="0"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: "0px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <a href="/collections/tap-business-cards">
            <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
              {t("duringEvent.cta")}
            </Button>
          </a>
          <p className="text-sm text-muted-foreground">
            {t("duringEvent.guarantee")}
          </p>
        </div>
      </div>
    </section>
  );
}
