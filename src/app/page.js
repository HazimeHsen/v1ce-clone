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
import Navbar from "@/components/navbar";
import RefundSection from "@/components/refund-section";

const products = [
  {
    href: "/product/24k-gold-nfc-business-card",
    imageSrc: "/placeholder.svg?height=500&width=500&text=24K Gold Card",
    imageAlt: "24K Luxury Digital Business Card",
    badgeText: "By Invitation Only",
    title: "24K Luxury Digital Business Card",
    description: "Invitation Only. Request Access.",
    price: "ل.ل39,634,000.00",
  },
  {
    href: "/product/metal-nfc-business-cards",
    imageSrc: "/placeholder.svg?height=500&width=500&text=Metal Card",
    imageAlt: "Metal Digital Business Card",
    badgeText: "Most Popular",
    title: "Metal Digital Business Card",
    description:
      "For professionals who never want to fumble again. Tap to share. No app. No stress.",
    price: "ل.ل12,262,000.00",
    colorSwatches: [
      {
        alt: "Black & Silver",
        src: "/placeholder.svg?height=20&width=20&text=Black",
      },
      {
        alt: "Black & Gold",
        src: "/placeholder.svg?height=20&width=20&text=Gold",
      },
      {
        alt: "Silver & Black",
        src: "/placeholder.svg?height=20&width=20&text=Silver",
      },
      {
        alt: "Blue & Silver",
        src: "/placeholder.svg?height=20&width=20&text=Blue",
      },
      {
        alt: "Blue & Gold",
        src: "/placeholder.svg?height=20&width=20&text=BlueGold",
      },
      {
        alt: "White & Silver",
        src: "/placeholder.svg?height=20&width=20&text=White",
      },
      {
        alt: "White & Gold",
        src: "/placeholder.svg?height=20&width=20&text=WhiteGold",
      },
      {
        alt: "Green & Silver",
        src: "/placeholder.svg?height=20&width=20&text=Green",
      },
      {
        alt: "Green & Gold",
        src: "/placeholder.svg?height=20&width=20&text=GreenGold",
      },
      {
        alt: "Red & Silver",
        src: "/placeholder.svg?height=20&width=20&text=Red",
      },
      {
        alt: "Red & Gold",
        src: "/placeholder.svg?height=20&width=20&text=RedGold",
      },
    ],
  },
  {
    href: "/product/bamboo-nfc-business-cards",
    imageSrc: "/placeholder.svg?height=500&width=500&text=Bamboo Card",
    imageAlt: "Bamboo Digital Business Card",
    badgeText: "Eco-Friendly",
    title: "Bamboo Digital Business Card",
    description:
      "One card. One tree planted. Edit your info anytime, no reprint",
    price: "ل.ل8,980,000.00",
    colorSwatches: [
      {
        alt: "Sapele Bamboo",
        src: "/placeholder.svg?height=20&width=20&text=Sapele",
      },
      {
        alt: "Plain Bamboo",
        src: "/placeholder.svg?height=20&width=20&text=Plain",
      },
      {
        alt: "Black Bamboo",
        src: "/placeholder.svg?height=20&width=20&text=BlackBamboo",
      },
      {
        alt: "Walnut Bamboo",
        src: "/placeholder.svg?height=20&width=20&text=Walnut",
      },
      {
        alt: "Cherry Bamboo",
        src: "/placeholder.svg?height=20&width=20&text=Cherry",
      },
    ],
  },
  {
    href: "/product/original-nfc-business-card",
    imageSrc: "/placeholder.svg?height=500&width=500&text=Original Card",
    imageAlt: "Original Digital Business Card",
    badgeText: "Best Value",
    title: "Original Digital Business Card",
    description:
      "Share your contact in seconds. No paper to carry. Fully editable.",
    price: "ل.ل6,192,000.00",
    colorSwatches: [
      { alt: "Black", src: "/placeholder.svg?height=20&width=20&text=Black" },
      { alt: "White", src: "/placeholder.svg?height=20&width=20&text=White" },
      { alt: "Silver", src: "/placeholder.svg?height=20&width=20&text=Silver" },
      { alt: "Blue", src: "/placeholder.svg?height=20&width=20&text=Blue" },
      { alt: "Gold", src: "/placeholder.svg?height=20&width=20&text=Gold" },
      { alt: "Red", src: "/placeholder.svg?height=20&width=20&text=Red" },
      { alt: "Purple", src: "/placeholder.svg?height=20&width=20&text=Purple" },
    ],
  },
];

export default function Home() {
  return (
    <main className="">
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
