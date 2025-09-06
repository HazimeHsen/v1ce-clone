"use client";

import Ratings from "./ratings";
import ReviewCard from "./review-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "@/hooks/use-translations";

export default function ProductReviewsSection({ center }) {
  const { t } = useTranslations();

  const reviewsData = [
    {
      name: t("productReviews.reviews.0.name"),
      rating: 5,
      isVerified: false,
      reviewText: t("productReviews.reviews.0.reviewText"),
      mediaSrc: null,
      mediaType: null,
      reply: null,
    },
    {
      name: t("productReviews.reviews.1.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.1.reviewText"),
      mediaSrc: "/assets/images/before-and-after-1.png",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.2.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.2.reviewText"),
      mediaSrc: "/assets/images/before-and-after-2.png",
      mediaType: "image",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.appreciateHonesty"),
      },
    },
    {
      name: t("productReviews.reviews.3.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.3.reviewText"),
      mediaSrc: "/assets/images/placeholder.jpg",
      mediaType: "image",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.gladHittingMark"),
      },
    },
    {
      name: t("productReviews.reviews.4.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.4.reviewText"),
      mediaSrc: "/assets/images/placeholder-user.jpg",
      mediaType: "video",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.soGladMakingWaves"),
      },
    },
    {
      name: t("productReviews.reviews.5.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.5.reviewText"),
      mediaSrc: "/assets/images/placeholder-logo.png",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.6.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.6.reviewText"),
      mediaSrc: "/assets/images/placeholder.svg",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.7.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.7.reviewText"),
      mediaSrc: "/assets/images/placeholder-logo.svg",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.8.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.8.reviewText"),
      mediaSrc: "/assets/images/logo.png",
      mediaType: "image",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.techSavvyRealEstate"),
      },
    },
    {
      name: t("productReviews.reviews.9.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.9.reviewText"),
      mediaSrc: "/assets/images/logo-dark.svg",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.10.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.10.reviewText"),
      mediaSrc: "/assets/images/payment.png",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.11.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.11.reviewText"),
      mediaSrc: "/assets/images/placeholder-user.jpg",
      mediaType: "image",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.soGladMakingWaves"),
      },
    },
    {
      name: t("productReviews.reviews.12.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.12.reviewText"),
      mediaSrc: "/assets/images/placeholder.jpg",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.13.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.13.reviewText"),
      mediaSrc: "/assets/images/placeholder.svg",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.14.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.14.reviewText"),
      mediaSrc: "/assets/images/placeholder-logo.png",
      mediaType: "image",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.techSavvyRealEstate"),
      },
    },
    {
      name: t("productReviews.reviews.15.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.15.reviewText"),
      mediaSrc: "/assets/images/placeholder-logo.svg",
      mediaType: "image",
      reply: {
        author: "Team Mibio",
        logoSrc: "/assets/images/placeholder-user.jpg",
        text: t("productReviews.teamReplies.smoothIntro"),
      },
    },
    {
      name: t("productReviews.reviews.16.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.16.reviewText"),
      mediaSrc: "/assets/images/placeholder.jpg",
      mediaType: "image",
      reply: null,
    },
    {
      name: t("productReviews.reviews.17.name"),
      rating: 5,
      isVerified: true,
      reviewText: t("productReviews.reviews.17.reviewText"),
      mediaSrc: "/assets/images/placeholder.svg",
      mediaType: "image",
      reply: null,
    },
  ];

  return (
    <section className={center ? "center-narrow" : ""}>
      <section
        id="reviews-section"
        className="center-wide my-16 flex flex-col items-center gap-7 px-2 md:!px-0"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("productReviews.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("productReviews.subtitle")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Ratings rating={4.9} reviewCount={1250} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("productReviews.basedOnReviews")}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{t("productReviews.averageRating")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {reviewsData.slice(0, 6).map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        <Button variant="outline" className="mt-4">
          {t("productReviews.viewAllReviews")}
        </Button>
      </section>
    </section>
  );
}