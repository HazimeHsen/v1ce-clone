import { NextResponse } from 'next/server';

// Simulated database of payment records
const paymentRecords = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const { cartId, paymentMethod } = body;

    // Validate required fields
    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Generate a unique payment ID
    const paymentId = Date.now().toString();

    // Simulate payment processing
    const paymentData = {
      id: paymentId,
      cartId,
      paymentMethod: paymentMethod || 'card', // default to card if not specified
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    // Store payment data (in a real app, this would go to a database)
    paymentRecords.set(paymentId, paymentData);

    // Simulate async payment processing
    setTimeout(() => {
      const payment = paymentRecords.get(paymentId);
      if (payment) {
        payment.status = 'completed';
        paymentRecords.set(paymentId, payment);
      }
    }, 2000);

    // Return available payment sessions (simulated)
    return NextResponse.json({
      success: true,
      cart: {
        payment_sessions: [
          {
            provider_id: 'stripe',
            status: 'pending',
            data: {
              client_secret: 'dummy_secret'
            }
          }
        ]
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { cartId, providerId } = body;

    if (!cartId || !providerId) {
      return NextResponse.json(
        { error: 'Cart ID and provider ID are required' },
        { status: 400 }
      );
    }

    // Simulate setting payment session
    return NextResponse.json({
      success: true,
      cart: {
        id: cartId,
        payment_session: {
          provider_id: providerId,
          status: 'pending'
        }
      }
    });

  } catch (error) {
    console.error('Payment session error:', error);
    return NextResponse.json(
      { error: 'Failed to set payment session' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const payment = paymentRecords.get(paymentId);

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment,
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 