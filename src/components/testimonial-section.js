"use client";

import { useRef, useState, useEffect } from "react";
import TestimonialItem from "./testimonial-item";

const testimonials = [
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "AFC Bournemouth Logo",
    quote: "No more forgotten contacts—V1CE auto-saves every Contact.",
    name: "Rob Mitchell",
    title: "Commercial Director - AFC Bournemouth",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Rob Mitchell Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Dillards Logo",
    quote: "Feels good knowing I’m always ready.",
    name: "Chris Sarjant",
    title: "AGM - Dillards",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Chris Sarjant Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Thrive Club Logo",
    quote: "V1CE helped me make 3x more connections at networking events.",
    name: "Luna Williams",
    title: "CEO - Thrive Club",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Luna Williams Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Entrepreneur Tokyo Logo",
    quote: "I used to forget my cards. Now I don’t even think about it.",
    name: "Josh",
    title: "Entrepreneur - Tokyo",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Josh Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Tim Hortons UAE Logo",
    quote: "Transformed my networking—every meeting is now trackable.",
    name: "Faisal Pakar",
    title: "Head Of IT - Tim Hortons UAE",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Faisal Pakar Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Gilmar Logo",
    quote: "Networking is now 5x faster with V1CE.",
    name: "Ignacio Mallagray",
    title: "Marketing Director - Gilmar",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Ignacio Mallagray Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Furniture Village Logo",
    quote: "No more running out of cards—one V1CE card lasts forever.",
    name: "Charlie Harrison",
    title: "CEO & Co-Founder - Furniture Village",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Charlie Harrison Testimonial Thumbnail",
  },
  {
    logoSrc: "/placeholder.svg?height=35&width=150",
    logoAlt: "Acre Logo",
    quote: "V1CE made networking 80% faster and more accurate for our team!",
    name: "Julia",
    title: "CEO - Acre",
    thumbnailSrc: "/placeholder.svg?height=500&width=500",
    thumbnailAlt: "Julia Testimonial Thumbnail",
  },
];

export default function TestimonialSection() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const carouselElement = carouselRef.current;
    carouselElement?.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      carouselElement?.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0]?.clientWidth || 350;
      const scrollAmount = itemWidth + 32;
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="w-full bg-secondary">
      <div className="flex flex-col space-y-10 self-center py-12">
        <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
          <div className="flex max-w-[850px] flex-col items-center gap-3 px-6 text-center">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              Trusted by 500,000+ Professionals and Teams
            </h2>
            <p className="text-muted-foreground">
              See how our customers use smart, NFC-enabled business cards to
              capture leads and connect faster.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
          >
            <div className="overflow-hidden">
              <div
                ref={carouselRef}
                className="flex -ml-4 w-full overflow-x-auto scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    role="group"
                    aria-roledescription="slide"
                    className="shrink-0 grow-0 min-w-[350px] basis-1/2 pl-8 md:pl-12 lg:max-w-min"
                    style={{ transform: "translate3d(0px, 0px, 0px)" }}
                  >
                    <TestimonialItem {...testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="flex aspect-square items-center rounded-full border border-neutral-200 p-1 disabled:opacity-50"
              aria-label="Previous testimonial"
              onClick={() => scrollCarousel("left")}
              disabled={!canScrollLeft}
            >
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
                className="lucide lucide-chevron-left size-4"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button
              type="button"
              className="flex aspect-square items-center rounded-full border border-neutral-200 p-1 disabled:opacity-50"
              aria-label="Next testimonial"
              onClick={() => scrollCarousel("right")}
              disabled={!canScrollRight}
            >
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
                className="lucide lucide-chevron-left size-4 rotate-180"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
