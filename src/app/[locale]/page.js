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
import PricingSection from "@/components/pricing-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import RefundSection from "@/components/refund-section";
import { useStore } from "@/context/store-context";
import { PageLoader } from "@/components/ui/loader";
import FadeInSection from "@/components/ui/fade-in-section";

export default function Home() {
  const { products, fetchProducts, loading } = useStore();

  useEffect(() => {
    // Only fetch if we don't have products yet
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main>
      <Navbar />
      <FadeInSection delay={0.1} direction="up">
        <HeroSection />
      </FadeInSection>
      <FadeInSection delay={0.2} direction="up">
        <CardCollections products={products} />
      </FadeInSection>
      <FadeInSection delay={0.3} direction="up">
        <TestimonialSection />
      </FadeInSection>
      <FadeInSection delay={0.4} direction="up">
        <BeforeAfterSection />
      </FadeInSection>
      <FadeInSection delay={0.5} direction="up">
        <RevealSlider />
      </FadeInSection>
      <FadeInSection delay={0.6} direction="up">
        <BeforeEventSection />
      </FadeInSection>
      <FadeInSection delay={0.7} direction="up">
        <QuoteSection />
      </FadeInSection>
      <FadeInSection delay={0.8} direction="up">
        <DuringEventSection />
      </FadeInSection>
      <FadeInSection delay={0.9} direction="up">
        <QuoteSection2 />
      </FadeInSection>
      <FadeInSection delay={1.0} direction="up">
        <AfterEventSection />
      </FadeInSection>
      <FadeInSection delay={1.1} direction="up">
        <CaseStudiesSection />
      </FadeInSection>
      <FadeInSection delay={1.2} direction="up">
        <ProductReviewsSection />
      </FadeInSection>
      <FadeInSection delay={1.3} direction="up">
        <PricingSection />
      </FadeInSection>
      <div className="bg-secondary pt-14">
        <FadeInSection delay={1.4} direction="up">
          <RefundSection />
        </FadeInSection>
        <FadeInSection delay={1.5} direction="up">
          <FAQSection />
        </FadeInSection>
      </div>
      <FadeInSection delay={1.6} direction="up">
        <Footer />
      </FadeInSection>
    </main>
  );
}
