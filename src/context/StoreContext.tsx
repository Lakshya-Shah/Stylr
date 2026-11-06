'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductSize,
  CartItem,
  Order,
  PromoCampaign,
  StoreContent,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CAMPAIGNS,
  INITIAL_ORDERS,
  INITIAL_STORE_CONTENT
} from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, size: ProductSize, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getProductStock: (productId: string, size: ProductSize) => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeCoupon: PromoCampaign | null;
  couponError: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  moveToCart: (productId: string, size: ProductSize, color: string) => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Quick Add & Size Guide Modals
  quickAddProduct: Product | null;
  setQuickAddProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Products & Store Content (Admin controlled)
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  // Campaigns & Content
  campaigns: PromoCampaign[];
  updateCampaign: (id: string, updates: Partial<PromoCampaign>) => void;
  addCampaign: (campaign: Omit<PromoCampaign, 'id'>) => void;
  storeContent: StoreContent;
  updateStoreContent: (updates: Partial<StoreContent>) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  CART: 'stylr_cart_v1',
  WISHLIST: 'stylr_wishlist_v1',
  PRODUCTS: 'stylr_products_v1',
  ORDERS: 'stylr_orders_v1',
  CAMPAIGNS: 'stylr_campaigns_v1',
  CONTENT: 'stylr_content_v1'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with hydration safety
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [campaigns, setCampaigns] = useState<PromoCampaign[]>(INITIAL_CAMPAIGNS);
  const [storeContent, setStoreContent] = useState<StoreContent>(INITIAL_STORE_CONTENT);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<PromoCampaign | null>(null);
  const [couponError, setCouponError] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
      const loadedProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS;
      setProducts(loadedProducts);

      const storedCart = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      if (storedCart) {
        const rawCart: CartItem[] = JSON.parse(storedCart);
        // Automatically clamp quantities to available stock in loaded products
        const clampedCart = rawCart.map((item) => {
          const prod = loadedProducts.find((p) => p.id === item.productId);
          if (!prod) return item;
          const sizeObj = prod.sizes.find((s) => s.size === item.size);
          const stock = sizeObj && sizeObj.inStock ? sizeObj.stockCount : 0;
          if (stock > 0 && item.quantity > stock) {
            return { ...item, quantity: stock };
          }
          return item;
        });
        setCartItems(clampedCart);
      }

      const storedWishlist = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
      if (storedWishlist) setWishlistIds(JSON.parse(storedWishlist));

      const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedCampaigns = localStorage.getItem(LOCAL_STORAGE_KEYS.CAMPAIGNS);
      if (storedCampaigns) setCampaigns(JSON.parse(storedCampaigns));

      const storedContent = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTENT);
      if (storedContent) setStoreContent(JSON.parse(storedContent));
    } catch (err) {
      console.warn('Could not read from local storage:', err);
    }
  }, []);

  // Save Cart
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Save Wishlist
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  // Save Products
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  // Save Orders
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Save Campaigns
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    } catch {}
  }, [campaigns]);

  // Save Content
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CONTENT, JSON.stringify(storeContent));
    } catch {}
  }, [storeContent]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to fetch current live product stock by productId and size
  const getProductStock = (productId: string, size: ProductSize): number => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return 99;
    const sizeObj = prod.sizes.find((s) => s.size === size);
    if (!sizeObj || !sizeObj.inStock) return 0;
    return typeof sizeObj.stockCount === 'number' ? sizeObj.stockCount : 99;
  };

  // Synchronize cart with current product inventory (e.g. when admin changes stock)
  useEffect(() => {
    if (cartItems.length === 0 || products.length === 0) return;

    let modified = false;
    const validatedCart = cartItems.map((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod) return item;
      const sizeObj = prod.sizes.find((s) => s.size === item.size);
      const stock = sizeObj && sizeObj.inStock ? sizeObj.stockCount : 0;

      if (stock > 0 && item.quantity > stock) {
        modified = true;
        return { ...item, quantity: stock };
      }
      return item;
    });

    if (modified) {
      setCartItems(validatedCart);
      showToast('Cart quantities adjusted to reflect current available stock', 'info');
    }
  }, [products]);

  // Cart operations with inventory validation
  const addToCart = (product: Product, size: ProductSize, color: string, quantity = 1) => {
    const maxStock = getProductStock(product.id, size);
    if (maxStock <= 0) {
      showToast(`Sorry, ${product.name} (${size}) is currently out of stock`, 'error');
      return;
    }

    const cartItemId = `${product.id}-${size}-${color}`;
    const existing = cartItems.find((item) => item.id === cartItemId);
    const existingQty = existing ? existing.quantity : 0;

    if (existingQty >= maxStock) {
      showToast(
        `Cannot add more. You already have the maximum available stock (${maxStock}) in your bag.`,
        'error'
      );
      setIsCartOpen(true);
      return;
    }

    const remainingCanAdd = maxStock - existingQty;
    const qtyToAdd = Math.min(quantity, remainingCanAdd);
    const newTotalQty = existingQty + qtyToAdd;

    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === cartItemId);
      if (exists) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: newTotalQty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          size,
          color,
          image: product.images[0],
          quantity: qtyToAdd
        }
      ];
    });

    if (qtyToAdd < quantity) {
      showToast(
        `Added ${qtyToAdd} item(s). Reached maximum available stock of ${maxStock} for size ${size}.`,
        'info'
      );
    } else {
      showToast(`Added ${product.name} (${size}) to your bag`);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag', 'info');
  };

  const updateQuantity = (cartItemId: string, requestedQuantity: number) => {
    if (requestedQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const currentItem = cartItems.find((item) => item.id === cartItemId);
    if (!currentItem) return;

    const maxStock = getProductStock(currentItem.productId, currentItem.size);

    if (maxStock <= 0) {
      removeFromCart(cartItemId);
      showToast('This item is now out of stock and was removed from your bag', 'info');
      return;
    }

    if (requestedQuantity > maxStock) {
      showToast(`Only ${maxStock} item(s) available in size ${currentItem.size}`, 'info');
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: maxStock } : item))
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: requestedQuantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setActiveCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const targetProd = products.find((p) => p.id === productId);
      const name = targetProd?.name || 'Item';
      if (exists) {
        showToast(`Removed ${name} from your wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${name} to your wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const moveToCart = (productId: string, size: ProductSize, color: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, size, color, 1);
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic promo discounts
  let cartDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * activeCoupon.value) / 100);
    } else if (activeCoupon.type === 'fixed') {
      cartDiscount = Math.min(activeCoupon.value, cartSubtotal);
    } else if (activeCoupon.type === 'buy2get1') {
      // If customer has 3 or more total items in cart, least expensive item is free
      const allItemPrices: number[] = [];
      cartItems.forEach((it) => {
        for (let i = 0; i < it.quantity; i++) {
          allItemPrices.push(it.price);
        }
      });
      if (allItemPrices.length >= 3) {
        allItemPrices.sort((a, b) => a - b);
        cartDiscount = allItemPrices[0]; // Free item
      }
    }
  }

  // Free shipping above 2499
  const shippingFee = cartSubtotal >= 2499 || cartSubtotal === 0 ? 0 : 150;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  const applyCoupon = (code: string) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();
    const found = campaigns.find(
      (c) => c.code.toUpperCase() === cleanCode && c.isActive
    );

    if (!found) {
      setCouponError('Invalid or inactive promo code');
      return false;
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      setCouponError(`Minimum order value of ₹${found.minSpend} required for this code`);
      return false;
    }

    if (found.type === 'buy2get1') {
      const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      if (totalUnits < 3) {
        setCouponError('BUY 2 GET 1 FREE requires at least 3 items in your shopping bag');
        return false;
      }
    }

    setActiveCoupon(found);
    showToast(`Code ${found.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponError('');
    showToast('Promo code removed', 'info');
  };

  // Product getters
  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Admin Product modifications
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = { ...newProdData, id };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to catalogue`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted', 'info');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `STYLR-IN-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: status,
              ...(trackingNumber ? { trackingNumber } : {})
            }
          : ord
      )
    );
    showToast(`Order status updated to ${status}`);
  };

  // Campaigns & Store Content
  const updateCampaign = (id: string, updates: Partial<PromoCampaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Campaign settings saved');
  };

  const addCampaign = (campaignData: Omit<PromoCampaign, 'id'>) => {
    const newCamp: PromoCampaign = {
      ...campaignData,
      id: `camp-${Date.now()}`
    };
    setCampaigns((prev) => [...prev, newCamp]);
    showToast(`Campaign ${newCamp.code} created`);
  };

  const updateStoreContent = (updates: Partial<StoreContent>) => {
    setStoreContent((prev) => ({
      ...prev,
      ...updates
    }));
    showToast('Store content updated');
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getProductStock,
        isCartOpen,
        setIsCartOpen,
        activeCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTotal,
        cartCount,

        wishlistIds,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistIds.length,
        moveToCart,

        isSearchOpen,
        setIsSearchOpen,

        quickAddProduct,
        setQuickAddProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,

        products,
        getProductBySlug,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,

        orders,
        createOrder,
        updateOrderStatus,

        campaigns,
        updateCampaign,
        addCampaign,
        storeContent,
        updateStoreContent,

        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
