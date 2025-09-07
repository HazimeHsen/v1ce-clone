'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/loader';

export default function CancelDemoPage() {
  const [formData, setFormData] = useState({
    paymentID: ''
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
      const response = await fetch('/api/ameriabank/cancel-payment', {
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
        setError(data.error || 'Payment cancellation failed');
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
          <CardTitle>AmeriaBank Cancel Payment Demo</CardTitle>
          <CardDescription>
            Cancel a payment using AmeriaBank vPOS 3.1 API
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
                placeholder="Enter the Payment ID to cancel"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This is the PaymentID from the original transaction that you want to cancel
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
                  Cancelling Payment...
                </>
              ) : (
                'Cancel Payment'
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
                  <p><strong>Payment Cancelled Successfully!</strong></p>
                  <p><strong>Payment ID:</strong> {result.paymentID}</p>
                  <p><strong>Response Code:</strong> {result.responseCode}</p>
                  <p><strong>Message:</strong> {result.responseMessage}</p>
                  {result.opaque && (
                    <p><strong>Opaque:</strong> {result.opaque}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-yellow-800">Important Notes:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Payment cancellation is available within 72 hours from payment initialization</li>
              <li>• This function is typically used for two-stage payments to cancel preauthorized amounts</li>
              <li>• Cancellation returns the blocked amount back to the cardholder's account</li>
              <li>• All cancellation attempts are logged to cancel_logs.txt</li>
              <li>• Response code "00" indicates successful cancellation</li>
              <li>• Cancellation cannot be reversed once processed</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-800">Payment Types:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Single-stage:</strong> Amount immediately withdrawn from buyer's account</li>
              <li>• <strong>Two-stage:</strong> Amount first blocked, then withdrawn (requires confirmation)</li>
              <li>• Cancel is mainly used for two-stage payments to release blocked amounts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
