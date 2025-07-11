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
import TryV1CESection from "@/components/try-v1ce-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HeroSection />
      <CardCollections />
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
        <TryV1CESection />
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}
