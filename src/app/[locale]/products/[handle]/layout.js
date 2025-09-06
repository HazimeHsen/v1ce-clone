import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale, handle } = await params;
  
  // For now, we'll use the handle as the product name
  // In a real implementation, you might want to fetch the product data here
  // to get the actual product title for better SEO
  const productName = handle ? handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Smart Business Card';
  
  return generateLocalizedMetadata(locale || "en", 'product', {
    canonicalPath: `/products/${handle}`,
    replacements: {
      productName: productName
    }
  });
}

export default function ProductLayout({ children }) {
  return children;
}
