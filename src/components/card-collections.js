"use client";

import { useStore } from "../context/store-context";
import ProductCard from "./product-card";
import { useTranslations } from "@/hooks/use-translations";

export default function CardCollections() {
  const { products } = useStore();
  const { t } = useTranslations();

  return (
    <section className="center-narrow py-14">
      <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex max-w-[650px] flex-col items-center gap-3 px-6 text-center">
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            {t("cardCollections.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("cardCollections.description")}
          </p>
        </div>
      </div>
      <section className="center-wide flex flex-col items-center justify-center gap-[30px] px-4 py-12 pt-4 my-8 !p-0">
        <div className="grid w-full max-w-wide grid-cols-1 gap-[10px] sm:grid-cols-2 md:grid-cols-3 md:gap-[30px] lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
}
