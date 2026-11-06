'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import {
  Product,
  ProductCategory,
  ProductSize,
  OrderStatus,
  PromoCampaign
} from '../../types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Sliders,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  Shield,
  Lock,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    campaigns,
    updateCampaign,
    addCampaign,
    storeContent,
    updateStoreContent,
    showToast
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'campaigns' | 'content'>('dashboard');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    category: 'shirts' as ProductCategory,
    categoryName: 'Shirts',
    price: 2490,
    originalPrice: 3290,
    description: '',
    fabric: '',
    fit: '',
    care: '',
    imageUrl1: '',
    imageUrl2: '',
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    stockS: 10,
    stockM: 15,
    stockL: 12,
    stockXL: 8,
    stockXXL: 0,
    color1Name: 'Sand Dune',
    color1Hex: '#D6C8B4',
    color2Name: 'Crisp White',
    color2Hex: '#F9F8F6'
  });

  // Campaign Form State
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [newCampaignCode, setNewCampaignCode] = useState('');
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignType, setNewCampaignType] = useState<'percentage' | 'fixed' | 'buy2get1'>('percentage');
  const [newCampaignValue, setNewCampaignValue] = useState(10);
  const [newCampaignMinSpend, setNewCampaignMinSpend] = useState(1999);

  // Content Edit Forms
  const [announcementText, setAnnouncementText] = useState(storeContent.announcementBar.text);
  const [announcementEnabled, setAnnouncementEnabled] = useState(storeContent.announcementBar.enabled);
  const [heroHeadline, setHeroHeadline] = useState(storeContent.hero.headline);
  const [heroSubheadline, setHeroSubheadline] = useState(storeContent.hero.subheadline);
  const [heroDescription, setHeroDescription] = useState(storeContent.hero.description);
  const [heroImage, setHeroImage] = useState(storeContent.hero.bannerImage);

  const [promoBannerEnabled, setPromoBannerEnabled] = useState(storeContent.promotionalBanner.enabled);
  const [promoBannerTitle, setPromoBannerTitle] = useState(storeContent.promotionalBanner.title);
  const [promoBannerSubtitle, setPromoBannerSubtitle] = useState(storeContent.promotionalBanner.subtitle);

  // Order status update state
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'stylr2026' || adminPass === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Authenticated as STYLR Store Administrator');
    } else {
      setLoginError('Incorrect password. Use "stylr2026" or click Quick Access.');
    }
  };

  const handleQuickDemoAccess = () => {
    setIsAuthenticated(true);
    showToast('Store Administrator privileges granted.');
  };

  // Open modal for new product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      slug: '',
      category: 'shirts',
      categoryName: 'Shirts',
      price: 2490,
      originalPrice: 3290,
      description: 'Cut from premium natural fibers with a contemporary silhouette.',
      fabric: '100% French Flax Linen',
      fit: 'Relaxed contemporary cut',
      care: 'Machine wash cold. Line dry in shade.',
      imageUrl1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
      imageUrl2: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
      isNewArrival: true,
      isBestSeller: false,
      isFeatured: true,
      stockS: 10,
      stockM: 15,
      stockL: 12,
      stockXL: 8,
      stockXXL: 0,
      color1Name: 'Sand Dune',
      color1Hex: '#D6C8B4',
      color2Name: 'Crisp White',
      color2Hex: '#F9F8F6'
    });
    setIsProductModalOpen(true);
  };

  // Open modal for editing existing product
  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    const sStock = p.sizes.find((s) => s.size === 'S')?.stockCount || 0;
    const mStock = p.sizes.find((s) => s.size === 'M')?.stockCount || 0;
    const lStock = p.sizes.find((s) => s.size === 'L')?.stockCount || 0;
    const xlStock = p.sizes.find((s) => s.size === 'XL')?.stockCount || 0;
    const xxlStock = p.sizes.find((s) => s.size === 'XXL')?.stockCount || 0;

    setProductForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      categoryName: p.categoryName,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      description: p.description,
      fabric: p.fabric,
      fit: p.fit,
      care: p.care,
      imageUrl1: p.images[0] || '',
      imageUrl2: p.images[1] || p.images[0] || '',
      isNewArrival: p.isNewArrival,
      isBestSeller: p.isBestSeller,
      isFeatured: p.isFeatured,
      stockS: sStock,
      stockM: mStock,
      stockL: lStock,
      stockXL: xlStock,
      stockXXL: xxlStock,
      color1Name: p.colors[0]?.name || 'Sand',
      color1Hex: p.colors[0]?.hex || '#D6C8B4',
      color2Name: p.colors[1]?.name || 'White',
      color2Hex: p.colors[1]?.hex || '#FFFFFF'
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = productForm.slug.trim() || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const images = [productForm.imageUrl1.trim(), productForm.imageUrl2.trim()].filter(Boolean);

    const sizes = [
      { size: 'S' as ProductSize, inStock: productForm.stockS > 0, stockCount: productForm.stockS },
      { size: 'M' as ProductSize, inStock: productForm.stockM > 0, stockCount: productForm.stockM },
      { size: 'L' as ProductSize, inStock: productForm.stockL > 0, stockCount: productForm.stockL },
      { size: 'XL' as ProductSize, inStock: productForm.stockXL > 0, stockCount: productForm.stockXL },
      { size: 'XXL' as ProductSize, inStock: productForm.stockXXL > 0, stockCount: productForm.stockXXL }
    ];

    const colors = [
      { name: productForm.color1Name, hex: productForm.color1Hex },
      { name: productForm.color2Name, hex: productForm.color2Hex }
    ];

    const productPayload = {
      name: productForm.name,
      slug,
      category: productForm.category,
      categoryName: productForm.category.charAt(0).toUpperCase() + productForm.category.slice(1).replace('-', ' '),
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice),
      description: productForm.description,
      fabric: productForm.fabric,
      fit: productForm.fit,
      care: productForm.care,
      images,
      sizes,
      colors,
      isNewArrival: productForm.isNewArrival,
      isBestSeller: productForm.isBestSeller,
      isFeatured: productForm.isFeatured,
      rating: 4.9,
      reviewCount: 12
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }
    setIsProductModalOpen(false);
  };

  // Save Content
  const handleSaveContent = () => {
    updateStoreContent({
      announcementBar: {
        ...storeContent.announcementBar,
        enabled: announcementEnabled,
        text: announcementText
      },
      hero: {
        ...storeContent.hero,
        headline: heroHeadline,
        subheadline: heroSubheadline,
        description: heroDescription,
        bannerImage: heroImage
      },
      promotionalBanner: {
        ...storeContent.promotionalBanner,
        enabled: promoBannerEnabled,
        title: promoBannerTitle,
        subtitle: promoBannerSubtitle
      }
    });
    showToast('Store settings & content successfully persisted!');
  };

  // Add Campaign
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignCode.trim()) return;
    addCampaign({
      code: newCampaignCode.toUpperCase().trim(),
      title: newCampaignTitle,
      description: `${newCampaignCode} special campaign offer`,
      type: newCampaignType,
      value: Number(newCampaignValue),
      minSpend: Number(newCampaignMinSpend),
      isActive: true,
      bannerText: `Use code ${newCampaignCode.toUpperCase()} at checkout`
    });
    setIsCampaignModalOpen(false);
    setNewCampaignCode('');
    setNewCampaignTitle('');
  };

  // Dashboard Stats Calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-[#E5DED4] shadow-xl text-center">
        <div className="w-14 h-14 bg-[#29221D] text-[#FAF9F6] flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-[#C49B74]" />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-1">
          Surat Flagship Console
        </span>
        <h1 className="font-serif text-3xl text-[#242321] mb-2">STYLR Admin Portal</h1>
        <p className="text-xs text-[#77716B] mb-6">
          Access product inventory, order fulfillment, promotional campaigns, and website content controls.
        </p>

        {loginError && (
          <p className="text-xs text-red-600 bg-red-50 p-2.5 border border-red-200 mb-4">{loginError}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-3 mb-4">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            Authenticate
          </button>
        </form>

        <div className="pt-4 border-t border-[#E5DED4]">
          <button
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 bg-[#FAF9F6] hover:bg-[#E5DED4] text-[#242321] text-xs font-semibold uppercase tracking-wider border border-[#E5DED4] transition-colors"
          >
            One-Click Demo Store Owner Access
          </button>
          <p className="text-[10px] text-[#77716B] mt-2">Default test password: &ldquo;stylr2026&rdquo;</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Top Header */}
      <div className="pb-6 border-b border-[#E5DED4] mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#A77B55] mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Store Administrator Console</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#242321]">STYLR MANAGEMENT</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold uppercase tracking-wider text-[#77716B] hover:text-[#242321] border border-[#E5DED4] px-3.5 py-2 bg-white flex items-center space-x-1.5 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-semibold uppercase tracking-wider text-red-600 border border-red-200 px-3.5 py-2 bg-white hover:bg-red-50 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5DED4]">
        {[
          { id: 'dashboard', label: 'Dashboard & Analytics', icon: LayoutDashboard },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'campaigns', label: `Campaigns & Codes (${campaigns.length})`, icon: Tag },
          { id: 'content', label: 'Storefront Content CMS', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 text-xs uppercase font-semibold tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#29221D] text-white'
                  : 'bg-white text-[#77716B] hover:text-[#242321] border border-[#E5DED4]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD METRICS */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#E5DED4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77716B] block mb-1">
                Gross Revenue
              </span>
              <p className="font-serif text-3xl font-bold text-[#242321]">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-700 mt-2 font-medium flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Pan-India orders fulfilled</span>
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5DED4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77716B] block mb-1">
                Total Orders
              </span>
              <p className="font-serif text-3xl font-bold text-[#242321]">{orders.length}</p>
              <p className="text-[11px] text-[#A77B55] mt-2 font-medium">
                {pendingOrders} awaiting fulfillment
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5DED4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77716B] block mb-1">
                Active Catalog
              </span>
              <p className="font-serif text-3xl font-bold text-[#242321]">{products.length}</p>
              <p className="text-[11px] text-[#77716B] mt-2">
                Across 6 curated categories
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5DED4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77716B] block mb-1">
                Instagram Community
              </span>
              <p className="font-serif text-3xl font-bold text-[#242321]">355+</p>
              <p className="text-[11px] text-[#77716B] mt-2">@stylrmensclothing • 237 posts</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white p-6 sm:p-8 border border-[#E5DED4]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5DED4] mb-4">
              <h3 className="font-serif text-2xl text-[#242321]">Recent Store Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold uppercase tracking-wider text-[#A77B55] hover:underline"
              >
                View All &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5DED4] text-[#77716B] uppercase tracking-wider">
                    <th className="py-2.5">Order</th>
                    <th className="py-2.5">Client</th>
                    <th className="py-2.5">City</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Payment</th>
                    <th className="py-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED4]">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF9F6]">
                      <td className="py-3 font-semibold text-[#242321]">{ord.orderNumber}</td>
                      <td className="py-3 text-[#242321]">{ord.shippingAddress.fullName}</td>
                      <td className="py-3 text-[#77716B]">{ord.shippingAddress.city}, {ord.shippingAddress.state}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 bg-[#29221D] text-white text-[10px] font-semibold">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-emerald-800">{ord.paymentMethod} • {ord.paymentStatus}</td>
                      <td className="py-3 text-right font-semibold text-[#242321]">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-2xl text-[#242321]">Inventory &amp; Silhouettes</h3>
              <p className="text-xs text-[#77716B]">Add, modify prices, control inventory stock, and edit imagery.</p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Garment</span>
            </button>
          </div>

          <div className="bg-white border border-[#E5DED4] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#E5DED4] text-[#77716B] uppercase tracking-wider">
                    <th className="py-3 px-4">Garment</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Sizes &amp; Stock</th>
                    <th className="py-3 px-4">Badges</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED4]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF9F6]/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-16 bg-[#E5DED4] flex-shrink-0 overflow-hidden border border-[#E5DED4]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#242321] block line-clamp-1">{p.name}</span>
                            <span className="text-[11px] text-[#77716B]">{p.fabric}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize text-[#242321] font-medium">{p.categoryName}</td>
                      <td className="py-3 px-4 font-semibold text-[#242321]">
                        ₹{p.price.toLocaleString('en-IN')}
                        {p.originalPrice && (
                          <span className="block text-[10px] text-[#77716B] line-through">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          {p.sizes.map((s) => (
                            <span
                              key={s.size}
                              className={`px-1.5 py-0.5 text-[10px] font-semibold border ${
                                s.inStock ? 'bg-white text-[#242321] border-[#E5DED4]' : 'bg-red-50 text-red-500 line-through border-red-200'
                              }`}
                              title={`Stock: ${s.stockCount}`}
                            >
                              {s.size}:{s.stockCount}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col space-y-1">
                          {p.isNewArrival && (
                            <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 w-fit">
                              New Arrival
                            </span>
                          )}
                          {p.isBestSeller && (
                            <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 w-fit">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-[#77716B] hover:text-[#242321] transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-[#77716B] hover:text-red-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="font-serif text-2xl text-[#242321]">Order Processing &amp; Tracking</h3>
            <p className="text-xs text-[#77716B]">Update fulfillment milestones and assign Indian courier tracking numbers.</p>
          </div>

          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white border border-[#E5DED4] p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-[#E5DED4] text-xs">
                  <div>
                    <span className="font-serif text-lg font-bold text-[#242321] mr-3">{ord.orderNumber}</span>
                    <span className="text-[#77716B]">Created: {ord.createdAt.slice(0, 10)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 bg-[#29221D] text-white text-[10px] uppercase font-semibold">
                      {ord.orderStatus}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-semibold">
                      {ord.paymentStatus} via {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Customer and Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#77716B] mb-1">Shipping Details</p>
                    <p className="font-semibold text-[#242321]">{ord.shippingAddress.fullName}</p>
                    <p className="text-[#77716B] leading-relaxed">
                      {ord.shippingAddress.addressLine1}<br />
                      {ord.shippingAddress.city}, {ord.shippingAddress.state} — {ord.shippingAddress.pincode}<br />
                      Phone: +91 {ord.shippingAddress.phone} | Email: {ord.shippingAddress.email}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#77716B] mb-1">Items ({ord.items.length})</p>
                    <div className="space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span>{it.name} ({it.size}, {it.color}) × {it.quantity}</span>
                          <span className="font-semibold">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-[#E5DED4] flex justify-between font-bold text-sm text-[#242321]">
                        <span>Total Paid</span>
                        <span>₹{ord.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Update Action Bar */}
                <div className="pt-4 border-t border-[#E5DED4] flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-[#FAF9F6] p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#77716B] font-medium">Update Status:</span>
                    {(['Confirmed', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'] as OrderStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(ord.id, st, trackingInputs[ord.id])}
                        className={`px-2.5 py-1 text-[10px] uppercase font-semibold border transition-colors ${
                          ord.orderStatus === st
                            ? 'bg-[#29221D] text-white border-[#29221D]'
                            : 'bg-white text-[#242321] border-[#E5DED4] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Courier AWB Tracking Number"
                      defaultValue={ord.trackingNumber || ''}
                      onChange={(e) => setTrackingInputs({ ...trackingInputs, [ord.id]: e.target.value })}
                      className="text-xs p-1.5 border border-[#E5DED4] bg-white w-48 focus:outline-hidden"
                    />
                    <button
                      onClick={() => updateOrderStatus(ord.id, ord.orderStatus, trackingInputs[ord.id] || ord.trackingNumber)}
                      className="px-3 py-1.5 bg-[#A77B55] hover:bg-[#C49B74] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Save AWB
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CAMPAIGNS & PROMOTIONS */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-2xl text-[#242321]">Promotional Codes &amp; Offers</h3>
              <p className="text-xs text-[#77716B]">Configure discount vouchers and toggle &ldquo;Buy 2 Get 1 Free&rdquo; campaigns.</p>
            </div>
            <button
              onClick={() => setIsCampaignModalOpen(true)}
              className="px-5 py-2.5 bg-[#29221D] hover:bg-[#35251E] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((camp) => (
              <div key={camp.id} className="bg-white border border-[#E5DED4] p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-base font-bold text-[#242321] bg-[#F5F1E9] px-2.5 py-1 border border-[#E5DED4]">
                    {camp.code}
                  </span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={camp.isActive}
                      onChange={(e) => updateCampaign(camp.id, { isActive: e.target.checked })}
                      className="accent-[#29221D]"
                    />
                    <span className="text-[11px] ml-1.5 font-semibold text-[#242321]">
                      {camp.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </label>
                </div>

                <h4 className="font-serif text-lg text-[#242321]">{camp.title}</h4>
                <p className="text-xs text-[#77716B] leading-relaxed">{camp.description}</p>

                <div className="pt-3 border-t border-[#E5DED4] text-xs text-[#77716B]">
                  <p>Type: <strong>{camp.type.toUpperCase()}</strong></p>
                  {camp.minSpend && <p>Min Order Value: <strong>₹{camp.minSpend}</strong></p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CMS & STOREFRONT CONTENT */}
      {activeTab === 'content' && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-2xl text-[#242321]">Storefront Editorial CMS</h3>
              <p className="text-xs text-[#77716B]">Edit announcement bar, hero campaign, and banners in real time.</p>
            </div>
            <button
              onClick={handleSaveContent}
              className="px-6 py-2.5 bg-[#A77B55] hover:bg-[#C49B74] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors"
            >
              Save All Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Announcement Bar */}
            <div className="bg-white p-6 border border-[#E5DED4] space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DED4]">
                <h4 className="font-serif text-lg text-[#242321]">Announcement Bar</h4>
                <label className="flex items-center space-x-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementEnabled}
                    onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                    className="accent-[#29221D]"
                  />
                  <span>Show Announcement Bar</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                  Ticker Message
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-white p-6 border border-[#E5DED4] space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DED4]">
                <h4 className="font-serif text-lg text-[#242321]">Campaign Mid-Banner</h4>
                <label className="flex items-center space-x-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promoBannerEnabled}
                    onChange={(e) => setPromoBannerEnabled(e.target.checked)}
                    className="accent-[#29221D]"
                  />
                  <span>Display Promotional Banner</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                  Banner Headline
                </label>
                <input
                  type="text"
                  value={promoBannerTitle}
                  onChange={(e) => setPromoBannerTitle(e.target.value)}
                  className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  value={promoBannerSubtitle}
                  onChange={(e) => setPromoBannerSubtitle(e.target.value)}
                  className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Homepage Hero */}
            <div className="bg-white p-6 border border-[#E5DED4] space-y-4 lg:col-span-2">
              <h4 className="font-serif text-lg text-[#242321] pb-2 border-b border-[#E5DED4]">
                Hero Section Editorial Copy
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                    Tagline Subheadline
                  </label>
                  <input
                    type="text"
                    value={heroSubheadline}
                    onChange={(e) => setHeroSubheadline(e.target.value)}
                    className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                  Hero Narrative Description
                </label>
                <textarea
                  rows={3}
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#77716B] mb-1">
                  Hero High-Fashion Banner Image URL
                </label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full text-xs p-3 border border-[#E5DED4] bg-[#FAF9F6] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Product */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E5DED4] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <h3 className="font-serif text-2xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
              {editingProductId ? 'Edit Garment Details' : 'Add New Garment to STYLR Catalog'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Garment Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6]"
                  >
                    <option value="shirts">Shirts</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="trousers">Trousers</option>
                    <option value="coords">Co-ords</option>
                    <option value="jeans">Jeans &amp; Denim</option>
                    <option value="smart-casuals">Smart Casuals</option>
                    <option value="casual-wear">Casual Wear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Selling Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Original Price (INR ₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#242321] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full border border-[#E5DED4] p-2.5 bg-[#FAF9F6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Fabric Details</label>
                  <input
                    type="text"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    className="w-full border border-[#E5DED4] p-2 bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Fit Silhouette</label>
                  <input
                    type="text"
                    value={productForm.fit}
                    onChange={(e) => setProductForm({ ...productForm, fit: e.target.value })}
                    className="w-full border border-[#E5DED4] p-2 bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[#242321] mb-1">Garment Care</label>
                  <input
                    type="text"
                    value={productForm.care}
                    onChange={(e) => setProductForm({ ...productForm, care: e.target.value })}
                    className="w-full border border-[#E5DED4] p-2 bg-[#FAF9F6]"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block font-semibold uppercase text-[#242321] mb-1">Primary Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.imageUrl1}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl1: e.target.value })}
                  className="w-full border border-[#E5DED4] p-2 bg-[#FAF9F6]"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase text-[#242321] mb-1">Secondary Hover Image URL</label>
                <input
                  type="text"
                  value={productForm.imageUrl2}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl2: e.target.value })}
                  className="w-full border border-[#E5DED4] p-2 bg-[#FAF9F6]"
                />
              </div>

              {/* Sizes stock counts */}
              <div>
                <label className="block font-semibold uppercase text-[#242321] mb-1">Inventory Counts By Size</label>
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div>
                    <span className="font-bold">S</span>
                    <input
                      type="number"
                      value={productForm.stockS}
                      onChange={(e) => setProductForm({ ...productForm, stockS: Number(e.target.value) })}
                      className="w-full text-center border border-[#E5DED4] p-1.5"
                    />
                  </div>
                  <div>
                    <span className="font-bold">M</span>
                    <input
                      type="number"
                      value={productForm.stockM}
                      onChange={(e) => setProductForm({ ...productForm, stockM: Number(e.target.value) })}
                      className="w-full text-center border border-[#E5DED4] p-1.5"
                    />
                  </div>
                  <div>
                    <span className="font-bold">L</span>
                    <input
                      type="number"
                      value={productForm.stockL}
                      onChange={(e) => setProductForm({ ...productForm, stockL: Number(e.target.value) })}
                      className="w-full text-center border border-[#E5DED4] p-1.5"
                    />
                  </div>
                  <div>
                    <span className="font-bold">XL</span>
                    <input
                      type="number"
                      value={productForm.stockXL}
                      onChange={(e) => setProductForm({ ...productForm, stockXL: Number(e.target.value) })}
                      className="w-full text-center border border-[#E5DED4] p-1.5"
                    />
                  </div>
                  <div>
                    <span className="font-bold">XXL</span>
                    <input
                      type="number"
                      value={productForm.stockXXL}
                      onChange={(e) => setProductForm({ ...productForm, stockXXL: Number(e.target.value) })}
                      className="w-full text-center border border-[#E5DED4] p-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Badges toggles */}
              <div className="flex gap-4 pt-2">
                <label className="flex items-center space-x-1.5">
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                    className="accent-[#29221D]"
                  />
                  <span>Mark New Arrival</span>
                </label>
                <label className="flex items-center space-x-1.5">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="accent-[#29221D]"
                  />
                  <span>Mark Best Seller</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-[#E5DED4]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#E5DED4] text-[#77716B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#29221D] hover:bg-[#35251E] text-white font-semibold uppercase tracking-wider"
                >
                  Save Garment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Campaign */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E5DED4] w-full max-w-md p-6">
            <h3 className="font-serif text-xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
              Create New Promotion
            </h3>
            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block uppercase font-semibold text-[#77716B] mb-1">Voucher Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SURAT20"
                  value={newCampaignCode}
                  onChange={(e) => setNewCampaignCode(e.target.value)}
                  className="w-full p-2.5 border border-[#E5DED4] bg-[#FAF9F6] uppercase font-mono"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-[#77716B] mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Festive Season Offer"
                  value={newCampaignTitle}
                  onChange={(e) => setNewCampaignTitle(e.target.value)}
                  className="w-full p-2.5 border border-[#E5DED4] bg-[#FAF9F6]"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-[#77716B] mb-1">Offer Type</label>
                <select
                  value={newCampaignType}
                  onChange={(e) => setNewCampaignType(e.target.value as any)}
                  className="w-full p-2.5 border border-[#E5DED4] bg-[#FAF9F6]"
                >
                  <option value="percentage">Percentage Discount (%)</option>
                  <option value="fixed">Fixed Rupee Discount (₹)</option>
                  <option value="buy2get1">Buy 2 Get 1 Free</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-[#77716B] mb-1">Discount Value</label>
                  <input
                    type="number"
                    value={newCampaignValue}
                    onChange={(e) => setNewCampaignValue(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#E5DED4] bg-[#FAF9F6]"
                  />
                </div>
                <div>
                  <label className="block uppercase font-semibold text-[#77716B] mb-1">Min Spend (₹)</label>
                  <input
                    type="number"
                    value={newCampaignMinSpend}
                    onChange={(e) => setNewCampaignMinSpend(Number(e.target.value))}
                    className="w-full p-2.5 border border-[#E5DED4] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#E5DED4]">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 border border-[#E5DED4] text-[#77716B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#29221D] hover:bg-[#35251E] text-white font-semibold uppercase tracking-wider"
                >
                  Activate Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
