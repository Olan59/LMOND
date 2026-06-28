import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Layers, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export default function ProductCard({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared
}: ProductCardProps) {
  const isLowStock = product.stock <= 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E8E1D5] bg-[#FDFBF7] shadow-sm hover:shadow-md transition-all duration-300 text-left"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4F1EC]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.discountPrice && (
            <span className="rounded-full bg-[#A68B67] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
              Offer
            </span>
          )}
          {isLowStock && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1 animate-pulse">
              <Sparkles className="h-2.5 w-2.5" />
              Low Stock ({product.stock})
            </span>
          )}
        </div>

        {/* Action Buttons Drawer (Appears on Hover) */}
        <div className="absolute inset-0 bg-[#1A1A1A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {/* Quick View */}
          <button
            onClick={() => onSelect(product)}
            className="p-3 rounded-full bg-[#FDFBF7] text-[#1A1A1A] hover:bg-[#F4F1EC] hover:scale-110 shadow-lg cursor-pointer transition-all"
            title="Quick View"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Toggle Wishlist */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-3 rounded-full shadow-lg cursor-pointer transition-all hover:scale-110 ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-[#FDFBF7] text-[#1A1A1A] hover:bg-[#F4F1EC]'
            }`}
            title="Add to Wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Toggle Compare */}
          <button
            onClick={() => onToggleCompare(product)}
            className={`p-3 rounded-full shadow-lg cursor-pointer transition-all hover:scale-110 ${
              isCompared ? 'bg-[#A68B67] text-white' : 'bg-[#FDFBF7] text-[#1A1A1A] hover:bg-[#F4F1EC]'
            }`}
            title="Compare Product"
          >
            <Layers className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Metadata & Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-[#A68B67]">
          <span>{product.category}</span>
          <span>{product.size}</span>
        </div>

        <button
          onClick={() => onSelect(product)}
          className="mt-2 text-sm font-medium text-[#1A1A1A] hover:text-[#A68B67] transition-colors text-left font-sans tracking-wide leading-snug cursor-pointer"
        >
          {product.name}
        </button>

        <p className="mt-1 text-xs text-[#5C564F] line-clamp-2 leading-relaxed">
          {product.subtitle}
        </p>

        {/* Star Rating */}
        <div className="mt-3 flex items-center gap-1">
          <div className="flex text-[#A68B67]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-stone-500">({product.reviewsCount})</span>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#E8E1D5]">
          <div className="flex items-baseline gap-1.5">
            {product.priceTHB ? (
              product.discountPriceTHB ? (
                <>
                  <span className="text-base font-semibold text-[#1A1A1A]">฿{product.discountPriceTHB}</span>
                  <span className="text-xs text-stone-400 line-through">฿{product.priceTHB}</span>
                </>
              ) : (
                <span className="text-base font-semibold text-[#1A1A1A]">฿{product.priceTHB}</span>
              )
            ) : product.discountPrice ? (
              <>
                <span className="text-base font-semibold text-[#1A1A1A]">${product.discountPrice}</span>
                <span className="text-xs text-stone-400 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-base font-semibold text-[#1A1A1A]">${product.price}</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 rounded-full bg-[#1A1A1A] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-[#A68B67] transition-colors cursor-pointer"
          >
            <ShoppingCart className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
