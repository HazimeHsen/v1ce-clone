import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateLocalizedMetadata(locale || "en", 'checkout', {
    canonicalPath: '/checkout'
  });
}

export default function CheckoutLayout({ children }) {
  return children;
}
