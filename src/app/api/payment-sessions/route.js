import { NextResponse } from "next/server";

const ADMIN_API_KEY = process.env.MEDUSA_API_KEY; 
const PUBLISHABLE_KEY = process.env.MEDUSA_PUBLISHABLE_KEY; 
const MEDUSA_BACKEND_URL = process.env.MEDUSA_BASE_URL || "http://localhost:9000";

// --------------------
// Create payment sessions
// --------------------
export async function POST(request) {
  try {
    const body = await request.json();
    const { cartId } = body;

    if (!cartId) {
      return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
    }

    // Step 1: fetch cart to get region_id
    const cartRes = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY }
    });
    const cartData = await cartRes.json();

    if (!cartRes.ok) {
      return NextResponse.json({ error: "Failed to fetch cart", details: cartData }, { status: cartRes.status });
    }

    const regionId = cartData.cart.region.id;

    // Step 2: fetch payment providers for this region
    const providersRes = await fetch(`${MEDUSA_BACKEND_URL}/store/payment-providers?region_id=${regionId}`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_KEY }
    });
    const providersData = await providersRes.json();

    if (!providersRes.ok || providersData.payment_providers.length === 0) {
      return NextResponse.json({ 
        error: "No payment providers available for this cart's region", 
        details: providersData 
      }, { status: 400 });
    }

    // Step 3: create payment sessions
    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}/payment-sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to initialize payment sessions", details: data }, { status: response.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Payment session initialization error:", error);
    return NextResponse.json({ error: "Failed to initialize payment sessions", details: error.message }, { status: 500 });
  }
}


// --------------------
// Set payment session
// --------------------
export async function PUT(request) {
  try {
    const body = await request.json();
    const { cartId, providerId } = body;

    if (!cartId || !providerId) {
      return NextResponse.json(
        { error: "Cart ID and provider ID are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}/payment-sessions/${providerId}`, {
      method: "POST", // must be POST
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to set payment session", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment session update error:", error);
    return NextResponse.json(
      { error: "Failed to set payment session", details: error.message },
      { status: 500 }
    );
  }
}

// --------------------
// Get active payment providers
// --------------------
// --------------------
// Get active payment providers
// --------------------
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get("region_id");

    if (!regionId) {
      return NextResponse.json(
        { error: "region_id query parameter is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/payment-providers?region_id=${regionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch payment providers", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get payment providers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment providers", details: error.message },
      { status: 500 }
    );
  }
}
