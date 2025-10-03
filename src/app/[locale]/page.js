"use client";

import { useEffect, useRef } from "react";
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
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch once if we don't have products and we're not already loading
    if (!hasFetched.current && !products?.length && !loading) {
      hasFetched.current = true;
      fetchProducts();
    }
  }, [fetchProducts, products, loading]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main>
      <Navbar />
      <FadeInSection direction="up">
        <HeroSection />
      </FadeInSection>
      <FadeInSection direction="up">
        <CardCollections products={products} />
      </FadeInSection>
      {/* <FadeInSection direction="up">
        <TestimonialSection />
      </FadeInSection> */}
      <FadeInSection direction="up">
        <BeforeAfterSection />
      </FadeInSection>
      <FadeInSection direction="up">
        <RevealSlider />
      </FadeInSection>
      <FadeInSection direction="up">
        <BeforeEventSection />
      </FadeInSection>
      <FadeInSection direction="up">
        <QuoteSection />
      </FadeInSection>
      <FadeInSection direction="up">
        <DuringEventSection />
      </FadeInSection>
      <FadeInSection direction="up">
        <QuoteSection2 />
      </FadeInSection>
      <FadeInSection direction="up">
        <AfterEventSection />
      </FadeInSection>
      {/* <FadeInSection direction="up">
        <CaseStudiesSection />
      </FadeInSection> */}
      <FadeInSection direction="up">
        <ProductReviewsSection />
      </FadeInSection>
      <FadeInSection direction="up">
        <PricingSection />
      </FadeInSection>
      <div className="bg-secondary pt-14">
        <FadeInSection direction="up">
          <RefundSection />
        </FadeInSection>
        <FadeInSection direction="up">
          <FAQSection />
        </FadeInSection>
      </div>
      <FadeInSection direction="up">
        <Footer />
      </FadeInSection>
    </main>
  );
}
