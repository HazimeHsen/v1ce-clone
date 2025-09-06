import { Inter } from "next/font/google";
import "../globals.css";
import { StoreProvider } from "@/context/store-context";
import { I18nProvider } from "@/components/i18n-provider";
import { generateMetadata as generateLocalizedMetadata } from "@/lib/metadata";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generateLocalizedMetadata(locale || "en", 'home');
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <I18nProvider locale={locale}>
          <StoreProvider>{children}</StoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
