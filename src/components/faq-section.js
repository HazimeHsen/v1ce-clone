import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqItems = [
    {
      value: "what-is-v1ce",
      question: "What is V1CE?",
      answer:
        "V1CE is a smart business card that allows you to instantly share your contact details, social media, portfolio, and more with a single tap or scan. It's designed to make networking more efficient and sustainable.",
    },
    {
      value: "where-does-v1ce-ship-to",
      question: "Where does V1CE ship to?",
      answer:
        "V1CE ships globally to almost all countries. Shipping times and costs may vary based on your location.",
    },
    {
      value: "how-do-v1ce-smart-cards-work",
      question: "How do V1CE smart cards work?",
      answer:
        "V1CE cards use NFC (Near Field Communication) technology and QR codes. Simply tap your card to a compatible smartphone or have someone scan the QR code to instantly share your digital profile, without them needing an app.",
    },
    {
      value: "do-i-need-an-app-to-use-a-v1ce-card",
      question: "Do I need an app to use a V1CE card?",
      answer:
        "No, neither you nor the person you're sharing with needs an app. Your digital profile opens directly in their browser.",
    },
    {
      value: "how-long-does-shipping-take",
      question: "How long does shipping take?",
      answer:
        "Shipping time depends on your location, but most orders are processed within 24–48 hours and shipped via tracked delivery. You’ll receive updates every step of the way. Need it faster? We also offer express options.",
    },
    {
      value: "is-there-a-warranty-or-guarantee",
      question: "Is there a warranty or guarantee?",
      answer:
        "Yes, V1CE offers a 100% lifetime guarantee on its smart cards. If you're not satisfied, you can get a refund.",
    },
    {
      value: "do-v1ce-cards-work-with-iphones-and-android-phones",
      question: "Do V1CE cards work with iPhones and Android phones?",
      answer:
        "Yes, V1CE cards are compatible with most modern iPhones and Android devices that support NFC technology.",
    },
  ];

  return (
    <section className="pb-[50px] pt-10 md:pb-20">
      <div className="center-narrow flex flex-col items-center justify-center gap-14">
        <div className="w-full rounded-2xl border border-border bg-card px-8 py-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            data-orientation="vertical"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-b border-border/20 last:border-0 w-full"
              >
                <h3 className="flex w-full">
                  <AccordionTrigger className="w-full flex flex-1 items-center justify-between py-4 text-left text-base font-medium transition-all hover:underline ">
                    {item.question}
                  </AccordionTrigger>
                </h3>
                <AccordionContent className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-4">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
