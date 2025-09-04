import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function RefundSection() {
  return (
    <section className="center-narrow px-8">
      <div className="flex flex-col-reverse items-start gap-4 rounded-xl bg-black p-8 text-white md:flex-row">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">
            If It’s Not for You, We’ll Refund You
          </h2>
          <p>
            Try Mibio for yourself. If it’s not your thing, we’ll give you your
            money back. No questions. No stress. No pressure.It’s that simple,
            because we know once you try it, you’ll never go back to paper.
          </p>
          <a href="/collections/tap-business-cards">
            <Button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent h-10 px-5 py-2 bg-white text-black hover:bg-white/90">
              Get Your Smart Card
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
