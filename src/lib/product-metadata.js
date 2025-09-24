import Medusa from "@medusajs/medusa-js";

const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BASE_URL,
  maxRetries: 3,
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
});

export async function generateProductMetadata(handle, locale = 'en') {
  try {
    // Fetch product data
    const res = await medusa.products.list({
      handle: handle,
    });

    const product = res.products?.[0];
    if (!product) {
      return generateFallbackMetadata(handle, locale);
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibio.am';
    const productUrl = `${baseUrl}/${locale}/products/${handle}`;
    const productImage = product.images?.[0]?.url || product.thumbnail || `${baseUrl}/placeholder.jpg`;
    
    // Get the first variant for pricing
    const firstVariant = product.variants?.[0];
    const price = firstVariant?.calculated_price?.calculated_amount || 0;
    const currency = firstVariant?.calculated_price?.currency_code || 'AMD';
    
    // Format price for display
    const formattedPrice = (price / 100).toFixed(2);
    
    // Generate product title and description
    const productTitle = product.title || 'Smart Business Card';
    const productDescription = product.description || 
      `Get your ${productTitle} smart business card. Professional, contactless networking solution with instant lead capture and CRM integration.`;
    
    // Open Graph metadata
    const openGraph = {
      title: `${productTitle} | Mibio.am`,
      description: productDescription,
      type: 'website',
      url: productUrl,
      siteName: 'Mibio',
      images: [
        {
          url: productImage,
          width: 600,
          height: 600,
          alt: productTitle,
        },
      ],
    };

    // Add price metadata if available
    if (price > 0) {
      openGraph.price = {
        amount: formattedPrice,
        currency: currency,
      };
    }

    // Twitter Card metadata
    const twitter = {
      card: 'summary_large_image',
      title: `${productTitle} | Mibio.am`,
      description: productDescription,
      images: [productImage],
    };

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: productTitle,
      description: productDescription,
      url: productUrl,
      image: productImage,
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

    // Add additional images
    if (product.images && product.images.length > 1) {
      jsonLd.image = product.images.map(img => img.url);
    }

    return {
      title: `${productTitle} | Mibio.am`,
      description: productDescription,
      keywords: `${productTitle}, smart business card, NFC card, contactless networking, lead capture, Mibio`,
      openGraph,
      twitter,
      alternates: {
        canonical: productUrl,
        languages: {
          'en': `/en/products/${handle}`,
          'hy': `/hy/products/${handle}`,
        },
      },
      other: {
        'og:price:amount': formattedPrice,
        'og:price:currency': currency,
      },
      jsonLd,
    };

  } catch (error) {
    console.error('Error generating product metadata:', error);
    return generateFallbackMetadata(handle, locale);
  }
}

function generateFallbackMetadata(handle, locale) {
  const productName = handle ? handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Smart Business Card';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibio.am';
  const productUrl = `${baseUrl}/${locale}/products/${handle}`;
  
  return {
    title: `${productName} | Mibio.am`,
    description: `Get your ${productName} smart business card. Professional, contactless networking solution with instant lead capture and CRM integration.`,
    keywords: `${productName}, smart business card, NFC card, contactless networking, lead capture, Mibio`,
    openGraph: {
      title: `${productName} | Mibio.am`,
      description: `Get your ${productName} smart business card. Professional, contactless networking solution with instant lead capture and CRM integration.`,
      type: 'website',
      url: productUrl,
      siteName: 'Mibio',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productName} | Mibio.am`,
      description: `Get your ${productName} smart business card. Professional, contactless networking solution with instant lead capture and CRM integration.`,
    },
    alternates: {
      canonical: productUrl,
      languages: {
        'en': `/en/products/${handle}`,
        'hy': `/hy/products/${handle}`,
      },
    },
  };
}
