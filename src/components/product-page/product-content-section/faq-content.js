"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function FAQContent({ faqItems }) {
  const [activeFaqCategory, setActiveFaqCategory] = useState("");

  useEffect(() => {
    if (faqItems && Object.keys(faqItems).length > 0) {
      setActiveFaqCategory(Object.keys(faqItems)[0]);
    }
  }, [faqItems]);

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full">
      <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-5 @md:p-8">
        <h2 className="text-center text-2xl font-bold @md:text-4xl">
          Got Questions? We’ve Got You Covered
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {Object.keys(faqItems).map((category, index) => (
              <button
                key={index}
                className={cn(
                  "inline-flex items-center justify-center gap-1 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary/10 text-primary-foreground hover:bg-primary/20 px-5 py-2 h-7 rounded-full text-xs",
                  activeFaqCategory === category
                    ? "bg-primary text-white"
                    : "data-[state=active]:bg-primary data-[state=active]:text-white",
                )}
                type="button"
                role="tab"
                aria-selected={activeFaqCategory === category}
                tabIndex={activeFaqCategory === category ? 0 : -1}
                onClick={() => setActiveFaqCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {activeFaqCategory && (
            <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                data-orientation="vertical"
              >
                {faqItems[activeFaqCategory].map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`faq-item-${itemIndex}`}
                    className="border-b border-neutral-200/20 last:border-0"
                  >
                    <AccordionTrigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]>svg]:rotate-180 text-left text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="pb-4 pt-0 text-sm">{item.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
