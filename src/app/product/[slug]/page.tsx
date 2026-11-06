'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../../context/StoreContext';
import { ProductSize, Product } from '../../../types';
import { ProductCard } from '../../../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Star,
  Maximize2,
  X,
  MessageSquare,
  Minus,
  Plus
} from 'lucide-react';

function ProductDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const {
    getProductBySlug,
    products,
    cartItems,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    storeContent,
    showToast,
    getProductStock
  } = useStore();

  const product = getProductBySlug(slug) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Track recently viewed products in localStorage for repeat visitor engagement
  useEffect(() => {
    if (!product?.id) return;
    try {
      const stored = localStorage.getItem('stylr_recent_views_v1');
      const ids: string[] = stored ? JSON.parse(stored) : [];
      const updated = [product.id, ...ids.filter((id) => id !== product.id)].slice(0, 6);
      localStorage.setItem('stylr_recent_views_v1', JSON.stringify(updated));

      const viewedProds = updated
        .filter((id) => id !== product.id)
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[];
      setRecentlyViewed(viewedProds.slice(0, 4));
    } catch {}
  }, [product.id, products]);

  // Inventory calculations for currently selected size and color
  const availableStock = selectedSize ? getProductStock(product.id, selectedSize) : 0;
  const inCartItem = cartItems.find(
    (item) => item.productId === product.id && item.size === selectedSize && item.color === selectedColor
  );
  const inCartQty = inCartItem ? inCartItem.quantity : 0;
  const remainingStock = Math.max(0, availableStock - inCartQty);

  // Automatically adjust quantity if selected size stock is lower
  const handleSelectSize = (size: ProductSize) => {
    setSelectedSize(size);
    setSizeError(false);
    const stockForSize = getProductStock(product.id, size);
    const itemInCart = cartItems.find(
      (item) => item.productId === product.id && item.size === size && item.color === selectedColor
    );
    const inBag = itemInCart ? itemInCart.quantity : 0;
    const maxCanAdd = Math.max(0, stockForSize - inBag);
    if (quantity > maxCanAdd && maxCanAdd > 0) {
      setQuantity(maxCanAdd);
    }
  };

  // Accordion active tab
  const [activeAccordion, setActiveAccordion] = useState<'fabric' | 'shipping' | 'reviews'>('fabric');

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isSaved = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Handle Add To Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select your size first', 'error');
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  // Handle Buy Now (adds to cart & immediately pushes to /checkout)
  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select your size first', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  // Handle Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      setReviewSubmitted(true);
      showToast('Thank you! Your verified review has been submitted.');
      setNewReviewAuthor('');
      setNewReviewComment('');
    }
  };

  // WhatsApp enquiry link
  const cleanPhone = storeContent.contact.whatsappNumber.replace(/[^0-9]/g, '');
  const waProductMsg = encodeURIComponent(
    `Hello STYLR, I am interested in ordering the "${product.name}" (₹${product.price}). Could you verify size ${selectedSize || 'recommendations'} and delivery timeline to my PIN code?`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waProductMsg}`;

  return (
    <div className="w-full flex-1 bg-[#F5F1E9]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-[#77716B] flex items-center space-x-2">
        <Link href="/" className="hover:text-[#242321] transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#242321] transition-colors capitalize">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-[#242321] font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left: Gallery (Thumbnails + Main Image with Zoom) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] scrollbar-none flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-26 overflow-hidden border transition-all flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#29221D] ring-1 ring-[#29221D]'
                      : 'border-[#E5DED4] opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image */}
            <div className="relative flex-1 aspect-[3/4] bg-[#EAE5D9] overflow-hidden border border-[#E5DED4] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 ease-out group-hover:scale-102"
                onClick={() => setIsZoomOpen(true)}
              />

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs p-2 text-[#242321] hover:bg-white shadow-md transition-colors"
                title="Full-screen Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 transition-all shadow-md ${
                  isSaved
                    ? 'bg-white text-red-600'
                    : 'bg-white/80 text-[#242321] hover:bg-white hover:text-[#A77B55]'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Product Purchase Controls & Info */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Category & Collection */}
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#A77B55] mb-2">
              <span>{product.categoryName}</span>
              {product.collectionName && (
                <>
                  <span>•</span>
                  <span>{product.collectionName}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-[#242321] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center space-x-2 mb-4 text-xs text-[#77716B]">
              <div className="flex text-[#A77B55]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#242321]">{product.rating}</span>
              <span>•</span>
              <a href="#reviews" onClick={() => setActiveAccordion('reviews')} className="hover:underline">
                ({product.reviewCount} verified client reviews)
              </a>
            </div>

            {/* Price in INR */}
            <div className="flex items-baseline space-x-3 mb-6 pb-6 border-b border-[#E5DED4]">
              <span className="text-2xl sm:text-3xl font-semibold text-[#242321]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#77716B] line-through font-normal">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs uppercase font-bold tracking-wider text-[#A77B55] bg-[#F5F1E9] px-2 py-0.5 border border-[#E5DED4]">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                </span>
              )}
              <span className="text-[11px] text-[#77716B] ml-auto">Inclusive of all taxes</span>
            </div>

            {/* Colour Selector */}
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-[#242321]">
                  Colour: <strong className="font-normal text-[#77716B]">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex space-x-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border p-0.5 transition-all flex items-center justify-center ${
                      selectedColor === color.name ? 'border-[#242321] ring-2 ring-[#242321]' : 'border-[#E5DED4]'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-[#242321]">
                  Select Size {selectedSize && <strong className="text-[#A77B55]">({selectedSize})</strong>}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center space-x-1 text-[#A77B55] hover:underline uppercase tracking-wider font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </button>
              </div>

              {/* Visible size buttons (S | M | L | XL | XXL) */}
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => {
                  const stock = getProductStock(product.id, s.size);
                  const isAvailable = s.inStock && stock > 0;
                  return (
                    <button
                      key={s.size}
                      disabled={!isAvailable}
                      onClick={() => handleSelectSize(s.size)}
                      className={`py-3 text-xs font-semibold uppercase tracking-wider border transition-all relative ${
                        !isAvailable
                          ? 'border-[#E5DED4] text-[#77716B]/40 bg-[#F5F1E9] cursor-not-allowed line-through'
                          : selectedSize === s.size
                          ? 'border-[#29221D] bg-[#29221D] text-[#FAF9F6] shadow-sm'
                          : 'border-[#E5DED4] text-[#242321] hover:border-[#242321] bg-white'
                      }`}
                    >
                      <span>{s.size}</span>
                      {isAvailable && stock <= 5 && (
                        <span className="block text-[9px] text-[#A77B55] font-normal lowercase">
                          {stock} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stock Urgency & Scarcity Notice */}
              {selectedSize && (
                <div className="mt-3">
                  {availableStock <= 0 ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      Size {selectedSize} is currently sold out.
                    </div>
                  ) : remainingStock === 0 && inCartQty > 0 ? (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center justify-between">
                      <span>You have added all <strong>{availableStock} available</strong> in your bag.</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900">Max in Cart</span>
                    </div>
                  ) : availableStock <= 10 ? (
                    <div className="p-2.5 bg-[#FAF7F2] border border-[#E5DED4] text-[#242321] text-xs font-medium flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                      <span>Only <strong className="text-[#A77B55]">{availableStock} pieces</strong> available in size {selectedSize}</span>
                    </div>
                  ) : null}
                </div>
              )}

              {sizeError && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  Please select your preferred size before adding to bag.
                </p>
              )}

              {product.modelMeasurements && (
                <p className="text-[11px] text-[#77716B] mt-2 italic">
                  {product.modelMeasurements}
                </p>
              )}
            </div>

            {/* Quantity Stepper (Capped at remaining available stock) */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#242321]">Quantity:</span>
              <div className="flex items-center border border-[#E5DED4] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-[#77716B] hover:text-[#242321]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold text-[#242321]">{quantity}</span>
                <button
                  onClick={() => {
                    const maxAllowed = selectedSize ? remainingStock : 99;
                    if (quantity < maxAllowed) {
                      setQuantity(quantity + 1);
                    } else {
                      showToast(`Maximum available quantity (${availableStock}) reached`, 'info');
                    }
                  }}
                  disabled={selectedSize ? quantity >= remainingStock || remainingStock === 0 : false}
                  className={`px-3 py-1.5 transition-colors ${
                    selectedSize && (quantity >= remainingStock || remainingStock === 0)
                      ? 'text-stone-300 cursor-not-allowed bg-stone-50'
                      : 'text-[#77716B] hover:text-[#242321]'
                  }`}
                  aria-label="Increase quantity"
                  title={selectedSize && remainingStock <= quantity ? `Stock limit of ${availableStock} reached` : 'Increase quantity'}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {selectedSize && availableStock > 0 && (
                <span className="text-xs text-[#77716B]">
                  ({remainingStock} available to add)
                </span>
              )}
            </div>

            {/* CTAs: Add to Bag & Buy Now */}
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedSize ? (remainingStock === 0 && inCartQty > 0) || availableStock === 0 : false}
                  className={`py-4 px-6 text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-md ${
                    selectedSize && ((remainingStock === 0 && inCartQty > 0) || availableStock === 0)
                      ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                      : 'bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {selectedSize && remainingStock === 0 && inCartQty > 0
                      ? `Max in Bag (${availableStock})`
                      : selectedSize && availableStock === 0
                      ? 'Out of Stock'
                      : 'Add To Bag'}
                  </span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={selectedSize ? (remainingStock === 0 && inCartQty > 0) || availableStock === 0 : false}
                  className={`py-4 px-6 text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-md ${
                    selectedSize && ((remainingStock === 0 && inCartQty > 0) || availableStock === 0)
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      : 'bg-[#A77B55] hover:bg-[#C49B74] text-white'
                  }`}
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Enquiry Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 border border-[#E5DED4] hover:border-[#242321] bg-white text-[#242321] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Enquire About Sizing on WhatsApp</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#E5DED4] text-center text-[10px] text-[#77716B] uppercase tracking-wider">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#A77B55] mb-1" />
                <span>Pan-India Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-[#A77B55] mb-1" />
                <span>7-Day Return &amp; Exchange</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#A77B55] mb-1" />
                <span>100% Authentic Textile</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="mt-8 space-y-3">
              {/* Tab 1: Fabric & Care */}
              <div className="border border-[#E5DED4] bg-white">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? ('' as any) : 'fabric')}
                  className="w-full px-4 py-3.5 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#242321]"
                >
                  <span>Fabric Composition &amp; Care</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#77716B] transition-transform duration-200 ${
                      activeAccordion === 'fabric' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="px-4 pb-4 text-xs text-[#77716B] space-y-2 border-t border-[#E5DED4]/60 pt-3 leading-relaxed">
                    <p><strong>Fabric:</strong> {product.fabric}</p>
                    <p><strong>Silhouette:</strong> {product.fit}</p>
                    <p><strong>Care Instructions:</strong> {product.care}</p>
                    <p className="text-[11px] text-[#242321] font-medium pt-1">
                      Designed and tailored in Surat, Gujarat with rigorous quality finishing.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 2: Pan-India Delivery & Returns */}
              <div className="border border-[#E5DED4] bg-white">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? ('' as any) : 'shipping')}
                  className="w-full px-4 py-3.5 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#242321]"
                >
                  <span>Pan-India Delivery &amp; Returns</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#77716B] transition-transform duration-200 ${
                      activeAccordion === 'shipping' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="px-4 pb-4 text-xs text-[#77716B] space-y-2 border-t border-[#E5DED4]/60 pt-3 leading-relaxed">
                    <p>• <strong>Complimentary Express Shipping</strong> on all prepaid &amp; COD orders above ₹2,499.</p>
                    <p>• <strong>Dispatch:</strong> Shipped directly from our Vesu, Surat warehouse within 24-48 business hours.</p>
                    <p>• <strong>Timeline:</strong> Metro cities 2-4 business days; rest of India 3-6 business days.</p>
                    <p>• <strong>Hassle-Free Returns:</strong> We offer a smooth 7-day exchange or refund guarantee on all unwashed, unworn garments with original tags attached.</p>
                  </div>
                )}
              </div>

              {/* Tab 3: Customer Reviews */}
              <div id="reviews" className="border border-[#E5DED4] bg-white">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'reviews' ? ('' as any) : 'reviews')}
                  className="w-full px-4 py-3.5 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#242321]"
                >
                  <span>Client Reviews ({product.reviews?.length || 2})</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#77716B] transition-transform duration-200 ${
                      activeAccordion === 'reviews' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'reviews' && (
                  <div className="px-4 pb-6 border-t border-[#E5DED4]/60 pt-4 space-y-4">
                    {/* List of reviews */}
                    <div className="space-y-3">
                      {(product.reviews || []).map((rev) => (
                        <div key={rev.id} className="p-3 bg-[#FAF9F6] border border-[#E5DED4]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-xs text-[#242321]">{rev.author}</span>
                            <span className="text-[10px] text-[#77716B]">{rev.date}</span>
                          </div>
                          <div className="flex text-[#A77B55] mb-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs font-medium text-[#242321]">{rev.title}</p>
                          <p className="text-xs text-[#77716B] mt-1 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Write a Review Form */}
                    <div className="pt-4 border-t border-[#E5DED4]">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#242321] mb-2">
                        Share Your Experience
                      </h4>
                      {reviewSubmitted ? (
                        <p className="text-xs text-emerald-700 font-medium">
                          ✓ Review received. Thank you for contributing to the STYLR community.
                        </p>
                      ) : (
                        <form onSubmit={handleReviewSubmit} className="space-y-2">
                          <input
                            type="text"
                            placeholder="Your Name (e.g. Priyesh M.)"
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            required
                            className="w-full text-xs border border-[#E5DED4] p-2 bg-[#FAF9F6] focus:outline-hidden"
                          />
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-[#77716B]">Rating:</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setNewReviewRating(star)}
                                  className="text-[#A77B55]"
                                >
                                  <Star
                                    className={`w-4 h-4 ${star <= newReviewRating ? 'fill-current' : 'stroke-current'}`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <textarea
                            rows={3}
                            placeholder="How is the fabric drape, sizing, and comfort?"
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            required
                            className="w-full text-xs border border-[#E5DED4] p-2 bg-[#FAF9F6] focus:outline-hidden"
                          />
                          <button
                            type="submit"
                            className="py-2 px-4 bg-[#29221D] text-white text-xs uppercase font-semibold tracking-wider hover:bg-[#35251E] transition-colors"
                          >
                            Submit Review
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look / Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E5DED4]">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-1">
                  Harmonious Pairings
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#242321]">
                  Complete The Look
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products (Repeat Visitor Retention) */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E5DED4]">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-1">
                  Your Exploration
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#242321]">
                  Recently Viewed Pieces
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#C49B74] p-2"
            aria-label="Close Fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[90vh] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="max-h-[90vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Mobile Sticky Add To Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#E5DED4] p-3 z-30 flex items-center justify-between shadow-2xl pb-safe">
        <div className="min-w-0 pr-3">
          <p className="text-xs font-semibold text-[#242321] truncate">{product.name}</p>
          <p className="text-xs text-[#A77B55] font-bold">
            ₹{product.price.toLocaleString('en-IN')}{' '}
            {selectedSize && <span className="text-stone-500 font-normal">({selectedSize})</span>}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={selectedSize ? (remainingStock === 0 && inCartQty > 0) || availableStock === 0 : false}
          className={`py-2.5 px-5 text-xs font-semibold uppercase tracking-wider flex-shrink-0 transition-colors shadow-sm ${
            selectedSize && ((remainingStock === 0 && inCartQty > 0) || availableStock === 0)
              ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
              : 'bg-[#29221D] hover:bg-[#35251E] text-white'
          }`}
        >
          {selectedSize
            ? remainingStock === 0 && inCartQty > 0
              ? `Max in Bag (${availableStock})`
              : availableStock === 0
              ? 'Sold Out'
              : `Add Size ${selectedSize}`
            : 'Select Size'}
        </button>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs uppercase tracking-widest">Loading Garment Details...</div>}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
