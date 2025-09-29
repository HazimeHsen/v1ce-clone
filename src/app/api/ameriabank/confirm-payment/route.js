import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AMERIABANK_BASE_URL = 'https://services.ameriabank.am/VPOS/api/VPOS';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { paymentID, amount } = body;
    
    if (!paymentID || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: paymentID, amount' },
        { status: 400 }
      );
    }

    // Prepare the request payload
    const confirmPaymentRequest = {
      PaymentID: paymentID,
      Username: process.env.AMERIABANK_USERNAME,
      Password: process.env.AMERIABANK_PASSWORD,
      Amount: parseFloat(amount)
    };

    // Make request to AmeriaBank API
    const response = await fetch(`${AMERIABANK_BASE_URL}/ConfirmPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(confirmPaymentRequest)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to confirm payment', details: data },
        { status: response.status }
      );
    }

    // Log confirm response to file
    const logData = {
      timestamp: new Date().toISOString(),
      paymentID: paymentID,
      confirmAmount: amount,
      responseCode: data.ResponseCode,
      responseMessage: data.ResponseMessage,
      opaque: data.Opaque || ''
    };

    // Write to confirm log file
    try {
      const logFilePath = path.join(process.cwd(), 'confirm_logs.txt');
      const logEntry = `[${logData.timestamp}] CONFIRM_PAYMENT
PaymentID: ${logData.paymentID}
ConfirmAmount: ${logData.confirmAmount}
ResponseCode: ${logData.responseCode}
ResponseMessage: ${logData.responseMessage}
Opaque: ${logData.opaque}
---
`;
      
      // Append to file (create if doesn't exist)
      fs.appendFileSync(logFilePath, logEntry);
    } catch (fileError) {
      console.error('Error writing to confirm log file:', fileError);
      // Continue execution even if logging fails
    }

    // Check if the response is successful (ResponseCode "00" means success)
    if (data.ResponseCode === "00") {
      return NextResponse.json({
        success: true,
        responseCode: data.ResponseCode,
        responseMessage: data.ResponseMessage,
        opaque: data.Opaque,
        paymentID: paymentID,
        confirmAmount: amount
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Payment confirmation failed', 
          responseCode: data.ResponseCode,
          responseMessage: data.ResponseMessage,
          opaque: data.Opaque
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('ConfirmPayment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
