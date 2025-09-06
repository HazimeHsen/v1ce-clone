"use client";

import { cn } from "@/lib/utils"; // Import the cn utility function
import { useTranslations } from "@/hooks/use-translations";

export default function ProductTabs({ activeTab, setActiveTab, faqItems }) {
  const { t } = useTranslations("productPage");
  return (
    <div className="flex h-12 w-full gap-2 overflow-x-auto overflow-y-hidden rounded-lg py-1.5">
      <button
        type="button"
        className={cn(
          "flex-basis-0 inline-flex flex-grow basis-0 items-center justify-center whitespace-nowrap rounded-md bg-primary/10 px-6 py-2 text-center text-[15px] font-medium leading-[15px] text-primary ring-offset-background transition-all",
          activeTab === "overview"
            ? "bg-primary text-white"
            : "data-[state=active]:bg-primary data-[state=active]:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        )}
        onClick={() => setActiveTab("overview")}
      >
        {t("tabs.overview")}
      </button>
      <button
        type="button"
        className={cn(
          "flex-basis-0 inline-flex flex-grow basis-0 items-center justify-center whitespace-nowrap rounded-md bg-primary/10 px-6 py-2 text-center text-[15px] font-medium leading-[15px] text-primary ring-offset-background transition-all",
          activeTab === "details"
            ? "bg-primary text-white"
            : "data-[state=active]:bg-primary data-[state=active]:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        )}
        onClick={() => setActiveTab("details")}
      >
        {t("tabs.details")}
      </button>
      <button
        type="button"
        className={cn(
          "flex-basis-0 inline-flex flex-grow basis-0 items-center justify-center whitespace-nowrap rounded-md bg-primary/10 px-6 py-2 text-center text-[15px] font-medium leading-[15px] text-primary ring-offset-background transition-all",
          activeTab === "faq"
            ? "bg-primary text-white"
            : "data-[state=active]:bg-primary data-[state=active]:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        )}
        onClick={() => setActiveTab("faq")}
      >
        {t("tabs.faq")}
      </button>
    </div>
  );
}
