import { NextResponse } from 'next/server';

const NEXT_PUBLIC_MEDUSA_BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BASE_URL || 'http://localhost:9000';

export async function GET(request, { params }) {
  try {
    const { targetCurrency } = await params;
    
    if (!targetCurrency) {
      return NextResponse.json(
        { error: 'Target currency is required' },
        { status: 400 }
      );
    }

    let apiUrl = `${NEXT_PUBLIC_MEDUSA_BASE_URL}/exchange-rates/${targetCurrency}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Medusa API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data && data.data.rows) {
      const transformedData = {
        success: true,
        exchange_rates: data.data.rows.map(row => ({
          base_currency: row.base_currency,
          target_currency: row.target_currency,
          rate: parseFloat(row.rate),
          fetched_at: row.fetched_at
        })),
        last_updated: new Date().toISOString()
      };
      return NextResponse.json(transformedData);
    }
    
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
