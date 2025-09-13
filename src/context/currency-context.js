"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CURRENCIES, getCurrencyByCountry, getCurrencyByCode } from "@/constants/currencies";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(false);

  const fetchExchangeRates = async (targetCurrency) => {
    try {
      setRatesLoading(true);
      const response = await fetch(`/api/exchange-rates/${targetCurrency}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.status}`);
      }
      
      const data = await response.json();
      
      const ratesMap = {};
      if (data.success && data.exchange_rates && Array.isArray(data.exchange_rates)) {
        data.exchange_rates.forEach(rate => {
          ratesMap[rate.target_currency] = rate.rate;
        });
      }

      setExchangeRates(ratesMap);
      return ratesMap;
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
      return {};
    } finally {
      setRatesLoading(false);
    }
  };

  const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
    try {
      const response = await fetch(`/api/exchange-rates/${targetCurrency}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rate: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.exchange_rates && data.exchange_rates.length > 0) {
        const rate = data.exchange_rates[0];
        setExchangeRates(prev => ({
          ...prev,
          [rate.target_currency]: rate.rate
        }));
        return rate.rate;
      }
      return null;
    } catch (error) {
      console.error(`Failed to fetch rate for ${targetCurrency}:`, error);
      return null;
    }
  };

  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (!price || typeof price !== "number") return 0;
    if (fromCurrency === toCurrency) return price;
    
    if (exchangeRates[toCurrency]) {
      const convertedPrice = price * exchangeRates[toCurrency];
      return convertedPrice;
    }
    
    return price;
  };

  const detectUserCurrency = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      let detectedCurrency = CURRENCIES[0];
      
      if (data.country_code) {
        const currencyCode = getCurrencyByCountry(data.country_code);
        detectedCurrency = getCurrencyByCode(currencyCode);
      } else {
        const userLocale = navigator.language || "en-US";
        const countryCode = userLocale.split("-")[1]?.toUpperCase();
        if (countryCode) {
          const currencyCode = getCurrencyByCountry(countryCode);
          detectedCurrency = getCurrencyByCode(currencyCode);
        }
      }
      
      setSelectedCurrency(detectedCurrency);
      
      if (detectedCurrency.code !== 'USD') {
        await fetchExchangeRate('USD', detectedCurrency.code);
      }
      
    } catch (error) {
      console.error("Failed to detect user currency:", error);
      setSelectedCurrency(CURRENCIES[0]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      try {
        const currency = JSON.parse(savedCurrency);
        setSelectedCurrency(currency);
        
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

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
    }
  }, [selectedCurrency, isLoading]);

  const changeCurrency = async (currencyCode) => {
    const currency = getCurrencyByCode(currencyCode);
    if (currency) {
      setSelectedCurrency(currency);
      if (!exchangeRates[currencyCode] && currencyCode !== 'USD') {
        const rate = await fetchExchangeRate('USD', currencyCode);
      } else {
        console.log('Using existing rate for:', currencyCode, exchangeRates[currencyCode]);
      }
    }
  };

  const formatPrice = (price, currency = selectedCurrency, fromCurrency = 'USD') => {
    if (typeof price !== "number") return "0.00";
    
    const convertedPrice = convertPrice(price, fromCurrency, currency.code);
    
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

