import Medusa from "@medusajs/medusa-js";
import { NextResponse } from "next/server";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BASE_URL || "http://localhost:9000";

const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
  publishableApiKey: PUBLISHABLE_KEY,
});

// --------------------
// Create Payment Collection + Initialize Payment Session
// --------------------
export async function POST(request) {
  try {
    const { cartId } = await request.json();

    if (!cartId) {
      return NextResponse.json(
        { error: "Cart ID is required" },
        { status: 400 }
      );
    }

    // Step 1: Fetch cart
    const cartRes = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
    });
    const cartData = await cartRes.json();
    if (!cartRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cart", details: cartData },
        { status: cartRes.status }
      );
    }

    // Step 2: Create Payment Collection
    const collectionRes = await fetch(
      `${MEDUSA_BACKEND_URL}/store/payment-collections`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ cart_id: cartId }),
      }
    );
    const collectionData = await collectionRes.json();
    if (!collectionRes.ok) {
      return NextResponse.json(
        { error: "Failed to create payment collection", details: collectionData },
        { status: collectionRes.status }
      );
    }

    const collectionId = collectionData.payment_collection.id;

    // Step 3: Initialize Payment Session (using first provider)
    const providersRes = await fetch(
      `${MEDUSA_BACKEND_URL}/store/payment-providers?region_id=${cartData.cart.region.id}`,
      {
        headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
      }
    );
    const providersData = await providersRes.json();
    if (!providersRes.ok || !providersData.payment_providers.length) {
      return NextResponse.json(
        { error: "No payment providers available", details: providersData },
        { status: 400 }
      );
    }

    const providerId = providersData.payment_providers[0].id;
console.log(providerId);

    const sessionRes = await fetch(
      `${MEDUSA_BACKEND_URL}/store/payment-collections/${collectionId}/payment-sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ provider_id: providerId }),
      }
    );
    const sessionData = await sessionRes.json();
    if (!sessionRes.ok) {
      return NextResponse.json(
        { error: "Failed to initialize payment session", details: sessionData },
        { status: sessionRes.status }
      );
    }

    // Step 4: Fetch the updated cart with payment sessions
    const updatedCartRes = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
    });
    const updatedCartData = await updatedCartRes.json();
    if (!updatedCartRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch updated cart", details: updatedCartData },
        { status: updatedCartRes.status }
      );
    }

    return NextResponse.json({ cart: updatedCartData.cart });
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment collection", details: error.message },
      { status: 500 }
    );
  }
}
