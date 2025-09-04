"use client";

import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/context/store-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, Shield, X, User, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form schemas
const shippingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3-4 digits"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
});

export default function CheckoutPage() {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    fetchCartItemsWithProducts,
    loading,
    error,
    // Checkout methods
    addShippingAddress,
    addBillingAddress,
    addEmail,
    getShippingOptions,
    addShippingMethod,
    initializePaymentSessions,
    setPaymentSession,
    completeCart,
  } = useStore();
  
  const router = useRouter();
  const [enrichedCartItems, setEnrichedCartItems] = useState([]);
  const [loadingCartItems, setLoadingCartItems] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Form setup
  const shippingForm = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const cartItems = cart?.items || [];

  // Same enriched items fetching logic as navbar
  const fetchEnrichedItems = useCallback(async () => {
    if (cartItems.length === 0) {
      setEnrichedCartItems([]);
      return;
    }

    if (enrichedCartItems.length > 0) {
      const currentItemIds = new Set(cartItems.map(item => item.id));
      
      const syncedItems = enrichedCartItems
        .filter(enrichedItem => currentItemIds.has(enrichedItem.id))
        .map(enrichedItem => {
          const currentItem = cartItems.find(item => item.id === enrichedItem.id);
          return currentItem ? { ...enrichedItem, quantity: currentItem.quantity } : enrichedItem;
        });
      
      if (syncedItems.length < cartItems.length) {
        setLoadingCartItems(true);
        try {
          const enriched = await fetchCartItemsWithProducts(cartItems);
          setEnrichedCartItems(enriched);
        } catch (error) {
          console.error("Failed to enrich cart items:", error);
          setEnrichedCartItems(cartItems);
        } finally {
          setLoadingCartItems(false);
        }
      } else {
        setEnrichedCartItems(syncedItems);
      }
      return;
    }

    setLoadingCartItems(true);
    try {
      const enriched = await fetchCartItemsWithProducts(cartItems);
      setEnrichedCartItems(enriched);
    } catch (error) {
      console.error("Failed to enrich cart items:", error);
      setEnrichedCartItems(cartItems);
    } finally {
      setLoadingCartItems(false);
    }
  }, [cartItems.length, cartItems.map(item => item.id).sort().join(','), cartItems.map(item => `${item.id}:${item.quantity}`).join(','), fetchCartItemsWithProducts]);

  useEffect(() => {
    fetchEnrichedItems();
  }, [fetchEnrichedItems]);

  // Same helper functions as navbar
  const getItemImage = (item) => {
    if (item.fullProduct?.variants && item.variant_id) {
      const variant = item.fullProduct.variants.find(v => v.id === item.variant_id);
      if (variant?.metadata?.images) {
        try {
          const images = JSON.parse(variant.metadata.images);
          if (Array.isArray(images) && images.length > 0) {
            return images[0];
          }
        } catch (e) {
          console.error("Failed to parse variant images from fullProduct", e);
        }
      }
    }
    
    if (item.fullProduct?.images && item.fullProduct.images.length > 0) {
      return item.fullProduct.images[0].url;
    }
    
    if (item.thumbnail) {
      return item.thumbnail;
    }
    
    if (item.fullProduct?.thumbnail) {
      return item.fullProduct.thumbnail;
    }
    
    try {
      const images =
        item.variant?.metadata?.images &&
        JSON.parse(item.variant.metadata.images);
      if (Array.isArray(images) && images.length > 0) {
        return images[0];
      }
    } catch (e) {
      console.error("Failed to parse variant images", e);
    }
    
    return item.variant?.product?.thumbnail || "/placeholder.svg";
  };

  const getItemTitle = (item) => {
    return (
      item.fullProduct?.title ||
      item.product_title ||
      item.title ||
      item.variant?.product?.title ||
      "Unknown Product"
    );
  };

  const getItemVariantTitle = (item) => {
    if (item.fullProduct?.variants && item.variant_id) {
      const variant = item.fullProduct.variants.find(v => v.id === item.variant_id);
      if (variant?.title) {
        return variant.title;
      }
    }
    
    return item.variant_title || item.variant?.title || "";
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') return '0.00';
    return price.toFixed(2);
  };

  const handleIncrease = async (lineItemId, currentQuantity) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(lineItemId));
      await updateCartItem(lineItemId, currentQuantity + 1);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(lineItemId);
        return newSet;
      });
    }
  };

  const handleDecrease = async (lineItemId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        setUpdatingItems(prev => new Set(prev).add(lineItemId));
        await updateCartItem(lineItemId, currentQuantity - 1);
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(lineItemId);
        return newSet;
      });
    }
  };

  const handleRemove = async (lineItemId) => {
    try {
      await removeFromCart(lineItemId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayItems = enrichedCartItems.length > 0 ? enrichedCartItems : cartItems;
  const totalPrice = cart?.total ? cart.total : 0;
  const subtotal = displayItems.reduce((sum, item) => sum + ((item.unit_price || 0) * item.quantity), 0);
  const shipping = 0; // Static for now
  const tax = subtotal * 0.1; // 10% tax for example

  // Form submission handlers
  const onShippingSubmit = async (data) => {
    try {
      setIsProcessingOrder(true);
      
      // Add email to cart
      await addEmail(data.email);
      
      // Add shipping address
      const shippingAddress = {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address,
        city: data.city,
        postal_code: data.postalCode,
        country_code: data.country,
        phone: data.phone,
      };
      
      await addShippingAddress(shippingAddress);
      console.log(1);
      
      // Use same address for billing (can be changed later)
      await addBillingAddress(shippingAddress);
      console.log(2);
      
      // Get available shipping options
      const options = await getShippingOptions();
      console.log(3);
      
      setShippingOptions(options);
      
      // Auto-select first shipping option if available
      if (options.length > 0) {
        setSelectedShippingOption(options[0]);
        await addShippingMethod(options[0].id);
        console.log(4);
        
      }
      
      // Move to next step
      setCurrentStep(2);
      
    } catch (error) {
      console.error("Failed to process shipping information:", error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const onPaymentSubmit = async (data) => {
    try {
      setIsProcessingOrder(true);
      
      // Initialize payment sessions
      await initializePaymentSessions();
      
      // For now, we'll just log the payment data
      // In a real app, you'd integrate with a payment provider
      console.log("Payment data:", data);
      
      // Move to final step
      setCurrentStep(3);
      
    } catch (error) {
      console.error("Failed to process payment information:", error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      setIsProcessingOrder(true);
      
      // Validate forms
      const shippingValid = await shippingForm.trigger();
      const paymentValid = await paymentForm.trigger();
      
      if (!shippingValid) {
        setCurrentStep(1);
        return;
      }
      
      if (!paymentValid) {
        setCurrentStep(2);
        return;
      }
      
      // Process shipping if not done yet
      if (currentStep === 1) {
        await onShippingSubmit(shippingForm.getValues());
      }
      
      // Process payment if not done yet
      if (currentStep <= 2) {
        await onPaymentSubmit(paymentForm.getValues());
      }
      
      // Complete the order
      const result = await completeCart();
      
      if (result.type === "order") {
        // Order completed successfully
        console.log("Order completed successfully:", result.order);
        // Redirect to success page or show success message
        router.push(`/order/confirmed/${result.order.id}`);
      } else {
        // Cart needs more information
        console.log("Cart needs more information:", result.cart);
      }
      
    } catch (error) {
      console.error("Failed to complete order:", error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center py-16">
            <div className="p-6 rounded-full bg-secondary/20 w-fit mx-auto mb-6">
              <CreditCard className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-xl"></div>
              <Button asChild className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 text-muted-foreground hover:text-foreground"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground mt-2">Review your order and complete your purchase</p>
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive font-medium">Error: {error}</p>
            </div>
          )}
        </div>

                <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress indicator */}
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
          
          {/* Checkout Form */}
          <div className="order-1 lg:order-1 space-y-6">
                        {/* Shipping Information - Step 1 */}
            {currentStep >= 1 && (
              <Card className={`backdrop-blur-sm border-border/50 transition-all duration-300 ${
                currentStep === 1 
                  ? 'bg-card/80 ring-2 ring-primary/20' 
                  : currentStep > 1 
                    ? 'bg-secondary/20 opacity-75' 
                    : 'bg-card/80'
              }`}>
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <div className="p-2 rounded-full bg-secondary/50">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <span className="flex items-center gap-2">
                      Shipping Information
                      {currentStep > 1 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          ✓ Complete
                        </Badge>
                      )}
                    </span>
                  </CardTitle>
                </CardHeader>
              <CardContent className="p-6">
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
                              <SelectTrigger className="bg-secondary/20 border-border/50 text-foreground">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value="lb">Lebanon</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="es">Spain</SelectItem>
                              <SelectItem value="it">Italy</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      {currentStep === 1 ? (
                        <Button 
                          type="submit" 
                          className="w-full bg-secondary hover:bg-secondary/80"
                          disabled={isProcessingOrder || loading}
                        >
                          {isProcessingOrder ? "Processing..." : "Continue to Payment"}
                        </Button>
                      ) : (
                        <Button 
                          type="button" 
                          variant="outline"
                          className="w-full border-primary/20 text-primary hover:bg-primary/10"
                          onClick={() => setCurrentStep(1)}
                        >
                          Edit Shipping Information
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            )}

                        {/* Payment Information - Step 2 */}
            {currentStep >= 2 && (
              <Card className={`backdrop-blur-sm border-border/50 transition-all duration-300 ${
                currentStep === 2 
                  ? 'bg-card/80 ring-2 ring-primary/20' 
                  : currentStep > 2 
                    ? 'bg-secondary/20 opacity-75' 
                    : 'bg-card/80'
              }`}>
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <div className="p-2 rounded-full bg-secondary/50">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <span className="flex items-center gap-2">
                      Payment Information
                      {currentStep > 2 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          ✓ Complete
                        </Badge>
                      )}
                    </span>
                  </CardTitle>
                </CardHeader>
              <CardContent className="p-6">
                <Form {...paymentForm}>
                  <form className="space-y-4" onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}>
                    <FormField
                      control={paymentForm.control}
                      name="cardholderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
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
                                // Format card number with spaces
                                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
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
                            <FormLabel className="text-foreground">Expiry Date</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                className="bg-secondary/20 border-border/50 text-foreground placeholder:text-muted-foreground"
                                maxLength={5}
                                onChange={(e) => {
                                  // Format expiry date
                                  let value = e.target.value.replace(/\D/g, '');
                                  if (value.length >= 2) {
                                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
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
                                  // Only allow numbers
                                  const value = e.target.value.replace(/\D/g, '');
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
                      {currentStep === 2 ? (
                        <Button 
                          type="submit" 
                          className="w-full bg-secondary hover:bg-secondary/80"
                          disabled={isProcessingOrder || loading}
                        >
                          {isProcessingOrder ? "Processing..." : "Continue to Review"}
                        </Button>
                      ) : (
                        <Button 
                          type="button" 
                          variant="outline"
                          className="w-full border-primary/20 text-primary hover:bg-primary/10"
                          onClick={() => setCurrentStep(2)}
                        >
                          Edit Payment Information
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-2 lg:order-2">
            <Card className="backdrop-blur-sm bg-secondary/10 border-border/50 sticky top-8">
              <CardHeader className="border-b border-border/50 bg-secondary/20">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cart Items */}
                {loadingCartItems ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3">
                      <Spinner size="sm" />
                      <p className="text-muted-foreground">Loading cart items...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
                      >
                        <div className="relative">
                          <Image
                            src={getItemImage(item)}
                            alt={getItemTitle(item)}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <Badge 
                            variant="secondary" 
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                          >
                            {item.quantity}
                          </Badge>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">
                            {getItemTitle(item)}
                          </h3>
                          {getItemVariantTitle(item) && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {getItemVariantTitle(item)}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className={`h-8 w-8 transition-all duration-200 border-secondary/50 hover:bg-secondary/30 ${
                                  updatingItems.has(item.id) ? 'opacity-70' : 'opacity-100'
                                }`}
                                onClick={() => handleDecrease(item.id, item.quantity)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className={`text-sm font-medium min-w-[24px] text-center transition-all duration-200 ${
                                updatingItems.has(item.id) ? 'opacity-60 scale-95' : 'opacity-100 scale-100'
                              }`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className={`h-8 w-8 transition-all duration-200 border-secondary/50 hover:bg-secondary/30 ${
                                  updatingItems.has(item.id) ? 'opacity-70' : 'opacity-100'
                                }`}
                                onClick={() => handleIncrease(item.id, item.quantity)}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={() => {
                                const originalItem = cartItems.find(ci => ci.id === item.id) || item;
                                handleRemove(originalItem.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            €{formatPrice(item.unit_price || 0)} each
                          </p>
                          <p className="font-semibold text-foreground">
                            €{formatPrice((item.unit_price || 0) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator className="bg-border/50" />

                {/* Order Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span className="text-foreground">€{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">€{formatPrice(tax)}</span>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-between text-lg font-semibold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">€{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="relative pt-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-xl"></div>
                  <Button 
                    size="lg" 
                    className="w-full relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                    disabled={cartItems.length === 0 || isProcessingOrder || loading}
                    onClick={handleCompleteOrder}
                  >
                    {isProcessingOrder ? (
                      <div className="flex items-center gap-2">
                        <Spinner size="sm" />
                        Processing Order...
                      </div>
                    ) : (
                      `Complete Order - €${formatPrice(totalPrice)}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 