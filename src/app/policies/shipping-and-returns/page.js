import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ShippingAndReturnsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Shipping & Returns
        </h1>

        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center">Our Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Processing Time
                  </h3>
                  <p>
                    Orders are typically processed within{" "}
                    <strong>1-3 business days</strong> (Monday-Friday, excluding
                    holidays) after payment confirmation. Custom or personalized
                    items may require additional processing time, as specified
                    on their product pages.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Shipping Methods & Costs
                  </h3>
                  <p>
                    We offer various shipping options to meet your needs.
                    Shipping costs are calculated at checkout based on your
                    location, the weight of your order, and the selected
                    shipping method.
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <strong>Standard Shipping:</strong> Estimated delivery
                      within 5-10 business days.
                    </li>
                    <li>
                      <strong>Expedited Shipping:</strong> Estimated delivery
                      within 2-4 business days.
                    </li>
                    <li>
                      <strong>International Shipping:</strong> Delivery times
                      vary by destination, typically 7-21 business days. Customs
                      duties and taxes may apply and are the responsibility of
                      the recipient.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Tracking Your Order
                  </h3>
                  <p>
                    Once your order has shipped, you will receive a shipping
                    confirmation email containing your tracking number. You can
                    use this number to track your package's journey.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Returns Policy
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Eligibility for Returns
                  </h3>
                  <p>
                    We accept returns of unused and undamaged items within{" "}
                    <strong>30 days</strong> of the purchase date. Items must be
                    in their original packaging with all tags attached.
                  </p>
                  <p className="mt-2">
                    <strong>Non-returnable items include:</strong>
                  </p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Personalized or custom-made products.</li>
                    <li>Digital products or gift cards.</li>
                    <li>Items marked as final sale.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    How to Initiate a Return
                  </h3>
                  <p>
                    To start a return, please contact our customer service team
                    at{" "}
                    <Link
                      href="mailto:support@example.com"
                      className="text-primary hover:underline"
                    >
                      support@example.com
                    </Link>{" "}
                    with your order number and reason for return. We will
                    provide you with instructions and a return shipping label if
                    applicable.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Refunds
                  </h3>
                  <p>
                    Once your return is received and inspected, we will notify
                    you of the approval or rejection of your refund. If
                    approved, your refund will be processed, and a credit will
                    automatically be applied to your original method of payment
                    within 7-10 business days.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Exchanges
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Exchanging an Item
                  </h3>
                  <p>
                    If you need to exchange an item for a different size, color,
                    or product, please contact us. Exchanges are subject to
                    product availability. We recommend returning the original
                    item for a refund and placing a new order for the desired
                    item to ensure a faster process.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Damaged or Defective Items
                  </h3>
                  <p>
                    If you receive a damaged or defective item, please contact
                    us immediately (within 7 days of delivery) with photos of
                    the damage. We will arrange for a replacement or a full
                    refund.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Return Shipping Costs
                  </h3>
                  <p>
                    Customers are responsible for return shipping costs unless
                    the item is damaged, defective, or an error occurred on our
                    part.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-8 text-center text-muted-foreground">
              <p>
                For any further questions regarding shipping or returns, please
                don't hesitate to contact our customer support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
