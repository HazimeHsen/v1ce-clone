import { Inter } from "next/font/google";
import "../globals.css";
import { StoreProvider } from "@/context/store-context";
import { I18nProvider } from "@/components/i18n-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mibio - Smart Business Cards",
  description: "The last business card you'll ever need. Smart, contactless, and built to convert.",
};

export default async function RootLayout({ children, params }) {
  const locale = params.locale || "en";
  
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
