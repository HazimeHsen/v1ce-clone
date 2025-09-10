'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/loader';

export default function PaymentDemoPage() {
  const [formData, setFormData] = useState({
    amount: '10', // Test environment requires 10 AMD
    orderID: '3890001', // Test environment range: 3890001-3891000
    description: 'Test Payment',
    currency: '051', // AMD by default
    backURL: '',
    opaque: '',
    cardHolderID: '',
    timeout: 1200
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ameriabank/init-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
        // Redirect to payment page
        if (data.paymentURL) {
          window.open(data.paymentURL, '_blank');
        }
      } else {
        setError(data.error || 'Payment initialization failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>AmeriaBank Payment Demo</CardTitle>
          <CardDescription>
            Initialize a payment using AmeriaBank vPOS 3.1 API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="10.00"
                  required
                />
                <p className="text-sm text-blue-600 mt-1">
                  Test environment requires exactly 10 AMD
                </p>
              </div>
              
              <div>
                <Label htmlFor="orderID">Order ID *</Label>
                <Input
                  id="orderID"
                  name="orderID"
                  type="number"
                  value={formData.orderID}
                  onChange={handleInputChange}
                  placeholder="3890001"
                  min="3890001"
                  max="3891000"
                  required
                />
                <p className="text-sm text-blue-600 mt-1">
                  Test range: 3890001-3891000
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Payment for order #12345"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="051">AMD - Armenian Dram</option>
                  <option value="978">EUR - Euro</option>
                  <option value="840">USD - US Dollar</option>
                  <option value="643">RUB - Russian Ruble</option>
                </select>
              </div>

              <div>
                <Label htmlFor="timeout">Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  name="timeout"
                  type="number"
                  value={formData.timeout}
                  onChange={handleInputChange}
                  placeholder="1200"
                  min="1"
                  max="1200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="backURL">Back URL</Label>
              <Input
                id="backURL"
                name="backURL"
                value={formData.backURL}
                onChange={handleInputChange}
                placeholder="https://yoursite.com/payment/callback"
              />
            </div>

            <div>
              <Label htmlFor="opaque">Opaque (Additional Data)</Label>
              <Input
                id="opaque"
                name="opaque"
                value={formData.opaque}
                onChange={handleInputChange}
                placeholder="Additional data to pass back"
              />
            </div>

            <div>
              <Label htmlFor="cardHolderID">Card Holder ID (for binding)</Label>
              <Input
                id="cardHolderID"
                name="cardHolderID"
                value={formData.cardHolderID}
                onChange={handleInputChange}
                placeholder="Unique card holder identifier"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Initializing Payment...
                </>
              ) : (
                'Initialize Payment'
              )}
            </Button>
          </form>

          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="mt-4">
              <AlertDescription>
                <div className="space-y-2">
                  <p><strong>Payment Initialized Successfully!</strong></p>
                  <p><strong>Payment ID:</strong> {result.paymentID}</p>
                  <p><strong>Response Code:</strong> {result.responseCode}</p>
                  <p><strong>Message:</strong> {result.responseMessage}</p>
                  {result.paymentURL && (
                    <div className="mt-2">
                      <Button 
                        onClick={() => window.open(result.paymentURL, '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        Open Payment Page
                      </Button>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-yellow-800">Test Environment Requirements:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>OrderID:</strong> Must be in range 3890001-3891000</li>
              <li>• <strong>Amount:</strong> Must be exactly 10 AMD</li>
              <li>• <strong>Testing Goal:</strong> At least 5 successful payments, refunds, and cancellations</li>
              <li>• <strong>Two-step payments:</strong> Require additional authority from AmeriaBank</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-red-800">Important Two-Step Payment Notes:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• <strong>Cancel Payment:</strong> Must be sent TWICE for "Deposited" status</li>
              <li>• <strong>First Cancel:</strong> Changes status from "Deposited" to "Approved"</li>
              <li>• <strong>Second Cancel:</strong> Changes status to "Void"</li>
              <li>• <strong>Warning:</strong> If second cancel is not sent, money returns after 30 days</li>
              <li>• <strong>Refund vs Cancel:</strong> These are different operations - both needed for testing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
