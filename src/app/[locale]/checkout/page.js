"use client";

import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/context/store-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import ShippingStep from "./components/ShippingStep";
import OrderSummary from "./components/OrderSummary";
import ShippingMethodForm from "./components/ShippingMethodForm";

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


export default function CheckoutPage() {
  const {
    cart,
    setCart,
    removeFromCart,
    updateCartItem,
    fetchCartItemsWithProducts,
    loading,
    error,
    setError,

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
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [loadingShippingOptions, setLoadingShippingOptions] = useState(false);
console.log({selectedShippingOption,shippingOptions});

  useEffect(() => {
    const fetchShippingOptions = async () => {
      if (!cart?.id) return;
      
      try {
        setLoadingShippingOptions(true);
        const shippingResponse = await fetch(`/api/shipping?cartId=${cart.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!shippingResponse.ok) {
          throw new Error('Failed to fetch shipping options');
        }

        const options = await shippingResponse.json();
        setShippingOptions(options?.shipping_options);

        if (options?.shipping_options?.length > 0) {
          setSelectedShippingOption(options?.shipping_options[0]);
        }
      } catch (error) {
        console.error("Failed to fetch shipping options:", error);
      } finally {
        setLoadingShippingOptions(false);
      }
    };

    fetchShippingOptions();
  }, [cart?.id]);

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


  const cartItems = cart?.items || [];

  const fetchEnrichedItems = useCallback(async () => {
    if (cartItems.length === 0) {
      setEnrichedCartItems([]);
      return;
    }

    if (enrichedCartItems.length > 0) {
      const currentItemIds = new Set(cartItems.map((item) => item.id));

      const syncedItems = enrichedCartItems
        .filter((enrichedItem) => currentItemIds.has(enrichedItem.id))
        .map((enrichedItem) => {
          const currentItem = cartItems.find(
            (item) => item.id === enrichedItem.id
          );
          return currentItem
            ? { ...enrichedItem, quantity: currentItem.quantity }
            : enrichedItem;
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
  }, [
    cartItems.length,
    cartItems
      .map((item) => item.id)
      .sort()
      .join(","),
    cartItems.map((item) => `${item.id}:${item.quantity}`).join(","),
    fetchCartItemsWithProducts,
  ]);

  useEffect(() => {
    fetchEnrichedItems();
  }, [fetchEnrichedItems]);

  const getItemImage = (item) => {
    if (item.fullProduct?.variants && item.variant_id) {
      const variant = item.fullProduct.variants.find(
        (v) => v.id === item.variant_id
      );
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
      const variant = item.fullProduct.variants.find(
        (v) => v.id === item.variant_id
      );
      if (variant?.title) {
        return variant.title;
      }
    }

    return item.variant_title || item.variant?.title || "";
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "0.00";
    return price.toFixed(2);
  };

  const handleIncrease = async (lineItemId, currentQuantity) => {
    try {
      setUpdatingItems((prev) => new Set(prev).add(lineItemId));
      await updateCartItem(lineItemId, currentQuantity + 1);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(lineItemId);
        return newSet;
      });
    }
  };

  const handleDecrease = async (lineItemId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        setUpdatingItems((prev) => new Set(prev).add(lineItemId));
        await updateCartItem(lineItemId, currentQuantity - 1);
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    } finally {
      setUpdatingItems((prev) => {
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

  const onShippingSubmit = async (data) => {
    try {
      setIsProcessingOrder(true);

      await addEmail(data.email);

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
      await addBillingAddress(shippingAddress);

      // If no shipping option is selected yet, select the first one
      if (!selectedShippingOption && shippingOptions.length > 0) {
        setSelectedShippingOption(shippingOptions[0]);
        await addShippingMethod(shippingOptions[0].id);
      } else if (selectedShippingOption) {
        // Make sure the selected shipping method is set in the cart
        await addShippingMethod(selectedShippingOption.id);
      }

      // Initialize payment session and redirect
      const initResponse = await fetch('/api/payment-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId: cart.id }),
      });

      if (!initResponse.ok) {
        const error = await initResponse.json();
        throw new Error(error.error);
      }

      const { cart: updatedCart } = await initResponse.json();
      
      const firstSession = updatedCart?.payment_collection?.payment_sessions?.[0];
      
      if (!firstSession) {
        throw new Error('No payment providers available');
      }

      // Redirect to payment provider
      window.location.href = firstSession.data.redirect_url;
      
    } catch (error) {
      console.error("Failed to process shipping information:", error);
      setError(error.message || 'Failed to process shipping and payment');
    } finally {
      setIsProcessingOrder(false);
    }
  };



  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center py-16">
            <div className="p-6 rounded-full bg-secondary/20 w-fit mx-auto mb-6">
              <CreditCard className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart to proceed with checkout.
            </p>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-xl"></div>
              <Button
                asChild
                className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayItems =
    enrichedCartItems.length > 0 ? enrichedCartItems : cartItems;
  const totalPrice = cart?.total ? cart.total : 0;
  const subtotal = displayItems.reduce(
    (sum, item) => sum + (item.unit_price || 0) * item.quantity,
    0
  );
  const shipping = selectedShippingOption ? selectedShippingOption.amount : 0;
  const tax = subtotal * 0.1;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
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
          <p className="text-muted-foreground mt-2">
            Review your order and complete your purchase
          </p>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive font-medium">Error: {error}</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="order-1 lg:order-1 space-y-6">
            <ShippingStep
              shippingForm={shippingForm}
              onShippingSubmit={onShippingSubmit}
              isProcessingOrder={isProcessingOrder}
              loading={loading || loadingShippingOptions}
            />

          </div>

          <div className="order-2 lg:order-2 space-y-6">
            <OrderSummary
              displayItems={displayItems}
              loadingCartItems={loadingCartItems}
              cartItems={cartItems}
              updatingItems={updatingItems}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleRemove={handleRemove}
              totalItems={totalItems}
              subtotal={subtotal}
              tax={tax}
              totalPrice={totalPrice}
              isProcessingOrder={isProcessingOrder}
              loading={loading}
              getItemImage={getItemImage}
              getItemTitle={getItemTitle}
              getItemVariantTitle={getItemVariantTitle}
              formatPrice={formatPrice}
            />

            <ShippingMethodForm
              shippingOptions={shippingOptions}
              selectedShippingOption={selectedShippingOption}
              setSelectedShippingOption={setSelectedShippingOption}
              addShippingMethod={addShippingMethod}
              formatPrice={formatPrice}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
