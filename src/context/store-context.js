"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  const [region, setRegion] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productCache, setProductCache] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const calculateCartTotals = (cartItems, existingCart = cart) => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.unit_price || 0) * item.quantity;
    }, 0);

    const tax_total = existingCart?.tax_total || 0;
    const shipping_total = existingCart?.shipping_total || 0;
    const discount_total = existingCart?.discount_total || 0;
    const gift_card_total = existingCart?.gift_card_total || 0;

    const total = subtotal + tax_total + shipping_total - discount_total - gift_card_total;

    return {
      subtotal,
      total,
      tax_total,
      shipping_total,
      discount_total,
      gift_card_total,
    };
  };

  const fetchRegions = async () => {
    try {
      const res = await medusa.regions.list();
      return res.regions || [];
    } catch (err) {
      console.error("Failed to fetch regions:", err);
      return [];
    }
  };

  const detectUserRegion = async () => {
    const regions = await fetchRegions();

    const userLocale = navigator.language || "en-US";
    const userCountry = userLocale.split("-")[1]?.toUpperCase();

    const matchedRegion = regions.find((r) =>
      r.countries.some((c) => c.iso_2.toUpperCase() === userCountry)
    );

    if (matchedRegion) {
      setRegion(matchedRegion);
    } else {
      setRegion(regions[0]);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      if (!region) return;
      const res = await medusa.products.list({
        region_id: region.id,
      });
      setProducts(res.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }, [region]);

  const fetchProduct = useCallback(async (handle) => {
    try {
      if (!region || !handle) return null;

      const cacheKey = `${region.id}-${handle}`;
      if (productCache[cacheKey]) {
        return productCache[cacheKey];
      }

      const res = await medusa.products.list({
        handle: handle,
        region_id: region.id,
      });

      const product = res.products?.[0] || null;

      if (product) {
        setProductCache((prev) => ({
          ...prev,
          [cacheKey]: product,
        }));
      }

      return product;
    } catch (err) {
      console.error("Failed to fetch product:", err);
      return null;
    }
  }, [region]);

  const fetchProductById = useCallback(async (productId) => {
    try {
      if (!region || !productId) return null;

      const cacheKey = `${region.id}-id-${productId}`;
      if (productCache[cacheKey]) {
        return productCache[cacheKey];
      }

      const res = await medusa.products.list({
        id: productId,
        region_id: region.id,
      });

      const product = res.products?.[0] || null;

      if (product) {
        setProductCache((prev) => ({
          ...prev,
          [cacheKey]: product,
        }));
      }

      return product;
    } catch (err) {
      console.error("Failed to fetch product by ID:", err);
      return null;
    }
  }, [region]);

  const fetchCartItemsWithProducts = useCallback(async (cartItems) => {
    if (!cartItems || cartItems.length === 0) return [];

    try {
      const productIds = [...new Set(cartItems.map(item => item.product_id))];
      
      const productPromises = productIds.map(id => fetchProductById(id));
      const products = await Promise.all(productPromises);
      console.log("Products:", products);
      
      const productMap = {};
      products.forEach(product => {
        if (product) {
          productMap[product.id] = product;
        }
      });

      const enrichedItems = cartItems.map(item => ({
        ...item,
        fullProduct: productMap[item.product_id] || null,
      }));

      return enrichedItems;
    } catch (err) {
      console.error("Failed to fetch cart items with products:", err);
      return cartItems;
    }
  }, [fetchProductById]);

  const createCart = async () => {
    try {
      setError(null);

      if (!region) {
        throw new Error("Region not available");
      }

      const res = await medusa.carts.create({
        region_id: region.id,
      });

      setCart(res.cart);
      localStorage.setItem("cart_id", res.cart.id);
      return res.cart;
    } catch (err) {
      console.error("Failed to create cart:", err);
      setError("Failed to create cart");
      throw err;
    }
  };

  const getCart = async (cartId) => {
    try {
      const res = await medusa.carts.retrieve(cartId);
      setCart(res.cart);
      return res.cart;
    } catch (err) {
      console.error("Failed to get cart:", err);
      return await createCart();
    }
  };

  const addToCart = async (variantId, quantity = 1) => {
    try {
      setError(null);

      if (!variantId || quantity < 1) {
        throw new Error("Invalid variant or quantity");
      }

      let currentCart = cart;

      if (!currentCart) {
        const savedCartId = localStorage.getItem("cart_id");
        if (savedCartId) {
          currentCart = await getCart(savedCartId);
        } else {
          currentCart = await createCart();
        }
      }

      const lineItemData = {
        variant_id: variantId,
        quantity: quantity,
      };

      if (region?.sales_channels?.length > 0) {
        lineItemData.sales_channel_id = region.sales_channels[0].id;
      }

      const res = await medusa.carts.lineItems.create(
        currentCart.id,
        lineItemData
      );

      setCart(res.cart);
      setIsCartOpen(true);

      window.dispatchEvent(new CustomEvent("openCartSidebar"));

      return res.cart;
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setError("Failed to add item to cart");
      throw err;
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      setError(null);

      if (!cart || !lineItemId) {
        throw new Error("No cart or invalid line item");
      }

      const updatedItems = cart.items.filter(item => item.id !== lineItemId);
      const calculatedTotals = calculateCartTotals(updatedItems, cart);
      
      const optimisticCart = {
        ...cart,
        items: updatedItems,
        ...calculatedTotals
      };
      setCart(optimisticCart);

      const res = await medusa.carts.lineItems.delete(cart.id, lineItemId);
      return res.cart;
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      setError("Failed to remove item from cart");
      const savedCartId = localStorage.getItem("cart_id");
      if (savedCartId) {
        getCart(savedCartId);
      }
      throw err;
    }
  };

  const updateCartItem = async (lineItemId, quantity) => {
    try {
      setError(null);

      if (!cart || !lineItemId || quantity < 0) {
        throw new Error("Invalid parameters");
      }

      const updatedItems = cart.items.map(item => 
        item.id === lineItemId 
          ? { ...item, quantity: quantity }
          : item
      );
      const calculatedTotals = calculateCartTotals(updatedItems, cart);
      
      const optimisticCart = {
        ...cart,
        items: updatedItems,
        ...calculatedTotals
      };
      setCart(optimisticCart);

      const res = await medusa.carts.lineItems.update(cart.id, lineItemId, {
        quantity: quantity,
      });

      setCart(res.cart);
      return res.cart;
    } catch (err) {
      console.error("Failed to update cart item:", err);
      setError("Failed to update cart item");
      const savedCartId = localStorage.getItem("cart_id");
      if (savedCartId) {
        getCart(savedCartId);
      }
      throw err;
    }
  };

  useEffect(() => {
    detectUserRegion();
  }, []);

  useEffect(() => {
    if (region) {
      fetchProducts();

      const savedCartId = localStorage.getItem("cart_id");
      if (savedCartId) {
        getCart(savedCartId);
      }
    }
  }, [region]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <StoreContext.Provider
      value={{
        products,
        fetchProducts,
        fetchProduct,
        fetchProductById,
        fetchCartItemsWithProducts,
        region,
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartItem,
        createCart,
        getCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
