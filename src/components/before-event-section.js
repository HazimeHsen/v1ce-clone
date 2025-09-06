"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  Nfc,
  ToggleRight,
  RefreshCw,
  WalletMinimal,
} from "lucide-react";
import { useState } from "react"; // Import useState
import { useTranslations } from "@/hooks/use-translations";

export default function BeforeEventSection() {
  const { t } = useTranslations();
  const accordionItems = [
    {
      value: "item-1",
      icon: Check,
      title: t("beforeEvent.items.showUpReady.title"),
      description: t("beforeEvent.items.showUpReady.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/d57acb13277d25f3d42dec5691410144?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-2",
      icon: Nfc,
      title: t("beforeEvent.items.buildProfile.title"),
      description: t("beforeEvent.items.buildProfile.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/c59cef20fc4ccf0e84b5e28cd5fafeff?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-3",
      icon: ToggleRight,
      title: t("beforeEvent.items.turnOnLeadCapture.title"),
      description: t("beforeEvent.items.turnOnLeadCapture.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/f32f56a27580fcbba0574bac25f89e9e?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-4",
      icon: RefreshCw,
      title: t("beforeEvent.items.syncToCrm.title"),
      description: t("beforeEvent.items.syncToCrm.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/59bcd7afe25721306454cba71985e99e?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      value: "item-5",
      icon: WalletMinimal,
      title: t("beforeEvent.items.addToWallet.title"),
      description: t("beforeEvent.items.addToWallet.description"),
      videoSrc:
        "https://iframe.cloudflarestream.com/59bcd7afe25721306454cba71985e99e?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
  ];

  const [activeItem, setActiveItem] = useState("item-3"); // Set default active item to "item-3"

  const currentVideoSrc =
    accordionItems.find((item) => item.value === activeItem)?.videoSrc ||
    accordionItems[0].videoSrc;

  return (
    <section
      id="before"
      className="w-full"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="center-narrow flex flex-col gap-8 rounded-xl p-5 py-16 md:p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex max-w-[750px] flex-col items-center gap-2">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              {t("beforeEvent.title")}
            </h2>
            <p className="text-center text-muted-foreground">
              {t("beforeEvent.description")}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:max-w-full">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-3"
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
                  <AccordionTrigger className="-mx-2 flex w-full items-center justify-between rounded-lg px-2 py-4 text-left text-lg font-semibold transition-all duration-300 ease-out">
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
                              className=""
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
                  className=""
                  style={{ position: "relative", paddingTop: "100%" }}
                >
                  <iframe
                    src={currentVideoSrc}
                    title="Video stream of digital business card views"
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
            <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
              {t("beforeEvent.cta")}
            </button>
          </a>
          <p className="text-sm text-muted-foreground">
            {t("beforeEvent.guarantee")}
          </p>
        </div>
      </div>
    </section>
  );
}
