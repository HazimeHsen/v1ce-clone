import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendOrderCompletionEmail, getCustomerName } from "@/lib/email-utils";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BASE_URL || "http://localhost:9000";
const AMERIABANK_BASE_URL = "https://services.ameriabank.am/VPOS/api/VPOS";

export async function GET(req, { params }) {
  const timestamp = new Date().toISOString();

  try {
    const resolvedParams = await params;
    const cartId = resolvedParams.cartId;

    const url = new URL(req.url);
    const paymentID = url.searchParams.get("paymentID");
    const orderID = url.searchParams.get("orderID");
    const responseCode =
      url.searchParams.get("responseCode") ||
      url.searchParams.get("resposneCode");
    const opaque = url.searchParams.get("opaque");
    const description = url.searchParams.get("description");

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

    if (!paymentID) {
      console.error("Missing payment ID in callback");
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_BASE_URL+"/checkout?error=missing_payment_id", req.url)
      );
    }

    if (!orderID) {
      console.error("Missing order ID in callback");
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_BASE_URL+"/checkout?error=missing_order_id", req.url)
      );
    }

    const paymentDetailsRequest = {
      PaymentID: paymentID,
      Username: process.env.AMERIABANK_USERNAME,
      Password: process.env.AMERIABANK_PASSWORD,
    };

    // const paymentDetailsResponse = await fetch(
    //   `${AMERIABANK_BASE_URL}/GetPaymentDetails`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify(paymentDetailsRequest),
    //   }
    // );

    // if (!paymentDetailsResponse.ok) {
    //   const errorData = await paymentDetailsResponse.json();
    //   console.error("Failed to get payment details:", errorData);
    //   return NextResponse.redirect(
    //     new URL(process.env.NEXT_PUBLIC_BASE_URL+"/checkout?error=payment_processing_error", req.url)
    //   );
    // }

    // const paymentDetails = await paymentDetailsResponse.json();

    // const callbackSuccess = responseCode === "00";
    // const isPaymentSuccessful =
    //   paymentDetails.ResponseCode === "00" &&
    //   (paymentDetails.PaymentState === "payment_approved" ||
    //     paymentDetails.PaymentState === "payment_deposited");

    // console.log({
    //   callbackSuccess,
    //   isPaymentSuccessful,
    //   responseCode,
    //   paymentResponseCode: paymentDetails.ResponseCode,
    //   paymentState: paymentDetails.PaymentState,
    //   paymentDetails,
    // });

    // if (!callbackSuccess) {
    //   console.error(
    //     "Payment failed according to callback response code:",
    //     responseCode
    //   );
    //   return NextResponse.redirect(
    //     new URL(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=payment_failed&callback_code=${responseCode}`,
    //       req.url
    //     )
    //   );
    // }

    // if (!isPaymentSuccessful) {
    //   console.error(
    //     "Payment not successful according to payment details:",
    //     paymentDetails
    //   );
    //   return NextResponse.redirect(
    //     new URL(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=payment_failed&details_code=${paymentDetails.ResponseCode}`,
    //       req.url
    //     )
    //   );
    // }

    // console.log(
    //   `Processing payment completion for cart: ${cartId}, payment: ${paymentID}`
    // );

    // First, check if the cart is already completed
    const cartCheckRes = await fetch(
      `${MEDUSA_BACKEND_URL}/store/carts/${cartId}`,
      {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_KEY,
        },
      }
    );

    if (cartCheckRes.ok) {
      const cartData = await cartCheckRes.json();
      const cart = cartData.cart;
      
      // If cart is already completed, redirect to order-failed page
      if (cart.completed_at) {
        console.log(`Cart ${cartId} is already completed at ${cart.completed_at}`);
        return NextResponse.redirect(
          new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/order-failed?error=order_already_completed`, req.url)
        );
      }
    }

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
      
      // Check if the error is because order is already completed
      if (orderData.message && orderData.message.includes("already completed")) {
        return NextResponse.redirect(
          new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/order-failed?error=order_already_completed`, req.url)
        );
      }
      
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout?error=order_completion_failed`, req.url)
      );
    }

    const orderId = orderData.order?.id;

    console.log(
      `Order completed successfully: ${orderId} for Ameria payment ${paymentID}, order ${orderID}`
    );

    // Send email notification for order completion
    // await sendOrderCompletionEmail(orderData.order, orderData.order?.email, getCustomerName(orderData.order));

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/order/confirmed/${orderId}`, req.url)
    );
  } catch (err) {
    console.error("Ameria callback error:", err);

    const url = new URL(req.url);

    const resolvedParams = await params;

    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_BASE_URL+"/checkout?error=payment_processing_error", req.url)
    );
  }
}
