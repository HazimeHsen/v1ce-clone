import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AMERIABANK_BASE_URL = 'https://servicestest.ameriabank.am/VPOS/api/VPOS';

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
    const refundPaymentRequest = {
      PaymentID: paymentID,
      Username: process.env.AMERIABANK_USERNAME,
      Password: process.env.AMERIABANK_PASSWORD,
      Amount: parseFloat(amount)
    };

    // Make request to AmeriaBank API
    const response = await fetch(`${AMERIABANK_BASE_URL}/RefundPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(refundPaymentRequest)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to refund payment', details: data },
        { status: response.status }
      );
    }

    // Log refund response to file
    const logData = {
      timestamp: new Date().toISOString(),
      paymentID: paymentID,
      refundAmount: amount,
      responseCode: data.ResponseCode,
      responseMessage: data.ResponseMessage,
      opaque: data.Opaque || ''
    };

    // Write to refund log file
    try {
      const logFilePath = path.join(process.cwd(), 'refund_logs.txt');
      const logEntry = `[${logData.timestamp}] REFUND
PaymentID: ${logData.paymentID}
RefundAmount: ${logData.refundAmount}
ResponseCode: ${logData.responseCode}
ResponseMessage: ${logData.responseMessage}
Opaque: ${logData.opaque}
---
`;
      
      // Append to file (create if doesn't exist)
      fs.appendFileSync(logFilePath, logEntry);
    } catch (fileError) {
      console.error('Error writing to refund log file:', fileError);
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
        refundAmount: amount
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Refund failed', 
          responseCode: data.ResponseCode,
          responseMessage: data.ResponseMessage,
          opaque: data.Opaque
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('RefundPayment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
