"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogIn, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

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

export default function Navbar() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "V1CE Pro Card",
      price: 29.99,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "V1CE Classic Card",
      price: 19.99,
      quantity: 2,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-[40] w-full border-b border-border bg-background">
      <div className="center-wide flex w-full justify-between px-5 py-4">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image
              alt="V1CE Logo"
              loading="lazy"
              width="80"
              height="29"
              decoding="async"
              src="/logo-dark.svg"
            />
          </Link>
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative z-10 max-w-max flex-1 items-center justify-center hidden lg:block"
          >
            <div style={{ position: "relative" }}>
              <ul
                data-orientation="horizontal"
                className="group flex flex-1 list-none items-center justify-center space-x-1"
                dir="ltr"
              >
                <li>
                  <Link
                    href="/products"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md p-3 text-[14px] font-semibold text-muted-foreground transition-colors data-[active]:text-primary data-[state=open]:text-primary hover:text-primary"
                    data-radix-collection-item=""
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies/shipping-and-returns"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md p-3 text-[14px] font-semibold text-muted-foreground transition-colors data-[active]:text-primary data-[state=open]:text-primary hover:text-primary"
                    data-radix-collection-item=""
                  >
                   Shipping And Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teams"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md p-3 text-[14px] font-semibold text-muted-foreground transition-colors data-[active]:text-primary data-[state=open]:text-primary hover:text-primary"
                    data-radix-collection-item=""
                  >
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    href="/digital-business-card-reviews"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md p-3 text-[14px] font-semibold text-muted-foreground transition-colors data-[active]:text-primary data-[state=open]:text-primary hover:text-primary"
                    data-radix-collection-item=""
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div className="absolute left-0 top-full flex justify-center"></div>
          </nav>
        </div>
        <div className="flex gap-5">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open cart"
                className="hidden cursor-pointer items-center gap-1 rounded-full md:flex"
              >
                <div className="relative">
                  <div className="flex size-10 items-center justify-center">
                    <ShoppingCart className="lucide lucide-shopping-cart" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </SheetTrigger>

            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open cart"
                className="flex cursor-pointer items-center gap-1 rounded-full md:hidden"
              >
                <div className="relative">
                  <div className="flex size-10 items-center justify-center">
                    <ShoppingCart className="lucide lucide-shopping-cart" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </div>
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
                        className="flex items-center gap-4 border-b p-4 last:border-b-0 last:pb-0"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="grid flex-1 gap-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 bg-transparent"
                              onClick={() => handleDecrease(item.id)}
                            >
                              -
                            </Button>
                            <span className="text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 bg-transparent"
                              onClick={() => handleIncrease(item.id)}
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
                                Remove {item.name}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <SheetFooter className="mt-auto pt-4 border-t">
                <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-state="closed"
            className="block lg:hidden"
            aria-label="Toggle hamburger menu"
          >
            <Menu className="lucide lucide-menu size-6 text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
}
