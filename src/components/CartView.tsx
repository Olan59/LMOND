import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Product, CartItem, Coupon } from '../types';

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  coupons: Coupon[];
  onCheckout: (appliedCoupon: Coupon | null) => void;
}

export default function CartView({
  isOpen,
  onClose,
  cartItems,
  products,
  onUpdateQuantity,
  onRemoveItem,
  coupons,
  onCheckout
}: CartViewProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  // Math calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const prod = products.find(p => p.id === item.productId);
    const price = prod?.discountPrice || prod?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const shippingCost = subtotal >= 75 || subtotal === 0 ? 0 : 5.99;
  
  // Coupon deduction
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = subtotal * (appliedCoupon.value / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const finalTotal = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode) return;

    const matched = coupons.find(c => c.code === couponCode.toUpperCase() && c.active);
    if (matched) {
      setAppliedCoupon(matched);
      setCouponCode('');
    } else {
      setCouponError('This coupon is invalid or expired.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-950 backdrop-blur-[2px]"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-[#FDFBF7] shadow-2xl border-l border-[#E8E1D5]"
          >
            {/* Drawer Header */}
            <div className="flex h-16 items-center justify-between border-b border-[#E8E1D5] px-6 bg-[#F4F1EC]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-[#1A1A1A]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#1A1A1A]">Your Formula Cart</h2>
                <span className="rounded-full bg-[#E8E1D5] px-2 py-0.5 text-[9px] font-bold text-[#1A1A1A]">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-[#F4F1EC] flex items-center justify-center text-[#A68B67] border border-[#E8E1D5]">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#1A1A1A]">Your cart is currently empty</p>
                    <p className="text-xs text-[#5C564F] leading-snug">Discover active botanical formulas to restore skin cellular balance.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const prod = products.find(p => p.id === item.productId);
                    if (!prod) return null;

                    const price = prod.discountPrice || prod.price;

                    return (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 p-3 bg-[#F4F1EC]/40 rounded-2xl border border-[#E8E1D5] items-center text-left"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="h-16 w-16 object-cover rounded-xl border border-[#E8E1D5]" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-bold text-[#1A1A1A] truncate">{prod.name}</p>
                          <p className="text-[#5C564F] mt-0.5 truncate">{prod.subtitle}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity selection */}
                            <div className="flex items-center rounded-full border border-[#E8E1D5] bg-[#FDFBF7] px-2 py-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                                className="p-0.5 text-[#5C564F] hover:text-[#1A1A1A]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center font-semibold text-[#1A1A1A]">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                                className="p-0.5 text-[#5C564F] hover:text-[#1A1A1A]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-semibold text-[#1A1A1A]">${(price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => onRemoveItem(item.productId)}
                          className="text-stone-400 hover:text-red-500 p-1.5 transition-colors self-start cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer Calculation Area */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#E8E1D5] bg-[#F4F1EC] p-6 space-y-4">
                
                {/* Coupon Code Entry */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Coupon Code (Try 'WELCOME15')"
                      className="flex-1 rounded-xl border border-[#E8E1D5] bg-[#FDFBF7] px-3 py-2 text-xs outline-none uppercase focus:border-[#A68B67] text-[#1A1A1A]"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-[#1A1A1A] hover:bg-opacity-90 text-white px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-600 font-semibold">{couponError}</p>}
                </form>

                {/* Sub-costs lists */}
                <div className="space-y-2 text-xs text-[#5C564F] border-b border-[#E8E1D5]/60 pb-3">
                  <div className="flex justify-between">
                    <span>Formula Subtotal</span>
                    <span className="font-medium text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Active coupon layout */}
                  {appliedCoupon && (
                    <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-600/10">
                      <div className="flex items-center gap-1 font-semibold">
                        <Tag className="h-3.5 w-3.5" />
                        <span>Promo Code Applied ({appliedCoupon.code})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>-${discountAmount.toFixed(2)}</span>
                        <button onClick={handleRemoveCoupon} className="text-emerald-900 font-bold p-0.5">×</button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Clinical Shipping</span>
                    <span className="font-medium text-[#1A1A1A]">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">Free Shipping</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                {/* Final total cost */}
                <div className="flex justify-between text-sm text-[#1A1A1A] font-bold">
                  <span>Grand Total</span>
                  <span className="text-base font-extrabold text-[#1A1A1A]">${finalTotal.toFixed(2)} USD</span>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => onCheckout(appliedCoupon)}
                  className="w-full h-11 flex items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] hover:bg-opacity-90 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-lg cursor-pointer"
                >
                  <span>Proceed to Safe Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
