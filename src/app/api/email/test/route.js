import { NextResponse } from "next/server";
import { sendOrderCompletionEmail } from "@/lib/email-utils";

export async function POST(request) {
  try {
    const { testEmail } = await request.json();

    if (!testEmail) {
      return NextResponse.json(
        { error: "Test email address is required" },
        { status: 400 }
      );
    }

    // Create a mock order for testing
    const mockOrder = {
      id: "test-order-123",
      display_id: "12345",
      created_at: new Date().toISOString(),
      total: 99.99,
      currency_code: "USD",
      email: testEmail,
      shipping_address: {
        first_name: "John",
        last_name: "Doe",
        address_1: "123 Test Street",
        city: "Test City",
        postal_code: "12345",
        country_code: "US"
      },
      items: [
        {
          id: "item-1",
          title: "Test Product",
          quantity: 1,
          unit_price: 99.99,
          variant_title: "Test Variant"
        }
      ]
    };

    const success = await sendOrderCompletionEmail(mockOrder, testEmail, "John Doe");

    if (success) {
      return NextResponse.json({
        message: "Test email sent successfully",
        status: 200
      });
    } else {
      return NextResponse.json({
        error: "Failed to send test email",
        status: 500
      });
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Error sending test email' },
      { status: 500 }
    );
  }
}