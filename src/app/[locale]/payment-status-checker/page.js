'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/loader';

export default function PaymentStatusCheckerPage() {
  const [paymentID, setPaymentID] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!paymentID.trim()) {
      setError('Please enter a Payment ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ameriabank/get-payment-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentID }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to get payment details');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStateDescription = (paymentState, orderStatus) => {
    const stateMap = {
      '0': 'payment_started - Order is registered but not paid',
      '1': 'payment_approved - Amount of the order was preauthorized',
      '2': 'payment_deposited - Amount successfully authorized',
      '3': 'payment_void - Authorization cancelled',
      '4': 'payment_refunded - Amount of the transaction was refunded',
      '5': 'payment_autoauthorized - Authorization via ACS of the issuer bank',
      '6': 'payment_declined - Authorization declined'
    };
    
    return stateMap[paymentState] || `Unknown state: ${paymentState}`;
  };

  const getAvailableOperations = (paymentState) => {
    switch (paymentState) {
      case '0': // payment_started
        return ['Cancel'];
      case '1': // payment_approved
        return ['Cancel', 'Confirm (for two-step)'];
      case '2': // payment_deposited
        return ['Refund', 'Cancel (requires 2x for two-step)'];
      case '3': // payment_void
        return ['None - Already cancelled'];
      case '4': // payment_refunded
        return ['None - Already refunded'];
      case '5': // payment_autoauthorized
        return ['Cancel', 'Confirm (for two-step)'];
      case '6': // payment_declined
        return ['None - Payment declined'];
      default:
        return ['Unknown state'];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Payment Status Checker</CardTitle>
          <CardDescription>
            Check the current status of a payment and see what operations are available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCheckStatus} className="space-y-4">
            <div>
              <Label htmlFor="paymentID">Payment ID *</Label>
              <Input
                id="paymentID"
                value={paymentID}
                onChange={(e) => setPaymentID(e.target.value)}
                placeholder="Enter the Payment ID to check"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This is the PaymentID returned when the payment was initialized
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
                  Checking Status...
                </>
              ) : (
                'Check Payment Status'
              )}
            </Button>
          </form>

          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <Alert>
                <AlertDescription>
                  <div className="space-y-2">
                    <p><strong>Payment Status Retrieved Successfully!</strong></p>
                    <p><strong>Payment ID:</strong> {result.paymentID}</p>
                    <p><strong>Order ID:</strong> {result.orderID}</p>
                    <p><strong>Amount:</strong> {result.amount} {result.currency}</p>
                    <p><strong>Description:</strong> {result.description}</p>
                  </div>
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Payment State Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Payment State:</strong> {result.paymentState}</p>
                    <p><strong>State Description:</strong> {getPaymentStateDescription(result.paymentState, result.orderStatus)}</p>
                    <p><strong>Order Status:</strong> {result.orderStatus}</p>
                    <p><strong>Response Code:</strong> {result.responseCode}</p>
                    <p><strong>Response Message:</strong> {result.responseMessage}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>You can perform:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      {getAvailableOperations(result.paymentState).map((operation, index) => (
                        <li key={index} className="text-sm">{operation}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {result.approvedAmount && (
                <Card>
                  <CardHeader>
                    <CardTitle>Amount Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Original Amount:</strong> {result.amount}</p>
                      <p><strong>Approved Amount:</strong> {result.approvedAmount}</p>
                      <p><strong>Deposited Amount:</strong> {result.depositedAmount || 'N/A'}</p>
                      <p><strong>Refunded Amount:</strong> {result.refundedAmount || '0'}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.cardNumber && (
                <Card>
                  <CardHeader>
                    <CardTitle>Card Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Card Number:</strong> {result.cardNumber}</p>
                      <p><strong>Card Holder:</strong> {result.cardHolderName || 'N/A'}</p>
                      <p><strong>Auth Code:</strong> {result.authCode || 'N/A'}</p>
                      <p><strong>RRN:</strong> {result.rrn || 'N/A'}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-800">Payment State Guide:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>State 0:</strong> Payment started - Can cancel</li>
              <li>• <strong>State 1:</strong> Payment approved - Can cancel or confirm (two-step)</li>
              <li>• <strong>State 2:</strong> Payment deposited - Can refund or cancel (2x for two-step)</li>
              <li>• <strong>State 3:</strong> Payment void - Already cancelled</li>
              <li>• <strong>State 4:</strong> Payment refunded - Already refunded</li>
              <li>• <strong>State 5:</strong> Payment auto-authorized - Can cancel or confirm (two-step)</li>
              <li>• <strong>State 6:</strong> Payment declined - No operations available</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
