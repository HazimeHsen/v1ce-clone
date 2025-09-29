import { NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

export async function POST(request) {
  try {
    const data = await request.json();
    const { order, customerEmail, customerName } = data;

    if (!order || !customerEmail) {
      return NextResponse.json(
        { error: "Order and customer email are required" },
        { status: 400 }
      );
    }

    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      url: process.env.MAILGUN_API_URL,
    });

    // Format order items for email
    const orderItems = order.items?.map(item => {
      const itemTotal = (item.unit_price || 0) * (item.quantity || 1);
      return `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; vertical-align: top;">
            <strong style="font-size: 14px; color: #2c3e50;">${item.title || 'Product'}</strong>
            ${item.variant_title ? `<br><small style="color: #666; font-size: 12px;">${item.variant_title}</small>` : ''}
          </td>
          <td style="padding: 12px; text-align: center; vertical-align: top; font-size: 14px;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right; vertical-align: top; font-size: 14px;">
            ${new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: order.currency_code || 'USD' 
            }).format(item.unit_price || 0)}
          </td>
          <td style="padding: 12px; text-align: right; vertical-align: top; font-weight: bold; font-size: 14px;">
            ${new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: order.currency_code || 'USD' 
            }).format(itemTotal)}
          </td>
        </tr>
      `;
    }).join('') || '';

    // Calculate subtotal
    const subtotal = order.items?.reduce((sum, item) => {
      return sum + ((item.unit_price || 0) * (item.quantity || 1));
    }, 0) || 0;

    // Generate Trustpilot script with order data
    const trustpilotScript = `
      <script type="application/json+trustpilot">
      {
        "recipientName": "${customerName || customerEmail}",
        "recipientEmail": "${customerEmail}",
        "referenceId": "${order.display_id || order.id}",
        "products": [
          ${order.items?.map(item => `{
            "productUrl": "https://mibio.am/products/${item.variant?.product?.handle || 'product'}",
            "name": "${item.title || 'Product'}",
            "sku": "${item.variant?.sku || item.id}"
          }`).join(',') || '{}'}
        ]
      }
      </script>
    `;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
          <img src="https://mibio.bio/assets/images/logo/logo-light.png" alt="Mibio Logo" style="height: 40px; margin-bottom: 15px;">
          <h1 style="color: #2c3e50; margin: 0; font-size: 28px; font-weight: 600;">Order Confirmed!</h1>
          <p style="color: #7f8c8d; margin: 10px 0 0; font-size: 16px;">Thank you for your purchase</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h2 style="color: #2c3e50; margin: 0 0 15px; font-size: 20px; font-weight: 600;">Order Details</h2>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding: 8px 0;">
            <span style="color: #666; font-weight: 500; font-size: 14px;">Order Number:</span>
            <span style="font-weight: bold; color: #2c3e50; font-size: 14px;">#${order.display_id || order.id.slice(-8)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding: 8px 0;">
            <span style="color: #666; font-weight: 500; font-size: 14px;">Order Date:</span>
            <span style="color: #2c3e50; font-size: 14px;">${new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid #e0e0e0; margin-top: 10px;">
            <span style="color: #666; font-weight: 500; font-size: 16px;">Total Amount:</span>
            <span style="font-weight: bold; color: #27ae60; font-size: 18px;">
              ${new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: order.currency_code || 'USD' 
              }).format(order.total || 0)}
            </span>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="color: #2c3e50; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Order Items</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; min-width: 500px;">
            <thead style="background-color: #f8f9fa;">
              <tr>
                <th style="padding: 12px; text-align: left; font-weight: 600; color: #2c3e50; font-size: 14px;">Item</th>
                <th style="padding: 12px; text-align: center; font-weight: 600; color: #2c3e50; font-size: 14px;">Qty</th>
                <th style="padding: 12px; text-align: right; font-weight: 600; color: #2c3e50; font-size: 14px;">Unit Price</th>
                <th style="padding: 12px; text-align: right; font-weight: 600; color: #2c3e50; font-size: 14px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems}
            </tbody>
            </table>
          </div>
        </div>

        ${order.shipping_address ? `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #2c3e50; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Shipping Address</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #3498db;">
            <p style="margin: 0 0 5px; font-weight: 600; color: #2c3e50; font-size: 14px;">
              ${order.shipping_address.first_name} ${order.shipping_address.last_name}
            </p>
            <p style="margin: 0 0 5px; color: #666; font-size: 13px; line-height: 1.5;">
              ${order.shipping_address.address_1}
              ${order.shipping_address.address_2 ? `<br>${order.shipping_address.address_2}` : ''}
            </p>
            <p style="margin: 0 0 5px; color: #666; font-size: 13px; line-height: 1.5;">
              ${order.shipping_address.city}
              ${order.shipping_address.province ? `, ${order.shipping_address.province}` : ''}
              ${order.shipping_address.postal_code ? ` ${order.shipping_address.postal_code}` : ''}
            </p>
            <p style="margin: 0 0 5px; color: #666; font-size: 13px;">
              ${order.shipping_address.country?.display_name || order.shipping_address.country_code}
            </p>
            ${order.shipping_address.phone ? `<p style="margin: 5px 0 0; color: #666; font-size: 13px;">Phone: ${order.shipping_address.phone}</p>` : ''}
          </div>
        </div>
        ` : ''}

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #27ae60;">
          <h3 style="color: #27ae60; margin: 0 0 10px; font-size: 18px; font-weight: 600;">What's Next?</h3>
          <p style="margin: 0; color: #2c3e50; line-height: 1.6; font-size: 14px;">
            Your order has been successfully processed and confirmed. You will receive a separate email with tracking information once your order ships.
          </p>
        </div>

        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 14px;">
          <p style="margin: 0 0 10px; color: #2c3e50; font-weight: 600; font-size: 14px;">Best Regards,<br>Mibio Team</p>
          <img src="https://mibio.bio/assets/images/logo/logo-light.png" alt="Company Logo" style="height: 20px; margin: 10px 0;">
          <p style="font-size: 12px; color: #bbb; margin: 15px 0 0; line-height: 1.4;">
            This is an automated message. Please do not respond directly to 
            <a href="mailto:noreply@mail.mibio.am" style="color: #1D4ED8; text-decoration: none;">noreply@mail.mibio.am</a>. 
            For support, please contact us through our website.
          </p>
        </div>
      </div>
      
      ${trustpilotScript}
    `;

    const emailData = {
      from: 'Mibio LLC <noreply@mail.mibio.am>',
      to: [customerEmail],
      bcc: ['mibio.am+0359a066b9@invite.trustpilot.com'],
      subject: `Order Confirmed - #${order.display_id || order.id.slice(-8)}`,
      html: emailContent,
    };

    await mg.messages.create('mail.mibio.am', emailData);

    return NextResponse.json({
      message: 'Order completion email sent successfully',
      status: 200,
    });
  } catch (error) {
    console.error('Error sending order completion email:', error);
    return NextResponse.json(
      { error: 'Error sending order completion email' },
      { status: 500 }
    );
  }
}
