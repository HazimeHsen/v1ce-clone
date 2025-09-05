"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/context/store-context";
import { Spinner } from "@/components/ui/loader";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    isCartOpen,
    openCart,
    closeCart,
    fetchCartItemsWithProducts,
  } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [enrichedCartItems, setEnrichedCartItems] = useState([]);
  const [loadingCartItems, setLoadingCartItems] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const router = useRouter();

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

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayItems =
    enrichedCartItems.length > 0 ? enrichedCartItems : cartItems;
  const totalPrice = cart?.total ? cart.total : 0;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      closeCart();
      router.push("/checkout");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="center-wide flex w-full justify-between px-5 py-4">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image
              alt="Mibio Logo"
              loading="lazy"
              width="100"
              height="32"
              decoding="async"
              src="/logo-dark.svg"
            />
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-6 text-[14px] font-semibold text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#before" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-primary">
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/digital-business-card-reviews"
                  className="hover:text-primary"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/shipping-and-returns"
                  className="hover:text-primary"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex gap-5">
          <Sheet
            open={isCartOpen}
            onOpenChange={(open) => (open ? openCart() : closeCart())}
          >
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open cart"
                className="relative flex items-center justify-center size-10"
              >
                <ShoppingCart className="lucide lucide-shopping-cart" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-primary text-[0.68rem] text-primary-foreground">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-lg flex flex-col z-50"
            >
              <SheetHeader>
                <SheetTitle>Your Cart ({totalItems})</SheetTitle>
                <SheetDescription className="sr-only">
                  Review your items and proceed to checkout.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto py-4">
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    Your cart is empty.
                  </p>
                ) : loadingCartItems ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3">
                      <Spinner size="sm" />
                      <p className="text-muted-foreground">
                        Loading cart items...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {displayItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b p-4 last:border-b-0"
                      >
                        <Image
                          src={getItemImage(item)}
                          alt={getItemTitle(item)}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{getItemTitle(item)}</h3>
                          {getItemVariantTitle(item) && (
                            <p className="text-xs text-muted-foreground">
                              {getItemVariantTitle(item)}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            €{formatPrice(item.unit_price || 0)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className={`h-7 w-7 transition-all duration-200 ${
                                updatingItems.has(item.id)
                                  ? "opacity-70"
                                  : "opacity-100"
                              }`}
                              onClick={() =>
                                handleDecrease(item.id, item.quantity)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span
                              className={`text-sm font-medium min-w-[20px] text-center transition-all duration-200 ${
                                updatingItems.has(item.id)
                                  ? "opacity-60 scale-95"
                                  : "opacity-100 scale-100"
                              }`}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className={`h-7 w-7 transition-all duration-200 ${
                                updatingItems.has(item.id)
                                  ? "opacity-70"
                                  : "opacity-100"
                              }`}
                              onClick={() =>
                                handleIncrease(item.id, item.quantity)
                              }
                            >
                              +
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto text-muted-foreground hover:text-destructive"
                              onClick={() => {
                                const originalItem =
                                  cartItems.find((ci) => ci.id === item.id) ||
                                  item;
                                handleRemove(originalItem.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">
                                Remove {getItemTitle(item)}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="font-semibold">
                          €{formatPrice((item.unit_price || 0) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <SheetFooter className="mt-auto pt-4 border-t">
                <div className="flex justify-between w-full mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold">
                    €{formatPrice(totalPrice)}
                  </span>
                </div>
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Toggle menu"
                className="block lg:hidden"
              >
                <Menu className="lucide lucide-menu size-6 text-primary" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-xs flex flex-col"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation links
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 p-6">
                <Link
                  href="/collections/tap-business-cards"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Shop
                </Link>
                <Link
                  href="/#before"
                  className="text-lg font-semibold hover:text-primary"
                >
                  How It Works
                </Link>
                <Link
                  href="/teams"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Teams
                </Link>
                <Link
                  href="/digital-business-card-reviews"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Reviews
                </Link>
                <Link
                  href="/shipping-and-returns"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Shipping & Returns
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
