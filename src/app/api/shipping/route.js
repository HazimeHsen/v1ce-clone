import { NextResponse } from 'next/server';

const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

export async function POST(request) {
  try {
    console.log(PUBLISHABLE_API_KEY);
    
    const shippingData = await request.json();
    const cartId = shippingData.cartId;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BASE_URL}/store/shipping-options?cart_id=${cartId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-publishable-api-key': PUBLISHABLE_API_KEY,
          },
        }
      );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Shipping API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipping options' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const cartId = searchParams.get("cartId");
  
      if (!cartId) {
        return NextResponse.json(
          { error: "Cart ID is required" },
          { status: 400 }
        );
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BASE_URL}/store/shipping-options?cart_id=${cartId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": PUBLISHABLE_API_KEY,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("Shipping API Error:", error);
      return NextResponse.json(
        { error: "Failed to fetch shipping options" },
        { status: 500 }
      );
    }
  }
  