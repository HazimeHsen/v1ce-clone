/**
 * Utility functions for calculating delivery dates
 */

/**
 * Check if a date is a weekend (Saturday or Sunday)
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is a weekend
 */
const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

/**
 * Get the next business day (Monday-Friday)
 * @param {Date} date - The starting date
 * @returns {Date} The next business day
 */
const getNextBusinessDay = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  
  while (isWeekend(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
};

/**
 * Add business days to a date (excluding weekends)
 * @param {Date} startDate - The starting date
 * @param {number} businessDays - Number of business days to add
 * @returns {Date} The resulting date
 */
const addBusinessDays = (startDate, businessDays) => {
  let result = new Date(startDate);
  let daysAdded = 0;
  
  while (daysAdded < businessDays) {
    result = getNextBusinessDay(result);
    daysAdded++;
  }
  
  return result;
};

/**
 * Calculate delivery date range based on processing time
 * @param {number} minProcessingDays - Minimum processing days (default: 1)
 * @param {number} maxProcessingDays - Maximum processing days (default: 3)
 * @returns {object} Object containing earliest and latest delivery dates
 */
export const calculateDeliveryDates = (minProcessingDays = 1, maxProcessingDays = 3) => {
  const today = new Date();
  
  // Calculate earliest delivery date (today + min processing days)
  const earliestDelivery = addBusinessDays(today, minProcessingDays);
  
  // Calculate latest delivery date (today + max processing days)
  const latestDelivery = addBusinessDays(today, maxProcessingDays);
  
  return {
    earliest: earliestDelivery,
    latest: latestDelivery
  };
};

/**
 * Format delivery date range for display
 * @param {Date} earliest - Earliest delivery date
 * @param {Date} latest - Latest delivery date
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted date range string (e.g., "Jul 23 - Jul 25")
 */
export const formatDeliveryDateRange = (earliest, latest, locale = 'en-US') => {
  const options = { 
    month: 'short', 
    day: 'numeric' 
  };
  
  const earliestFormatted = earliest.toLocaleDateString(locale, options);
  const latestFormatted = latest.toLocaleDateString(locale, options);
  
  // If both dates are in the same month, show "Jul 23 - 25"
  if (earliest.getMonth() === latest.getMonth() && earliest.getFullYear() === latest.getFullYear()) {
    const earliestDay = earliest.getDate();
    const latestDay = latest.getDate();
    const monthYear = earliest.toLocaleDateString(locale, { month: 'short' });
    return `${monthYear} ${earliestDay} - ${latestDay}`;
  }
  
  // If different months, show "Jul 23 - Aug 2"
  return `${earliestFormatted} - ${latestFormatted}`;
};

/**
 * Get delivery date range as a formatted string
 * @param {number} minProcessingDays - Minimum processing days (default: 1)
 * @param {number} maxProcessingDays - Maximum processing days (default: 3)
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted delivery date range
 */
export const getDeliveryDateRange = (minProcessingDays = 1, maxProcessingDays = 3, locale = 'en-US') => {
  const { earliest, latest } = calculateDeliveryDates(minProcessingDays, maxProcessingDays);
  return formatDeliveryDateRange(earliest, latest, locale);
};

/**
 * Check if today is a business day
 * @returns {boolean} True if today is a business day (Monday-Friday)
 */
export const isTodayBusinessDay = () => {
  return !isWeekend(new Date());
};

/**
 * Get the next business day from today
 * @returns {Date} The next business day
 */
export const getNextBusinessDayFromToday = () => {
  return getNextBusinessDay(new Date());
};
