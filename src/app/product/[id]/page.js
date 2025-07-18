"use client"

import { useState } from "react"
import ProductContentSection from "@/components/product-page/product-content-section"
import ProductDetailsForm from "@/components/product-page/product-details-form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductReviewsSection from "@/components/product-reviews-section"

export default function ProductPage() {
  const [mainCarouselIndex, setMainCarouselIndex] = useState(0)
  const [thumbCarouselIndex, setThumbCarouselIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Green & Silver") // Default selected color

  // Define image sets for each color using real image URLs
  const colorImageMap = {
    "Black & Silver": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Black & Gold": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Silver & Black": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Blue & Silver": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Blue & Gold": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "White & Silver": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "White & Gold": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Green & Silver": [
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a1_ea44fac0-8cd2-41fb-9b05-d192ea5527b9.jpg?v=1740134790",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a2_15fb1a5b-aaac-42d0-b80a-950acaa7ea17.jpg?v=1740134790",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a3_f7d40887-9556-431a-9db8-a195e78754f4.jpg?v=1740134790",
        type: "image",
      },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a4_5023982b-b94e-4608-991a-b004ea69040b.jpg?v=1740134790",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a5_fe05bb03-0c57-48dd-828e-7cdd0145d982.jpg?v=1740134790",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a6_7a7b8095-f7df-498e-b54f-ac17060c5ce3.jpg?v=1740139540",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a7_34768fe7-a404-4d63-8556-da4b67c70698.jpg?v=1740139540",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a8_04a003c5-9353-4c33-b9bd-fc15375161a9.jpg?v=1740139540",
        type: "image",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/a9_a1e1710a-2cba-4097-b889-ca112143b0f9.jpg?v=1740139540",
        type: "image",
      },
    ],
    "Green & Gold": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Red & Silver": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
    "Red & Gold": [
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      {
        src: "https://checkout.v1ce.co/cdn/shop/videos/c/vp/939ee7cd11a449b9be497517a02fa0b7/939ee7cd11a449b9be497517a02fa0b7.HD-1080p-7.2Mbps-42965082.mp4",
        poster:
          "https://cdn.shopify.com/s/files/1/0263/6156/1168/files/preview_images/939ee7cd11a449b9be497517a02fa0b7.thumbnail.0000000000.jpg?v=1740081161",
        type: "video",
      },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
      { src: "/placeholder.svg?height=700&width=700", type: "image" },
    ],
  }

  const currentImages = colorImageMap[selectedColor] || colorImageMap["Green & Silver"]

  const testimonials = [
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/525f4875-2e87-45ec-31c2-811be0abb100/public",
      quote: "No more forgotten contacts—V1CE auto-saves every Contact.",
      name: "Rob Mitchell",
      title: "Commercial Director - AFC Bournemouth",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/94604703-35e3-49f0-b49f-4f1675d00000/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/2651f20d-5fd8-4d17-f0b9-ed4342010000/public",
      quote: "Feels good knowing I’m always ready.",
      name: "Chris Sarjant",
      title: "AGM - Dillards",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/03c5c4a9-b766-4ac9-f683-19b42b6dc600/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/d29f93de-3cf7-4bd1-37dd-f666aebd7d00/public",
      quote: "Everyone asks where I got it. It just works.",
      name: "Jenni Reveulta",
      title: "Marketing Manager - Salon Services",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4d816e31-eb8a-4d9c-51e7-4d9ca31b0c00/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/fe6d5ade-8d1b-401a-ec44-20e96cc51400/public",
      quote: "V1CE helped me make 3x more connections at networking events.",
      name: "Luna Williams",
      title: "CEO - Thrive Club",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/cdd53185-3108-4aed-4b59-331818cce400/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/70e1a113-1a00-4ae3-e67c-b4e021f52300/public",
      quote: "I used to forget my cards. Now I don’t even think about it.",
      name: "Josh",
      title: "Entrepreneur - Tokyo",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/0b2f1215-2627-4f46-1a11-507b4ede1400/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/3fa4146a-36da-4d69-0787-f34d85732300/public",
      quote: "Transformed my networking—every meeting is now trackable.",
      name: "Faisal Pakar",
      title: "Head Of IT - Tim Hortons UAE",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/c46a612c-0ced-4610-c92a-61c9b9b3d800/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/32e94e94-f663-46d1-2998-ad6da246ea00/public",
      quote: "No more running out of cards—one V1CE card lasts forever.",
      name: "Charlie Harrison",
      title: "CEO & Co-Founder - Furniture Village",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/9c1c3b33-fa02-4e56-4a84-e839eaf1bc00/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/1af2689b-78c8-4ba5-b9ac-51b84d248d00/thumbnail",
      quote: "Networking is now 5x faster with V1CE.",
      name: "Ignacio Mallagray",
      title: "Marketing Director - Gilmar",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/33998f9d-4d09-4b61-2266-cad30b04b900/public",
    },
    {
      logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/5675ae51-e5e7-4db8-cca9-c6153ea92c00/public",
      quote: "V1CE made networking 80% faster and more accurate for our team!",
      name: "Julia",
      title: "CEO - Acre",
      thumbnail: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/8c089350-02bc-425a-af5f-ff175d121900/public",
    },
  ]

  const salesPoints = [
    {
      title: "Share Your Info in Seconds",
      content:
        "Instantly share your contact details, social media, website, and more with a simple tap or scan. No apps needed for the receiver.",
      videoSrc:
        "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      title: "Get Their Details Back",
      content:
        "Capture new leads effortlessly. When you share your card, they can save your contact and send you theirs with one click.",
      videoSrc:
        "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      title: "Update Anytime",
      content:
        "Your V1CE card is dynamic. Update your profile details, links, and contact info anytime, and your card will instantly reflect the changes. No reprints needed.",
      videoSrc:
        "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      title: "Share Beyond a Card",
      content:
        "Your V1CE profile is a powerful tool. Share it via email, text, or social media, even without your physical card. It's always accessible.",
      videoSrc:
        "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
    {
      title: "See Who's Using Your Card",
      content: "Find out who's viewing your card so you can follow up with confidence, knowing they're interested.",
      videoSrc:
        "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
    },
  ]

  const faqItems = {
    "Using Your V1CE Card": [
      {
        question: "How do NFC business cards work?",
        answer:
          "NFC (Near Field Communication) cards contain a small chip that can wirelessly transmit information to compatible smartphones. When you tap your V1CE card on an NFC-enabled phone, your digital profile instantly appears on their screen, allowing them to save your contact details or access your links with a single tap. For phones without NFC, a QR code on the back of the card can be scanned.",
      },
      {
        question: "Do I need an app to use the card?",
        answer:
          "No, neither you nor the person receiving your information needs an app to use the V1CE card. Your digital profile opens directly in their phone's web browser. This makes sharing seamless and accessible to everyone.",
      },
      {
        question: "Will this card work on all phones?",
        answer:
          "V1CE cards are compatible with most modern smartphones. All iPhones (XR, XS, 11, 12, 13, 14, 15 and newer) have native NFC reading capabilities. Most Android phones released after 2012 are NFC-enabled. For older phones or those without NFC, a QR code on the back of the card can be scanned using any camera app.",
      },
      {
        question: "Can I add my card to Apple Wallet or Google Wallet?",
        answer:
          "While V1CE cards don't directly integrate with Apple Wallet or Google Wallet like payment cards, your digital profile can be saved as a contact in their phone's address book. This ensures your information is always accessible and easy to find.",
      },
      {
        question: "Can someone without NFC still view my card?",
        answer:
          "Yes! Every V1CE card comes with a unique QR code printed on the back. If a phone doesn't have NFC capabilities, or if the user prefers, they can simply scan the QR code with their camera to access your digital profile.",
      },
    ],
    "Metal Specific": [
      {
        question: "What is the 24K Luxury Digital Business Card made of?",
        answer:
          "Our 24K Luxury Digital Business Card is crafted from high-quality stainless steel, meticulously plated with 24-karat gold. It features a durable PVC backing to ensure optimal NFC functionality and a sleek, premium feel.",
      },
      {
        question: "How durable is the metal card?",
        answer:
          "Designed for longevity, the 24K Luxury Digital Business Card is highly durable. The stainless steel core provides strength, while the 24K gold plating is resistant to tarnishing and wear. It's built to withstand daily use and maintain its luxurious appearance.",
      },
      {
        question: "Can the metal card be customized?",
        answer:
          "We offer free professional design services with unlimited revisions. You can customize your metal card with your logo, name, and other branding elements, all precision fibre laser engraved for a sharp, lasting finish.",
      },
      {
        question: "Is the gold plating real gold?",
        answer:
          "Yes, the card features genuine 24-karat gold plating, giving it an unparalleled luxurious look and feel. This ensures a premium aesthetic that stands out.",
      },
      {
        question: "How heavy is the metal card?",
        answer:
          "The 24K Luxury Digital Business Card weighs approximately 50 grams, providing a substantial and premium feel in hand, similar to a high-end credit card.",
      },
    ],
    "Account & Usage": [
      {
        question: "Can I update my profile after ordering?",
        answer:
          "Yes, you can update your digital profile anytime through your V1CE account. All changes are instant and automatically reflected when someone taps or scans your card. No need for reprints!",
      },
      {
        question: "What if my card stops working?",
        answer:
          "V1CE cards are built to last. In the rare event that your card stops working due to a manufacturing defect, we offer a money-back promise. Please contact our support team for assistance.",
      },
      {
        question: "Can I use multiple cards with one profile?",
        answer:
          "Yes, you can link multiple V1CE cards to a single digital profile. This is ideal for teams or individuals who want to have backup cards or different cards for various purposes, all pointing to the same up-to-date information.",
      },
      {
        question: "Can I order metal cards for a team or business?",
        answer:
          "We offer custom solutions for teams and businesses, including bulk orders and personalized branding. Contact our sales team to discuss your specific needs and get a tailored quote.",
      },
      {
        question: "Is this better than a free digital card?",
        answer:
          "V1CE cards offer a premium, tangible experience that free digital cards cannot match. Our cards provide a professional first impression, advanced analytics, and a seamless sharing experience, all backed by our design and support services.",
      },
      {
        question: "How fast will my metal card ship?",
        answer:
          "Our design team typically completes mockups within 6 hours. Once you approve the design, we offer fast and secure delivery, with 1-3 day shipping available from our offices in the UK, USA, or UAE, depending on your location.",
      },
    ],
  }

  const handleMainPrev = () => {
    setMainCarouselIndex((prevIndex) => (prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1))
  }

  const handleMainNext = () => {
    setMainCarouselIndex((prevIndex) => (prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1))
  }

  const handleThumbnailClick = (index) => {
    setMainCarouselIndex(index)
  }

  return (
    <>
      <Navbar />

      <div className="center-wide mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20">
        <ProductContentSection
          images={currentImages}
          testimonials={testimonials}
          salesPoints={salesPoints}
          faqItems={faqItems}
        />
        <ProductDetailsForm
          images={currentImages}
          mainCarouselIndex={mainCarouselIndex}
          thumbCarouselIndex={thumbCarouselIndex}
          handleMainPrev={handleMainPrev}
          handleMainNext={handleMainNext}
          handleThumbnailClick={handleThumbnailClick}
          selectedColor={selectedColor}
          setSelectedColor={(color) => {
            setSelectedColor(color)
            setMainCarouselIndex(0) // Reset carousel to first image of new color
            setThumbCarouselIndex(0) // Reset thumbnail carousel as well
          }}
        />
      </div>
      <ProductReviewsSection center={false} />
      <Footer />
    </>
  )
}
