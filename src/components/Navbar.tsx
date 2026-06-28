import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Heart, User, Sparkles, X, ArrowRight, Layers } from 'lucide-react';
import { Product, Ingredient, Article } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onNavigate: (page: string) => void;
  activePage: string;
  products: Product[];
  ingredients: Ingredient[];
  articles: Article[];
  onSelectProduct: (product: Product) => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
  onSelectArticle: (article: Article) => void;
  onToggleCart: () => void;
  userPoints: number;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  compareCount,
  onNavigate,
  activePage,
  products,
  ingredients,
  articles,
  onSelectProduct,
  onSelectIngredient,
  onSelectArticle,
  onToggleCart,
  userPoints
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    products: Product[];
    ingredients: Ingredient[];
    articles: Article[];
  }>({ products: [], ingredients: [], articles: [] });
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle autocomplete search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ products: [], ingredients: [], articles: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.subtitle.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    const filteredIngredients = ingredients.filter(i => 
      i.name.toLowerCase().includes(query) || 
      i.scientificName.toLowerCase().includes(query)
    );

    const filteredArticles = articles.filter(a => 
      a.title.toLowerCase().includes(query) || 
      a.summary.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query))
    );

    setSearchResults({
      products: filteredProducts,
      ingredients: filteredIngredients,
      articles: filteredArticles
    });
  }, [searchQuery, products, ingredients, articles]);

  // Close search on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (type: 'product' | 'ingredient' | 'article', item: any) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (type === 'product') {
      onSelectProduct(item);
    } else if (type === 'ingredient') {
      onSelectIngredient(item);
    } else if (type === 'article') {
      onSelectArticle(item);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'ingredients', label: 'Ingredient Library' },
    { id: 'concerns', label: 'Skin Concerns' },
    { id: 'routine-builder', label: 'Routine Builder' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Science Blog' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#E8E1D5] bg-[#FDFBF7]/90 backdrop-blur-md">
        {/* Announcement Bar */}
        {/* <div className="flex h-9 w-full items-center justify-between bg-[#1A1A1A] px-4 text-xs font-medium tracking-wider text-stone-100 sm:px-6">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#A68B67]" />
            <span>Complimentary worldwide carbon-neutral shipping on orders over $75</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span>Points: <strong className="text-[#A68B67] font-bold">{userPoints}</strong> LMOND Rewards</span>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="hover:text-[#A68B67] transition-colors"
            >
              My Rewards
            </button>
          </div>
        </div> */}

        {/* Main Navbar */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('home')} 
              // className="text-2xl font-light tracking-[0.3em] text-[#1A1A1A] font-serif italic cursor-pointer hover:opacity-80 transition-opacity"
            >
              LMOND
            </button>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex lg:gap-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer ${
                  activePage === item.id 
                    ? 'text-[#1A1A1A]' 
                    : 'text-[#5C564F] hover:text-[#1A1A1A]'
                }`}
              >
                {item.label}
                {activePage === item.id && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#A68B67]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center gap-x-4">
            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-stone-600 hover:text-stone-900 transition-colors p-1.5 rounded-full hover:bg-stone-100"
              aria-label="Search Catalog"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Product Compare Badge */}
            {compareCount > 0 && (
              <button
                onClick={() => onNavigate('products')}
                className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-wider bg-[#1A1A1A] text-[#A68B67] px-2 py-1 rounded-full font-medium"
              >
                <Layers className="h-3 w-3" />
                <span>Compare ({compareCount})</span>
              </button>
            )}

            {/* Wishlist */}
            <button 
              onClick={() => onNavigate('dashboard')}
              className="relative text-stone-600 hover:text-stone-900 transition-colors p-1.5 rounded-full hover:bg-stone-100"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A1A1A] text-[8px] font-bold text-stone-100">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={onToggleCart}
              className="relative text-stone-600 hover:text-stone-900 transition-colors p-1.5 rounded-full hover:bg-stone-100 cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A68B67] text-[8px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dashboard Link */}
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`text-stone-600 hover:text-stone-900 transition-colors p-1.5 rounded-full hover:bg-stone-100 ${activePage === 'dashboard' ? 'bg-stone-100 text-stone-900' : ''}`}
              aria-label="User Dashboard"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Global Autocomplete Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 p-4 pt-20 backdrop-blur-sm sm:p-6 lg:p-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                ref={searchRef}
                className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
              >
                {/* Search Input Area */}
                <div className="flex items-center gap-3 border-b border-stone-100 px-4 py-4">
                  <Search className="h-5 w-5 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, botanical ingredients, skin guides..."
                    className="flex-1 text-sm text-stone-900 outline-none placeholder:text-stone-400"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Autocomplete Results Area */}
                <div className="max-h-96 overflow-y-auto px-4 py-4">
                  {!searchQuery ? (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Trending Searches</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {['Squalane', 'Niacinamide', 'Pores', 'Retinol', 'Barrier Repair'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Products Section */}
                      {searchResults.products.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Products</h3>
                          <ul className="space-y-2">
                            {searchResults.products.map(product => (
                              <li key={product.id}>
                                <button
                                  onClick={() => handleResultClick('product', product)}
                                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-stone-50 transition-colors"
                                >
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div>
                                    <p className="text-xs font-medium text-stone-900">{product.name}</p>
                                    <p className="text-[10px] text-stone-500">{product.subtitle}</p>
                                  </div>
                                  <span className="ml-auto text-xs font-semibold text-stone-950">${product.price}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Ingredients Section */}
                      {searchResults.ingredients.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Active Ingredients</h3>
                          <ul className="space-y-1">
                            {searchResults.ingredients.map(ing => (
                              <li key={ing.name}>
                                <button
                                  onClick={() => handleResultClick('ingredient', ing)}
                                  className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-stone-50 transition-colors"
                                >
                                  <div>
                                    <p className="text-xs font-medium text-stone-900">{ing.name}</p>
                                    <p className="text-[10px] italic text-stone-500">{ing.scientificName}</p>
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                                    <span>Science Library</span>
                                    <ArrowRight className="h-2.5 w-2.5" />
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Articles Section */}
                      {searchResults.articles.length > 0 && (
                        <div>
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Clinical Science Articles</h3>
                          <ul className="space-y-1">
                            {searchResults.articles.map(art => (
                              <li key={art.id}>
                                <button
                                  onClick={() => handleResultClick('article', art)}
                                  className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-stone-50 transition-colors"
                                >
                                  <div>
                                    <p className="text-xs font-medium text-stone-900">{art.title}</p>
                                    <p className="text-[10px] text-stone-400">By {art.author}</p>
                                  </div>
                                  <span className="text-[9px] uppercase tracking-widest bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                                    {art.category}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Empty Search State */}
                      {searchResults.products.length === 0 && 
                       searchResults.ingredients.length === 0 && 
                       searchResults.articles.length === 0 && (
                        <div className="py-6 text-center text-stone-500">
                          <p className="text-sm">No results match &quot;{searchQuery}&quot;</p>
                          <p className="mt-1 text-xs">Try searching for botanical agents like <strong className="font-semibold text-stone-700">Squalane</strong> or <strong className="font-semibold text-stone-700">Niacinamide</strong></p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Nav Drawer Button / Floating Menu */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-2 bg-stone-950/95 backdrop-blur-md px-2 py-2 rounded-full shadow-xl border border-stone-800">
          <div className="flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[10px] uppercase font-semibold tracking-wider px-3 py-2 rounded-full cursor-pointer transition-all ${
                  activePage === item.id 
                    ? 'bg-stone-100 text-stone-950 shadow-md scale-105' 
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {item.id === 'routine-builder' ? 'Wizard' : item.id === 'ingredients' ? 'Ingredients' : item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
