"use client";

import { useEffect, useState } from "react";
import CardCollections from "@/components/card-collections";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductReviewsSection from "@/components/product-reviews-section";
import VideoStepSection from "@/components/products/video-step-section";
import QuoteSection from "@/components/quote-section";
import RefundSection from "@/components/refund-section";
import { useStore } from "@/context/store-context";
import { ProductsPageLoader } from "@/components/ui/loader";

const Products = () => {
  const { products, fetchProducts } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return (
      <>
        <Navbar />
        <ProductsPageLoader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CardCollections products={products} />
      <div className="py-14">
        <RefundSection />
      </div>
      <QuoteSection />
      <VideoStepSection />
      <ProductReviewsSection center={false} />
      <div className="bg-secondary pt-14">
        <FAQSection />
      </div>
      <Footer />
    </>
  );
};

export default Products;
