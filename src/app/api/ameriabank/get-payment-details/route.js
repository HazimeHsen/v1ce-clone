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
    const getPaymentDetailsRequest = {
      PaymentID: paymentID,
      Username: process.env.NEXT_PUBLIC_AMERIABANK_USERNAME,
      Password: process.env.NEXT_PUBLIC_AMERIABANK_PASSWORD
    };

    // Make request to AmeriaBank API
    const response = await fetch(`${AMERIABANK_BASE_URL}/GetPaymentDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(getPaymentDetailsRequest)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to get payment details', details: data },
        { status: response.status }
      );
    }

    // Log payment details request to file
    const logData = {
      timestamp: new Date().toISOString(),
      paymentID: paymentID,
      responseCode: data.ResponseCode,
      paymentState: data.PaymentState,
      orderStatus: data.OrderStatus,
      amount: data.Amount,
      currency: data.Currency,
      orderID: data.OrderID
    };

    // Write to payment details log file
    try {
      const logFilePath = path.join(process.cwd(), 'payment_details_logs.txt');
      const logEntry = `[${logData.timestamp}] GET_PAYMENT_DETAILS
PaymentID: ${logData.paymentID}
ResponseCode: ${logData.responseCode}
PaymentState: ${logData.paymentState}
OrderStatus: ${logData.orderStatus}
Amount: ${logData.amount}
Currency: ${logData.currency}
OrderID: ${logData.orderID}
---
`;
      
      // Append to file (create if doesn't exist)
      fs.appendFileSync(logFilePath, logEntry);
    } catch (fileError) {
      console.error('Error writing to payment details log file:', fileError);
    }

    // Check if the response is successful
    if (data.ResponseCode === "00") {
      return NextResponse.json({
        success: true,
        paymentID: data.PaymentID,
        orderID: data.OrderID,
        amount: data.Amount,
        currency: data.Currency,
        description: data.Description,
        paymentState: data.PaymentState,
        orderStatus: data.OrderStatus,
        responseCode: data.ResponseCode,
        responseMessage: data.ResponseMessage,
        opaque: data.Opaque,
        cardHolderID: data.CardHolderID,
        // Additional fields that might be returned
        transactionID: data.TransactionID,
        authCode: data.AuthCode,
        rrn: data.RRN,
        cardNumber: data.CardNumber,
        cardHolderName: data.CardHolderName,
        processingDate: data.ProcessingDate,
        approvedAmount: data.ApprovedAmount,
        depositedAmount: data.DepositedAmount,
        refundedAmount: data.RefundedAmount
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Failed to get payment details', 
          responseCode: data.ResponseCode,
          responseMessage: data.ResponseMessage 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('GetPaymentDetails error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
