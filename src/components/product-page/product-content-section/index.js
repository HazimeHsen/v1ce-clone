"use client";

import { useState, useEffect } from "react";
import ProductGallery from "./product-gallery";
import ProductTabs from "./product-tabs";
import OverviewContent from "./overview-content";
import DetailsContent from "./details-content";
import FAQContent from "./faq-content";
import MobileProductInfo from "./mobile-product-info";

export default function ProductContentSection({
  images,
  testimonials,
  salesPoints,
  faqItems,
  // Mobile product info props
  product,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  selectedBundle,
  setSelectedBundle,
  quantityBundles,
  firstOption,
  accordionOptions,
  colorSwatches,
  formatPrice,
  basePrice,
  selectedSwatchIndex,
  handleSwatchSelect,
  decrementQuantity,
  incrementQuantity,
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
    <section className="flex flex-col gap-8">
      <div>
        <ProductGallery
          images={images}
          api={api}
          setApi={setApi}
          thumbApi={thumbApi}
          setThumbApi={setThumbApi}
          handleThumbnailClick={handleThumbnailClick}
        />
      </div>
      
      {/* Mobile Product Info - shown only on mobile */}
      <MobileProductInfo
        product={product}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedBundle={selectedBundle}
        setSelectedBundle={setSelectedBundle}
        quantityBundles={quantityBundles}
        firstOption={firstOption}
        accordionOptions={accordionOptions}
        colorSwatches={colorSwatches}
        formatPrice={formatPrice}
        basePrice={basePrice}
        selectedSwatchIndex={selectedSwatchIndex}
        handleSwatchSelect={handleSwatchSelect}
        decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity}
      />
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
        {activeTab === "details" && <DetailsContent product={product} />}
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
