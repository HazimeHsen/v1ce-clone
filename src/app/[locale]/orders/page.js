"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Eye, Calendar, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import PriceDisplay from "@/components/ui/price-display";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    count: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Note: In a real app, you would get the auth token from your auth system
        // For now, this will work for testing purposes
        const response = await fetch(`/api/orders?limit=${pagination.limit}&offset=${pagination.offset}`);
        
        if (!response.ok) {
          if (response.status === 401) {
            // User is not authenticated
            router.push('/auth/login');
            return;
          }
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.orders || []);
        setPagination(prev => ({
          ...prev,
          count: data.count || 0
        }));
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [pagination.limit, pagination.offset, router]);

  // Removed custom formatPrice function - now using PriceDisplay component

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      captured: { label: 'Paid', color: 'bg-green-100 text-green-800' },
      authorized: { label: 'Authorized', color: 'bg-blue-100 text-blue-800' },
      awaiting: { label: 'Awaiting Payment', color: 'bg-yellow-100 text-yellow-800' },
      canceled: { label: 'Canceled', color: 'bg-red-100 text-red-800' },
      not_paid: { label: 'Not Paid', color: 'bg-gray-100 text-gray-800' },
      refunded: { label: 'Refunded', color: 'bg-purple-100 text-purple-800' },
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">View and track your order history</p>
          </div>
          
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center py-16">
            <div className="p-6 rounded-full bg-destructive/20 w-fit mx-auto mb-6">
              <Package className="h-16 w-16 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Unable to Load Orders
            </h1>
            <p className="text-muted-foreground mb-8">
              {error}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center py-16">
            <div className="p-6 rounded-full bg-secondary/20 w-fit mx-auto mb-6">
              <Package className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              No Orders Yet
            </h1>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">View and track your order history</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-semibold">Order #{order.display_id || order.id}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(order.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="text-sm font-medium">
                        <PriceDisplay price={order.total} fromCurrency={order.currency_code} />
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getPaymentStatusBadge(order.payment_status)}
                        {getFulfillmentStatusBadge(order.fulfillment_status)}
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                    <Link href={`/order/confirmed/${order.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>

                {/* Order Items Preview */}
                {order.items && order.items.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </span>
                      <span>•</span>
                      <span>
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} total quantity
                      </span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="text-sm text-foreground break-words">
                          {item.title}
                          {item.quantity > 1 && <span className="text-muted-foreground"> × {item.quantity}</span>}
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-sm text-muted-foreground">
                          +{order.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {pagination.count > pagination.limit && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.offset === 0}
              onClick={() => setPagination(prev => ({
                ...prev,
                offset: Math.max(0, prev.offset - prev.limit)
              }))}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-4">
              Showing {pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.count)} of {pagination.count}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.offset + pagination.limit >= pagination.count}
              onClick={() => setPagination(prev => ({
                ...prev,
                offset: prev.offset + prev.limit
              }))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
