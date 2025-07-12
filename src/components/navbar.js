"use client";

import Link from "next/link";
import { ChevronDown, LogIn, ShoppingCart, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[99] w-full border-b border-border bg-background">
      <div className="center-wide flex w-full justify-between px-5 py-4">
        <div className="flex items-center gap-7">
          <Link href="/">
            <img
              alt="V1CE Logo"
              loading="lazy"
              width="80"
              height="29"
              decoding="async"
              style={{ color: "transparent" }}
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
                    href="/collections/tap-business-cards"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md p-3 text-[14px] font-semibold text-muted-foreground transition-colors data-[active]:text-primary data-[state=open]:text-primary hover:text-primary"
                    data-radix-collection-item=""
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#before"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md p-3 text-[14px] font-semibold text-muted-foreground transition-colors data-[active]:text-primary data-[state=open]:text-primary hover:text-primary"
                    data-radix-collection-item=""
                  >
                    How It Works
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
          <div className="hidden lg:flex">
            <button
              type="button"
              className="relative flex w-full cursor-pointer items-center gap-1 text-left sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-labelledby="listbox-label"
            >
              <span className="flex items-center gap-1 truncate">
                <div className="h-3 w-[19px]">
                  <img
                    alt="United Arab Emirates flag"
                    loading="lazy"
                    width="19"
                    height="14"
                    decoding="async"
                    className="rounded-[2px]"
                    src="/placeholder.svg?height=14&width=19"
                    style={{
                      color: "transparent",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                </div>
                <p className="hidden w-6 text-center lg:block">AE</p>
              </span>
              <span className="pointer-events-none flex items-center">
                <ChevronDown
                  className="lucide lucide-chevron-down relative top-px size-4 transition duration-200 rotate-0"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
          <div className="hidden gap-[10px] lg:flex">
            <Link
              className="w-fit"
              aria-disabled="false"
              href="https://app.v1ce.co.uk/login"
            >
              <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-border bg-background font-semibold text-foreground hover:bg-accent size-10">
                <LogIn className="lucide lucide-log-in size-4" />
              </button>
            </Link>
          </div>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-state="closed"
            className="hidden cursor-pointer items-center gap-1 rounded-full md:flex"
            aria-label="Cart"
          >
            <div className="relative">
              <div className="flex size-10 items-center justify-center">
                <ShoppingCart className="lucide lucide-shopping-cart" />
              </div>
            </div>
          </button>
          <span
            id="radix-cart-title"
            className="text-lg font-semibold text-foreground sr-only"
          >
            Cart
          </span>
          <p
            id="radix-cart-description"
            className="text-sm text-muted-foreground hidden"
          >
            Cart items
          </p>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-state="closed"
            className="flex cursor-pointer items-center gap-1 rounded-full md:hidden"
            aria-label="Cart"
          >
            <div className="relative">
              <div className="flex size-10 items-center justify-center">
                <ShoppingCart className="lucide lucide-shopping-cart" />
              </div>
            </div>
          </button>
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
