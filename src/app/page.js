"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import CardCollections from "@/components/card-collections";
import TestimonialSection from "@/components/testimonial-section";
import BeforeAfterSection from "@/components/before-after-section";
import RevealSlider from "@/components/reveal-slider";
import BeforeEventSection from "@/components/before-event-section";
import QuoteSection from "@/components/quote-section";
import DuringEventSection from "@/components/during-event-section";
import QuoteSection2 from "@/components/quote-section-2";
import AfterEventSection from "@/components/after-event-section";
import CaseStudiesSection from "@/components/case-studies-section";
import ProductReviewsSection from "@/components/product-reviews-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import RefundSection from "@/components/refund-section";
import { useStore } from "@/context/store-context";
import { PageLoader } from "@/components/ui/loader";

export default function Home() {
  const { products, fetchProducts } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <PageLoader 
        title="Loading Mibio Store" 
        description="Preparing your digital business card experience..."
      />
    );
  }

  return (
    <main>
      <Navbar />
      <HeroSection />
      <CardCollections products={products} />
      <TestimonialSection />
      <BeforeAfterSection />
      <RevealSlider />
      <BeforeEventSection />
      <QuoteSection />
      <DuringEventSection />
      <QuoteSection2 />
      <AfterEventSection />
      <CaseStudiesSection />
      <ProductReviewsSection />
      <div className="bg-secondary pt-14">
        <RefundSection />
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}
