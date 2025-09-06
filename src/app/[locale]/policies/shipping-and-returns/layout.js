import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateLocalizedMetadata(locale || "en", 'shippingReturns', {
    canonicalPath: '/policies/shipping-and-returns'
  });
}

export default function ShippingReturnsLayout({ children }) {
  return children;
}
