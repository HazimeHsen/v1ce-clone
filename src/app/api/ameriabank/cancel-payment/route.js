import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AMERIABANK_BASE_URL = 'https://servicestest.ameriabank.am/VPOS/api/VPOS';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { paymentID } = body;
    
    if (!paymentID) {
      return NextResponse.json(
        { error: 'Missing required field: paymentID' },
        { status: 400 }
      );
    }

    // Prepare the request payload
    const cancelPaymentRequest = {
      PaymentID: paymentID,
      Username: process.env.NEXT_PUBLIC_AMERIABANK_USERNAME,
      Password: process.env.NEXT_PUBLIC_AMERIABANK_PASSWORD
    };

    // Make request to AmeriaBank API
    const response = await fetch(`${AMERIABANK_BASE_URL}/CancelPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(cancelPaymentRequest)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to cancel payment', details: data },
        { status: response.status }
      );
    }

    // Log cancel response to file
    const logData = {
      timestamp: new Date().toISOString(),
      paymentID: paymentID,
      responseCode: data.ResponseCode,
      responseMessage: data.ResponseMessage,
      opaque: data.Opaque || ''
    };

    // Write to cancel log file
    try {
      const logFilePath = path.join(process.cwd(), 'cancel_logs.txt');
      const logEntry = `[${logData.timestamp}] CANCEL
PaymentID: ${logData.paymentID}
ResponseCode: ${logData.responseCode}
ResponseMessage: ${logData.responseMessage}
Opaque: ${logData.opaque}
---
`;
      
      // Append to file (create if doesn't exist)
      fs.appendFileSync(logFilePath, logEntry);
    } catch (fileError) {
      console.error('Error writing to cancel log file:', fileError);
      // Continue execution even if logging fails
    }

    // Check if the response is successful (ResponseCode "00" means success)
    if (data.ResponseCode === "00") {
      return NextResponse.json({
        success: true,
        responseCode: data.ResponseCode,
        responseMessage: data.ResponseMessage,
        opaque: data.Opaque,
        paymentID: paymentID
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Payment cancellation failed', 
          responseCode: data.ResponseCode,
          responseMessage: data.ResponseMessage,
          opaque: data.Opaque
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('CancelPayment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
