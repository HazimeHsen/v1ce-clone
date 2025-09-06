import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "@/hooks/use-translations";

export default function FAQSection() {
  const { t } = useTranslations();
  const faqItems = [
    {
      value: "what-is-mibio",
      question: t("faq.items.whatIsMibio.question"),
      answer: t("faq.items.whatIsMibio.answer"),
    },
    {
      value: "where-does-mibio-ship-to",
      question: t("faq.items.shipping.question"),
      answer: t("faq.items.shipping.answer"),
    },
    {
      value: "how-do-mibio-smart-cards-work",
      question: t("faq.items.howItWorks.question"),
      answer: t("faq.items.howItWorks.answer"),
    },
    {
      value: "do-i-need-an-app-to-use-a-mibio-card",
      question: t("faq.items.appRequired.question"),
      answer: t("faq.items.appRequired.answer"),
    },
    {
      value: "how-long-does-shipping-take",
      question: t("faq.items.shippingTime.question"),
      answer: t("faq.items.shippingTime.answer"),
    },
    {
      value: "is-there-a-warranty-or-guarantee",
      question: t("faq.items.warranty.question"),
      answer: t("faq.items.warranty.answer"),
    },
    {
      value: "do-mibio-cards-work-with-iphones-and-android-phones",
      question: t("faq.items.compatibility.question"),
      answer: t("faq.items.compatibility.answer"),
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
                <AccordionTrigger className="w-full flex flex-1 items-center justify-between py-4 text-left text-base font-medium transition-all hover:underline ">
                  {item.question}
                </AccordionTrigger>
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
