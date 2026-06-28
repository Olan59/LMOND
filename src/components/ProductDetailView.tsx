import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Heart, Sparkles, Plus, Minus, ArrowLeft, Check, AlertTriangle, MessageSquare, PlusCircle, HelpCircle } from 'lucide-react';
import { Product, Ingredient, Review } from '../types';

interface ProductDetailViewProps {
  product: Product;
  allIngredients: Ingredient[];
  allReviews: Review[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onSelectIngredientByName: (name: string) => void;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailView({
  product,
  allIngredients,
  allReviews,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectIngredientByName,
  onAddReview,
  relatedProducts,
  onSelectProduct
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'how-to-use' | 'ingredients' | 'clinical'>('benefits');
  
  // Review writing state
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  
  // Filter reviews for this specific product
  const productReviews = allReviews.filter(r => r.productId === product.id);
  const [reviewFilter, setReviewFilter] = useState<number | 'all'>('all');

  const filteredReviews = reviewFilter === 'all' 
    ? productReviews 
    : productReviews.filter(r => r.rating === reviewFilter);

  const averageRating = productReviews.length > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : product.rating;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment || !reviewEmail) return;

    onAddReview({
      productId: product.id,
      userEmail: reviewEmail,
      userName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true // simulated for checkout verification
    });

    // Reset review form
    setWriteReviewOpen(false);
    setReviewComment('');
    setReviewName('');
    setReviewEmail('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-transparent text-[#1A1A1A]">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C564F] hover:text-[#1A1A1A] transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to catalog</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Large Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-[#E8E1D5] bg-[#FDFBF7] aspect-square shadow-sm">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-[#FDFBF7] ${
                    activeImage === img ? 'border-[#A68B67]' : 'border-[#E8E1D5] hover:border-[#A68B67]'
                  } transition-all cursor-pointer`}
                >
                  <img src={img} alt={`Thumbnail ${index}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Scent & Texture Indicators */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#E8E1D5] pt-6">
            <div className="rounded-2xl bg-[#F4F1EC] p-4 border border-[#E8E1D5]/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Texture</span>
              <p className="mt-1 text-xs font-medium text-[#1A1A1A]">{product.texture}</p>
            </div>
            <div className="rounded-2xl bg-[#F4F1EC] p-4 border border-[#E8E1D5]/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Scent Profile</span>
              <p className="mt-1 text-xs font-medium text-[#1A1A1A]">{product.scent}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E8E1D5] px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                {product.category}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#5C564F]">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-4xl font-sans">
              {product.name}
            </h1>
            <p className="text-base text-[#5C564F] italic">
              {product.subtitle}
            </p>

            {/* Star Rating summary */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#A68B67]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-[#E8E1D5]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#1A1A1A]">{averageRating} out of 5</span>
              <span className="text-[#E8E1D5]">|</span>
              <span className="text-xs text-[#5C564F]">{productReviews.length} Verified Reviews</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 border-t border-[#E8E1D5] pt-6">
            {product.priceTHB ? (
              product.discountPriceTHB ? (
                <>
                  <span className="text-3xl font-light text-[#1A1A1A]">฿{product.discountPriceTHB}</span>
                  <span className="text-lg text-stone-400 line-through">฿{product.priceTHB}</span>
                </>
              ) : (
                <span className="text-3xl font-light text-[#1A1A1A]">฿{product.priceTHB}</span>
              )
            ) : product.discountPrice ? (
              <>
                <span className="text-3xl font-light text-[#1A1A1A]">${product.discountPrice}</span>
                <span className="text-lg text-stone-400 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-3xl font-light text-[#1A1A1A]">${product.price}</span>
            )}
            <span className="text-xs text-[#5C564F]">Includes {product.size} volume</span>
            {product.stock <= 15 ? (
              <span className="ml-auto text-xs text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-full animate-pulse">
                Only {product.stock} left in stock
              </span>
            ) : (
              <span className="ml-auto text-xs text-emerald-700 font-bold bg-emerald-50/70 px-2.5 py-1 rounded-full">
                Formula In Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-[#5C564F] font-sans font-light">
            {product.description}
          </p>

          {/* Interactive Scientific Ingredients Section */}
          <div className="rounded-2xl border border-[#E8E1D5] bg-[#FDFBF7] p-5 space-y-3 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67] block">Featured Botanical Actives</span>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map(ingName => {
                const ingMatch = allIngredients.find(i => i.name === ingName);
                return (
                  <button
                    key={ingName}
                    onClick={() => onSelectIngredientByName(ingName)}
                    className="flex items-center gap-1.5 rounded-full bg-[#F4F1EC] border border-[#E8E1D5] text-xs text-[#1A1A1A] hover:bg-[#FDFBF7] hover:border-[#A68B67] hover:text-[#A68B67] transition-all cursor-pointer"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#A68B67]" />
                    <span>{ingName}</span>
                    {ingMatch && <span className="text-[9px] opacity-60 italic">({ingMatch.inciName})</span>}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[#5C564F] italic">
              Click any active molecule to view its bio-mechanism, clinical trials, and interactions in our Library.
            </p>
          </div>

          {/* Expandable Tabs for Detailed Clinical Info */}
          <div className="border-t border-[#E8E1D5]">
            <div className="flex border-b border-[#E8E1D5]">
              {(['benefits', 'how-to-use', 'ingredients', 'clinical'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-[#1A1A1A] text-[#1A1A1A]'
                      : 'border-transparent text-stone-400 hover:text-[#1A1A1A]'
                  } cursor-pointer`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="py-6 text-sm text-[#5C564F] font-sans font-light leading-relaxed">
              {activeTab === 'benefits' && (
                <ul className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#A68B67] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'how-to-use' && (
                <div className="space-y-4">
                  <p>{product.directions}</p>
                  <div className="rounded-xl bg-amber-500/5 p-4 border border-[#A68B67]/20 flex items-start gap-3 text-xs text-[#5C564F]">
                    <AlertTriangle className="h-4 w-4 text-[#A68B67] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider block mb-1">Safety Precautions</span>
                      <span>{product.warnings}</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <div className="space-y-2">
                  <p className="font-bold text-xs text-[#1A1A1A]">Full Ingredients (INCI):</p>
                  <p className="text-xs leading-relaxed italic text-[#5C564F]">
                    Aqua, Squalane, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract, Niacinamide, Zinc PCA, Cellulose Gum, Phenoxyethanol, Ethylhexylglycerin, Potassium Sorbate.
                  </p>
                </div>
              )}
              {activeTab === 'clinical' && (
                <div className="space-y-3">
                  <p className="font-bold text-xs text-[#1A1A1A]">Clinical Evaluation Studies:</p>
                  <p>{product.clinicalEvidence}</p>
                </div>
              )}
            </div>
          </div>

          {/* Add To Cart & Quantity Selection */}
          <div className="flex gap-4 border-t border-[#E8E1D5] pt-8">
            <div className="flex h-12 items-center rounded-full border border-[#E8E1D5] bg-[#FDFBF7] px-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-[#5C564F] hover:text-[#1A1A1A] cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold text-sm text-[#1A1A1A]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-[#5C564F] hover:text-[#1A1A1A] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => {
                onAddToCart(product, quantity);
                setQuantity(1);
              }}
              className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white font-semibold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-colors shadow-lg cursor-pointer"
            >
              <span>Add to Formula Cart</span>
              <span>•</span>
              <span>
                {product.priceTHB ? (
                  `฿${((product.discountPriceTHB || product.priceTHB) * quantity)}`
                ) : (
                  `$${((product.discountPrice || product.price) * quantity).toFixed(2)}`
                )}
              </span>
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`h-12 w-12 flex items-center justify-center rounded-full border ${
                isWishlisted ? 'bg-red-500 border-red-500 text-white' : 'border-[#E8E1D5] text-[#5C564F] hover:border-[#A68B67]'
              } transition-all cursor-pointer`}
              title="Add to Wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-20 border-t border-[#E8E1D5] pt-16 text-left">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-light tracking-tight text-[#1A1A1A]">Verified Skincare Reviews</h2>
            <p className="text-xs text-[#5C564F] mt-1">Real science, real outcomes from verified clients</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={() => setWriteReviewOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-[#1A1A1A] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Write A Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Summary Panel */}
          <div className="lg:col-span-4 space-y-6 bg-[#F4F1EC] p-6 rounded-3xl border border-[#E8E1D5]">
            <div>
              <span className="text-5xl font-light text-[#1A1A1A]">{averageRating}</span>
              <span className="text-xl text-[#5C564F] font-light">/5</span>
              <p className="text-xs text-[#5C564F] mt-1">Based on {productReviews.length} global submissions</p>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C564F]">Filter Ratings</span>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`flex items-center justify-between px-3 py-2 text-xs rounded-xl ${
                    reviewFilter === 'all' ? 'bg-[#1A1A1A] text-white font-semibold' : 'hover:bg-[#E8E1D5]/50 text-[#5C564F]'
                  } text-left transition-colors cursor-pointer`}
                >
                  <span>All Ratings</span>
                  <span>({productReviews.length})</span>
                </button>
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = productReviews.filter(r => r.rating === rating).length;
                  return (
                    <button
                      key={rating}
                      onClick={() => setReviewFilter(rating)}
                      className={`flex items-center justify-between px-3 py-2 text-xs rounded-xl ${
                        reviewFilter === rating ? 'bg-[#1A1A1A] text-white font-semibold' : 'hover:bg-[#E8E1D5]/50 text-[#5C564F]'
                      } text-left transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center gap-1">
                        <span>{rating} Star</span>
                        <div className="flex text-[#A68B67] h-3 items-center">
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                      </div>
                      <span>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center text-stone-400 bg-[#FDFBF7] rounded-2xl border border-dashed border-[#E8E1D5]"
                >
                  <p>No verified reviews found matching this filter.</p>
                </motion.div>
              ) : (
                filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8E1D5] shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex text-[#A68B67]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? 'fill-current' : 'text-stone-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-xs font-bold text-[#1A1A1A]">{review.userName}</p>
                      </div>
                      <span className="text-[10px] text-stone-400">{review.date}</span>
                    </div>

                    <p className="text-xs leading-relaxed text-[#5C564F] font-sans font-light">
                      {review.comment}
                    </p>

                    {review.image && (
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-[#F4F1EC]">
                        <img src={review.image} alt="User skin review" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50/70 px-2.5 py-1 rounded-full w-fit font-semibold">
                      <Check className="h-3 w-3" />
                      <span>Verified Client Purchase</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Write Review Dialog (Collapsible) */}
        <AnimatePresence>
          {writeReviewOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 p-4 pt-20 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-[#E8E1D5] bg-[#FDFBF7] p-6 shadow-2xl text-left"
              >
                <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
                  <h3 className="text-lg font-light text-[#1A1A1A]">Write a Clinical Review</h3>
                  <button onClick={() => setWriteReviewOpen(false)} className="text-stone-400 hover:text-stone-600 text-sm cursor-pointer">Close</button>
                </div>

                <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                  {/* Rating Choice */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5C564F]">Overall Rating</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setReviewRating(stars)}
                          className="text-[#A68B67] hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`h-6 w-6 ${stars <= reviewRating ? 'fill-current' : 'text-[#E8E1D5]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5C564F]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Alexis Cole"
                      className="w-full rounded-xl border border-[#E8E1D5] bg-white p-2.5 text-xs outline-none focus:border-[#A68B67]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5C564F]">Email (kept private)</label>
                    <input
                      type="email"
                      required
                      value={reviewEmail}
                      onChange={(e) => setReviewEmail(e.target.value)}
                      placeholder="e.g. alexis@example.com"
                      className="w-full rounded-xl border border-[#E8E1D5] bg-white p-2.5 text-xs outline-none focus:border-[#A68B67]"
                    />
                  </div>

                  {/* Comment */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5C564F]">Describe your outcomes</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Tell us about the texture, sensory smell, and active results on your skin barrier..."
                      className="w-full rounded-xl border border-[#E8E1D5] bg-white p-2.5 text-xs outline-none focus:border-[#A68B67]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-10 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white font-semibold uppercase tracking-wider text-xs hover:bg-opacity-90 cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Suggested Pairings / Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-[#E8E1D5] pt-16 text-left">
          <h2 className="text-2xl font-light tracking-tight text-[#1A1A1A]">Recommended Routine Pairings</h2>
          <p className="text-xs text-[#5C564F] mt-1">Enhance active molecule absorption with synergistic additions</p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relProduct) => (
              <div 
                key={relProduct.id}
                className="cursor-pointer group space-y-3"
                onClick={() => {
                  onSelectProduct(relProduct);
                  setActiveImage(relProduct.gallery[0] || relProduct.image);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="aspect-square overflow-hidden rounded-2xl bg-[#F4F1EC] border border-[#E8E1D5] shadow-sm">
                  <img 
                    src={relProduct.image} 
                    alt={relProduct.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1A1A1A]">{relProduct.name}</h3>
                  <p className="text-[10px] text-[#5C564F]">{relProduct.subtitle}</p>
                  <p className="text-xs font-semibold text-[#1A1A1A] mt-1">
                    {relProduct.priceTHB ? `฿${relProduct.priceTHB}` : `$${relProduct.price}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Quick Add Bottom Bar for Incredible CRO */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8E1D5] px-4 py-3 shadow-xl md:hidden">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            <p className="text-xs font-semibold text-[#1A1A1A] truncate max-w-[150px]">{product.name}</p>
            <p className="text-[10px] text-[#5C564F]">
              {product.priceTHB ? `฿${product.discountPriceTHB || product.priceTHB}` : `$${product.discountPrice || product.price}`}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product, 1)}
            className="flex-1 bg-[#1A1A1A] text-white font-semibold text-[10px] uppercase tracking-wider py-2.5 rounded-full cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
