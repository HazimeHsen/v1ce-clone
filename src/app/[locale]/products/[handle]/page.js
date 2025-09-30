"use client";

import { useEffect, useState } from "react";
import ProductContentSection from "@/components/product-page/product-content-section";
import ProductDetailsForm from "@/components/product-page/product-details-form";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductReviewsSection from "@/components/product-reviews-section";
import { useStore } from "@/context/store-context";
import { useCurrency } from "@/context/currency-context";
import { useParams } from "next/navigation";
import { PageLoader } from "@/components/ui/loader";
import { useTranslations } from "@/hooks/use-translations";
import ProductJsonLd from "@/components/product-json-ld";
import { getLocalizedTitle, getLocalizedSubtitle, getLocalizedDescription } from "@/lib/translation-utils";

const testimonials = [
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/525f4875-2e87-45ec-31c2-811be0abb100/public",
    quote: "No more forgotten contacts—Mibio auto-saves every Contact.",
    name: "Rob Mitchell",
    title: "Commercial Director - AFC Bournemouth",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/94604703-35e3-49f0-b49f-4f1675d00000/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/2651f20d-5fd8-4d17-f0b9-ed4342010000/public",
    quote: "Feels good knowing I’m always ready.",
    name: "Chris Sarjant",
    title: "AGM - Dillards",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/03c5c4a9-b766-4ac9-f683-19b42b6dc600/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/d29f93de-3cf7-4bd1-37dd-f666aebd7d00/public",
    quote: "Everyone asks where I got it. It just works.",
    name: "Jenni Reveulta",
    title: "Marketing Manager - Salon Services",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/4d816e31-eb8a-4d9c-51e7-4d9ca31b0c00/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/fe6d5ade-8d1b-401a-ec44-20e96cc51400/public",
    quote: "Mibio helped me make 3x more connections at networking events.",
    name: "Luna Williams",
    title: "CEO - Thrive Club",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/cdd53185-3108-4aed-4b59-331818cce400/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/70e1a113-1a00-4ae3-e67c-b4e021f52300/public",
    quote: "I used to forget my cards. Now I don’t even think about it.",
    name: "Josh",
    title: "Entrepreneur - Tokyo",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/0b2f1215-2627-4f46-1a11-507b4ede1400/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/3fa4146a-36da-4d69-0787-f34d85732300/public",
    quote: "Transformed my networking—every meeting is now trackable.",
    name: "Faisal Pakar",
    title: "Head Of IT - Tim Hortons UAE",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/c46a612c-0ced-4610-c92a-61c9b9b3d800/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/32e94e94-f663-46d1-2998-ad6da246ea00/public",
    quote: "No more running out of cards—one Mibio card lasts forever.",
    name: "Charlie Harrison",
    title: "CEO & Co-Founder - Furniture Village",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/9c1c3b33-fa02-4e56-4a84-e839eaf1bc00/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/1af2689b-78c8-4ba5-b9ac-51b84d248d00/thumbnail",
    quote: "Networking is now 5x faster with Mibio.",
    name: "Ignacio Mallagray",
    title: "Marketing Director - Gilmar",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/33998f9d-4d09-4b61-2266-cad30b04b900/public",
  },
  {
    logo: "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/5675ae51-e5e7-4db8-cca9-c6153ea92c00/public",
    quote: "Mibio made networking 80% faster and more accurate for our team!",
    name: "Julia",
    title: "CEO - Acre",
    thumbnail:
      "https://imagedelivery.net/N6_NAPmq3Z6gEZfBCN4EDA/8c089350-02bc-425a-af5f-ff175d121900/public",
  },
];

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
      "Your Mibio card is dynamic. Update your profile details, links, and contact info anytime, and your card will instantly reflect the changes. No reprints needed.",
    videoSrc:
      "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
  },
  {
    title: "Share Beyond a Card",
    content:
      "Your Mibio profile is a powerful tool. Share it via email, text, or social media, even without your physical card. It's always accessible.",
    videoSrc:
      "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
  },
  {
    title: "See Who's Using Your Card",
    content:
      "Find out who's viewing your card so you can follow up with confidence, knowing they're interested.",
    videoSrc:
      "https://iframe.cloudflarestream.com/63ed60dcce3d74a2b499f169e5a261ed?letterboxColor=transparent&muted=true&preload=true&loop=true&autoplay=true&controls=false",
  },
];

const faqItems = {
  "Using Your Mibio Card": [
    {
      question: "How do NFC business cards work?",
      answer:
        "NFC (Near Field Communication) cards contain a small chip that can wirelessly transmit information to compatible smartphones. When you tap your Mibio card on an NFC-enabled phone, your digital profile instantly appears on their screen, allowing them to save your contact details or access your links with a single tap. For phones without NFC, a QR code on the back of the card can be scanned.",
    },
    {
      question: "Do I need an app to use the card?",
      answer:
        "No, neither you nor the person receiving your information needs an app to use the Mibio card. Your digital profile opens directly in their phone's web browser. This makes sharing seamless and accessible to everyone.",
    },
    {
      question: "Will this card work on all phones?",
      answer:
        "Mibio cards are compatible with most modern smartphones. All iPhones (XR, XS, 11, 12, 13, 14, 15 and newer) have native NFC reading capabilities. Most Android phones released after 2012 are NFC-enabled. For older phones or those without NFC, a QR code on the back of the card can be scanned using any camera app.",
    },
    {
      question: "Can I add my card to Apple Wallet or Google Wallet?",
      answer:
        "While Mibio cards don't directly integrate with Apple Wallet or Google Wallet like payment cards, your digital profile can be saved as a contact in their phone's address book. This ensures your information is always accessible and easy to find.",
    },
    {
      question: "Can someone without NFC still view my card?",
      answer:
        "Yes! Every Mibio card comes with a unique QR code printed on the back. If a phone doesn't have NFC capabilities, or if the user prefers, they can simply scan the QR code with their camera to access your digital profile.",
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
        "Yes, you can update your digital profile anytime through your Mibio account. All changes are instant and automatically reflected when someone taps or scans your card. No need for reprints!",
    },
    {
      question: "What if my card stops working?",
      answer:
        "Mibio cards are built to last. In the rare event that your card stops working due to a manufacturing defect, we offer a money-back promise. Please contact our support team for assistance.",
    },
    {
      question: "Can I use multiple cards with one profile?",
      answer:
        "Yes, you can link multiple Mibio cards to a single digital profile. This is ideal for teams or individuals who want to have backup cards or different cards for various purposes, all pointing to the same up-to-date information.",
    },
    {
      question: "Can I order metal cards for a team or business?",
      answer:
        "We offer custom solutions for teams and businesses, including bulk orders and personalized branding. Contact our sales team to discuss your specific needs and get a tailored quote.",
    },
    {
      question: "Is this better than a free digital card?",
      answer:
        "Mibio cards offer a premium, tangible experience that free digital cards cannot match. Our cards provide a professional first impression, advanced analytics, and a seamless sharing experience, all backed by our design and support services.",
    },
    {
      question: "How fast will my metal card ship?",
      answer:
        "Our design team typically completes mockups within 6 hours. Once you approve the design, we offer fast and secure delivery, with 1-3 day shipping available from our offices in the UK, USA, or UAE, depending on your location.",
    },
  ],
};

export default function ProductPage() {
  const { t } = useTranslations("productPage");
  const [mainCarouselIndex, setMainCarouselIndex] = useState(0);
  const [thumbCarouselIndex, setThumbCarouselIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colorImageMap, setColorImageMap] = useState({});
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState(null);

  const { fetchProduct } = useStore();
  const { formatPrice } = useCurrency();
  const { handle, locale } = useParams();
  
  const localizedTitle = getLocalizedTitle(product, locale);
  const localizedSubtitle = getLocalizedSubtitle(product, locale);
  const localizedDescription = getLocalizedDescription(product, locale);

  const getTranslatedTestimonials = () => {
    return testimonials.map((testimonial, index) => ({
      ...testimonial,
      quote: t(`testimonials.${index}.quote`),
      name: t(`testimonials.${index}.name`),
      title: t(`testimonials.${index}.title`),
    }));
  };

  const getTranslatedSalesPoints = () => {
    return salesPoints.map((salesPoint, index) => ({
      ...salesPoint,
      title: t(`salesPoints.${index}.title`),
      content: t(`salesPoints.${index}.content`),
    }));
  };

  const getTranslatedFaqItems = () => {
    const translatedFaq = {};
    const faqSections = ["usingCard", "metalSpecific", "accountUsage"];
    
    faqSections.forEach((section, index) => {
      const sectionTitle = t(`faqItems.${section}.title`);
      const sectionItems = [];
      
      const originalSection = Object.keys(faqItems)[index];
      const originalItems = faqItems[originalSection];
      
      originalItems.forEach((item, itemIndex) => {
        sectionItems.push({
          question: t(`faqItems.${section}.items.${itemIndex}.question`),
          answer: t(`faqItems.${section}.items.${itemIndex}.answer`),
        });
      });
      
      translatedFaq[sectionTitle] = sectionItems;
    });
    
    return translatedFaq;
  };

  const createColorImageMap = (productData) => {
    if (!productData?.variants) return {};

    const imageMap = {};
    let allImages = [];

    productData.variants.forEach((variant) => {
      const colorName = variant.title || "Default";
      let variantImages = [];

      if (variant.metadata?.images) {
        try {
          const parsedImages = JSON.parse(variant.metadata.images);
          variantImages = parsedImages.map((url) => ({
            src: url,
            type: "image",
          }));
        } catch (error) {
          console.error("Error parsing variant images:", error);
        }
      }

      if (variantImages.length === 0 && productData.images?.length > 0) {
        variantImages = productData.images.map((img) => ({
          src: img.url,
          type: "image",
        }));
      }

      if (variantImages.length === 0) {
        variantImages = [
          { src: "/placeholder.svg?height=700&width=700", type: "image" },
        ];
      }

      imageMap[colorName] = variantImages;
      allImages = [...allImages, ...variantImages];
    });

    imageMap["all"] = allImages;

    return imageMap;
  };

  useEffect(() => {
    const fetchProductData = async () => {
      if (!handle) return;

      try {
        setLoading(true);
        const productData = await fetchProduct(handle);
        console.log("Fetched product data:", productData);

        if (productData) {
          setProduct(productData);

          const dynamicColorMap = createColorImageMap(productData);
          setColorImageMap(dynamicColorMap);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [handle, fetchProduct]);

  const currentImages = selectedColor
    ? colorImageMap[selectedColor] || [
        { src: "/placeholder.svg?height=700&width=700", type: "image" },
      ]
    : colorImageMap["all"] || [
        { src: "/placeholder.svg?height=700&width=700", type: "image" },
      ];

  const handleMainPrev = () => {
    setMainCarouselIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleMainNext = () => {
    setMainCarouselIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setMainCarouselIndex(index);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <PageLoader />
        <Footer />
      </>
    );
  }

  const colorSwatches = product?.variants?.map((variant) => {
    const combo = variant.title;
    const colors = combo.split("&").map((c) => c.trim().toLowerCase());
    return { title: combo, colors };
  }) || [];

  const selectedVariant = product?.variants?.find(
    (v) => v.title === selectedColor
  );

  const basePrice = selectedVariant?.calculated_price?.calculated_amount || 25;

  const selectedSwatchIndex = colorSwatches.findIndex(
    (swatch) => swatch.title === selectedColor
  );

  const handleSwatchSelect = (swatch, index) => {
    if (selectedColor === swatch.title) {
      setSelectedColor(null);
    } else {
      setSelectedColor(swatch.title);
      setMainCarouselIndex(0);
      setThumbCarouselIndex(0);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 100));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  // Generate dynamic quantity bundles based on variant pricing
  const generateQuantityBundles = (variant) => {
    if (!variant?.prices || variant.prices.length === 0) {
      // Fallback to default pricing if no variant pricing
      return [
        {
          id: "1-item",
          name: t("product.quantityBundles.oneItem"),
          quantity: 1,
          price: basePrice * 1,
          pricePerItem: basePrice,
          save: null,
          popular: false,
          description: [
            t("product.quantityBundles.oneItemDescription.0"),
            t("product.quantityBundles.oneItemDescription.1"),
            t("product.quantityBundles.oneItemDescription.2"),
          ],
        },
      ];
    }

    // Sort prices by min_quantity to ensure proper order
    const sortedPrices = [...variant.prices].sort((a, b) => (a.min_quantity || 0) - (b.min_quantity || 0));
    
    const bundles = sortedPrices.map((price, index) => {
      const quantity = price.min_quantity || 1;
      const pricePerItem = price.amount;
      const totalPrice = pricePerItem * quantity;
      
      // Calculate savings compared to the first price tier
      const firstPrice = sortedPrices[0];
      const originalPrice = firstPrice.amount * quantity;
      const savings = originalPrice - totalPrice;
      const savePercentage = savings > 0 ? Math.round((savings / originalPrice) * 100) : 0;
      
      // Determine if this is popular (middle option or highest savings)
      const isPopular = index === Math.floor(sortedPrices.length / 2) || savePercentage > 20;
      
      return {
        id: `${quantity}-items`,
        name: quantity === 1 
          ? t("product.quantityBundles.oneItem")
          : t("product.quantityBundles.multipleItems", { count: quantity }),
        quantity: quantity,
        price: totalPrice,
        pricePerItem: pricePerItem,
        originalPrice: savePercentage > 0 ? originalPrice : null, // Add original price for strikethrough
        save: savePercentage > 0 ? `${savePercentage}%` : null,
        popular: isPopular,
        description: [
          t("product.quantityBundles.multipleItemsDescription.0"),
          t("product.quantityBundles.multipleItemsDescription.1"),
          t("product.quantityBundles.multipleItemsDescription.2"),
        ],
      };
    });

    return bundles;
  };

  const allQuantityBundles = selectedVariant 
    ? generateQuantityBundles(selectedVariant)
    : product?.variants?.[0] 
      ? generateQuantityBundles(product.variants[0])
      : [];

  // Separate the first option (1 item) from accordion options
  const firstOption = allQuantityBundles.find(bundle => bundle.quantity === 1) || allQuantityBundles[0];
  const accordionOptions = allQuantityBundles.filter(bundle => bundle.quantity !== 1);
  
  console.log({allQuantityBundles, firstOption, accordionOptions});

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="center-wide mt-10 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">{t("product.notFound")}</h1>
            <p className="text-muted-foreground">
              {t("product.notFoundDescription")}
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />
      <Navbar />

      <div className="center-wide mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20">
        <ProductContentSection
          images={currentImages}
          testimonials={getTranslatedTestimonials()}
          salesPoints={getTranslatedSalesPoints()}
          faqItems={getTranslatedFaqItems()}
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedBundle={selectedBundle}
          setSelectedBundle={setSelectedBundle}
          quantityBundles={allQuantityBundles}
          firstOption={firstOption}
          accordionOptions={accordionOptions}
          colorSwatches={colorSwatches}
          formatPrice={formatPrice}
          basePrice={basePrice}
          selectedSwatchIndex={selectedSwatchIndex}
          handleSwatchSelect={handleSwatchSelect}
          decrementQuantity={decrementQuantity}
          incrementQuantity={incrementQuantity}
        />
        <ProductDetailsForm
          product={product}
          images={currentImages}
          mainCarouselIndex={mainCarouselIndex}
          thumbCarouselIndex={thumbCarouselIndex}
          handleMainPrev={handleMainPrev}
          handleMainNext={handleMainNext}
          handleThumbnailClick={handleThumbnailClick}
          selectedColor={selectedColor}
          setSelectedColor={(color) => {
            setSelectedColor(color);
            setMainCarouselIndex(0);
            setThumbCarouselIndex(0);
          }}
          quantityBundles={allQuantityBundles}
          firstOption={firstOption}
          accordionOptions={accordionOptions}
          selectedBundle={selectedBundle}
          setSelectedBundle={setSelectedBundle}
          quantity={quantity}
          setQuantity={setQuantity}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      </div>
      <ProductReviewsSection center={false} />
      <Footer />
    </>
  );
}
