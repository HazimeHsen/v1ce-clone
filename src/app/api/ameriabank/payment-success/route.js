import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters from the callback URL
    const orderID = searchParams.get('orderID');
    const responseCode = searchParams.get('resposneCode'); // Note: typo in AmeriaBank docs
    const paymentID = searchParams.get('paymentID');
    const opaque = searchParams.get('opaque');

    // Log the success callback
    const logData = {
      timestamp: new Date().toISOString(),
      orderID: orderID,
      responseCode: responseCode,
      paymentID: paymentID,
      opaque: opaque,
      callbackType: 'SUCCESS_CALLBACK'
    };

    // Write to success log file
    try {
      const logFilePath = path.join(process.cwd(), 'success_logs.txt');
      const logEntry = `[${logData.timestamp}] SUCCESS_CALLBACK
OrderID: ${logData.orderID}
ResponseCode: ${logData.responseCode}
PaymentID: ${logData.paymentID}
Opaque: ${logData.opaque}
CallbackType: ${logData.callbackType}
---
`;
      
      // Append to file (create if doesn't exist)
      fs.appendFileSync(logFilePath, logEntry);
    } catch (fileError) {
      console.error('Error writing to success log file:', fileError);
    }

    // Check if this is a successful payment (ResponseCode "00" means success)
    if (responseCode === "00") {
      return NextResponse.json({
        success: true,
        message: 'Payment completed successfully',
        orderID: orderID,
        paymentID: paymentID,
        responseCode: responseCode,
        opaque: opaque,
        timestamp: logData.timestamp
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Payment was not successful',
        orderID: orderID,
        paymentID: paymentID,
        responseCode: responseCode,
        opaque: opaque,
        timestamp: logData.timestamp
      });
    }

  } catch (error) {
    console.error('PaymentSuccess error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Extract parameters from POST body (alternative method)
    const { orderID, responseCode, paymentID, opaque } = body;

    // Log the success callback
    const logData = {
      timestamp: new Date().toISOString(),
      orderID: orderID,
      responseCode: responseCode,
      paymentID: paymentID,
      opaque: opaque,
      callbackType: 'SUCCESS_CALLBACK_POST'
    };

    // Write to success log file
    try {
      const logFilePath = path.join(process.cwd(), 'success_logs.txt');
      const logEntry = `[${logData.timestamp}] SUCCESS_CALLBACK_POST
OrderID: ${logData.orderID}
ResponseCode: ${logData.responseCode}
PaymentID: ${logData.paymentID}
Opaque: ${logData.opaque}
CallbackType: ${logData.callbackType}
---
`;
      
      // Append to file (create if doesn't exist)
      fs.appendFileSync(logFilePath, logEntry);
    } catch (fileError) {
      console.error('Error writing to success log file:', fileError);
    }

    // Check if this is a successful payment (ResponseCode "00" means success)
    if (responseCode === "00") {
      return NextResponse.json({
        success: true,
        message: 'Payment completed successfully',
        orderID: orderID,
        paymentID: paymentID,
        responseCode: responseCode,
        opaque: opaque,
        timestamp: logData.timestamp
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Payment was not successful',
        orderID: orderID,
        paymentID: paymentID,
        responseCode: responseCode,
        opaque: opaque,
        timestamp: logData.timestamp
      });
    }

  } catch (error) {
    console.error('PaymentSuccess POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
