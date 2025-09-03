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
  const [region, setRegion] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productCache, setProductCache] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log(products);

  // Fetch all available regions from Medusa
  const fetchRegions = async () => {
    try {
      const res = await medusa.regions.list();
      return res.regions || [];
    } catch (err) {
      console.error("Failed to fetch regions:", err);
      return [];
    }
  };

  // Detect user location (basic version with navigator.language)
  const detectUserRegion = async () => {
    const regions = await fetchRegions();

    // Example: Get user country from browser (you can also use IP-based services)
    const userLocale = navigator.language || "en-US";
    const userCountry = userLocale.split("-")[1]?.toUpperCase();

    // Find a region that includes this country
    const matchedRegion = regions.find((r) =>
      r.countries.some((c) => c.iso_2.toUpperCase() === userCountry)
    );

    if (matchedRegion) {
      setRegion(matchedRegion);
    } else {
      // fallback to default region
      setRegion(regions[0]);
    }
  };

  const fetchProducts = async () => {
    try {
      if (!region) return; // wait for region detection
      const res = await medusa.products.list({
        region_id: region.id,
      });
      setProducts(res.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchProduct = async (handle) => {
    try {
      if (!region || !handle) return null;

      // Check cache first
      const cacheKey = `${region.id}-${handle}`;
      if (productCache[cacheKey]) {
        return productCache[cacheKey];
      }

      const res = await medusa.products.list({
        handle: handle,
        region_id: region.id,
      });

      const product = res.products?.[0] || null;

      // Cache the result
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
  };

  const createCart = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getCart = async (cartId) => {
    try {
      const res = await medusa.carts.retrieve(cartId);
      setCart(res.cart);
      return res.cart;
    } catch (err) {
      console.error("Failed to get cart:", err);
      // If cart doesn't exist, create a new one
      return await createCart();
    }
  };

  const addToCart = async (variantId, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);

      if (!variantId || quantity < 1) {
        throw new Error("Invalid variant or quantity");
      }

      let currentCart = cart;

      // Get or create cart
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
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      setLoading(true);
      setError(null);

      if (!cart || !lineItemId) {
        throw new Error("No cart or invalid line item");
      }

      const res = await medusa.carts.lineItems.delete(cart.id, lineItemId);
      setCart(res.cart);
      return res.cart;
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      setError("Failed to remove item from cart");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (lineItemId, quantity) => {
    try {
      setLoading(true);
      setError(null);

      if (!cart || !lineItemId || quantity < 0) {
        throw new Error("Invalid parameters");
      }

      const res = await medusa.carts.lineItems.update(cart.id, lineItemId, {
        quantity: quantity,
      });

      setCart(res.cart);
      return res.cart;
    } catch (err) {
      console.error("Failed to update cart item:", err);
      setError("Failed to update cart item");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    detectUserRegion();
  }, []);

  useEffect(() => {
    if (region) {
      fetchProducts();

      // Try to restore cart from localStorage
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
