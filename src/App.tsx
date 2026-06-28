import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Heart, User, X, ArrowRight, Layers, Award, Star, MessageSquare, HelpCircle, ArrowUpRight, ShieldCheck, Mail, Send, Eye, RefreshCw } from 'lucide-react';

// Import Types
import { Product, Ingredient, SkinConcern, Article, Review, FAQ, Coupon, CartItem, SavedRoutine, Order } from './types';

// Import Mock Databases
import { mockIngredients, mockProducts, mockSkinConcerns, mockArticles, mockReviews, mockFAQs, mockCoupons } from './data/mockData';

// Import Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailView from './components/ProductDetailView';
import IngredientLibraryView from './components/IngredientLibraryView';
import RoutineBuilderView from './components/RoutineBuilderView';
import SkinConcernView from './components/SkinConcernView';
import DashboardView from './components/DashboardView';
import BlogView from './components/BlogView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import FAQView from './components/FAQView';
import ContactView from './components/ContactView';

export default function App() {
  // Global States
  const [activePage, setActivePage] = useState<string>('home');
  const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
  const [allCoupons, setAllCoupons] = useState<Coupon[]>(mockCoupons);
  const [allArticles, setAllArticles] = useState<Article[]>(mockArticles);
  const [allReviews, setAllReviews] = useState<Review[]>(mockReviews);

  // Cart & checkout states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedCheckoutCoupon, setSelectedCheckoutCoupon] = useState<Coupon | null>(null);

  // Wishlist & comparison tracker states
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [savedRoutines, setSavedRoutines] = useState<SavedRoutine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userPoints, setUserPoints] = useState(120); // 120 starting points

  // Interactive selection states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Floating AI Skincare Assistant / Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Welcome to the LMOND Digital Laboratory. I am your personal formulation esthetician. How can I help optimize your skin barrier health today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // User details for personalized chat contexts
  const currentSkinProfile = {
    skinType: 'oily-combination',
    concerns: ['Pores', 'Breakouts'],
    age: '25-34',
    goals: ['Smoother Texture', 'Sebum Regulation']
  };

  // Synchronize cart count, comparison lists, wishlist, and points
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const match = prev.find(item => item.productId === product.id);
      if (match) {
        return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { productId: product.id, quantity }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleToggleCompare = (product: Product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product]; // limit compare list to 3
      }
      return [...prev, product];
    });
  };

  const handleToggleFavoriteIngredient = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  // Mock Active Orders database state
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "LMOND-48201",
      userEmail: "olan.k@example.com",
      date: "May 10, 2026",
      items: [
        { productId: "cleanser-01", quantity: 1, priceAtPurchase: 28 },
        { productId: "serum-niacinamide", quantity: 1, priceAtPurchase: 38 }
      ],
      subtotal: 66,
      discountApplied: 0,
      shippingPaid: 0,
      total: 66,
      rewardPointsEarned: 100,
      status: "Delivered",
      shippingAddress: {
        fullName: "Olan K.",
        street: "99 Sukhumvit Rd, Phrom Phong",
        city: "Bangkok",
        country: "Thailand",
        zipCode: "10110"
      },
      paymentMethod: "Credit Card"
    }
  ]);

  const handleCompleteOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setUserPoints(prev => prev + newOrder.rewardPointsEarned);
    setCheckoutOpen(false);
  };

  // Handle Admin Database Mutations
  const handleAdminUpdateProduct = (updatedProduct: Product) => {
    setAllProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleAdminAddCoupon = (newCoupon: Coupon) => {
    setAllCoupons(prev => [newCoupon, ...prev]);
  };

  const handleAdminAddArticle = (newArticle: Article) => {
    setAllArticles(prev => [newArticle, ...prev]);
  };

  const handleAdminDeleteProduct = (productId: string) => {
    setAllProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const freshReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAllReviews(prev => [freshReview, ...prev]);
  };

  // AI Floating Chat API Trigger
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userText }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, { role: 'user', content: userText }],
          skinProfile: currentSkinProfile
        })
      });

      const data = await res.json();
      if (res.ok) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: `Esthetician Network Error: ${data.error}` }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Our digital lab is temporarily offline. Please verify that the Express server is compiled and active." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Nav actions
  const handlePageNavigate = (pageId: string) => {
    setActivePage(pageId);
    setSelectedProduct(null);
    setSelectedIngredient(null);
    setSelectedArticle(null);
    setCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Floating Announcement / Navigation Header */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onNavigate={handlePageNavigate}
        activePage={activePage}
        products={allProducts}
        ingredients={mockIngredients}
        articles={allArticles}
        onSelectProduct={(p) => { setSelectedProduct(p); setCheckoutOpen(false); }}
        onSelectIngredient={(ing) => { setSelectedIngredient(ing); setActivePage('ingredients'); }}
        onSelectArticle={(art) => { setSelectedArticle(art); setActivePage('blog'); }}
        onToggleCart={() => setCartOpen(!cartOpen)}
        userPoints={userPoints}
      />

      {/* Main Screen Layout Container */}
      <main className="flex-grow">
        
        {/* Dynamic checkout overlay */}
        {checkoutOpen ? (
          <CheckoutView
            cartItems={cartItems}
            products={allProducts}
            appliedCoupon={selectedCheckoutCoupon}
            onBackToCart={() => { setCheckoutOpen(false); setCartOpen(true); }}
            onCompleteOrder={handleCompleteOrder}
          />
        ) : selectedProduct ? (
          /* PRODUCT DETAIL SCREEN DEEP DIVE */
          <ProductDetailView
            product={selectedProduct}
            allIngredients={mockIngredients}
            allReviews={allReviews}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onSelectIngredientByName={(name) => {
              const matchedIng = mockIngredients.find(i => i.name === name);
              if (matchedIng) {
                setSelectedIngredient(matchedIng);
                setActivePage('ingredients');
              }
            }}
            onAddReview={handleAddReview}
            relatedProducts={allProducts.filter(p => p.id !== selectedProduct.id)}
            onSelectProduct={(p) => { setSelectedProduct(p); }}
          />
        ) : (
          /* REGULAR PAGE VIEWS */
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-20 pb-20"
              >
                {/* 1. Breathtaking Hero banner */}
                <Hero
                  onExploreProducts={() => handlePageNavigate('products')}
                  onOpenRoutineBuilder={() => handlePageNavigate('routine-builder')}
                />

                {/* 2. Featured collections showcase */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-12">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A68B67]">THE RE-SET COLLECTIVE</span>
                    <h2 className="text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-4xl font-sans">
                      Featured Formulations
                    </h2>
                    <p className="max-w-xl mx-auto text-sm text-[#5C564F] font-sans font-light">
                      Distilled active molecules engineered to bio-mimic the skin&apos;s natural repair mechanisms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProducts.slice(0, 3).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleCompare={handleToggleCompare}
                        isCompared={compareList.some(p => p.id === product.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 3. Biological ingredient teaser */}
                <section className="bg-[#F4F1EC] border-y border-[#E8E1D5] py-16 text-left">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">MOLECULAR EDUCATION</span>
                      <h2 className="text-3xl font-light text-[#1A1A1A] font-sans leading-tight">Cellular Synergies, <br />No Chemical Secrets.</h2>
                      <p className="text-sm leading-relaxed text-[#5C564F] font-sans font-light">
                        Every single product lists the exact botanical active concentrations. Our Science Library allows you to inspect molecular mechanisms, compatibility profiles, and certified clinical studies.
                      </p>
                      <button
                        onClick={() => handlePageNavigate('ingredients')}
                        className="group flex items-center gap-2 rounded-full border border-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
                      >
                        <span>Inspect Science Library</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {mockIngredients.slice(0, 4).map((ing) => (
                        <div key={ing.name} className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E8E1D5] space-y-2 shadow-sm">
                          <h3 className="text-sm font-semibold text-[#1A1A1A]">{ing.name}</h3>
                          <p className="text-[10px] italic text-[#A68B67]">INCI: {ing.inciName}</p>
                          <p className="text-[11px] text-[#5C564F] line-clamp-2 leading-relaxed mt-1 font-sans font-light">{ing.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 4. Luxury Testimonials & Badges */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-12">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">RESTORED COMPLEXIONS</span>
                    <h2 className="text-2xl font-light text-[#1A1A1A]">What Our Clients Observe</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { quote: "The Squalane Cleanser has completely repaired my dry red patches. It feels like a beautiful calming lotion.", author: "Evelyn K." },
                      { quote: "10% Niacinamide Serum cleared my forehead bump and visibly shrank my nose pores in under a month. Absolute pure science.", author: "Devon L." },
                      { quote: "Finally, a brand that is transparent about chemical percentages and compatible layer options. Pure luxury.", author: "Alexis T." }
                    ].map((test, i) => (
                      <div key={i} className="p-6 bg-[#FDFBF7] border border-[#E8E1D5] rounded-3xl text-left space-y-4 shadow-sm">
                        <div className="flex text-[#A68B67] h-3">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs leading-relaxed text-[#5C564F] font-sans italic">&ldquo;{test.quote}&rdquo;</p>
                        <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">— {test.author}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Newsletter Signup (CRO optimizing) */}
                <section className="bg-[#F4F1EC] border-y border-[#E8E1D5] py-16 text-center">
                  <div className="mx-auto max-w-3xl px-4 space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">JOIN THE LMOND CLUB</span>
                    <h2 className="text-2xl font-light text-[#1A1A1A] font-sans">Subscribe for Molecular Updates & 15% Off</h2>
                    <p className="text-xs text-[#5C564F] max-w-md mx-auto leading-relaxed">
                      Receive early access to limited botanical formulations, clinical trials briefings, and 15% off your initial order.
                    </p>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to the circle! Check your email inbox for your 15% voucher code."); }} className="flex overflow-hidden rounded-full border border-[#E8E1D5] max-w-md mx-auto bg-[#FDFBF7]">
                      <input
                        type="email"
                        required
                        placeholder="your.email@domain.com"
                        className="flex-1 px-4 py-3 text-xs outline-none bg-transparent"
                      />
                      <button
                        type="submit"
                        className="bg-[#1A1A1A] text-white hover:bg-opacity-80 px-6 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <span>Join</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </form>
                  </div>
                </section>

              </motion.div>
            )}

            {activePage === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10 pb-20 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
              >
                {/* Catalog head */}
                <div className="border-b border-stone-200 pb-6 text-left">
                  <h1 className="text-4xl font-light text-stone-900">Formulation Catalog</h1>
                  <p className="text-xs text-stone-500 mt-1">Discover pure active concentrations targeted directly to skin concerns.</p>
                </div>

                {/* Product cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleCompare={handleToggleCompare}
                      isCompared={compareList.some(p => p.id === product.id)}
                    />
                  ))}
                </div>

                {/* Product comparison list drawer (CRO Optimizing) */}
                {compareList.length > 0 && (
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1A1A] text-white py-4 border-t border-[#E8E1D5] px-6 flex items-center justify-between shadow-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-[#A68B67] uppercase tracking-[0.15em] flex items-center gap-1">
                        <Layers className="h-4 w-4" />
                        Compare Matrix ({compareList.length})
                      </span>
                      <div className="flex gap-2">
                        {compareList.map((cp) => (
                          <div key={cp.id} className="text-[10px] bg-[#FDFBF7]/10 border border-[#E8E1D5]/20 px-3 py-1 rounded-full flex items-center gap-2">
                            <span>{cp.name}</span>
                            <button onClick={() => handleToggleCompare(cp)} className="text-stone-400 hover:text-white font-bold">&times;</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handlePageNavigate('ingredients')}
                      className="bg-[#A68B67] hover:bg-opacity-90 text-white rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Analyze Interactions</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activePage === 'ingredients' && (
              <IngredientLibraryView
                ingredients={mockIngredients}
                products={allProducts}
                onSelectProduct={setSelectedProduct}
                favorites={favorites}
                onToggleFavorite={handleToggleFavoriteIngredient}
                selectedIngFromDetails={selectedIngredient}
              />
            )}

            {activePage === 'concerns' && (
              <SkinConcernView
                concerns={mockSkinConcerns}
                products={allProducts}
                ingredients={mockIngredients}
                onSelectProduct={setSelectedProduct}
                onSelectIngredientByName={(name) => {
                  const ing = mockIngredients.find(i => i.name === name);
                  if (ing) {
                    setSelectedIngredient(ing);
                    setActivePage('ingredients');
                  }
                }}
              />
            )}

            {activePage === 'routine-builder' && (
              <RoutineBuilderView
                products={allProducts}
                onSaveRoutine={(newRot) => setSavedRoutines(prev => [newRot, ...prev])}
                onAddAllToCart={(prods) => prods.forEach(p => handleAddToCart(p, 1))}
              />
            )}

            {activePage === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto py-12 px-4 text-left space-y-8"
              >
                <div className="border-b border-[#E8E1D5] pb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">OUR PHILOSOPHY</span>
                  <h1 className="text-4xl font-light text-[#1A1A1A] font-sans mt-1">Sincere Skincare Science</h1>
                </div>

                <div className="space-y-6 text-sm text-[#5C564F] font-sans font-light leading-relaxed">
                  <p>
                    LMOND was founded on the singular principle of therapeutic sincerity. In an industry cluttered with exotic claims, mystery extracts, and transient trends, we choose absolute transparency and pure molecular calibration.
                  </p>
                  <p>
                    We map bio-identical molecules—such as plant-derived Squalane, stabilized Retinol, or pure Niacinamide—against known epidermal pathways. We avoid fillers, irritating synthetic dyes, or complex scent protocols, optimizing each fluid strictly for dermal absorption and barrier recovery.
                  </p>
                  <div className="rounded-2xl border border-[#E8E1D5] bg-[#F4F1EC] p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A68B67] block">Sourced Sincerity</span>
                      <p className="text-xs text-[#5C564F]">100% Certified vegan active ingredients with complete safety reviews.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A68B67] block">Sterile Laboratories</span>
                      <p className="text-xs text-[#5C564F]">Formulated in clinically safe, medical-grade labs under strict oversight.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activePage === 'blog' && (
              <BlogView
                articles={allArticles}
                selectedArticleFromParent={selectedArticle}
                onBackToCatalog={() => setSelectedArticle(null)}
              />
            )}

            {activePage === 'dashboard' && (
              <DashboardView
                products={allProducts}
                ingredients={mockIngredients}
                savedRoutines={savedRoutines}
                wishlist={wishlist}
                orders={orders}
                coupons={allCoupons}
                articles={allArticles}
                onSelectProduct={setSelectedProduct}
                onAddToCart={handleAddToCart}
                onRemoveRoutine={(id) => setSavedRoutines(prev => prev.filter(r => r.id !== id))}
                onToggleWishlist={handleToggleWishlist}
                onAdminUpdateProduct={handleAdminUpdateProduct}
                onAdminAddCoupon={handleAdminAddCoupon}
                onAdminAddArticle={handleAdminAddArticle}
                onAdminDeleteProduct={handleAdminDeleteProduct}
              />
            )}
          </AnimatePresence>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-stone-300 border-t border-[#E8E1D5] py-16 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-sans">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FDFBF7]">LMOND</h3>
            <p className="text-stone-400 leading-relaxed font-light">
              Premium biological skincare engineered around cellular mechanism potency, skin barrier rest, and formulation sincerity.
            </p>
            <span className="text-[10px] text-stone-500 block">© {new Date().getFullYear()} LMOND Inc. All Rights Reserved.</span>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#FDFBF7] uppercase tracking-wider">Scientific Catalog</h4>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><button onClick={() => handlePageNavigate('products')} className="hover:text-[#A68B67] transition-colors">Discover All Formulas</button></li>
              <li><button onClick={() => handlePageNavigate('ingredients')} className="hover:text-[#A68B67] transition-colors">Science Ingredients Library</button></li>
              <li><button onClick={() => handlePageNavigate('concerns')} className="hover:text-[#A68B67] transition-colors">Skin Concerns Guides</button></li>
              <li><button onClick={() => handlePageNavigate('routine-builder')} className="hover:text-[#A68B67] transition-colors">AI Esthetician Wizard</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#FDFBF7] uppercase tracking-wider">Company Circle</h4>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><button onClick={() => handlePageNavigate('about')} className="hover:text-[#A68B67] transition-colors">Our Clinical Origin</button></li>
              <li><button onClick={() => handlePageNavigate('blog')} className="hover:text-[#A68B67] transition-colors">Science Blog Editorials</button></li>
              <li><span className="text-stone-500">LINE ID: @LMOND_Skincare</span></li>
              <li><span className="text-stone-500">Facebook Messenger Support</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#FDFBF7] uppercase tracking-wider">Professional Support</h4>
            <p className="text-stone-400 font-light leading-relaxed">
              Formulation queries? Reach out directly via <strong className="text-stone-300">concierge@lmond.com</strong> or call standard lines during boutique hours.
            </p>
            <div className="flex gap-2">
              <span className="rounded bg-white/5 border border-[#E8E1D5]/20 px-2.5 py-1 text-[9px] text-[#A68B67] uppercase tracking-wider font-bold">100% Carbon Neutral Transits</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart side drawer overlay */}
      <CartView
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        products={allProducts}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        coupons={allCoupons}
        onCheckout={(applied) => {
          setSelectedCheckoutCoupon(applied);
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* ======================================================= */}
      {/* FLOATING AI ESTHETICIAN CONCIERGE CHAT PANEL (CRO BOOST) */}
      {/* ======================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-3 h-96 w-80 rounded-2xl border border-[#E8E1D5] bg-[#FDFBF7] shadow-2xl flex flex-col overflow-hidden text-left"
            >
              {/* Chat Header */}
              <div className="bg-[#1A1A1A] text-[#FDFBF7] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                   <Sparkles className="h-4 w-4 text-[#A68B67]" />
                  <div>
                    <h3 className="text-xs font-semibold text-white">LMOND Scientific Concierge</h3>
                    <p className="text-[8px] text-stone-400">AI Esthetician • Online</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-stone-400 hover:text-white p-0.5">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-3.5 text-xs bg-[#FDFBF7]">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#1A1A1A] text-white rounded-tr-none' 
                        : 'bg-[#F4F1EC] text-stone-800 rounded-tl-none border border-[#E8E1D5]/40'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#F4F1EC] border border-[#E8E1D5]/40 p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-[10px] text-stone-500">
                      <RefreshCw className="h-3 w-3 animate-spin text-[#A68B67]" />
                      <span>Esthetician is formulating response...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChatMessage} className="border-t border-[#E8E1D5] p-2 flex gap-1.5 bg-[#F4F1EC]">
                <input
                  type="text"
                  required
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about active synergies or routines..."
                  className="flex-1 rounded-full border border-[#E8E1D5] bg-[#FDFBF7] px-3.5 py-1.5 text-xs outline-none focus:border-[#A68B67] text-[#1A1A1A]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#1A1A1A] hover:bg-opacity-90 text-white p-2 flex items-center justify-center cursor-pointer"
                  title="Send message"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="h-12 w-12 rounded-full bg-[#1A1A1A] hover:opacity-90 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer border border-[#E8E1D5]"
          title="Connect with Esthetician AI"
        >
          <MessageSquare className="h-5 w-5 text-[#A68B67]" />
        </button>
      </div>

    </div>
  );
}
