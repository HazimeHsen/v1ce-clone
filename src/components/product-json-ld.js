"use client";

export default function ProductJsonLd({ product, locale = 'en' }) {
  if (!product) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibio.am';
  const productUrl = `${baseUrl}/${locale}/products/${product.handle}`;
  const productImage = product.images?.[0]?.url || product.thumbnail || `${baseUrl}/placeholder.jpg`;
  
  // Get the first variant for pricing
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.calculated_price?.calculated_amount || 0;
  const currency = firstVariant?.calculated_price?.currency_code || 'AMD';
  
  // Format price for display
  const formattedPrice = (price / 100).toFixed(2);
  
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title || 'Smart Business Card',
    description: product.description || `Get your ${product.title} smart business card. Professional, contactless networking solution with instant lead capture and CRM integration.`,
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
