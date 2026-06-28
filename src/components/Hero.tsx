import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Sparkles, Award, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenRoutineBuilder: () => void;
}

export default function Hero({ onExploreProducts, onOpenRoutineBuilder }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] py-20 sm:py-28 border-b border-[#E8E1D5]">
      {/* Background Ambience / Parallax Accents */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-radial-gradient">
        <div className="absolute -top-48 left-1/3 h-96 w-96 rounded-full bg-[#F4F1EC] blur-3xl" />
        <div className="absolute top-1/2 right-10 h-72 w-72 rounded-full bg-[#E8E1D5]/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#A68B67]/30 bg-[#A68B67]/5 px-3.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#A68B67]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE SCIENCE OF SUBTLETY</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-light tracking-tight text-[#1A1A1A] sm:text-6xl lg:text-[5rem] font-sans leading-none"
            >
              Refined for the <br />
              <span className="font-serif italic font-normal text-[#A68B67]">Modern Skin State.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-xl text-base text-[#5C564F] font-sans font-light leading-relaxed"
            >
              Botanical efficiency met with clinical precision. Formulated in Switzerland, inspired by the resilient longevity of the almond. LMOND pairs bio-identical active molecules with premium clinical lipids.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={onExploreProducts}
                className="group flex items-center gap-2 rounded-full bg-[#1A1A1A] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-opacity-85 transition-all shadow-lg shadow-stone-950/10 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenRoutineBuilder}
                className="flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-transparent px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1A1A1A] hover:bg-[#F4F1EC] transition-all cursor-pointer"
              >
                <span>Routine Builder</span>
              </button>
            </motion.div>

            {/* Micro Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 border-t border-[#E8E1D5] pt-8 max-w-lg"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#A68B67]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C564F]">Dermatologist Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#A68B67]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C564F]">100% Certified Vegan</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-[#A68B67]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C564F]">Cruelty-Free Science</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Display Grid */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl border border-[#E8E1D5]"
            >
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600"
                alt="LMOND Skincare Elixirs and Hydrators"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/80 p-4 backdrop-blur-md border border-white/50 text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Featured Concentrate</p>
                <p className="text-sm font-medium text-[#1A1A1A] mt-0.5">LMOND Refining Face Cleanser</p>
                <p className="text-xs text-[#5C564F] mt-1">Squalane and Centella soothe redness, leaving skin clean, plumped, and thoroughly prepared.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
