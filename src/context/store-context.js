"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Medusa from "@medusajs/medusa-js";

const StoreContext = createContext();

const medusa = new Medusa({
  baseUrl: "http://localhost:9000",
  maxRetries: 3,
  publishableApiKey:
    "pk_7a8eb333fbe02975ba20a652877ddbb432d53a4131c8c2a05348933cf7333c03",
});

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const fetchProducts = async () => {
    try {
      const res = await medusa.products.list();
      setProducts(res.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchProduct = async (id) => {
    try {
      const res = await medusa.products.list({ handle: id });
      return res.products?.[0] || null;
    } catch (err) {
      console.error("Failed to fetch product:", err);
      return null;
    }
  };

  return (
    <StoreContext.Provider value={{ products, fetchProducts, fetchProduct }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
