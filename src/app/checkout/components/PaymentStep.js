"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, User, ArrowLeft, ChevronLeft } from "lucide-react";
import { Spinner } from "@/components/ui/loader";

export default function PaymentStep({
  currentStep,
  paymentForm,
  onPaymentSubmit,
  isProcessingOrder,
  loading,
  setCurrentStep,
  totalPrice,
  formatPrice,
}) {
  const isActive = currentStep === 2;
  const isCompleted = currentStep > 2;

  if (currentStep < 2) {
    return null;
  }

  return (
    <Card
      className={`backdrop-blur-sm border-border/50 transition-all duration-300 bg-card/80`}
    >
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground rounded-full flex items-center justify-center -ml-2"
            onClick={() => setCurrentStep(1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <span className="flex items-center gap-2">
              Payment Information
              {isCompleted && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  ✓ Complete
                </Badge>
              )}
            </span>
          </CardTitle>
          <div className="w-20" /> {/* Spacer to center the title */}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...paymentForm}>
          <form
            className="space-y-4"
            onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}
          >
            <FormField
              control={paymentForm.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground flex items-center gap-2">
                    Cardholder Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={paymentForm.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                      maxLength={19}
                      onChange={(e) => {
                        let value = e.target.value
                          .replace(/\s+/g, "")
                          .replace(/[^0-9]/gi, "");
                        let formattedValue =
                          value.match(/.{1,4}/g)?.join(" ") || value;
                        field.onChange(formattedValue);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={paymentForm.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Expiry Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                        maxLength={5}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length >= 2) {
                            value =
                              value.substring(0, 2) +
                              "/" +
                              value.substring(2, 4);
                          }
                          field.onChange(value);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentForm.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">CVV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                        maxLength={4}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-xl"></div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                  disabled={isProcessingOrder || loading}
                >
                  {isProcessingOrder ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay €${formatPrice(totalPrice)}`
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
