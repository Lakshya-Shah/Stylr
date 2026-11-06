'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function AccountPage() {
  const { orders, wishlistIds, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Mock user profile
  const [profile, setProfile] = useState({
    name: 'Vikramaditya Singhania',
    email: 'vikram.singhania@gmail.com',
    phone: '+91 98251 23456',
    city: 'Surat',
    state: 'Gujarat'
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information saved.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
      {/* Page Title */}
      <div className="pb-6 border-b border-[#E5DED4] mb-8 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
            Client Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#242321]">
            MY ACCOUNT
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin"
            className="text-xs font-semibold uppercase tracking-wider text-[#77716B] hover:text-[#242321] border border-[#E5DED4] px-3 py-1.5 bg-white flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5 text-[#A77B55]" />
            <span>Store Admin</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-[#E5DED4] p-6 space-y-4">
            <div className="pb-4 border-b border-[#E5DED4]">
              <div className="w-12 h-12 bg-[#F5F1E9] border border-[#E5DED4] flex items-center justify-center font-serif text-lg text-[#242321] mb-2">
                {profile.name.charAt(0)}
              </div>
              <p className="text-sm font-semibold text-[#242321]">{profile.name}</p>
              <p className="text-xs text-[#77716B]">{profile.email}</p>
            </div>

            <nav className="space-y-1 text-xs font-semibold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-2.5 transition-colors text-left ${
                  activeTab === 'orders' ? 'bg-[#29221D] text-white' : 'text-[#77716B] hover:bg-[#FAF9F6] hover:text-[#242321]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between p-2.5 transition-colors text-left ${
                  activeTab === 'profile' ? 'bg-[#29221D] text-white' : 'text-[#77716B] hover:bg-[#FAF9F6] hover:text-[#242321]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Personal Details</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-2.5 transition-colors text-left ${
                  activeTab === 'addresses' ? 'bg-[#29221D] text-white' : 'text-[#77716B] hover:bg-[#FAF9F6] hover:text-[#242321]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <Link
                href="/wishlist"
                className="w-full flex items-center justify-between p-2.5 text-[#77716B] hover:bg-[#FAF9F6] hover:text-[#242321] transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistIds.length})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-white p-6 border border-[#E5DED4]">
                <h3 className="font-serif text-2xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
                  Order History &amp; Tracking
                </h3>

                {orders.length === 0 ? (
                  <p className="text-xs text-[#77716B] py-8 text-center">No orders found.</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div key={ord.id} className="border border-[#E5DED4] p-5 bg-[#FAF9F6] space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-[#E5DED4] text-xs">
                          <div>
                            <span className="font-bold text-[#242321] text-sm mr-2">{ord.orderNumber}</span>
                            <span className="text-[#77716B]">Placed {ord.createdAt.slice(0, 10)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-1 bg-[#29221D] text-white text-[10px] uppercase font-semibold tracking-wider">
                              Status: {ord.orderStatus}
                            </span>
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-semibold">
                              {ord.paymentStatus}
                            </span>
                          </div>
                        </div>

                        {/* Items in order */}
                        <div className="space-y-3">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-16 bg-[#E5DED4] overflow-hidden flex-shrink-0 border border-[#E5DED4]">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-medium text-[#242321]">{it.name}</p>
                                  <p className="text-[11px] text-[#77716B]">Size: {it.size} • Colour: {it.color} • Qty: {it.quantity}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-[#242321]">
                                ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Total & Actions */}
                        <div className="pt-3 border-t border-[#E5DED4] flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-3">
                          <div>
                            <p className="text-[11px] text-[#77716B]">
                              Tracking ID: <strong className="text-[#242321]">{ord.trackingNumber || 'Pending assignment'}</strong>
                            </p>
                            <p className="text-[11px] text-[#77716B]">
                              Courier Destination: {ord.shippingAddress.city}, {ord.shippingAddress.state}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-serif text-lg font-bold text-[#242321]">
                              Total: ₹{ord.total.toLocaleString('en-IN')}
                            </span>
                            <Link
                              href={`/order-confirmation/${ord.id}`}
                              className="px-3 py-1.5 bg-white border border-[#242321] hover:bg-[#242321] hover:text-white text-[#242321] text-[11px] font-semibold uppercase tracking-wider transition-colors"
                            >
                              View Receipt
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4]">
              <h3 className="font-serif text-2xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
                Personal Profile
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg text-xs">
                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block uppercase font-semibold text-[#242321] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full border border-[#E5DED4] p-3 bg-[#FAF9F6] text-xs focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#29221D] text-white text-xs uppercase font-semibold tracking-wider hover:bg-[#35251E] transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white p-6 sm:p-8 border border-[#E5DED4]">
              <h3 className="font-serif text-2xl text-[#242321] mb-4 pb-2 border-b border-[#E5DED4]">
                Saved Addresses
              </h3>
              <div className="border border-[#E5DED4] p-5 bg-[#FAF9F6] max-w-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A77B55] block mb-1">
                  Default Address
                </span>
                <p className="font-semibold text-sm text-[#242321]">Vikramaditya Singhania</p>
                <p className="text-xs text-[#77716B] mt-1 leading-relaxed">
                  B-702, Florenza Residency, VIP Road<br />
                  Near Vesu Canal Corridor<br />
                  Vesu, Surat, Gujarat — 395007<br />
                  Mobile: +91 98251 23456
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
