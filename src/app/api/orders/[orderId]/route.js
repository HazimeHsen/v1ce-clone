import { NextResponse } from "next/server";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BASE_URL || "http://localhost:9000";

// GET - Retrieve a specific order by ID
export async function GET(request, { params }) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Fetch specific order from Medusa
    const orderRes = await fetch(`${MEDUSA_BACKEND_URL}/store/orders/${orderId}`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_KEY,
      },
    });

    if (!orderRes.ok) {
      const errorData = await orderRes.json();
      return NextResponse.json(
        { error: "Failed to fetch order", details: errorData },
        { status: orderRes.status }
      );
    }

    const orderData = await orderRes.json();
    
    return NextResponse.json({
      order: orderData.order
    });

  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order", details: error.message },
      { status: 500 }
    );
  }
}
