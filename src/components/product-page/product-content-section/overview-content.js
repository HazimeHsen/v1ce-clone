"use client"

import SalesPointsAccordion from "./sales-points-accordion"
import HowToDesignSection from "./how-to-design-section"
import WhySmartCardsWinSection from "./why-smart-cards-win-section"
import TestimonialsSection from "./testimonials-section"

export default function OverviewContent({ salesPoints, testimonials }) {
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      tabIndex={0}
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
    >
      <div className="flex flex-col gap-8 container">
        <div className="flex flex-col gap-2 rounded-xl bg-secondary p-5 md:p-8">
          <h2 className="text-center text-2xl font-bold md:text-4xl">How NFC Business Cards Work</h2>
          <p className="text-center text-sm text-muted-foreground">
            Discover how V1CE's NFC cards save you time and help you stand out.
          </p>
          <div className="mt-4 flex gap-0 md:gap-16">
            <SalesPointsAccordion salesPoints={salesPoints} />
          </div>
        </div>
        <HowToDesignSection />
        <WhySmartCardsWinSection />
        <div className="relative h-fit w-full overflow-hidden rounded-xl">
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
            }}
          >
            <div className="w-full" style={{ position: "absolute", inset: "0px" }}>
              <div
                className="size-full"
                style={{
                  position: "relative",
                  paddingTop: "56.338%",
                }}
              >
                <iframe
                  src="https://iframe.cloudflarestream.com/3f90f8c01a6f32bca6dbe9f4f7ddffa4?poster=https%3A%2F%2Fimagedelivery.net%2FN6_NAPmq3Z6gEZfBCN4EDA%2Fc34fa758-a4aa-47c7-49e5-959273c17000%2Fpublic&amp;preload=metadata"
                  title="Video stream of How NFC Business Cards Work"
                  frameBorder="0"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    inset: "0px",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <TestimonialsSection testimonials={testimonials} />
      </div>
    </div>
  )
}
