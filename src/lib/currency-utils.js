// Utility functions for currency conversion and formatting

/**
 * Convert a price from one currency to another using exchange rates
 * @param {number} price - The price to convert
 * @param {string} fromCurrency - Source currency code (e.g., 'USD')
 * @param {string} toCurrency - Target currency code (e.g., 'EUR')
 * @param {Object} exchangeRates - Object containing exchange rates
 * @returns {number} - Converted price
 */
export const convertPrice = (price, fromCurrency, toCurrency, exchangeRates = {}) => {
  if (!price || typeof price !== "number") return 0;
  if (fromCurrency === toCurrency) return price;
  
  // If we have exchange rates, use them
  if (exchangeRates[toCurrency]) {
    return price * exchangeRates[toCurrency];
  }
  
  // Fallback: return original price if no exchange rate available
  return price;
};

/**
 * Format a price with currency symbol and proper formatting
 * @param {number} price - The price to format
 * @param {string} currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currencyCode = 'USD', options = {}) => {
  if (typeof price !== "number") return "0.00";
  
  const defaultOptions = {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  return new Intl.NumberFormat('en-US', formatOptions).format(price);
};

/**
 * Get currency symbol for a given currency code
 * @param {string} currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'CHF',
    'CNY': '¥',
    'SEK': 'kr',
    'NZD': 'NZ$',
    'MXN': '$',
    'SGD': 'S$',
    'HKD': 'HK$',
    'NOK': 'kr',
    'TRY': '₺',
    'RUB': '₽',
    'INR': '₹',
    'BRL': 'R$',
    'ZAR': 'R',
    'KRW': '₩',
    'DKK': 'kr',
    'PLN': 'zł',
    'TWD': 'NT$',
    'THB': '฿',
    'MYR': 'RM',
    'PHP': '₱',
    'CZK': 'Kč',
    'HUF': 'Ft',
    'ILS': '₪',
    'CLP': '$',
    'PKR': '₨',
    'BGN': 'лв',
    'RON': 'lei',
    'HRK': 'kn',
    'ISK': 'kr',
    'UAH': '₴',
    'AED': 'د.إ',
    'SAR': '﷼',
    'QAR': '﷼',
    'KWD': 'د.ك',
    'BHD': 'د.ب',
    'OMR': '﷼',
    'JOD': 'د.ا',
    'LBP': 'ل.ل',
    'EGP': '£',
    'MAD': 'د.م.',
    'TND': 'د.ت',
    'DZD': 'د.ج',
    'LYD': 'ل.د',
    'ETB': 'Br',
    'KES': 'KSh',
    'UGX': 'USh',
    'TZS': 'TSh',
    'NGN': '₦',
    'GHS': '₵',
    'XOF': 'CFA',
    'XAF': 'FCFA',
    'ARS': '$',
    'UYU': '$U',
    'BOB': 'Bs',
    'PEN': 'S/',
    'COP': '$',
    'VES': 'Bs.S',
    'GTQ': 'Q',
    'HNL': 'L',
    'NIO': 'C$',
    'CRC': '₡',
    'PAB': 'B/.',
    'DOP': 'RD$',
    'JMD': 'J$',
    'TTD': 'TT$',
    'BBD': 'Bds$',
    'BZD': 'BZ$',
    'XCD': 'EC$',
    'AWG': 'ƒ',
    'ANG': 'ƒ',
    'SRD': '$',
    'GYD': 'G$',
    'BWP': 'P',
    'SZL': 'E',
    'LSL': 'L',
    'NAD': 'N$',
    'ZMW': 'ZK',
    'MWK': 'MK',
    'MZN': 'MT',
    'AOA': 'Kz',
    'MGA': 'Ar',
    'MUR': '₨',
    'SCR': '₨',
    'KMF': 'CF',
    'DJF': 'Fdj',
    'SOS': 'S',
    'ERN': 'Nfk',
    'SSP': '£',
    'CDF': 'FC',
    'RWF': 'RF',
    'BIF': 'FBu',
    'CVE': '$',
    'STN': 'Db',
    'GMD': 'D',
    'GNF': 'FG',
    'SLL': 'Le',
    'LRD': 'L$',
    'GIP': '£',
    'FKP': '£',
    'SHP': '£',
    'AMD': '֏',
    'AZN': '₼',
    'GEL': '₾',
    'KZT': '₸',
    'KGS': 'с',
    'TJS': 'SM',
    'TMT': 'T',
    'UZS': 'лв',
    'MNT': '₮',
    'AFN': '؋',
    'BDT': '৳',
    'BTN': 'Nu.',
    'NPR': '₨',
    'LKR': '₨',
    'MVR': 'Rf',
    'IDR': 'Rp',
    'VND': '₫',
    'LAK': '₭',
    'KHR': '៛',
    'MMK': 'K',
    'BND': 'B$',
    'FJD': 'FJ$',
    'PGK': 'K',
    'SBD': 'SI$',
    'VUV': 'Vt',
    'WST': 'WS$',
    'TOP': 'T$',
    'XPF': '₣'
  };
  
  return symbols[currencyCode] || currencyCode;
};

/**
 * Validate if a currency code is supported
 * @param {string} currencyCode - Currency code to validate
 * @returns {boolean} - Whether the currency is supported
 */
export const isSupportedCurrency = (currencyCode) => {
  const supportedCurrencies = [
    'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'CNH', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JOD', 'JPY', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 'STD', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TWD', 'TZS', 'AED', 'BOB', 'ERN', 'JMD', 'KES', 'MDL', 'QAR', 'TTD', 'UAH', 'UGX', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XCD', 'XCG', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'ZMW', 'ZWL'
  ];
  
  return supportedCurrencies.includes(currencyCode);
};
