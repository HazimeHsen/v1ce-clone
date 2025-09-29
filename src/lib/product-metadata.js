import Medusa from "@medusajs/medusa-js";
import { getLocalizedTitle, getLocalizedSubtitle, getLocalizedDescription } from "./translation-utils";

const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BASE_URL,
  maxRetries: 3,
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
});

export async function generateProductMetadata(handle, locale = 'en') {
  try {
    // First, get the product ID by handle using the store API
    const storeRes = await medusa.products.list({
      handle: handle,
    });

    const storeProduct = storeRes.products?.[0];
    if (!storeProduct) {
      return generateFallbackMetadata(handle, locale);
    }

    // Now fetch the complete product data from admin API
    const adminResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BASE_URL}/store/products/${storeProduct.id}`, {
      method: 'GET',
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    },
    });

    if (!adminResponse.ok) {
      console.error('Admin API request failed:', adminResponse.status, adminResponse.statusText);
      return generateFallbackMetadata(handle, locale);
    }

    const adminData = await adminResponse.json();
    const product = adminData.product;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibio.am';
    const productUrl = `${baseUrl}/${locale}/products/${handle}`;
    const productImage = product.images?.[0]?.url || product.thumbnail || `${baseUrl}/placeholder.jpg`;
    
    const firstVariant = product.variants?.[0];
    // Admin API returns prices directly, not calculated_price
    const price = firstVariant?.prices?.[0]?.amount || 0;
    const currency = firstVariant?.prices?.[0]?.currency_code || 'AMD';
    
    const formattedPrice = (price).toFixed(2);
    
    // Get localized content using the same pattern as components
    console.log(product);
    
    const productTitle = getLocalizedTitle(product, locale);
    const productSubtitle = getLocalizedSubtitle(product, locale);
    const productDescription = getLocalizedDescription(product, locale);
    console.log({productTitle, productSubtitle, productDescription});
    
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

    if (price > 0) {
      openGraph.price = {
        amount: formattedPrice,
        currency: currency,
      };
    }

    const twitter = {
      card: 'summary_large_image',
      title: `${productTitle} | Mibio.am`,
      description: productDescription,
      images: [productImage],
    };

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

    if (firstVariant?.sku) {
      jsonLd.sku = firstVariant.sku;
    }

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
  
  // Use localized fallback descriptions based on locale
  const localizedDescriptions = {
    en: `Get your ${productName} smart business card. Professional, contactless networking solution with instant lead capture and CRM integration.`,
    hy: `Ստացեք ձեր ${productName} խելացի բիզնես քարտը: Մասնագիտական, անկոնտակտ ցանցավորման լուծում ակնթարթային հաճախորդների գրավմամբ և CRM ինտեգրացիայով:`
  };
  
  const description = localizedDescriptions[locale] || localizedDescriptions.en;
  
  return {
    title: `${productName} | Mibio.am`,
    description: description,
    keywords: `${productName}, smart business card, NFC card, contactless networking, lead capture, Mibio`,
    openGraph: {
      title: `${productName} | Mibio.am`,
      description: description,
      type: 'website',
      url: productUrl,
      siteName: 'Mibio',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productName} | Mibio.am`,
      description: description,
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
