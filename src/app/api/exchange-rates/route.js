import { NextResponse } from 'next/server';

const MEDUSA_BASE_URL = process.env.MEDUSA_BASE_URL || 'http://localhost:9000';

export async function GET() {
  try {
    // Fetch all exchange rates from Medusa backend
    const response = await fetch(`${MEDUSA_BASE_URL}/api/exchange-rate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Medusa API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Exchange rates API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch exchange rates',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
