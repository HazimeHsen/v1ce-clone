"use client";

export default function CheckoutProgress({ currentStep }) {
  return (
    <div className="lg:col-span-2 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            1
          </div>
          <span className={`${currentStep >= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Shipping Info
          </span>
        </div>
        <div className="flex-1 mx-4 h-px bg-border"></div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            2
          </div>
          <span className={`${currentStep >= 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Payment
          </span>
        </div>
        <div className="flex-1 mx-4 h-px bg-border"></div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            3
          </div>
          <span className={`${currentStep >= 3 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Complete
          </span>
        </div>
      </div>
    </div>
  );
} 