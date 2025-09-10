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
// Alternative Payment Session Initialization (Fallback)
// This bypasses the payment collection workflow and uses the traditional cart payment sessions
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

    // Use the traditional Medusa cart payment session approach
    // This bypasses the payment collection workflow that's causing issues
    const res = await medusa.carts.createPaymentSessions(cartId);
    
    console.log("Created payment sessions:", res.cart.payment_sessions);

    return NextResponse.json({ 
      cart: res.cart,
      payment_sessions: res.cart.payment_sessions 
    });

  } catch (error) {
    console.error("Fallback payment init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment sessions", details: error.message },
      { status: 500 }
    );
  }
}

// --------------------
// Set Payment Session (Fallback)
// --------------------
export async function PUT(request) {
  try {
    const { cartId, providerId } = await request.json();

    if (!cartId || !providerId) {
      return NextResponse.json(
        { error: "Cart ID and Provider ID are required" },
        { status: 400 }
      );
    }

    // Use traditional cart payment session setting
    const res = await medusa.carts.setPaymentSession(cartId, {
      provider_id: providerId,
    });

    return NextResponse.json({ cart: res.cart });
  } catch (error) {
    console.error("Fallback set payment session error:", error);
    return NextResponse.json(
      { error: "Failed to set payment session", details: error.message },
      { status: 500 }
    );
  }
}
