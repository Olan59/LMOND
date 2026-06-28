import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import { FAQ } from '../types';

interface FAQViewProps {
  faqs: FAQ[];
}

export default function FAQView({ faqs }: FAQViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-transparent text-[#1A1A1A] font-sans">
      
      {/* Editorial Header */}
      <div className="border-b border-[#E8E1D5] pb-8 mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">CUSTOMER CONCIERGE</span>
        <h1 className="text-4xl font-light tracking-tight text-[#1A1A1A] font-sans mt-1">Frequently Asked Questions</h1>
        <p className="text-sm text-[#5C564F] mt-2 font-sans font-light max-w-xl leading-relaxed">
          Detailed biomedical, layering, and delivery guidelines designed to guide your daily botanical journey.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl border border-[#E8E1D5] bg-[#FDFBF7] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#F4F1EC] cursor-pointer"
              >
                <span className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#A68B67]" />
                  {faq.question}
                </span>
                <ChevronDown className={`h-4 w-4 text-[#5C564F] transition-transform ${isOpen ? 'rotate-180 text-[#1A1A1A]' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border-t border-[#E8E1D5] text-xs sm:text-sm text-[#5C564F] font-sans font-light leading-relaxed prose max-w-none bg-[#F4F1EC]">
                      <p>{faq.answer}</p>
                      
                      {/* Safety category warning details */}
                      {faq.category === 'Ingredients' && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[#A68B67] bg-[#FDFBF7] border border-[#A68B67]/20 px-2.5 py-1 rounded-md font-medium">
                          <AlertCircle className="h-3.5 w-3.5 text-[#A68B67]" />
                          <span>Always patch test new formulas behind your neck before active face layers.</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Side Help block */}
      <div className="mt-12 p-6 rounded-3xl bg-[#1A1A1A] text-[#FDFBF7] text-center space-y-3">
        <Sparkles className="h-6 w-6 text-[#A68B67] mx-auto" />
        <h3 className="text-base font-semibold">Still have clinical formulation questions?</h3>
        <p className="text-xs text-[#F4F1EC] max-w-md mx-auto">
          Our in-house estheticians and chemical formulators are ready to review your skin profile. Enter our interactive Routine Builder or connect via customer lines.
        </p>
      </div>

    </div>
  );
}
