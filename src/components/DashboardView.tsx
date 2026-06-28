import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingBag, Heart, User, Lock, Layers, BarChart2, DollarSign, Package, Compass, Plus, Trash2, Edit, Check, Share2, Clipboard, ShieldCheck, Tag, FileText } from 'lucide-react';
import { Product, Ingredient, SavedRoutine, Order, Coupon, Article } from '../types';

interface DashboardViewProps {
  products: Product[];
  ingredients: Ingredient[];
  savedRoutines: SavedRoutine[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  articles: Article[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRemoveRoutine: (id: string) => void;
  onToggleWishlist: (productId: string) => void;
  
  // Admin triggers to update database state
  onAdminUpdateProduct: (product: Product) => void;
  onAdminAddCoupon: (coupon: Coupon) => void;
  onAdminAddArticle: (article: Article) => void;
  onAdminDeleteProduct: (id: string) => void;
}

export default function DashboardView({
  products,
  ingredients,
  savedRoutines,
  wishlist,
  orders,
  coupons,
  articles,
  onSelectProduct,
  onAddToCart,
  onRemoveRoutine,
  onToggleWishlist,
  onAdminUpdateProduct,
  onAdminAddCoupon,
  onAdminAddArticle,
  onAdminDeleteProduct
}: DashboardViewProps) {
  // Navigation State
  const [panelMode, setPanelMode] = useState<'user' | 'admin'>('user');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // User Tab State
  const [userTab, setUserTab] = useState<'profile' | 'orders' | 'routines' | 'wishlist'>('profile');
  
  // Admin Tab State
  const [adminTab, setAdminTab] = useState<'analytics' | 'products' | 'coupons' | 'cms'>('analytics');

  // Admin Editors State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');

  // CMS Article Composer State
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleSummary, setNewArticleSummary] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState<'Ingredient Education' | 'Routine' | 'Lifestyle' | 'Science' | 'News'>('Science');

  // Auth Submit
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin' || adminPassword === 'lmond-admin') {
      setAdminAuthenticated(true);
    } else {
      alert('Invalid professional access credentials.');
    }
  };

  // Referral Code Copy Trigger
  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://lmond.com/refer/OLAN59');
    alert('Bespoke referral link copied. Earn 100 points per client invite!');
  };

  // Calculate Loyalty level
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const pointsBalance = orders.reduce((sum, o) => sum + o.rewardPointsEarned, 0) + 120; // 120 starter points

  // Admin actions
  const handleProductEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onAdminUpdateProduct(editingProduct);
      setEditingProduct(null);
      alert('Product database successfully updated!');
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    onAdminAddCoupon({
      code: newCouponCode.toUpperCase(),
      discountType: newCouponType,
      value: newCouponValue,
      active: true
    });
    setNewCouponCode('');
    alert('Promo coupon authorized and live!');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle || !newArticleContent) return;
    onAdminAddArticle({
      id: `art-${Date.now()}`,
      title: newArticleTitle,
      summary: newArticleSummary,
      content: newArticleContent,
      category: newArticleCategory,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: "LMOND Clinical Editorial Team",
      tags: ["Science", "Clinical", "Active Molecules"]
    });
    setNewArticleTitle('');
    setNewArticleSummary('');
    setNewArticleContent('');
    alert('Scientific article successfully published on CMS!');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-stone-50 text-stone-900 font-sans">
      
      {/* Editorial Header & Toggle */}
      <div className="border-b border-stone-200 pb-6 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-stone-900">Control Center</h1>
          <p className="text-sm text-stone-500 mt-1 font-light">Monitor your formulation schedules, client analytics, and e-commerce inventory.</p>
        </div>

        {/* Dashboard Toggle Switch */}
        <div className="flex rounded-full bg-stone-200/60 p-1 border border-stone-300/40">
          <button
            onClick={() => setPanelMode('user')}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              panelMode === 'user' ? 'bg-stone-900 text-stone-100 shadow' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Client Profile
          </button>
          <button
            onClick={() => setPanelMode('admin')}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              panelMode === 'admin' ? 'bg-stone-900 text-stone-100 shadow' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Professional Admin
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* CLIENT PROFILE DASHBOARD                   */}
      {/* ========================================== */}
      {panelMode === 'user' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2 bg-white rounded-2xl border border-stone-200 p-4">
            <div className="pb-4 mb-2 border-b border-stone-100 text-center">
              <div className="h-14 w-14 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-lg mx-auto mb-2">
                OK
              </div>
              <h3 className="font-semibold text-stone-900">Olan K.</h3>
              <p className="text-[10px] text-stone-400">Verified Skincare Client</p>
            </div>

            <button
              onClick={() => setUserTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                userTab === 'profile' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
              }`}
            >
              LMOND Rewards & Referral
            </button>
            <button
              onClick={() => setUserTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                userTab === 'orders' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
              }`}
            >
              Active Purchases ({orders.length})
            </button>
            <button
              onClick={() => setUserTab('routines')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                userTab === 'routines' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
              }`}
            >
              Saved AI Regimes ({savedRoutines.length})
            </button>
            <button
              onClick={() => setUserTab('wishlist')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                userTab === 'wishlist' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
              }`}
            >
              Formula Wishlist ({wishlist.length})
            </button>
          </div>

          {/* User Panels */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 min-h-[450px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: Loyalty & Rewards */}
              {userTab === 'profile' && (
                <motion.div
                  key="user-profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Points Balance Card */}
                    <div className="bg-amber-800 text-white rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-white/5 -mr-5 -mt-5" />
                      <span className="text-[10px] uppercase tracking-widest text-amber-200 block">LMOND Loyalty Club</span>
                      <p className="text-4xl font-light mt-3">{pointsBalance} Pts</p>
                      <p className="text-xs text-amber-100/80 mt-2">Valued Member Level: <strong className="font-bold text-amber-200">Platinum Alchemist</strong></p>
                      
                      <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs">
                        <span>Total Brand Spent:</span>
                        <span className="font-semibold">${totalSpent.toFixed(2)} USD</span>
                      </div>
                    </div>

                    {/* Referral program card */}
                    <div className="rounded-2xl border border-stone-200 p-6 space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">Share Botanical Health</span>
                      <p className="text-xs leading-relaxed text-stone-500">
                        Invite your close circles. They will receive an exclusive <strong className="font-semibold text-stone-700">15% off</strong> on their initial clinical formulations, and you secure <strong className="font-semibold text-stone-700">100 loyalty points</strong>!
                      </p>

                      <div className="flex h-10 overflow-hidden rounded-xl border border-stone-200">
                        <div className="flex-1 bg-stone-50 px-3 flex items-center text-xs font-mono text-stone-500 overflow-x-auto select-all">
                          https://lmond.com/refer/OLAN59
                        </div>
                        <button
                          onClick={handleCopyReferral}
                          className="bg-stone-900 text-stone-100 hover:bg-stone-850 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                        >
                          <Clipboard className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Address details */}
                  <div className="border-t border-stone-100 pt-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">Saved Clinical Delivery Address</span>
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/50 text-xs">
                      <p className="font-bold text-stone-800">Olan K.</p>
                      <p className="text-stone-500 mt-1">99 Sukhumvit Rd, Phrom Phong, Bangkok 10110, Thailand</p>
                      <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider mt-2 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Default Formulation Delivery Hub
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: Order Tracker */}
              {userTab === 'orders' && (
                <motion.div
                  key="user-orders"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Active Deliveries</h3>
                  
                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-stone-400">
                      <p>You have not placed any orders yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="rounded-2xl border border-stone-200 p-5 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-stone-100 pb-3">
                            <div>
                              <p className="font-bold text-stone-800">Order ID: {order.id}</p>
                              <p className="text-stone-400 text-[10px] mt-0.5">Purchased on: {order.date}</p>
                            </div>
                            <span className="rounded-full bg-amber-50 text-amber-800 border border-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                              Status: {order.status}
                            </span>
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item, i) => {
                              const prod = products.find(p => p.id === item.productId);
                              return (
                                <div key={i} className="flex justify-between items-center text-xs">
                                  <div className="flex items-center gap-3">
                                    <img src={prod?.image} alt={prod?.name} className="h-10 w-10 object-cover rounded" referrerPolicy="no-referrer" />
                                    <div>
                                      <p className="font-medium text-stone-900">{prod?.name}</p>
                                      <p className="text-[10px] text-stone-400">Quantity: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <span className="font-semibold text-stone-800">${(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
                                </div>
                              );
                            })}
                          </div>

                          <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs">
                            <span className="text-stone-500">Rewards Points Earned: <strong className="text-amber-800">+{order.rewardPointsEarned} Pts</strong></span>
                            <span className="font-bold text-stone-950">Total Paid: ${order.total.toFixed(2)} USD</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 3: Saved AI Routines */}
              {userTab === 'routines' && (
                <motion.div
                  key="user-routines"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Bespoke AI Formulation Plans</h3>

                  {savedRoutines.length === 0 ? (
                    <div className="py-12 text-center text-stone-400">
                      <p>No saved AI routine regimes. Utilize our Routine Builder Wizard to generate one!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedRoutines.map((rot) => (
                        <div key={rot.id} className="rounded-2xl border border-stone-200 p-5 space-y-4">
                          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                            <div>
                              <p className="text-sm font-semibold text-stone-900">{rot.name}</p>
                              <p className="text-[10px] text-stone-400">Created on {rot.createdAt} • Skin: {rot.skinType}</p>
                            </div>
                            <button
                              onClick={() => onRemoveRoutine(rot.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors p-1"
                              title="Delete Plan"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Morning Steps</span>
                              <p className="font-semibold text-stone-800">3 step cellular cleanse & protect</p>
                            </div>
                            <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Evening Steps</span>
                              <p className="font-semibold text-stone-800">2 step deep lipid layer locking</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: Wishlist */}
              {userTab === 'wishlist' && (
                <motion.div
                  key="user-wishlist"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">My Saved Formulations</h3>

                  {wishlist.length === 0 ? (
                    <div className="py-12 text-center text-stone-400">
                      <p>Your wishlist is currently empty.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {products.filter(p => wishlist.includes(p.id)).map((p) => (
                        <div key={p.id} className="flex gap-4 p-4 rounded-2xl border border-stone-200 bg-white items-center">
                          <img src={p.image} alt={p.name} className="h-16 w-16 object-cover rounded-xl" referrerPolicy="no-referrer" />
                          <div className="flex-1 text-xs">
                            <p className="font-bold text-stone-900">{p.name}</p>
                            <p className="text-stone-500">{p.subtitle}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-semibold text-stone-950">${p.price}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => onAddToCart(p)}
                                  className="bg-stone-900 text-white rounded-full px-3 py-1 text-[10px] uppercase font-bold"
                                >
                                  Buy
                                </button>
                                <button
                                  onClick={() => onToggleWishlist(p.id)}
                                  className="text-red-500 hover:text-stone-400"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* PROFESSIONAL ADMIN PANEL                   */}
      {/* ========================================== */}
      {panelMode === 'admin' && (
        <div className="space-y-8">
          
          {/* Admin Lock Card */}
          {!adminAuthenticated ? (
            <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-lg space-y-6">
              <div className="h-12 w-12 rounded-full bg-stone-100 text-stone-950 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-light text-stone-900 font-sans">Authorized Professional Ingress</h3>
                <p className="text-xs text-stone-500">Provide the master passcode to enter analytics and CMS managers.</p>
              </div>

              <form onSubmit={handleAdminAuth} className="space-y-3.5">
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Master Passcode (Hint: 'admin')"
                  className="w-full rounded-full border border-stone-300 p-3 text-center text-xs outline-none focus:border-stone-900"
                />
                <button
                  type="submit"
                  className="w-full h-11 flex items-center justify-center rounded-full bg-stone-950 text-stone-100 font-semibold uppercase tracking-wider text-xs hover:bg-stone-850 cursor-pointer"
                >
                  Enter Command Deck
                </button>
              </form>
            </div>
          ) : (
            // Authenticated Admin Dashboard Layout
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Navigation tabs */}
              <div className="lg:col-span-3 space-y-2 bg-white rounded-2xl border border-stone-200 p-4">
                <div className="pb-4 mb-2 border-b border-stone-100 text-center">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Authorized Administrator
                  </span>
                  <h3 className="font-semibold text-stone-900 mt-2">Professional Hub</h3>
                </div>

                <button
                  onClick={() => setAdminTab('analytics')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    adminTab === 'analytics' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <BarChart2 className="h-4 w-4" />
                  <span>Clinical Analytics</span>
                </button>
                <button
                  onClick={() => setAdminTab('products')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    adminTab === 'products' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>Inventory Catalog</span>
                </button>
                <button
                  onClick={() => setAdminTab('coupons')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    adminTab === 'coupons' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Tag className="h-4 w-4" />
                  <span>Coupon & Promos</span>
                </button>
                <button
                  onClick={() => setAdminTab('cms')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    adminTab === 'cms' ? 'bg-stone-100 text-stone-900 font-bold' : 'hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>CMS Article Compiler</span>
                </button>
              </div>

              {/* Content Panel */}
              <div className="lg:col-span-9 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                  
                  {/* ADMIN TAB 1: Analytical reports */}
                  {adminTab === 'analytics' && (
                    <motion.div
                      key="admin-analytics"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-left"
                    >
                      <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Commercial Analytics</h3>

                      {/* Top Metric Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                          <DollarSign className="h-5 w-5 text-stone-700" />
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-2">Total Income</p>
                          <p className="text-2xl font-bold mt-1">$48,240.00</p>
                          <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                            +14.8% vs last month
                          </span>
                        </div>
                        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                          <ShoppingBag className="h-5 w-5 text-stone-700" />
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-2">Active Orders</p>
                          <p className="text-2xl font-bold mt-1">112</p>
                          <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                            AOV: $64.50 USD
                          </span>
                        </div>
                        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                          <User className="h-5 w-5 text-stone-700" />
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-2">Registered Clients</p>
                          <p className="text-2xl font-bold mt-1">1,480</p>
                          <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                            94% Retention Rate
                          </span>
                        </div>
                      </div>

                      {/* Simple Analytical Chart using Custom Tailwind-SVGs */}
                      <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-stone-900">Gross Income Curve (2026)</p>
                          <p className="text-[10px] text-stone-400">Monthly breakdown of gross revenue</p>
                        </div>

                        {/* Beautiful custom layout of month charts */}
                        <div className="flex items-end justify-between h-40 pt-4 border-b border-stone-200">
                          {[
                            { month: 'Jan', val: 30 },
                            { month: 'Feb', val: 45 },
                            { month: 'Mar', val: 40 },
                            { month: 'Apr', val: 65 },
                            { month: 'May', val: 80 },
                            { month: 'Jun', val: 95 }
                          ].map((data, idx) => (
                            <div key={idx} className="flex flex-col items-center w-full group relative">
                              {/* Hover Indicator */}
                              <div className="absolute -top-8 bg-stone-900 text-stone-100 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                ${(data.val * 500).toLocaleString()}
                              </div>
                              <div 
                                className="w-10 bg-stone-900/10 rounded-t group-hover:bg-amber-800 transition-colors cursor-pointer" 
                                style={{ height: `${data.val}%` }} 
                              />
                              <span className="text-[9px] text-stone-400 font-semibold mt-2">{data.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ADMIN TAB 2: Product inventory */}
                  {adminTab === 'products' && (
                    <motion.div
                      key="admin-products"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-left"
                    >
                      <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Database Inventory</h3>

                      {editingProduct ? (
                        /* Product Edit Modal inside Admin Panel */
                        <form onSubmit={handleProductEditSubmit} className="space-y-4 bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs">
                          <h4 className="font-bold text-stone-900 text-sm">Edit Formulation: {editingProduct.name}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-stone-500 font-semibold">Base Price ($)</label>
                              <input
                                type="number"
                                required
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-stone-500 font-semibold">Active Inventory (Stock)</label>
                              <input
                                type="number"
                                required
                                value={editingProduct.stock}
                                onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                                className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-stone-500 font-semibold">Efficacy Subtitle</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.subtitle}
                              onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                              className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                            />
                          </div>

                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => setEditingProduct(null)}
                              className="rounded-full border border-stone-300 bg-white px-4 py-2"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-full bg-stone-900 text-stone-100 px-4 py-2 font-semibold uppercase"
                            >
                              Save Adjustments
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-xs text-left">
                            <thead className="border-b border-stone-200 font-bold uppercase text-stone-400 tracking-wider">
                              <tr>
                                <th className="py-3 px-2">Formula Name</th>
                                <th className="py-3 px-2 text-center">Category</th>
                                <th className="py-3 px-2 text-center">Price</th>
                                <th className="py-3 px-2 text-center">Stock</th>
                                <th className="py-3 px-2 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 text-stone-800">
                              {products.map((p) => (
                                <tr key={p.id} className="hover:bg-stone-50/50">
                                  <td className="py-3.5 px-2 font-medium">{p.name}</td>
                                  <td className="py-3.5 px-2 text-center">{p.category}</td>
                                  <td className="py-3.5 px-2 text-center">${p.price}</td>
                                  <td className="py-3.5 px-2 text-center">
                                    <span className={`rounded-full px-2 py-0.5 font-bold ${p.stock <= 15 ? 'bg-red-50 text-red-700 animate-pulse' : 'bg-stone-100 text-stone-700'}`}>
                                      {p.stock} units
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-2 text-right space-x-2">
                                    <button
                                      onClick={() => setEditingProduct(p)}
                                      className="text-stone-500 hover:text-stone-900 inline-block p-1 hover:scale-110 transition-transform"
                                      title="Edit Info"
                                    >
                                      <Edit className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm('Delete formulation from public database?')) {
                                          onAdminDeleteProduct(p.id);
                                        }
                                      }}
                                      className="text-stone-400 hover:text-red-500 inline-block p-1 hover:scale-110 transition-transform"
                                      title="Delete Product"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ADMIN TAB 3: Coupon builder */}
                  {adminTab === 'coupons' && (
                    <motion.div
                      key="admin-coupons"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-left"
                    >
                      <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">Promo & Coupon Managers</h3>

                      {/* Coupon Creator */}
                      <form onSubmit={handleCreateCoupon} className="space-y-4 bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs">
                        <h4 className="font-bold text-stone-900 text-sm">Issue Promo Coupon</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="text-stone-500 font-semibold">Coupon Code</label>
                            <input
                              type="text"
                              required
                              value={newCouponCode}
                              onChange={(e) => setNewCouponCode(e.target.value)}
                              placeholder="e.g. SUMMER25"
                              className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white uppercase outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-stone-500 font-semibold">Value</label>
                            <input
                              type="number"
                              required
                              value={newCouponValue}
                              onChange={(e) => setNewCouponValue(Number(e.target.value))}
                              className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-stone-500 font-semibold">Discount Type</label>
                            <select
                              value={newCouponType}
                              onChange={(e) => setNewCouponType(e.target.value as 'percentage' | 'fixed')}
                              className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount ($)</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="rounded-full bg-stone-900 text-stone-100 px-5 py-2.5 font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Authorize Coupon</span>
                        </button>
                      </form>

                      {/* Coupons Table */}
                      <div className="space-y-3 pt-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">Authorized Promo Codes</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {coupons.map((c) => (
                            <div key={c.code} className="flex justify-between items-center p-3 border border-stone-200 bg-white rounded-xl">
                              <div>
                                <p className="font-mono font-bold text-stone-900">{c.code}</p>
                                <p className="text-stone-500 mt-0.5">{c.discountType === 'percentage' ? `${c.value}% discount` : `$${c.value} reduction`}</p>
                              </div>
                              <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-600/10 px-2.5 py-0.5 font-semibold text-[10px]">
                                Active Promo
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ADMIN TAB 4: CMS Articles Manager */}
                  {adminTab === 'cms' && (
                    <motion.div
                      key="admin-cms"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-left"
                    >
                      <h3 className="text-lg font-light text-stone-900 border-b border-stone-100 pb-3">CMS Scientific Editorial Compiler</h3>

                      <form onSubmit={handleCreateArticle} className="space-y-4 bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-stone-500 font-semibold">Article Title</label>
                            <input
                              type="text"
                              required
                              value={newArticleTitle}
                              onChange={(e) => setNewArticleTitle(e.target.value)}
                              placeholder="e.g. Molecular Efficacy of Retinol"
                              className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-stone-500 font-semibold">Category</label>
                            <select
                              value={newArticleCategory}
                              onChange={(e) => setNewArticleCategory(e.target.value as any)}
                              className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                            >
                              <option value="Ingredient Education">Ingredient Education</option>
                              <option value="Routine">Routine Guide</option>
                              <option value="Lifestyle">Lifestyle Science</option>
                              <option value="Science">Molecular Science</option>
                              <option value="News">News Release</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-stone-500 font-semibold">One-sentence Summary</label>
                          <input
                            type="text"
                            required
                            value={newArticleSummary}
                            onChange={(e) => setNewArticleSummary(e.target.value)}
                            placeholder="Briefly state the scientific objective of the article..."
                            className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-stone-500 font-semibold">Scientific Content (supports Markdown)</label>
                          <textarea
                            required
                            rows={8}
                            value={newArticleContent}
                            onChange={(e) => setNewArticleContent(e.target.value)}
                            placeholder="Write your science-backed article here. Cite medical journals where appropriate."
                            className="w-full rounded-xl border border-stone-300 p-2.5 mt-1 bg-white outline-none font-sans"
                          />
                        </div>

                        <button
                          type="submit"
                          className="rounded-full bg-stone-900 text-stone-100 px-5 py-2.5 font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Publish Article</span>
                        </button>
                      </form>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
