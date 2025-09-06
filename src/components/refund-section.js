import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function RefundSection() {
  const { t } = useTranslations();
  return (
    <section className="center-narrow px-8">
      <div className="flex flex-col-reverse items-start gap-4 rounded-xl bg-black p-8 text-white md:flex-row">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            {t("refund.title")}
          </h2>
          <p>
            {t("refund.description")}
          </p>
          <a href="/collections/tap-business-cards">
            <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent h-10 px-5 py-2 bg-white text-black hover:bg-white/90">
              {t("refund.cta")}
            </Button>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <ShieldCheck className="lucide lucide-shield-check size-14 md:size-28" />
        </div>
      </div>
    </section>
  );
}
