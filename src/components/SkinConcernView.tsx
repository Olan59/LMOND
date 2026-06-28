import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, BookOpen, Sparkles, HelpCircle, ArrowRight, UserCheck, Heart } from 'lucide-react';
import { SkinConcern, Product, Ingredient } from '../types';

interface SkinConcernViewProps {
  concerns: SkinConcern[];
  products: Product[];
  ingredients: Ingredient[];
  onSelectProduct: (product: Product) => void;
  onSelectIngredientByName: (name: string) => void;
}

export default function SkinConcernView({
  concerns,
  products,
  ingredients,
  onSelectProduct,
  onSelectIngredientByName
}: SkinConcernViewProps) {
  const [activeConcern, setActiveConcern] = useState<SkinConcern>(concerns[0] || {} as SkinConcern);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-transparent text-[#1A1A1A]">
      
      {/* Editorial Header */}
      <div className="border-b border-[#E8E1D5] pb-8 mb-8">
        <h1 className="text-4xl font-light tracking-tight text-[#1A1A1A] font-sans">The Skin Concern Directory</h1>
        <p className="text-sm text-[#5C564F] mt-2 font-sans font-light max-w-2xl leading-relaxed">
          Select a skin concern to analyze its epidermal symptoms, underlying biological causes, and custom clinical routines designed to restore cellular balance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Concerns List */}
        <div className="lg:col-span-3 space-y-2">
          {concerns.map((con) => (
            <button
              key={con.id}
              onClick={() => setActiveConcern(con)}
              className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer flex items-center justify-between ${
                activeConcern.id === con.id
                  ? 'border-[#A68B67] bg-[#F4F1EC] font-semibold text-[#1A1A1A] shadow-sm'
                  : 'border-[#E8E1D5] bg-white text-[#5C564F] hover:border-[#A68B67]'
              }`}
            >
              <div>
                <span className="text-xs">{con.name}</span>
              </div>
              <ArrowRight className={`h-3 w-3 text-[#5C564F] transition-transform ${
                activeConcern.id === con.id ? 'translate-x-1 text-[#A68B67]' : ''
              }`} />
            </button>
          ))}
        </div>

        {/* Right Side: Deep-Dive Bento Layout */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeConcern && (
              <motion.div
                key={activeConcern.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Introduction banner */}
                <div className="rounded-3xl bg-[#FDFBF7] border border-[#E8E1D5] p-6 sm:p-8 shadow-sm space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4" />
                    Clinical Concern Diagnostics
                  </span>
                  <h2 className="text-2xl font-light text-[#1A1A1A] font-sans">{activeConcern.name}</h2>
                  <p className="text-xs leading-relaxed text-[#5C564F] font-sans font-light">
                    {activeConcern.description}
                  </p>
                </div>

                {/* Grid for Symptoms and Causes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Symptoms Card */}
                  <div className="rounded-3xl bg-[#FDFBF7] border border-[#E8E1D5] p-6 shadow-sm space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67]">Epidermal Symptoms</span>
                    <ul className="space-y-2">
                      {activeConcern.symptoms.map((sym, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#5C564F]">
                          <span className="h-1.5 w-1.5 bg-[#A68B67] rounded-full mt-1.5 flex-shrink-0" />
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Biological Causes */}
                  <div className="rounded-3xl bg-[#FDFBF7] border border-[#E8E1D5] p-6 shadow-sm space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67]">Biological Causes</span>
                    <ul className="space-y-2">
                      {activeConcern.causes.map((cause, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#5C564F] font-sans font-light">
                          <span className="h-1.5 w-1.5 bg-[#1A1A1A] rounded-full mt-1.5 flex-shrink-0" />
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Routine Explanation and Lifestyle Hacks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Routine Description */}
                  <div className="sm:col-span-2 rounded-3xl bg-[#1A1A1A] text-[#FDFBF7] p-6 shadow-sm space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      Regime Formulation Logic
                    </span>
                    <p className="text-xs leading-relaxed font-sans font-light text-[#F4F1EC]">
                      {activeConcern.routineExplanation}
                    </p>
                  </div>

                  {/* Lifestyle Tips */}
                  <div className="rounded-3xl bg-[#F4F1EC] border border-[#E8E1D5] p-6 shadow-sm space-y-3 text-[#1A1A1A]">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Lifestyle Tips
                    </span>
                    <ul className="space-y-2 text-xs font-light text-[#5C564F]">
                      {activeConcern.lifestyleTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Ingredients */}
                <div className="rounded-3xl bg-[#FDFBF7] border border-[#E8E1D5] p-6 shadow-sm space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67]">Synergistic Science Compounds</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeConcern.recommendedIngredientNames.map((ingName) => (
                      <button
                        key={ingName}
                        onClick={() => onSelectIngredientByName(ingName)}
                        className="rounded-full bg-white border border-[#E8E1D5] hover:border-[#A68B67] px-4 py-1.5 text-xs text-[#5C564F] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        {ingName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recommended Formulations */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Recommended LMOND Formulations</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.filter(p => activeConcern.recommendedProductIds.includes(p.id)).map((p) => (
                      <div
                        key={p.id}
                        className="flex gap-3.5 bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E8E1D5] items-center hover:border-[#A68B67] transition-all cursor-pointer text-left"
                        onClick={() => onSelectProduct(p)}
                      >
                        <img src={p.image} alt={p.name} className="h-14 w-14 object-cover rounded-xl" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1A1A1A] truncate">{p.name}</p>
                          <p className="text-[10px] text-[#5C564F] truncate">{p.subtitle}</p>
                          <p className="text-xs font-semibold text-[#1A1A1A] mt-1">${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
