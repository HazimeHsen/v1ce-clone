"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Truck, CreditCard, MapPin, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function OrderConfirmedPage() {
  const { orderId } = useParams();
  const router = useRouter();
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

    fetchOrder();
  }, [orderId]);

  const formatPrice = (price, currencyCode = 'USD') => {
    if (typeof price !== 'number') return '0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(price / 100); // Medusa stores prices in cents
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

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      captured: { variant: 'default', label: 'Paid', color: 'bg-green-100 text-green-800' },
      authorized: { variant: 'secondary', label: 'Authorized', color: 'bg-blue-100 text-blue-800' },
      awaiting: { variant: 'outline', label: 'Awaiting Payment', color: 'bg-yellow-100 text-yellow-800' },
      canceled: { variant: 'destructive', label: 'Canceled', color: 'bg-red-100 text-red-800' },
      not_paid: { variant: 'outline', label: 'Not Paid', color: 'bg-gray-100 text-gray-800' },
      refunded: { variant: 'outline', label: 'Refunded', color: 'bg-purple-100 text-purple-800' },
    };
    
    const config = statusConfig[status] || statusConfig.not_paid;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getFulfillmentStatusBadge = (status) => {
    const statusConfig = {
      fulfilled: { label: 'Fulfilled', color: 'bg-green-100 text-green-800' },
      shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
      delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
      not_fulfilled: { label: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
      canceled: { label: 'Canceled', color: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status] || statusConfig.not_fulfilled;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading order details...</p>
          </div>
        </div>
      </div>
    );
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
              Order Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              {error || "We couldn't find the order you're looking for."}
            </p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
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
          <div className="p-6 rounded-full bg-green-100 w-fit mx-auto mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Order #{order.display_id || order.id}</span>
            <span>•</span>
            <span>{formatDate(order.created_at)}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      {item.variant_title && (
                        <p className="text-sm text-muted-foreground">{item.variant_title}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(item.unit_price, order.currency_code)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {order.shipping_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
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
                          {order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.postal_code}
                        </p>
                        <p>{order.shipping_address.country?.display_name}</p>
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
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal, order.currency_code)}</span>
                  </div>
                  {order.shipping_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{formatPrice(order.shipping_total, order.currency_code)}</span>
                    </div>
                  )}
                  {order.tax_total > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{formatPrice(order.tax_total, order.currency_code)}</span>
                    </div>
                  )}
                  {order.discount_total > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(order.discount_total, order.currency_code)}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(order.total, order.currency_code)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Status</span>
                  {getPaymentStatusBadge(order.payment_status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fulfillment Status</span>
                  {getFulfillmentStatusBadge(order.fulfillment_status)}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.print()}>
                Print Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
