"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, Mail, MapPin, ChevronDown } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { COUNTRIES } from "@/constants/countries";

export default function ShippingStep({ 
  currentStep, 
  shippingForm, 
  onShippingSubmit, 
  isProcessingOrder, 
  loading, 
  setCurrentStep,
  shippingOptions,
  selectedShippingOption,
  setSelectedShippingOption,
  addShippingMethod,
  formatPrice
}) {
  const formValues = shippingForm.getValues();
  const isCompleted = currentStep > 1;

  if (currentStep === 2) {
    return null;
  }

  const handleShippingOptionChange = async (optionId) => {
    const option = shippingOptions.find(opt => opt.id === optionId);
    if (option) {
      setSelectedShippingOption(option);
      await addShippingMethod(option.id);
    }
  };

  return (
    <div className="space-y-6">
      <Card className={`backdrop-blur-sm border-border/50 transition-all duration-300 bg-card/80`}>
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="p-2 rounded-full bg-secondary/50">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <span className="flex items-center gap-2">
              Shipping Information
              {isCompleted && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  ✓ Complete
                </Badge>
              )}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className={`transition-all duration-300 ${isCompleted ? 'p-4' : 'p-6'}`}>
          {isCompleted ? (
            <div className="space-y-4">
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
              <Button 
                type="button" 
                variant="outline"
                className="w-full border-primary/20 text-primary hover:bg-primary/10"
                onClick={() => setCurrentStep(1)}
              >
                <ChevronDown className="mr-2 h-4 w-4" />
                Edit Shipping Information
              </Button>
            </div>
          ) : (
            <Form {...shippingForm}>
              <form className="space-y-4" onSubmit={shippingForm.handleSubmit(onShippingSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={shippingForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">First Name</FormLabel>
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
                        <FormLabel className="text-foreground">Last Name</FormLabel>
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
                        <Mail className="h-4 w-4 text-primary" />
                        Email Address
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
                      <FormLabel className="text-foreground">Phone Number</FormLabel>
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
                        <MapPin className="h-4 w-4 text-primary" />
                        Address
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={shippingForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">City</FormLabel>
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
                        <FormLabel className="text-foreground">Postal Code</FormLabel>
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
                      <FormLabel className="text-foreground">Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary/20 border-border/50 text-foreground w-full">
                            <SelectValue placeholder="Select a country" />
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
                    loadingText={isProcessingOrder ? "Processing..." : "Loading..."}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      {!isCompleted && shippingOptions.length > 0 && (
        <Card className="backdrop-blur-sm bg-secondary/10 border-border/50">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <div className="p-2 rounded-full bg-secondary/50">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              Shipping Method
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <RadioGroup
              defaultValue={selectedShippingOption?.id}
              onValueChange={handleShippingOptionChange}
              className="space-y-3"
            >
              {shippingOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between space-x-2 p-3 rounded-lg border border-border/50 bg-secondary/5 hover:bg-secondary/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex flex-col cursor-pointer">
                      <span className="font-medium text-foreground">{option.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.description || 'Estimated delivery: 3-5 business days'}
                      </span>
                    </Label>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-foreground">
                      {option.amount === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        `€${formatPrice(option.amount)}`
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {shippingOptions.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                No shipping options available for your location.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 