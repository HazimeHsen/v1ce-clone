import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BASE_URL || "http://localhost:9000";
const AMERIABANK_BASE_URL = "https://servicestest.ameriabank.am/VPOS/api/VPOS";

export async function GET(req, { params }) {
  const timestamp = new Date().toISOString();

  try {
    // Await params before accessing its properties
    const resolvedParams = await params;
    const cartId = resolvedParams.cartId;
    
    const url = new URL(req.url);
    const paymentID = url.searchParams.get("paymentID");
    const orderID = url.searchParams.get("orderID");
    const responseCode =
      url.searchParams.get("responseCode") ||
      url.searchParams.get("resposneCode"); // Handle typo in parameter name
    const opaque = url.searchParams.get("opaque");
    const description = url.searchParams.get("description");

    // Log callback request
    const callbackLogData = {
      timestamp,
      paymentID,
      orderID,
      responseCode,
      opaque,
      description,
      cartId,
      fullUrl: req.url,
      userAgent: req.headers.get("user-agent") || "unknown",
    };

    logToFile("callback_logs.txt", callbackLogData);

    if (!paymentID) {
      console.error("Missing payment ID in callback");
      return NextResponse.redirect(
        new URL("/checkout?error=missing_payment_id", req.url)
      );
    }

    if (!orderID) {
      console.error("Missing order ID in callback");
      return NextResponse.redirect(
        new URL("/checkout?error=missing_order_id", req.url)
      );
    }

    // Step 1: Get payment details from Ameria Bank
    const paymentDetailsRequest = {
      PaymentID: paymentID,
      Username: process.env.NEXT_PUBLIC_AMERIABANK_USERNAME,
      Password: process.env.NEXT_PUBLIC_AMERIABANK_PASSWORD,
    };

    const paymentDetailsResponse = await fetch(
      `${AMERIABANK_BASE_URL}/GetPaymentDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(paymentDetailsRequest),
      }
    );

    if (!paymentDetailsResponse.ok) {
      const errorData = await paymentDetailsResponse.json();
      console.error("Failed to get payment details:", errorData);
      return NextResponse.redirect(
        new URL("/checkout?error=payment_verification_failed", req.url)
      );
    }

    const paymentDetails = await paymentDetailsResponse.json();

    // Log payment details
    logToFile("payment_details_logs.txt", {
      timestamp,
      paymentID,
      responseCode: paymentDetails.ResponseCode,
      paymentState: paymentDetails.PaymentState,
      orderStatus: paymentDetails.OrderStatus,
      amount: paymentDetails.Amount,
      currency: paymentDetails.Currency,
      orderID: paymentDetails.OrderID,
    });

    // Step 2: Check if payment is successful
    // First check the callback response code, then verify with payment details
    const callbackSuccess = responseCode === "00";
    const isPaymentSuccessful =
      paymentDetails.ResponseCode === "00" &&
      (paymentDetails.PaymentState === "payment_approved" ||
        paymentDetails.PaymentState === "payment_deposited");

    console.log({
      callbackSuccess,
      isPaymentSuccessful,
      responseCode,
      paymentResponseCode: paymentDetails.ResponseCode,
      paymentState: paymentDetails.PaymentState,
      paymentDetails,
    });

    if (!callbackSuccess) {
      console.error(
        "Payment failed according to callback response code:",
        responseCode
      );
      return NextResponse.redirect(
        new URL(
          `/checkout?error=payment_failed&callback_code=${responseCode}`,
          req.url
        )
      );
    }

    if (!isPaymentSuccessful) {
      console.error(
        "Payment not successful according to payment details:",
        paymentDetails
      );
      return NextResponse.redirect(
        new URL(
          `/checkout?error=payment_failed&details_code=${paymentDetails.ResponseCode}`,
          req.url
        )
      );
    }

    // Step 3: If payment is only authorized, confirm it
    if (paymentDetails.PaymentState === "payment_approved") {
      const confirmRequest = {
        PaymentID: paymentID,
        Username: process.env.NEXT_PUBLIC_AMERIABANK_USERNAME,
        Password: process.env.NEXT_PUBLIC_AMERIABANK_PASSWORD,
        Amount: paymentDetails.Amount,
      };

      const confirmResponse = await fetch(
        `${AMERIABANK_BASE_URL}/ConfirmPayment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(confirmRequest),
        }
      );

      const confirmData = await confirmResponse.json();

      // Log confirmation attempt
      logToFile("payment_logs.txt", {
        timestamp,
        action: "confirm_payment",
        paymentID,
        amount: paymentDetails.Amount,
        responseCode: confirmData.ResponseCode,
        responseMessage: confirmData.ResponseMessage,
      });

      if (!confirmResponse.ok || confirmData.ResponseCode !== "00") {
        console.error("Failed to confirm payment:", confirmData);
        return NextResponse.redirect(
          new URL("/checkout?error=payment_confirmation_failed", req.url)
        );
      }
    }

    // Step 4: Use cart ID from route parameters
    // The cart ID is extracted from the URL path parameters

    console.log(
      `Processing payment completion for cart: ${cartId}, payment: ${paymentID}`
    );

    // Step 5: Complete the order in Medusa
    const orderRes = await fetch(
      `${MEDUSA_BACKEND_URL}/store/carts/${cartId}/complete`,
      {
        method: "POST",
        headers: {
          "x-publishable-api-key": PUBLISHABLE_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      console.error("Failed to complete order:", orderData);
      logToFile("callback_logs.txt", {
        timestamp,
        error: "order_completion_failed",
        cartId,
        paymentID,
        medusaError: orderData,
      });
      return NextResponse.redirect(
        new URL(`/checkout?error=order_completion_failed`, req.url)
      );
    }

    // Step 6: Log successful order completion and redirect
    const orderId = orderData.order?.id;

    logToFile("callback_logs.txt", {
      timestamp,
      success: true,
      paymentID,
      cartId,
      orderId,
      amount: paymentDetails.Amount,
      currency: paymentDetails.Currency,
    });

    console.log(
      `Order completed successfully: ${orderId} for payment ${paymentID}`
    );

    return NextResponse.redirect(
      new URL(`/order/confirmed/${orderId}`, req.url)
    );
  } catch (err) {
    console.error("Ameria callback error:", err);

    // Parse URL for error logging
    const url = new URL(req.url);
    
    // Await params for error logging
    const resolvedParams = await params;
    
    // Log error
    logToFile("callback_logs.txt", {
      timestamp,
      error: true,
      message: err.message,
      stack: err.stack,
      paymentID: url.searchParams.get("paymentID"),
      orderID: url.searchParams.get("orderID"),
      responseCode:
        url.searchParams.get("responseCode") ||
        url.searchParams.get("resposneCode"),
      cartId: resolvedParams.cartId,
    });

    return NextResponse.redirect(
      new URL(`/checkout?error=${encodeURIComponent(err.message)}`, req.url)
    );
  }
}

// Helper function to log data to file
function logToFile(filename, data) {
  try {
    const logEntry = JSON.stringify(data) + "\n";
    const logPath = path.join(process.cwd(), filename);
    fs.appendFileSync(logPath, logEntry);
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
}
