"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Mail, MapPin } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { COUNTRIES } from "@/constants/countries";

export default function ShippingStep({ 
  shippingForm, 
  onShippingSubmit, 
  isProcessingOrder, 
  loading,
  t
}) {

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-sm border-border/50 transition-all duration-300 bg-card/80">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="p-2 rounded-full bg-secondary/50">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <span className="flex items-center gap-2">
              {t("checkout.shippingAndBilling")}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...shippingForm}>
            <form className="space-y-4" onSubmit={shippingForm.handleSubmit(onShippingSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={shippingForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t("checkout.firstName")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={shippingForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t("checkout.lastName")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={shippingForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      {t("checkout.email")}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="john@example.com" 
                        className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={shippingForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t("checkout.phone")}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry="US"
                        className="bg-secondary/20 border border-border/50 rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground [&>input]:bg-transparent [&>input]:border-none [&>input]:outline-none [&>input]:text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={shippingForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      {t("checkout.address")}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main Street" 
                        className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={shippingForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t("checkout.city")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="New York" 
                          className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={shippingForm.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">{t("checkout.postalCode")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="10001" 
                          className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={shippingForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">{t("checkout.country")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/20 border-border/50 text-foreground w-full">
                          <SelectValue placeholder={t("checkout.selectCountry")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border max-h-[300px]">
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code.toLowerCase()}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isProcessingOrder || loading}
                  loading={isProcessingOrder || loading}
                  loadingText={isProcessingOrder ? t("checkout.processing") : "Loading..."}
                >
                  {t("checkout.proceedToPayment")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  );
} 