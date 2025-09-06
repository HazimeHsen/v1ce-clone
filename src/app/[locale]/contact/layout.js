import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateLocalizedMetadata(locale || "en", 'contact', {
    canonicalPath: '/contact'
  });
}

export default function ContactLayout({ children }) {
  return children;
}
