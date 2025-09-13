import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale, handle } = await params;
  
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
