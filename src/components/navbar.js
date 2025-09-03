"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/context/store-context";

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
  } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const cartItems = cart?.items || [];

  const getItemImage = (item) => {
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

  const handleIncrease = async (lineItemId, currentQuantity) => {
    try {
      await updateCartItem(lineItemId, currentQuantity + 1);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const handleDecrease = async (lineItemId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        await updateCartItem(lineItemId, currentQuantity - 1);
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
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
  const totalPrice = cart?.total ? cart.total / 100 : 0;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/checkout");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="center-wide flex w-full justify-between px-5 py-4">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image
              alt="V1CE Logo"
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
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
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
                ) : (
                  <div className="grid gap-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b p-4 last:border-b-0"
                      >
                        <Image
                          src={getItemImage(item)}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            €{((item.unit_price || 0) / 100).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                handleDecrease(item.id, item.quantity)
                              }
                            >
                              -
                            </Button>
                            <span className="text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
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
                              onClick={() => handleRemove(item.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">
                                Remove {item.title}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="font-semibold">
                          €
                          {(
                            ((item.unit_price || 0) * item.quantity) /
                            100
                          ).toFixed(2)}
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
                    €{totalPrice.toFixed(2)}
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
                <div className="mt-4 border-t pt-4">
                  <Link
                    href="https://app.v1ce.co.uk/login"
                    className="flex items-center gap-2 text-lg font-semibold hover:text-primary"
                  >
                    <LogIn className="size-5" />
                    Login
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
