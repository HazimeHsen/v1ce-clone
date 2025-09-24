import { generateProductMetadata } from "@/lib/product-metadata";

export async function generateMetadata({ params }) {
  const { locale, handle } = await params;
  
  return await generateProductMetadata(handle, locale || "en");
}

export default function ProductLayout({ children }) {
  return children;
}
