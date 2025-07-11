import ComparisonCard from "./comparison-card";

export default function BeforeAfterSection() {
  const paperCardFeatures = [
    {
      title: "Share your contact details",
      description: "Name, Number, Website.",
    },
    {
      title: "Hope they follow up",
      description: "Wonder what they did with your card.",
    },
    { title: "Crickets..." },
  ];

  const v1ceCardFeatures = [
    {
      title: "Share everything they need to know about you",
      description: "Name, number, website, socials, video, portfolio & more.",
    },
    {
      title: "Capture their details instantly",
      description:
        "One click and their contact info is saved to your dashboard.",
    },
    {
      title: "Sync to CRM",
      description: "No more manual entry or lost leads.",
    },
    {
      title: "Automate your follow-ups",
      description: "Send personalized messages automatically.",
    },
    {
      title: "Update your card anytime",
      description: "Change your details without reprinting",
    },
    {
      title: "See who viewed your info",
      description: "Get insights into who’s interested.",
    },
  ];

  return (
    <section className="center-narrow flex flex-col items-center space-y-10 self-center !px-6 py-12">
      <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
        <div className="flex max-w-[600px] flex-col items-center gap-3 px-6 text-center">
          <h2 className="text-center text-3xl font-bold md:text-5xl">
            Paper Vs V1CE
          </h2>
          <p className="text-muted-foreground">
            88% of paper cards are tossed within 24 hours. With V1CE, your
            details are saved, theirs are captured, and follow-ups happen
            automatically.
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <ComparisonCard
          title="Paper Business Card"
          bgColorClass="bg-secondary"
          textColorClass="text-black"
          imageSrc="/before-and-after-1.png"
          imageAlt="Paper Business Card"
          imagePositionClass="-right-6 lg:-left-14 xl:-left-20"
          features={paperCardFeatures}
        />
        <ComparisonCard
          title="V1CE Smart Business Card"
          bgColorClass="bg-primary"
          textColorClass="text-white"
          imageSrc="/before-and-after-2.png"
          imageAlt="V1CE Smart Business Card"
          imagePositionClass="-right-6 lg:-right-5 xl:-right-10"
          features={v1ceCardFeatures}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <a href="/collections/tap-business-cards">
          <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2">
            Get Your Smart Card
          </button>
        </a>
        <p className="text-sm text-muted-foreground">100% Lifetime Guarantee</p>
      </div>
    </section>
  );
}
