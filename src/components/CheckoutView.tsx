import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowLeft, CreditCard, ShoppingBag, Landmark, Check, CheckCircle, RefreshCw } from 'lucide-react';
import { Product, CartItem, Coupon, Order } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  products: Product[];
  appliedCoupon: Coupon | null;
  onBackToCart: () => void;
  onCompleteOrder: (order: Order) => void;
}

export default function CheckoutView({
  cartItems,
  products,
  appliedCoupon,
  onBackToCart,
  onCompleteOrder
}: CheckoutViewProps) {
  const [shippingEmail, setShippingEmail] = useState('olan.k@example.com');
  const [shippingName, setShippingName] = useState('Olan K.');
  const [shippingAddress, setShippingAddress] = useState('99 Sukhumvit Rd, Phrom Phong');
  const [shippingCity, setShippingCity] = useState('Bangkok');
  const [shippingZip, setShippingZip] = useState('10110');
  const [shippingCountry, setShippingCountry] = useState('Thailand');
  
  // Payment Mode: credit card vs PromptPay
  const [paymentMode, setPaymentMode] = useState<'card' | 'promptpay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('311');

  // Thailand PromptPay Timer State
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes count down
  const [authorizing, setAuthorizing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');
  const [pointsEarned, setPointsEarned] = useState(0);

  // Math Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const prod = products.find(p => p.id === item.productId);
    const price = prod?.discountPrice || prod?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const shippingCost = subtotal >= 75 ? 0 : 5.99;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = subtotal * (appliedCoupon.value / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const finalTotal = subtotal - discountAmount + shippingCost;

  // PromptPay Countdown Timer
  useEffect(() => {
    if (paymentMode !== 'promptpay') return;
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentMode, timeLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const handleAuthorizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthorizing(true);

    // Simulate payment gateway call
    setTimeout(() => {
      const orderId = `LMND-${Math.floor(100000 + Math.random() * 900000)}`;
      const rewardsEarned = Math.round(finalTotal * 1.5);
      
      setNewOrderId(orderId);
      setPointsEarned(rewardsEarned);
      setAuthorizing(false);
      setCompleted(true);

      // Create new Order object to push to database
      const orderObj: Order = {
        id: orderId,
        userEmail: shippingEmail,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: cartItems.map(item => {
          const prod = products.find(p => p.id === item.productId)!;
          return {
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: prod.discountPrice || prod.price
          };
        }),
        subtotal,
        discountApplied: discountAmount,
        shippingPaid: shippingCost,
        total: finalTotal,
        rewardPointsEarned: rewardsEarned,
        status: 'Pending',
        shippingAddress: {
          fullName: shippingName,
          street: shippingAddress,
          city: shippingCity,
          country: shippingCountry,
          zipCode: shippingZip
        },
        paymentMethod: paymentMode === 'card' ? 'Credit Card' : 'PromptPay'
      };

      onCompleteOrder(orderObj);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-transparent text-[#1A1A1A] font-sans">
      
      <AnimatePresence mode="wait">
        {!completed ? (
          /* SECTION 1: Checkout Form Grid */
          <motion.div
            key="checkout-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* LEFT COLUMN: Shipping & Payment Address Entry */}
            <div className="lg:col-span-7 bg-[#FDFBF7] rounded-3xl border border-[#E8E1D5] p-6 sm:p-8 space-y-8">
              
              <div className="flex items-center gap-2 border-b border-[#E8E1D5] pb-4">
                <ShieldCheck className="h-5 w-5 text-[#A68B67]" />
                <h2 className="text-lg font-light text-[#1A1A1A] font-sans">Clinical Delivery & Payment Gate</h2>
              </div>

              <form onSubmit={handleAuthorizeOrder} className="space-y-6">
                
                {/* 1. Client Contact */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">1. Client Contact Details</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#5C564F]">Full Delivery Name</label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white text-[#1A1A1A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#5C564F]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white text-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Destination Hub */}
                <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">2. Destination Hub</span>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#5C564F]">Street Address</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white text-[#1A1A1A]"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#5C564F]">City</label>
                        <input
                          type="text"
                          required
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white text-[#1A1A1A]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#5C564F]">Postal Zip Code</label>
                        <input
                          type="text"
                          required
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white text-[#1A1A1A]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#5C564F]">Country</label>
                        <input
                          type="text"
                          required
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                          className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white text-[#1A1A1A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Secure payment details */}
                <div className="space-y-3 pt-4 border-t border-[#E8E1D5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">3. Secure Payment Method</span>
                    {/* PromptPay toggle option (Highly localized Thai UX) */}
                    <div className="flex rounded-lg bg-[#F4F1EC] p-0.5 border border-[#E8E1D5]">
                      <button
                        type="button"
                        onClick={() => setPaymentMode('card')}
                        className={`rounded px-3 py-1 text-[10px] font-bold transition-all cursor-pointer ${
                          paymentMode === 'card' ? 'bg-white text-[#1A1A1A] shadow-sm border border-[#E8E1D5]' : 'text-[#5C564F] hover:text-[#1A1A1A]'
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode('promptpay')}
                        className={`rounded px-3 py-1 text-[10px] font-bold transition-all cursor-pointer ${
                          paymentMode === 'promptpay' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#5C564F] hover:text-[#1A1A1A]'
                        }`}
                      >
                        PromptPay (TH)
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {paymentMode === 'card' ? (
                      /* Credit Card form elements */
                      <motion.div
                        key="card-form"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4 p-4 rounded-2xl bg-[#F4F1EC] border border-[#E8E1D5]"
                      >
                        <div className="flex items-center gap-1.5 text-xs text-[#1A1A1A] font-bold mb-1">
                          <CreditCard className="h-4 w-4 text-[#A68B67]" />
                          <span>Encrypted Credit Card Portal</span>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-semibold text-[#5C564F]">Card Number</label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none bg-white focus:border-[#A68B67] text-[#1A1A1A]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-[#5C564F]">Expiration</label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none bg-white focus:border-[#A68B67] text-[#1A1A1A]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-[#5C564F]">Secure CVC</label>
                            <input
                              type="password"
                              required
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none bg-white focus:border-[#A68B67] text-[#1A1A1A]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Thailand PromptPay dynamic QR code generator */
                      <motion.div
                        key="promptpay-form"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="p-5 rounded-2xl bg-[#F4F1EC] border border-[#E8E1D5] flex flex-col items-center text-center space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <Landmark className="h-4 w-4 text-[#A68B67]" />
                          <span className="text-xs font-extrabold text-[#A68B67] uppercase tracking-wider">Thailand PromptPay QR Portal</span>
                        </div>

                        {/* PromptPay SVG Mock QR Image */}
                        <div className="bg-white p-4 rounded-xl border border-[#E8E1D5] w-fit relative overflow-hidden">
                          <svg className="h-32 w-32 text-[#1A1A1A]" viewBox="0 0 100 100">
                            {/* Simple abstract QR styling */}
                            <path d="M5 5h15v15H5zm20 0h5v5h-5zm10 0h15v15H35zM5 25h5v5H5zm20 20h5v10h-5zm10 25h15v15H35z" fill="currentColor" />
                            <rect x="15" y="15" width="10" height="10" fill="currentColor" />
                            <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                            <rect x="70" y="70" width="15" height="15" fill="currentColor" />
                            <rect x="10" y="70" width="15" height="15" fill="currentColor" />
                            <rect x="70" y="10" width="15" height="15" fill="currentColor" />
                          </svg>
                          {/* Dynamic amount overlay on top of QR code */}
                          <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="bg-[#1A1A1A] text-white text-[10px] px-2 py-0.5 rounded">Scan to Pay</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-[#5C564F]">
                          <p>Bespoke QR code is active for: <strong className="font-mono text-[#A68B67] text-sm font-bold">{formatTime(timeLeft)}</strong></p>
                          <p>Total transfer amount: <strong className="font-bold text-[#1A1A1A]">${finalTotal.toFixed(2)} USD (฿{(finalTotal * 34.5).toFixed(2)} THB)</strong></p>
                          <p className="text-[10px] text-[#5C564F]/70">Funds verified instantly upon scan. No credit card required.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Checkout CTA triggers */}
                <div className="flex gap-4 pt-6 border-t border-[#E8E1D5]">
                  <button
                    type="button"
                    onClick={onBackToCart}
                    className="rounded-full border border-[#E8E1D5] bg-white hover:bg-[#F4F1EC] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#5C564F] cursor-pointer transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={authorizing}
                    className="flex-1 h-11 flex items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] text-white font-semibold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-colors cursor-pointer"
                  >
                    {authorizing ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Authorizing Transaction...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Authorize Payment</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

            {/* RIGHT COLUMN: Order summary list */}
            <div className="lg:col-span-5 bg-[#F4F1EC] p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1.5 mb-2">
                <ShoppingBag className="h-4 w-4" />
                Active Order Summary
              </span>

              {/* Items Summary list */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {cartItems.map((item) => {
                  const prod = products.find(p => p.id === item.productId)!;
                  const price = prod.discountPrice || prod.price;
                  return (
                    <div key={item.productId} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="h-10 w-10 object-cover rounded" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-semibold text-[#1A1A1A] truncate max-w-[150px]">{prod.name}</p>
                          <p className="text-[10px] text-[#5C564F]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1A1A]">${(price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Fee list */}
              <div className="space-y-2 text-xs text-[#5C564F] border-t border-[#E8E1D5] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-bold bg-emerald-50/60 px-2.5 py-1 rounded-lg">
                    <span>Coupon Applied ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Chemical Shipping Fee</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {shippingCost === 0 ? 'Free Shipping' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {/* Total Invoice */}
              <div className="flex justify-between items-baseline border-t border-[#E8E1D5] pt-4 font-bold text-sm">
                <span>Grand Total</span>
                <span className="text-xl font-extrabold text-[#1A1A1A]">${finalTotal.toFixed(2)} USD</span>
              </div>

              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#A68B67]/30 text-[10px] text-[#A68B67] leading-snug">
                🎁 Placing this order earns you <strong className="font-bold">+{Math.round(finalTotal * 1.5)} Points</strong> in LMOND Rewards which is immediately credited to your profile balance!
              </div>
            </div>

          </motion.div>
        ) : (
          /* SECTION 2: Success Splash Screen */
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg rounded-3xl bg-[#FDFBF7] border border-[#E8E1D5] p-8 text-center shadow-sm space-y-6"
          >
            <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50/60 px-3 py-0.5 rounded-full">
                E-Commerce Order Authorized
              </span>
              <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">Thank you for your purchase!</h2>
              <p className="text-xs text-[#5C564F] leading-relaxed font-sans font-light">
                Your molecular skincare compounds are being custom distilled in our sterile labs. We will notify you once shipment tracking is active.
              </p>
            </div>

            <div className="p-4 bg-[#F4F1EC] rounded-2xl border border-[#E8E1D5] space-y-2 text-xs">
              <p className="text-[#5C564F]">Order ID: <strong className="font-mono text-[#1A1A1A]">{newOrderId}</strong></p>
              <p className="text-[#5C564F]">Delivery Address: <strong className="text-[#1A1A1A]">{shippingAddress}, {shippingCity}</strong></p>
              <p className="text-[#5C564F]">Earned Rewards: <strong className="text-[#A68B67] font-bold">+{pointsEarned} LMOND points</strong></p>
            </div>

            <button
              onClick={() => {
                // Return to home screen, state reset handled by parent
                window.location.reload();
              }}
              className="w-full h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white font-semibold uppercase tracking-wider text-xs hover:bg-opacity-90 cursor-pointer"
            >
              Continue Skincare Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
