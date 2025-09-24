"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, Mail, Phone } from "lucide-react";
import { PageLoader } from "@/components/ui/loader";
import { useTranslations } from "@/hooks/use-translations";
import { useCurrency } from "@/context/currency-context";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PriceDisplay from "@/components/ui/price-display";

export default function OrderConfirmedPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const { t } = useTranslations();
  const { formatPrice, selectedCurrency } = useCurrency();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Clear cart from localStorage since order is completed
    const clearCart = () => {
      try {
        localStorage.removeItem("cart_id");
        console.log("Cart cleared from localStorage after successful order completion");
      } catch (error) {
        console.error("Failed to clear cart from localStorage:", error);
      }
    };

    fetchOrder();
    clearCart();
  }, [orderId]);

  // Using formatPrice from currency context

  // Calculate proper subtotal from order items
  const calculateSubtotal = (order) => {
    if (!order?.items) return 0;
    return order.items.reduce((sum, item) => {
      return sum + ((item.unit_price || 0) * (item.quantity || 1));
    }, 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (loading) {
    return <PageLoader />;
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center py-16">
            <div className="p-6 rounded-full bg-destructive/20 w-fit mx-auto mb-6">
              <Package className="h-16 w-16 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {t("orderConfirmed.orderNotFound")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {error || t("orderConfirmed.orderNotFoundDescription")}
            </p>
            <Button asChild>
              <Link href="/products">{t("orderConfirmed.continueShopping")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="p-6 rounded-full bg-green-100 w-fit mx-auto mb-6 relative">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("orderConfirmed.title")}
          </h1>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {t("orderConfirmed.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1 bg-secondary/20 rounded-full">
              <span className="font-medium text-foreground">{t("orderConfirmed.orderNumber")}{order.display_id || order.id.slice(-8)}</span>
            </div>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{formatDate(order.created_at)}</span>
            </div>
            {order.total && (
              <>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <span className="font-semibold text-primary"><PriceDisplay price={order.total} fromCurrency={order.currency_code} /></span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t("orderConfirmed.orderItems")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items?.map((item) => {
                  const itemImage = item.thumbnail || 
                    (item.variant?.product?.thumbnail) || 
                    (item.product?.thumbnail) ||
                    (item.variant?.metadata?.images ? JSON.parse(item.variant.metadata.images)[0] : null);
                  
                  const itemTotal = (item.unit_price || 0) * (item.quantity || 1);
                  
                  return (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        {itemImage ? (
                          <img
                            src={itemImage}
                            alt={item.title || 'Product'}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <Package className="h-8 w-8 text-muted-foreground" style={{display: itemImage ? 'none' : 'flex'}} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.title || t("orderConfirmed.unknownProduct")}</h4>
                        {item.variant_title && (
                          <p className="text-sm text-muted-foreground mt-1">{item.variant_title}</p>
                        )}
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {t("orderConfirmed.quantity")}: <span className="font-medium text-foreground">{item.quantity}</span>
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {t("orderConfirmed.unit")}: <span className="font-medium text-foreground"><PriceDisplay price={item.unit_price} fromCurrency={order.currency_code} /></span>
                            </span>
                          </div>
                          <span className="font-semibold text-lg text-primary">
                            <PriceDisplay price={itemTotal} fromCurrency={order.currency_code} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {order.shipping_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {t("orderConfirmed.shippingInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {order.shipping_address.first_name} {order.shipping_address.last_name}
                    </p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <div>
                        <p>{order.shipping_address.address_1}</p>
                        {order.shipping_address.address_2 && (
                          <p>{order.shipping_address.address_2}</p>
                        )}
                        <p>
                          {order.shipping_address.city}
                          {order.shipping_address.province && `, ${order.shipping_address.province}`}
                          {order.shipping_address.postal_code && ` ${order.shipping_address.postal_code}`}
                        </p>
                        <p>{order.shipping_address.country?.display_name || order.shipping_address.country_code}</p>
                      </div>
                    </div>
                    {order.shipping_address.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{order.shipping_address.phone}</span>
                      </div>
                    )}
                    {order.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{order.email}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("orderConfirmed.orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("orderConfirmed.subtotal")}</span>
                    <span className="font-medium"><PriceDisplay price={calculateSubtotal(order)} fromCurrency={order.currency_code} /></span>
                  </div>
                  
                  {(order.shipping_total > 0 || order.shipping_methods?.length > 0) && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("orderConfirmed.shipping")}
                        {order.shipping_methods?.[0]?.shipping_option?.name && (
                          <span className="text-xs block text-muted-foreground/70">
                            {order.shipping_methods[0].shipping_option.name}
                          </span>
                        )}
                      </span>
                      <span className="font-medium">
                        {order.shipping_total > 0 ? 
                          <PriceDisplay price={order.shipping_total} fromCurrency={order.currency_code} /> : 
                          t("orderConfirmed.free")
                        }
                      </span>
                    </div>
                  )}
                  
                  {order.tax_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("orderConfirmed.tax")}</span>
                      <span className="font-medium"><PriceDisplay price={order.tax_total} fromCurrency={order.currency_code} /></span>
                    </div>
                  )}
                  
                  {order.discount_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">{t("orderConfirmed.discount")}</span>
                      <span className="font-medium text-green-600">-<PriceDisplay price={order.discount_total} fromCurrency={order.currency_code} /></span>
                    </div>
                  )}
                  
                  {order.gift_card_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">{t("orderConfirmed.giftCard")}</span>
                      <span className="font-medium text-blue-600">-<PriceDisplay price={order.gift_card_total} fromCurrency={order.currency_code} /></span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("orderConfirmed.totalPaid")}</span>
                  <span className="text-primary"><PriceDisplay price={order.total} fromCurrency={order.currency_code} /></span>
                </div>
                
                {/* Payment Method Info */}
                {order.payments?.length > 0 && (
                  <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">{t("orderConfirmed.paymentMethod")}</h4>
                    {order.payments.map((payment) => (
                      <div key={payment.id} className="text-xs text-muted-foreground">
                        <span className="capitalize">{payment.provider_id?.replace('_', ' ')}</span>
                        {payment.data?.last4 && (
                          <span> •••• {payment.data.last4}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Ameria Bank Details */}
                {order.metadata?.ameria_payment_id && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium mb-2 text-blue-800">{t("orderConfirmed.paymentDetails")}</h4>
                    <div className="space-y-1 text-xs text-blue-700">
                      <div>{t("orderConfirmed.paymentId")}: {order.metadata.ameria_payment_id}</div>
                      {order.metadata.ameria_order_id && (
                        <div>{t("orderConfirmed.orderId")}: {order.metadata.ameria_order_id}</div>
                      )}
                      <div className="text-blue-600">{t("orderConfirmed.processedVia")}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/products">{t("orderConfirmed.continueShopping")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
