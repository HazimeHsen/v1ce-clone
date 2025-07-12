"use client";

import { useState, useEffect } from "react";
import ProductGallery from "./product-gallery";
import ProductTabs from "./product-tabs";
import OverviewContent from "./overview-content";
import DetailsContent from "./details-content";
import FAQContent from "./faq-content";

export default function ProductContentSection({
  images,
  testimonials,
  salesPoints,
  faqItems,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [api, setApi] = useState();
  const [thumbApi, setThumbApi] = useState();

  useEffect(() => {
    if (!api || !thumbApi) {
      return;
    }
    api.on("select", () => {
      thumbApi.scrollTo(api.selectedScrollSnap());
    });
    thumbApi.on("select", () => {
      api.scrollTo(thumbApi.selectedScrollSnap());
    });
  }, [api, thumbApi]);

  const handleThumbnailClick = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section className="order-last flex flex-col gap-8 md:order-first">
      <div className="hidden md:block">
        <ProductGallery
          images={images}
          api={api}
          setApi={setApi}
          thumbApi={thumbApi}
          setThumbApi={setThumbApi}
          handleThumbnailClick={handleThumbnailClick}
        />
      </div>
      <div
        dir="ltr"
        data-orientation="horizontal"
        className="flex w-full flex-col items-center justify-center gap-4"
      >
        <ProductTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          faqItems={faqItems}
        />
        {activeTab === "overview" && (
          <OverviewContent
            salesPoints={salesPoints}
            testimonials={testimonials}
          />
        )}
        {activeTab === "details" && <DetailsContent />}
        {activeTab === "faq" && (
          <FAQContent
            faqItems={faqItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </section>
  );
}
