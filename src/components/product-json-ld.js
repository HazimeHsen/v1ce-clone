"use client";

import { getLocalizedTitle, getLocalizedDescription } from "@/lib/translation-utils";

export default function ProductJsonLd({ product, locale = 'en' }) {
  if (!product) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibio.am';
  const productUrl = `${baseUrl}/${locale}/products/${product.handle}`;
  const productImage = product.images?.[0]?.url || product.thumbnail || `${baseUrl}/placeholder.jpg`;
  
  // Get the first variant for pricing
  const firstVariant = product.variants?.[0];
  // Handle both store API (calculated_price) and admin API (prices array) formats
  const price = firstVariant?.calculated_price?.calculated_amount || firstVariant?.prices?.[0]?.amount || 0;
  const currency = firstVariant?.calculated_price?.currency_code || firstVariant?.prices?.[0]?.currency_code || 'AMD';
  
  // Format price for display (admin API prices are already in correct format)
  const formattedPrice = price.toFixed(2);
  
  // Get localized content using the same pattern as other components
  const productTitle = getLocalizedTitle(product, locale);
  const productDescription = getLocalizedDescription(product, locale);
  
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productTitle,
    description: productDescription,
    url: productUrl,
    image: product.images?.length > 1 ? product.images.map(img => img.url) : productImage,
    brand: {
      "@type": "Brand",
      name: "Mibio"
    },
    offers: {
      "@type": "Offer",
      price: formattedPrice,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      url: productUrl,
      itemCondition: "https://schema.org/NewCondition"
    }
  };

  // Add SKU if available
  if (firstVariant?.sku) {
    jsonLd.sku = firstVariant.sku;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
