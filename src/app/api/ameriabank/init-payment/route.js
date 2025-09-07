import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AMERIABANK_BASE_URL = 'https://servicestest.ameriabank.am/VPOS/api/VPOS';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { amount, orderID, description, backURL, currency = '051', opaque, cardHolderID, timeout = 1200 } = body;
    
    if (!amount || !orderID || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, orderID, description' },
        { status: 400 }
      );
    }

    // Prepare the request payload
    const initPaymentRequest = {
      ClientID: process.env.NEXT_PUBLIC_AMERIABANK_CLIENT_ID,
      Username: process.env.NEXT_PUBLIC_AMERIABANK_USERNAME,
      Password: process.env.NEXT_PUBLIC_AMERIABANK_PASSWORD,
      Amount: parseFloat(amount),
      OrderID: parseInt(orderID),
      Description: description,
      Currency: currency,
      BackURL: backURL || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/callback`,
      Opaque: opaque || '',
      CardHolderID: cardHolderID || '',
      Timeout: parseInt(timeout)
    };

    // Make request to AmeriaBank API
    const response = await fetch(`${AMERIABANK_BASE_URL}/InitPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initPaymentRequest)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to initialize payment', details: data },
        { status: response.status }
      );
    }

    // Check if the response is successful
    if (data.ResponseCode === 1) {
      // Log payment response to file
      const logData = {
        timestamp: new Date().toISOString(),
        paymentID: data.PaymentID,
        orderID: orderID,
        amount: amount,
        currency: currency,
        description: description,
        responseCode: data.ResponseCode,
        responseMessage: data.ResponseMessage
      };

      // Write to payment log file
      try {
        const logFilePath = path.join(process.cwd(), 'payment_logs.txt');
        const logEntry = `[${logData.timestamp}] SUCCESS
PaymentID: ${logData.paymentID}
OrderID: ${logData.orderID}
Amount: ${logData.amount}
Currency: ${logData.currency}
Description: ${logData.description}
ResponseCode: ${logData.responseCode}
Message: ${logData.responseMessage}
---
`;
        
        // Append to file (create if doesn't exist)
        fs.appendFileSync(logFilePath, logEntry);
      } catch (fileError) {
        console.error('Error writing to log file:', fileError);
        // Continue execution even if logging fails
      }

      return NextResponse.json({
        success: true,
        paymentID: data.PaymentID,
        responseCode: data.ResponseCode,
        responseMessage: data.ResponseMessage,
        paymentURL: `https://servicestest.ameriabank.am/VPOS/Payments/Pay?id=${data.PaymentID}&lang=en`
      });
    } else {
      // Log failed payment attempt
      const logData = {
        timestamp: new Date().toISOString(),
        paymentID: data.PaymentID || 'N/A',
        orderID: orderID,
        amount: amount,
        currency: currency,
        description: description,
        responseCode: data.ResponseCode,
        responseMessage: data.ResponseMessage
      };

      try {
        const logFilePath = path.join(process.cwd(), 'payment_logs.txt');
        const logEntry = `[${logData.timestamp}] FAILED
PaymentID: ${logData.paymentID}
OrderID: ${logData.orderID}
Amount: ${logData.amount}
Currency: ${logData.currency}
Description: ${logData.description}
ResponseCode: ${logData.responseCode}
Message: ${logData.responseMessage}
---
`;
        
        fs.appendFileSync(logFilePath, logEntry);
      } catch (fileError) {
        console.error('Error writing to log file:', fileError);
      }

      return NextResponse.json(
        { 
          error: 'Payment initialization failed', 
          responseCode: data.ResponseCode,
          responseMessage: data.ResponseMessage 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('InitPayment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
