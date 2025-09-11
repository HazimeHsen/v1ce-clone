"use client";

export default function CheckoutProgress({ currentStep }) {
  return (
    <div className="lg:col-span-2 mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            1
          </div>
          <span className={`${currentStep >= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Shipping & Payment
          </span>
        </div>
      </div>
    </div>
  );
} 