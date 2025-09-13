"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CURRENCIES, getCurrencyByCountry, getCurrencyByCode } from "@/constants/currencies";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]); // Default to USD
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(false);

  // Fetch exchange rates from Medusa backend
  const fetchExchangeRates = async (targetCurrency) => {
    try {
      setRatesLoading(true);
      const response = await fetch(`/api/exchange-rates/${targetCurrency}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Convert array to object for easier lookup
      const ratesMap = {};
      if (data.success && data.exchange_rates && Array.isArray(data.exchange_rates)) {
        data.exchange_rates.forEach(rate => {
          ratesMap[rate.target_currency] = rate.rate;
        });
      }
      console.log(ratesMap);
      
      setExchangeRates(ratesMap);
      return ratesMap;
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
      return {};
    } finally {
      setRatesLoading(false);
    }
  };

  // Fetch exchange rate for a specific currency pair
  const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
    try {
      console.log(`Fetching exchange rate: ${baseCurrency} -> ${targetCurrency}`);
      const response = await fetch(`/api/exchange-rates/${targetCurrency}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rate: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Exchange rate response:', data);
      
      if (data.success && data.exchange_rates && data.exchange_rates.length > 0) {
        const rate = data.exchange_rates[0];
        console.log('Setting exchange rate:', rate.target_currency, rate.rate);
        setExchangeRates(prev => ({
          ...prev,
          [rate.target_currency]: rate.rate
        }));
        return rate.rate;
      }
      console.log('No exchange rate found in response');
      return null;
    } catch (error) {
      console.error(`Failed to fetch rate for ${targetCurrency}:`, error);
      return null;
    }
  };

  // Convert price using exchange rates
  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (!price || typeof price !== "number") return 0;
    if (fromCurrency === toCurrency) return price;
    
    console.log('Converting price:', { price, fromCurrency, toCurrency, exchangeRates });
    
    // If we have exchange rates, use them
    if (exchangeRates[toCurrency]) {
      const convertedPrice = price * exchangeRates[toCurrency];
      console.log('Converted price:', convertedPrice);
      return convertedPrice;
    }
    
    console.log('No exchange rate found for', toCurrency, 'falling back to original price');
    // Fallback: return original price if no exchange rate available
    return price;
  };

  // Detect user's currency based on geolocation
  const detectUserCurrency = async () => {
    try {
      setIsLoading(true);
      
      // Try to get user's country from geolocation API
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      let detectedCurrency = CURRENCIES[0]; // Default to USD
      
      if (data.country_code) {
        const currencyCode = getCurrencyByCountry(data.country_code);
        detectedCurrency = getCurrencyByCode(currencyCode);
      } else {
        // Fallback to browser locale
        const userLocale = navigator.language || "en-US";
        const countryCode = userLocale.split("-")[1]?.toUpperCase();
        if (countryCode) {
          const currencyCode = getCurrencyByCountry(countryCode);
          detectedCurrency = getCurrencyByCode(currencyCode);
        }
      }
      
      setSelectedCurrency(detectedCurrency);
      
      // Fetch exchange rate for detected currency if it's not USD
      if (detectedCurrency.code !== 'USD') {
        await fetchExchangeRate('USD', detectedCurrency.code);
      }
      
    } catch (error) {
      console.error("Failed to detect user currency:", error);
      // Fallback to USD
      setSelectedCurrency(CURRENCIES[0]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      try {
        const currency = JSON.parse(savedCurrency);
        setSelectedCurrency(currency);
        
        // Fetch exchange rate for saved currency if it's not USD
        if (currency.code !== 'USD') {
          fetchExchangeRate('USD', currency.code);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to parse saved currency:", error);
        detectUserCurrency();
      }
    } else {
      detectUserCurrency();
    }
  }, []);

  // Save currency to localStorage when it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
    }
  }, [selectedCurrency, isLoading]);

  const changeCurrency = async (currencyCode) => {
    console.log('Changing currency to:', currencyCode);
    const currency = getCurrencyByCode(currencyCode);
    if (currency) {
      setSelectedCurrency(currency);
      // Fetch exchange rate for the new currency if not already loaded
      if (!exchangeRates[currencyCode] && currencyCode !== 'USD') {
        console.log('Fetching exchange rate for:', currencyCode);
        const rate = await fetchExchangeRate('USD', currencyCode);
        console.log('Fetched rate:', rate);
      } else {
        console.log('Using existing rate for:', currencyCode, exchangeRates[currencyCode]);
      }
    }
  };

  const formatPrice = (price, currency = selectedCurrency, fromCurrency = 'USD') => {
    if (typeof price !== "number") return "0.00";
    
    console.log('Formatting price:', { price, currency: currency.code, fromCurrency, exchangeRates });
    
    // Convert price using exchange rates if needed
    const convertedPrice = convertPrice(price, fromCurrency, currency.code);
    
    console.log('Final formatted price:', convertedPrice);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  const value = {
    selectedCurrency,
    changeCurrency,
    formatPrice,
    convertPrice,
    fetchExchangeRates,
    fetchExchangeRate,
    exchangeRates,
    ratesLoading,
    isLoading,
    currencies: CURRENCIES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

