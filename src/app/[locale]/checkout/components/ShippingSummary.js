"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ShippingSummary({
  currentStep,
  shippingForm,
  selectedShippingOption,
  setCurrentStep,
  formatPrice
}) {
  if (currentStep !== 2) {
    return null;
  }

  const formValues = shippingForm.getValues();

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-border/50">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="p-2 rounded-full bg-secondary/50">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <span className="flex items-center gap-2">
              Shipping Details
            </span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary rounded-full"
            onClick={() => setCurrentStep(1)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p className="font-medium text-foreground">{formValues.firstName} {formValues.lastName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Contact</p>
            <p className="font-medium text-foreground">{formValues.email}</p>
            <p className="font-medium text-foreground">{formValues.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium text-foreground">
              {formValues.address}<br />
              {formValues.city}, {formValues.postalCode}<br />
              {formValues.country}
            </p>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {selectedShippingOption && (
          <div>
            <p className="text-muted-foreground mb-2">Shipping Method</p>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/5">
              <div>
                <p className="font-medium text-foreground">{selectedShippingOption.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedShippingOption.description || 'Estimated delivery: 3-5 business days'}
                </p>
              </div>
              <div className="text-right">
                <span className="font-medium text-foreground">
                  {selectedShippingOption.amount === 0 ? (
                    <span className="text-primary">Free</span>
                  ) : (
                    `€${formatPrice(selectedShippingOption.amount)}`
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 