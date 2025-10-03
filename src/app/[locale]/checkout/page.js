"use client";

import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/context/store-context";
import { useCurrency } from "@/context/currency-context";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "@/hooks/use-translations";
import { getLocalizedTitle } from "@/lib/translation-utils";

import { Button } from "@/components/ui/button";
import ShippingStep from "./components/ShippingStep";
import OrderSummary from "./components/OrderSummary";
import ShippingMethodForm from "./components/ShippingMethodForm";
import PromoCodeForm from "./components/PromoCodeForm";
import { PageLoader } from "@/components/ui/loader";

// Schema will be created inside component to use translations

export default function CheckoutPage() {
  const {
    cart,
    setCart,
    removeFromCart,
    updateCartItem,
    fetchCartItemsWithProducts,
    getCart,
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
  const { formatPrice } = useCurrency();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useTranslations();
  
  const shippingSchema = z.object({
    firstName: z.string().min(2, t("checkout.validation.firstNameMin")),
    lastName: z.string().min(2, t("checkout.validation.lastNameMin")),
    email: z.string().email(t("checkout.validation.emailInvalid")),
    phone: z.string().min(10, t("checkout.validation.phoneRequired")),
    address: z.string().min(5, t("checkout.validation.addressMin")),
    city: z.string().min(2, t("checkout.validation.cityRequired")),
    postalCode: z.string().min(3, t("checkout.validation.postalCodeRequired")),
    country: z.string().min(1, t("checkout.validation.countryRequired")),
  });

  const [enrichedCartItems, setEnrichedCartItems] = useState([]);
  const [loadingCartItems, setLoadingCartItems] = useState(true);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [loadingShippingOptions, setLoadingShippingOptions] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [urlError, setUrlError] = useState(null);
  const [isInitialShippingLoad, setIsInitialShippingLoad] = useState(true);
  const [refetchingShipping, setRefetchingShipping] = useState(false);
  const [refetchingCart, setRefetchingCart] = useState(false);

  const cartItems = cart?.items || [];

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const errorMessages = {
        'missing_payment_id': t("checkout.errors.missingPaymentId"),
        'missing_order_id': t("checkout.errors.missingOrderId"),
        'payment_cancelled': t("checkout.errors.paymentCancelled"),
        'payment_failed': t("checkout.errors.paymentFailed"),
        'invalid_payment': t("checkout.errors.invalidPayment"),
        'payment_processing_error': t("checkout.errors.paymentProcessingError"),
        'network_error': t("checkout.errors.networkError"),
        'server_error': t("checkout.errors.serverError"),
      };
      
      const errorMessage = errorMessages[errorParam] || t("checkout.errors.unknownError");
      setUrlError(errorMessage);
      setError(errorMessage);
      
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('error');
      router.replace(newUrl.pathname + newUrl.search, { scroll: false });
    }
  }, [searchParams, t, setError, router]);

  console.log("Checkout loading states:", {
    cart: !!cart,
    loading,
    loadingShippingOptions,
    loadingCartItems,
    isPageLoading,
    cartItemsLength: cartItems.length,
    cartId: cart?.id,
    isEmpty: !cart || cartItems.length === 0,
    shouldShowLoading: isPageLoading || loading || loadingCartItems || (cart?.id && loadingShippingOptions),
  });

  const fetchShippingOptions = async (silent = false) => {
    if (!cart?.id) {
      return;
    }

    try {
      // Initial load: show full page loading
      if (isInitialShippingLoad && !silent) {
        setLoadingShippingOptions(true);
      } else {
        // Refetch: show skeleton loader only
        setRefetchingShipping(true);
      }
      
      const shippingResponse = await fetch(
        `/api/shipping?cartId=${cart.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!shippingResponse.ok) {
        throw new Error("Failed to fetch shipping options");
      }

      const options = await shippingResponse.json();
      setShippingOptions(options?.shipping_options || []);

      // Maintain selected option or select first
      setSelectedShippingOption(prevSelected => {
        if (prevSelected) {
          const stillAvailable = options?.shipping_options?.find(
            opt => opt.id === prevSelected.id
          );
          if (stillAvailable) {
            return prevSelected;
          }
        }
        return options?.shipping_options?.length > 0 ? options.shipping_options[0] : null;
      });
    } catch (error) {
      console.error("Failed to fetch shipping options:", error);
      setShippingOptions([]);
    } finally {
      setLoadingShippingOptions(false);
      setRefetchingShipping(false);
      setIsInitialShippingLoad(false);
    }
  };

  useEffect(() => {
    fetchShippingOptions();
  }, [cart?.id]);

  // Comprehensive loading state management
  useEffect(() => {
    // Determine if we should show loading
    const shouldShowLoading = () => {
      // Always show loading initially
      if (isPageLoading === true) return true;
      
      // Show loading while cart items are being fetched
      if (loadingCartItems) return true;
      
      // Show loading while shipping options are being fetched (if cart exists)
      if (cart?.id && loadingShippingOptions) return true;
      
      return false;
    };

    const isLoading = shouldShowLoading();
    
    if (!isLoading) {
      console.log("All data loaded, hiding page loader");
      setIsPageLoading(false);
    }
  }, [loadingCartItems, loadingShippingOptions, cart?.id, isPageLoading]);

  // Reset loading state when component mounts
  useEffect(() => {
    console.log("Component mounted, setting loading to true");
    setIsPageLoading(true);
    
    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log("Loading timeout reached, forcing content to show");
      setIsPageLoading(false);
    }, 15000); // 15 second timeout

    return () => {
      clearTimeout(timeout);
      console.log("Component unmounting, cleaning up");
    };
  }, []);

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

  const fetchEnrichedItems = useCallback(async () => {
    if (cartItems.length === 0) {
      setEnrichedCartItems([]);
      // Always set loading to false when there are no items
      setLoadingCartItems(false);
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
    if (item.fullProduct) {
      return getLocalizedTitle(item.fullProduct, locale);
    }
    return (
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

  // Using formatPrice from currency context

  const refetchCart = async () => {
    if (!cart?.id) return;
    
    try {
      setRefetchingCart(true);
      const updatedCart = await getCart(cart.id);
      if (updatedCart) {
        // Refetch enriched items with updated cart
        const enriched = await fetchCartItemsWithProducts(updatedCart.items);
        setEnrichedCartItems(enriched);
      }
    } catch (error) {
      console.error("Failed to refetch cart:", error);
    } finally {
      setRefetchingCart(false);
    }
  };

  const refetchCartAndShipping = async () => {
    // First, fetch both cart and shipping options in parallel
    await Promise.all([
      refetchCart(),
      fetchShippingOptions(true)
    ]);
    
    // After fetching, if there's a selected shipping option, reapply it to update the cart's shipping_total
    if (selectedShippingOption?.id) {
      try {
        await addShippingMethod(selectedShippingOption.id);
      } catch (error) {
        console.error("Failed to reapply shipping method:", error);
      }
    }
  };

  const handleIncrease = async (lineItemId, currentQuantity) => {
    try {
      setUpdatingItems((prev) => new Set(prev).add(lineItemId));
      await updateCartItem(lineItemId, currentQuantity + 1);
      // Refetch cart and shipping in parallel
      await refetchCartAndShipping();
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
        // Refetch cart and shipping in parallel
        await refetchCartAndShipping();
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
      // Refetch cart and shipping in parallel
      await refetchCartAndShipping();
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

      if (!selectedShippingOption && shippingOptions.length > 0) {
        setSelectedShippingOption(shippingOptions[0]);
        await addShippingMethod(shippingOptions[0].id);
      } else if (selectedShippingOption) {
        await addShippingMethod(selectedShippingOption.id);
      }

      const initResponse = await fetch("/api/payment-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId: cart.id }),
      });

      if (!initResponse.ok) {
        const error = await initResponse.json();
        throw new Error(error.error);
      }

      const { cart: updatedCart } = await initResponse.json();

      const firstSession =
        updatedCart?.payment_collection?.payment_sessions?.[0];

      if (!firstSession) {
        throw new Error("No payment providers available");
      }

      window.location.href = firstSession.data.redirect_url;
    } catch (error) {
      console.error("Failed to process shipping information:", error);
      setError(error.message || "Failed to process shipping and payment");
    } finally {
      setIsProcessingOrder(false);
    }
  };
  
  // Show loading state while fetching cart data (only for initial load, not during refetch)
  const shouldShowLoading = isPageLoading || loadingCartItems || (cart?.id && loadingShippingOptions);
  
  if (shouldShowLoading && !isProcessingOrder) {
    console.log("Showing loading state:", {
      isPageLoading,
      loadingCartItems,
      loadingShippingOptions,
      cartId: cart?.id
    });
    return <PageLoader />;
  }

  // Check if cart is empty after loading is complete
  const isEmpty = !cart || cartItems.length === 0;
  
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <div className="text-center max-w-md mx-auto">
            <div className="p-6 rounded-full bg-secondary/20 w-fit mx-auto mb-6">
              <CreditCard className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {t("checkout.emptyCartTitle")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("checkout.emptyCartDescription")}
            </p>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-xl"></div>
              <Button
                asChild
                className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
              >
                <Link href="/products">{t("checkout.emptyCartContinueShopping")}</Link>
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
  const subtotal = displayItems.reduce(
    (sum, item) => sum + (item.unit_price || 0) * item.quantity,
    0
  );
  
  // Use cart's shipping_total if a shipping method has been applied to the cart,
  // otherwise use the selected option amount
  const hasShippingMethod = cart?.shipping_methods && cart.shipping_methods.length > 0;
  const shipping = hasShippingMethod && cart?.shipping_total !== undefined 
    ? cart.shipping_total 
    : (selectedShippingOption ? selectedShippingOption.amount : 0);
    
  const discountTotal = cart?.discount_total || 0;
  
  // Calculate total properly including shipping and discounts
  const totalPrice = cart?.total || (subtotal + shipping - discountTotal);

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
            {t("checkout.back")}
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{t("checkout.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("checkout.description")}
          </p>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive font-medium">{t("checkout.error")}: {error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-1 lg:order-1 space-y-6">
            <ShippingStep
              shippingForm={shippingForm}
              onShippingSubmit={onShippingSubmit}
              isProcessingOrder={isProcessingOrder}
              loading={false}
              t={t}
            />
          </div>

          <div className="order-2 lg:order-2 space-y-6">
            <OrderSummary
              displayItems={displayItems}
              loadingCartItems={loadingCartItems}
              cartItems={cartItems}
              cart={cart}
              updatingItems={updatingItems}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleRemove={handleRemove}
              totalItems={totalItems}
              subtotal={subtotal}
              shipping={shipping}
              refetchingShipping={refetchingShipping}
              refetchingCart={refetchingCart}
              getItemImage={getItemImage}
              getItemTitle={getItemTitle}
              getItemVariantTitle={getItemVariantTitle}
              t={t}
            />

            <PromoCodeForm
              cart={cart}
              setCart={setCart}
              formatPrice={formatPrice}
              t={t}
            />

            <ShippingMethodForm
              shippingOptions={shippingOptions}
              selectedShippingOption={selectedShippingOption}
              setSelectedShippingOption={setSelectedShippingOption}
              addShippingMethod={addShippingMethod}
              formatPrice={formatPrice}
              refetchingShipping={refetchingShipping}
              t={t}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
