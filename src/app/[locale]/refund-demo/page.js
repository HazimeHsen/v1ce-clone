'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/loader';

export default function RefundDemoPage() {
  const [formData, setFormData] = useState({
    paymentID: '',
    amount: ''
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
      const response = await fetch('/api/ameriabank/refund-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Refund failed');
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
          <CardTitle>AmeriaBank Refund Demo</CardTitle>
          <CardDescription>
            Process a refund for an existing payment using AmeriaBank vPOS 3.1 API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="paymentID">Payment ID *</Label>
              <Input
                id="paymentID"
                name="paymentID"
                value={formData.paymentID}
                onChange={handleInputChange}
                placeholder="Enter the Payment ID from the original transaction"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This is the PaymentID returned when the original payment was initialized
              </p>
            </div>

            <div>
              <Label htmlFor="amount">Refund Amount *</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="100.00"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Amount to be refunded. Cannot exceed the original transaction amount.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Processing Refund...
                </>
              ) : (
                'Process Refund'
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
                  <p><strong>Refund Processed Successfully!</strong></p>
                  <p><strong>Payment ID:</strong> {result.paymentID}</p>
                  <p><strong>Refund Amount:</strong> {result.refundAmount}</p>
                  <p><strong>Response Code:</strong> {result.responseCode}</p>
                  <p><strong>Message:</strong> {result.responseMessage}</p>
                  {result.opaque && (
                    <p><strong>Opaque:</strong> {result.opaque}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Important Notes:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Refunds can only be processed for successful payments</li>
              <li>• The refund amount cannot exceed the original transaction amount</li>
              <li>• Refunds are processed immediately and cannot be reversed</li>
              <li>• All refund transactions are logged to refund_logs.txt</li>
              <li>• Response code "00" indicates successful refund</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
