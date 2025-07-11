import ProductCard from "./product-card";

export default function CardCollections() {
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
          <ProductCard
            href="/product/24k-gold-nfc-business-card"
            imageSrc="/placeholder.svg?height=500&width=500"
            imageAlt="24K Luxury Digital Business Card"
            badgeText="By Invitation Only"
            title="24K Luxury Digital Business Card"
            description="Invitation Only. Request Access."
            price="ل.ل39,634,000.00"
          />
          <ProductCard
            href="/product/metal-nfc-business-cards"
            imageSrc="/placeholder.svg?height=500&width=500"
            imageAlt="Metal Digital Business Card"
            badgeText="Most Popular"
            title="Metal Digital Business Card"
            description="For professionals who never want to fumble again.Tap to share. No app. No stress."
            price="ل.ل12,262,000.00"
            colorSwatches={[
              {
                alt: "Black & Silver",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Black & Gold",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Silver & Black",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Blue & Silver",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Blue & Gold",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "White & Silver",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "White & Gold",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Green & Silver",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Green & Gold",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Red & Silver",
                src: "/placeholder.svg?height=20&width=20",
              },
              { alt: "Red & Gold", src: "/placeholder.svg?height=20&width=20" },
            ]}
          />
          <ProductCard
            href="/product/bamboo-nfc-business-cards"
            imageSrc="/placeholder.svg?height=500&width=500"
            imageAlt="Bamboo Digital Business Card"
            badgeText="Eco-Friendly"
            title="Bamboo Digital Business Card"
            description="One card. One tree planted. Edit your info anytime, no reprint"
            price="ل.ل8,980,000.00"
            colorSwatches={[
              {
                alt: "Sapele Bamboo",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Plain Bamboo",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Black Bamboo",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Walnut Bamboo",
                src: "/placeholder.svg?height=20&width=20",
              },
              {
                alt: "Cherry Bamboo",
                src: "/placeholder.svg?height=20&width=20",
              },
            ]}
          />
          <ProductCard
            href="/product/original-nfc-business-card"
            imageSrc="/placeholder.svg?height=500&width=500"
            imageAlt="Original Digital Business Card"
            badgeText="Best Value"
            title="Original Digital Business Card"
            description="Share your contact in seconds. No paper to carry. Fully editable."
            price="ل.ل6,192,000.00"
            colorSwatches={[
              { alt: "Black", src: "/placeholder.svg?height=20&width=20" },
              { alt: "White", src: "/placeholder.svg?height=20&width=20" },
              { alt: "Silver", src: "/placeholder.svg?height=20&width=20" },
              { alt: "Blue", src: "/placeholder.svg?height=20&width=20" },
              { alt: "Gold", src: "/placeholder.svg?height=20&width=20" },
              { alt: "Red", src: "/placeholder.svg?height=20&width=20" },
              { alt: "Purple", src: "/placeholder.svg?height=20&width=20" },
            ]}
          />
        </div>
      </section>
    </section>
  );
}
