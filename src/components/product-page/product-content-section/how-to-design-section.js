"use client"

export default function HowToDesignSection() {
  return (
    <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-xl bg-secondary p-5 md:p-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-bold md:text-4xl">How To Design</h2>
        <p className="text-center text-sm text-muted-foreground">Your first impression is ours too.</p>
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-2">
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <div className="text-h5 flex size-[50px] items-center justify-center rounded-full bg-primary text-[24px] font-semibold leading-[102%] text-white">
            1
          </div>
          <h3 className="text-h6">Place Your Order</h3>
          <p className="text-sm text-muted-foreground">
            Choose a card that fits your brand and place your order online.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <div className="text-h5 flex size-[50px] items-center justify-center rounded-full bg-primary text-[24px] font-semibold leading-[102%] text-white">
            2
          </div>
          <h3 className="text-h6">We Design</h3>
          <p className="text-sm text-muted-foreground">
            Fill out a quick form, and we’ll design your card with unlimited revisions.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <div className="text-h5 flex size-[50px] items-center justify-center rounded-full bg-primary text-[24px] font-semibold leading-[102%] text-white">
            3
          </div>
          <h3 className="text-h6">Print &amp; Ship</h3>
          <p className="text-sm text-muted-foreground">
            Approve your design, and we’ll print and deliver your card, hassle-free.
          </p>
        </div>
      </div>
    </div>
  )
}
