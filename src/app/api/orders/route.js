import { NextResponse } from "next/server";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BASE_URL || "http://localhost:9000";

// GET - Retrieve orders for the current customer
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const limit = searchParams.get('limit') || '10';
    const offset = searchParams.get('offset') || '0';
    
    // Get authorization header from request
    const authorization = request.headers.get('authorization');
    
    if (!authorization) {
      return NextResponse.json(
        { error: "Authorization required" },
        { status: 401 }
      );
    }

    // Fetch orders from Medusa
    const ordersRes = await fetch(`${MEDUSA_BACKEND_URL}/store/orders?limit=${limit}&offset=${offset}`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_KEY,
        "Authorization": authorization,
      },
    });

    if (!ordersRes.ok) {
      const errorData = await ordersRes.json();
      return NextResponse.json(
        { error: "Failed to fetch orders", details: errorData },
        { status: ordersRes.status }
      );
    }

    const ordersData = await ordersRes.json();
    
    return NextResponse.json({
      orders: ordersData.orders || [],
      count: ordersData.count || 0,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create order from cart (complete cart)
export async function POST(request) {
  try {
    const { cartId } = await request.json();

    if (!cartId) {
      return NextResponse.json(
        { error: "Cart ID is required" },
        { status: 400 }
      );
    }

    // First, validate the cart has all required information
    const cartRes = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_KEY,
      },
    });

    if (!cartRes.ok) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    const cartData = await cartRes.json();
    const cart = cartData.cart;

    // Validate cart prerequisites
    const validationErrors = [];
    
    if (!cart.email) {
      validationErrors.push("Email is required");
    }
    
    if (!cart.shipping_address) {
      validationErrors.push("Shipping address is required");
    }
    
    if (!cart.billing_address) {
      validationErrors.push("Billing address is required");
    }
    
    // Check if cart has items that require shipping but no shipping method
    const hasShippingItems = cart.items?.some(item => item.requires_shipping);
    if (hasShippingItems && (!cart.shipping_methods || cart.shipping_methods.length === 0)) {
      validationErrors.push("Shipping method is required for items that require shipping");
    }
    
    if (!cart.payment_collection?.payment_sessions || cart.payment_collection.payment_sessions.length === 0) {
      validationErrors.push("Payment session is required");
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: "Cart validation failed", 
          details: validationErrors,
          cart: cart
        },
        { status: 400 }
      );
    }

    // Complete the cart to create an order
    const completeRes = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
      },
    });

    if (!completeRes.ok) {
      const errorData = await completeRes.json();
      console.error("Cart completion error:", errorData);
      
      return NextResponse.json(
        { 
          error: "Failed to complete cart", 
          details: errorData,
          message: errorData.message || "Cart completion failed"
        },
        { status: completeRes.status }
      );
    }

    const result = await completeRes.json();
    console.log(result);
    
    if (result.type === "order") {
      // Order was successfully created
      return NextResponse.json({
        success: true,
        type: "order",
        order: result.data,
        message: "Order created successfully"
      });
    } else {
      // Cart needs more information
      return NextResponse.json({
        success: false,
        type: "cart",
        cart: result.data,
        message: "Cart requires additional information"
      }, { status: 400 });
    }

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
