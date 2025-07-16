import ProductCard from "./product-card";

export default function CardCollections({ products }) {
  return (
    <section className="center-narrow py-14">
      <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex max-w-[650px] flex-col items-center gap-3 px-6 text-center">
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            One Tap Replaces a Stack
          </h2>
          <p className="text-muted-foreground">
            From sales teams to global brands, V1CE helps you share details,
            capture leads, and follow up automatically without paper or lost
            leads.
          </p>
        </div>
      </div>
      <section className="center-wide flex flex-col items-center justify-center gap-[30px] px-4 py-12 pt-4 my-8 !p-0">
        <div className="grid w-full max-w-wide grid-cols-1 gap-[10px] sm:grid-cols-2 md:grid-cols-3 md:gap-[30px] lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>
    </section>
  );
}
