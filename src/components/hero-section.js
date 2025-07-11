"use client";

export default function HeroSection() {
  return (
    <section className="3xl:px-[200px] relative -mt-20 flex w-full items-center justify-center overflow-hidden px-4 pb-8 pt-28 lg:px-10 lg:pb-28 lg:pt-40 2xl:px-[100px]">
      <div className="z-10 flex w-full flex-col-reverse items-center justify-center gap-2 px-3 md:flex-row lg:gap-9">
        <div className="flex max-w-[660px] basis-1/2 flex-col items-center gap-4 md:items-start">
          <div className="inline-flex items-center gap-[10px] rounded-full border px-4 py-1 text-[14px] font-medium transition-colors focus:outline-none border-neutral-200 bg-background text-foreground">
            Smart. Contactless. Built to Convert.
          </div>
          <h1 className="max-w-[750px] text-balance text-center text-3xl font-bold md:text-left md:text-6xl xl:max-w-[1080px]">
            The Last Business Card You'll Ever Need
          </h1>
          <p className="max-w-full text-center text-muted-foreground md:max-w-xs md:text-left">
            V1CE is your all-in-one smart, contactless business card designed to
            turn every meeting into money. Share with a tap, capture contacts
            instantly, and sync everything to your CRM — no app required.
          </p>
          <div className="flex w-full flex-col items-center gap-4 @container md:items-start">
            <div className="flex w-full flex-col items-center gap-2 md:flex-row">
              <a
                className="w-full md:w-60"
                href="/collections/tap-business-cards"
              >
                <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2 w-full md:w-60">
                  Get Your Smart Card
                </button>
              </a>
            </div>
          </div>
          <ul className="flex flex-col gap-1 font-medium text-primary">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              No app needed
            </li>
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-smartphone"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
              </svg>
              Works on all phones
            </li>
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-recycle"
              >
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path>
                <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path>
                <path d="m14 16-3 3 3 3"></path>
                <path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path>
                <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path>
                <path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path>
              </svg>
              Eco-friendly and reusable
            </li>
          </ul>
        </div>
        <div className="flex max-w-[600px] basis-1/2 items-center justify-center">
          <div className="mb-6 w-full min-w-[350px] max-w-[500px]">
            <div className="relative -z-10 aspect-[1.35] w-full overflow-hidden rounded-lg">
              <div className="relative">
                <div
                  className="size-full  absolute inset-0 size-full"
                  style={{ position: "relative", paddingTop: "74.0741%" }}
                >
                  <iframe
                    src="https://iframe.cloudflarestream.com/d57acb13277d25f3d42dec5691410144?letterboxColor=transparent&amp;muted=true&amp;preload=true&amp;loop=true&amp;autoplay=true&amp;controls=false"
                    title="What is an NFC Card example"
                    style={{
                      position: "absolute",
                      inset: "0px",
                      height: "100%",
                      width: "100%",
                    }}
                    frameBorder="0"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
