/**
 * Utility functions for order management and processing
 */

/**
 * Format price according to currency
 * @param {number} price - Price in cents
 * @param {string} currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currencyCode = 'USD') => {
  if (typeof price !== 'number') return '0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(price / 100); // Medusa stores prices in cents
};

/**
 * Format date for order display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatOrderDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get payment status configuration
 * @param {string} status - Payment status
 * @returns {object} Status configuration with label and color
 */
export const getPaymentStatusConfig = (status) => {
  const statusConfig = {
    captured: { label: 'Paid', color: 'bg-green-100 text-green-800', variant: 'default' },
    authorized: { label: 'Authorized', color: 'bg-blue-100 text-blue-800', variant: 'secondary' },
    awaiting: { label: 'Awaiting Payment', color: 'bg-yellow-100 text-yellow-800', variant: 'outline' },
    canceled: { label: 'Canceled', color: 'bg-red-100 text-red-800', variant: 'destructive' },
    not_paid: { label: 'Not Paid', color: 'bg-gray-100 text-gray-800', variant: 'outline' },
    refunded: { label: 'Refunded', color: 'bg-purple-100 text-purple-800', variant: 'outline' },
    partially_refunded: { label: 'Partially Refunded', color: 'bg-purple-100 text-purple-800', variant: 'outline' },
    requires_action: { label: 'Requires Action', color: 'bg-orange-100 text-orange-800', variant: 'outline' },
  };
  
  return statusConfig[status] || statusConfig.not_paid;
};

/**
 * Get fulfillment status configuration
 * @param {string} status - Fulfillment status
 * @returns {object} Status configuration with label and color
 */
export const getFulfillmentStatusConfig = (status) => {
  const statusConfig = {
    fulfilled: { label: 'Fulfilled', color: 'bg-green-100 text-green-800' },
    shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
    partially_delivered: { label: 'Partially Delivered', color: 'bg-blue-100 text-blue-800' },
    not_fulfilled: { label: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
    partially_fulfilled: { label: 'Partially Fulfilled', color: 'bg-yellow-100 text-yellow-800' },
    canceled: { label: 'Canceled', color: 'bg-red-100 text-red-800' },
    partially_shipped: { label: 'Partially Shipped', color: 'bg-blue-100 text-blue-800' },
  };
  
  return statusConfig[status] || statusConfig.not_fulfilled;
};

/**
 * Calculate order totals from order object
 * @param {object} order - Medusa order object
 * @returns {object} Calculated totals
 */
export const calculateOrderTotals = (order) => {
  if (!order) return {};

  return {
    subtotal: order.subtotal || 0,
    shipping: order.shipping_total || 0,
    tax: order.tax_total || 0,
    discount: order.discount_total || 0,
    giftCard: order.gift_card_total || 0,
    total: order.total || 0,
    itemCount: order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
  };
};

/**
 * Get order summary text
 * @param {object} order - Medusa order object
 * @returns {string} Order summary text
 */
export const getOrderSummary = (order) => {
  if (!order?.items) return 'No items';
  
  const itemCount = order.items.length;
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  if (itemCount === 1) {
    return `${totalQuantity} item`;
  }
  
  return `${itemCount} items (${totalQuantity} total)`;
};

/**
 * Check if order can be canceled
 * @param {object} order - Medusa order object
 * @returns {boolean} Whether order can be canceled
 */
export const canCancelOrder = (order) => {
  if (!order) return false;
  
  // Order can be canceled if payment is not captured and fulfillment hasn't started
  const paymentNotCaptured = ['not_paid', 'awaiting', 'authorized'].includes(order.payment_status);
  const notFulfilled = ['not_fulfilled'].includes(order.fulfillment_status);
  
  return paymentNotCaptured && notFulfilled;
};

/**
 * Check if order can be returned/refunded
 * @param {object} order - Medusa order object
 * @returns {boolean} Whether order can be returned
 */
export const canReturnOrder = (order) => {
  if (!order) return false;
  
  // Order can be returned if payment is captured and order is delivered
  const paymentCaptured = ['captured'].includes(order.payment_status);
  const delivered = ['delivered', 'fulfilled'].includes(order.fulfillment_status);
  
  return paymentCaptured && delivered;
};

/**
 * Get order status priority for sorting
 * @param {object} order - Medusa order object
 * @returns {number} Priority number (lower = higher priority)
 */
export const getOrderStatusPriority = (order) => {
  if (!order) return 999;
  
  // Priority based on urgency of attention needed
  const priorities = {
    'requires_action': 1,
    'awaiting': 2,
    'authorized': 3,
    'not_fulfilled': 4,
    'partially_fulfilled': 5,
    'shipped': 6,
    'delivered': 7,
    'fulfilled': 8,
    'canceled': 9,
    'refunded': 10,
  };
  
  const paymentPriority = priorities[order.payment_status] || 50;
  const fulfillmentPriority = priorities[order.fulfillment_status] || 50;
  
  return Math.min(paymentPriority, fulfillmentPriority);
};

/**
 * Validate order data structure
 * @param {object} order - Order object to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validateOrder = (order) => {
  const errors = [];
  
  if (!order) {
    return { isValid: false, errors: ['Order object is required'] };
  }
  
  if (!order.id) errors.push('Order ID is required');
  if (!order.currency_code) errors.push('Currency code is required');
  if (typeof order.total !== 'number') errors.push('Order total must be a number');
  if (!Array.isArray(order.items)) errors.push('Order items must be an array');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
