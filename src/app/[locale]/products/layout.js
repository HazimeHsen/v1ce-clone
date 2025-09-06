import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateLocalizedMetadata(locale || "en", 'products', {
    canonicalPath: '/products'
  });
}

export default function ProductsLayout({ children }) {
  return children;
}
