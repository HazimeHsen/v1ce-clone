'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/loader';

export default function TwoStepPaymentDemoPage() {
  const [formData, setFormData] = useState({
    amount: '10', // Test environment requires 10 AMD
    orderID: '3890001', // Test environment range: 3890001-3891000
    description: 'Two-Step Test Payment',
    currency: '051', // AMD by default
    backURL: '',
    opaque: '',
    cardHolderID: '',
    timeout: 1200
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [paymentID, setPaymentID] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [confirmError, setConfirmError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setPaymentID('');
    setConfirmResult(null);
    setConfirmError(null);

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
        setPaymentID(data.paymentID);
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

  const handleConfirmPayment = async () => {
    if (!paymentID) {
      setConfirmError('No Payment ID available. Please initialize a payment first.');
      return;
    }

    setConfirmLoading(true);
    setConfirmError(null);
    setConfirmResult(null);

    try {
      const response = await fetch('/api/ameriabank/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentID: paymentID,
          amount: formData.amount
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConfirmResult(data);
      } else {
        setConfirmError(data.error || 'Payment confirmation failed');
      }
    } catch (err) {
      setConfirmError('Network error: ' + err.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>AmeriaBank Two-Step Payment Demo</CardTitle>
          <CardDescription>
            Test two-step payment flow: Initialize → Pay → Confirm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Step 1: Initialize Payment */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 1: Initialize Payment (Preauthorize)</h3>
              <form onSubmit={handleInitPayment} className="space-y-4">
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
                    placeholder="Two-Step Test Payment"
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
                    'Step 1: Initialize Payment'
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
                      <p className="text-sm text-blue-600">
                        Amount is now preauthorized (blocked) on the card. Complete the payment on the AmeriaBank page, then return here to confirm.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Step 2: Confirm Payment */}
            {paymentID && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Step 2: Confirm Payment (Withdraw Amount)</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-sm text-blue-700">
                    <strong>Payment ID:</strong> {paymentID}<br/>
                    <strong>Amount to Confirm:</strong> {formData.amount} AMD<br/>
                    <strong>Status:</strong> Ready for confirmation
                  </p>
                </div>

                <Button 
                  onClick={handleConfirmPayment}
                  className="w-full" 
                  disabled={confirmLoading}
                >
                  {confirmLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Confirming Payment...
                    </>
                  ) : (
                    'Step 2: Confirm Payment'
                  )}
                </Button>

                {confirmError && (
                  <Alert className="mt-4" variant="destructive">
                    <AlertDescription>{confirmError}</AlertDescription>
                  </Alert>
                )}

                {confirmResult && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      <div className="space-y-2">
                        <p><strong>Payment Confirmed Successfully!</strong></p>
                        <p><strong>Payment ID:</strong> {confirmResult.paymentID}</p>
                        <p><strong>Confirmed Amount:</strong> {confirmResult.confirmAmount} AMD</p>
                        <p><strong>Response Code:</strong> {confirmResult.responseCode}</p>
                        <p><strong>Message:</strong> {confirmResult.responseMessage}</p>
                        <p className="text-sm text-green-600">
                          Two-step payment completed! Amount has been withdrawn from the card.
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Information Boxes */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-800">Two-Step Payment Process:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>Step 1:</strong> Initialize payment - Amount gets blocked/preauthorized</li>
                <li>• <strong>Payment:</strong> Complete payment on AmeriaBank page</li>
                <li>• <strong>Step 2:</strong> Confirm payment - Amount gets withdrawn from account</li>
                <li>• <strong>Note:</strong> Two-step payments require additional authority from AmeriaBank</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-800">Test Environment Requirements:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>OrderID:</strong> Must be in range 3890001-3891000</li>
                <li>• <strong>Amount:</strong> Must be exactly 10 AMD</li>
                <li>• <strong>Testing Goal:</strong> At least 5 successful two-step payments</li>
                <li>• <strong>Authority:</strong> Contact AmeriaBank for two-step payment permissions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
