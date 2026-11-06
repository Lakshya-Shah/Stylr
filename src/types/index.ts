export type ProductCategory = 
  | 'shirts'
  | 't-shirts'
  | 'trousers'
  | 'jeans'
  | 'coords'
  | 'casual-wear'
  | 'smart-casuals';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSizeStock {
  size: ProductSize;
  inStock: boolean;
  stockCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  colors: ProductColor[];
  sizes: ProductSizeStock[];
  images: string[];
  description: string;
  fabric: string;
  fit: string;
  care: string;
  modelMeasurements?: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  collectionSlug?: string;
  collectionName?: string;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  color: string;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface OutfitItem {
  productId: string;
  role: string; // e.g. "Upper", "Lower", "Outerwear"
}

export interface OutfitLook {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  productIds: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: ProductSize;
  color: string;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'UPI' | 'Razorpay' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface PromoCampaign {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'percentage' | 'fixed' | 'buy2get1';
  value: number; // e.g. 10 for 10%
  minSpend?: number;
  isActive: boolean;
  bannerText?: string;
}

export interface StoreContent {
  announcementBar: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    bannerImage: string;
  };
  brandStory: {
    tagline: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    locationNote: string;
    image: string;
  };
  contact: {
    storeName: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    whatsappNumber: string;
    displayPhone: string;
    email: string;
    instagramHandle: string;
    hours: string;
  };
  promotionalBanner: {
    enabled: boolean;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    badge: string;
    image: string;
  };
}
