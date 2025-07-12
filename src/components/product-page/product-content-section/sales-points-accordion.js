"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SalesPointsAccordion({ salesPoints }) {
  return (
    <Accordion type="single" collapsible className="flex w-full flex-col">
      {salesPoints.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="group flex flex-col rounded-r-lg border-l-[2px] border-b-0 border-opacity-30 p-0 opacity-50 transition-opacity duration-200 data-[state=open]:border-primary px-4 data-[state=open]:border-opacity-100 data-[state=open]:bg-primary/10 data-[state=open]:opacity-100"
        >
          <AccordionTrigger className="flex w-full items-center justify-between py-2 text-left text-lg font-semibold transition-all">
            <span>{item.title}</span>
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="pb-4 pt-0 flex flex-col gap-2 text-left text-muted-foreground">
              {item.content}
              {item.videoSrc && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "56.25%",
                  }}
                >
                  <div
                    className="overflow-hidden rounded-md bg-neutral-200"
                    style={{
                      position: "absolute",
                      inset: "0px",
                    }}
                  >
                    <div
                      className="w-full"
                      style={{
                        position: "absolute",
                        paddingTop: "56.25%",
                      }}
                    >
                      <iframe
                        src={item.videoSrc}
                        title={`Video stream of ${item.title}`}
                        frameBorder="0"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          inset: "0px",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
