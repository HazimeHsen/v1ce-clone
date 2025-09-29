export async function sendOrderCompletionEmail(order, customerEmail, customerName = null) {
  try {
    if (!order || !customerEmail) {
      console.error('Order and customer email are required for email notification');
      return false;
    }

    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/order-completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order,
        customerEmail,
        customerName: customerName || customerEmail
      }),
    });

    if (!emailResponse.ok) {
      console.error('Failed to send order completion email:', await emailResponse.text());
      return false;
    } else {
      console.log('Order completion email sent successfully');
      return true;
    }
  } catch (emailError) {
    console.error('Error sending order completion email:', emailError);
    return false;
  }
}

export function getCustomerName(order) {
  if (order?.shipping_address?.first_name && order?.shipping_address?.last_name) {
    return `${order.shipping_address.first_name} ${order.shipping_address.last_name}`;
  }
  return order?.email || 'Customer';
}
