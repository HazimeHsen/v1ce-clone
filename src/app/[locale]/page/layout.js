import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateLocalizedMetadata(locale || "en", 'home', {
    canonicalPath: ''
  });
}

export default function HomeLayout({ children }) {
  return children;
}
