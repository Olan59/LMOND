import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldCheck, HelpCircle, Layers, Check, X, Sparkles, BookOpen, Star, AlertTriangle, Play, RefreshCw } from 'lucide-react';
import { Ingredient, Product } from '../types';

interface IngredientLibraryViewProps {
  ingredients: Ingredient[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (ingName: string) => void;
  selectedIngFromDetails?: Ingredient | null;
}

export default function IngredientLibraryView({
  ingredients,
  products,
  onSelectProduct,
  favorites,
  onToggleFavorite,
  selectedIngFromDetails
}: IngredientLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | 'ALL'>('ALL');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(
    selectedIngFromDetails || ingredients[0] || null
  );

  // Sync state if selected from parent / detail page
  useEffect(() => {
    if (selectedIngFromDetails) {
      setSelectedIngredient(selectedIngFromDetails);
    }
  }, [selectedIngFromDetails]);

  // Comparison State
  const [compareList, setCompareList] = useState<Ingredient[]>([]);
  const [interactionResult, setInteractionResult] = useState<string>('');
  const [comparingAI, setComparingAI] = useState<boolean>(false);

  // AI Ingredient Explainer / Custom Input State
  const [customIngredients, setCustomIngredients] = useState<string>('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const alphabet = 'ABCDEFGHIJKLMNOPethylst'.split(''); // standard letters or simple search
  const uniqueLetters = ['ALL', ...Array.from(new Set(ingredients.map(i => i.name[0].toUpperCase()))).sort()];

  // Filtering ingredients list
  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = 
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ing.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLetter = 
      selectedLetter === 'ALL' || 
      ing.name[0].toUpperCase() === selectedLetter;

    return matchesSearch && matchesLetter;
  });

  const handleToggleCompare = (ing: Ingredient) => {
    if (compareList.some(i => i.name === ing.name)) {
      setCompareList(compareList.filter(i => i.name !== ing.name));
    } else {
      if (compareList.length >= 2) {
        // limit to 2 for comparison
        setCompareList([compareList[1], ing]);
      } else {
        setCompareList([...compareList, ing]);
      }
    }
  };

  // Call Express API to analyze custom user ingredient inputs
  const handleAIAnalyze = async () => {
    if (!customIngredients.trim()) return;
    setAiLoading(true);
    setAiAnalysisResult('');

    try {
      const res = await fetch('/api/ai/ingredient-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: customIngredients })
      });
      const data = await res.json();
      if (res.ok) {
        setAiAnalysisResult(data.analysis);
      } else {
        setAiAnalysisResult(`Scientific Analysis Error: ${data.error}`);
      }
    } catch (err) {
      setAiAnalysisResult("Unable to connect to the LMOND Scientific Database. Please verify your internet connection and API key.");
    } finally {
      setAiLoading(false);
    }
  };

  // Call Express API to compare two ingredients and check interactions
  const handleCompareAndAnalyze = async () => {
    if (compareList.length < 2) return;
    setComparingAI(true);
    setInteractionResult('');

    const compareNames = `${compareList[0].name} and ${compareList[1].name}`;

    try {
      const res = await fetch('/api/ai/ingredient-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: `A scientific comparison and formulation compatibility check between ${compareNames}. Explain if they can be layered together or used in the same daily routine, and what the synergistic results or adverse effects would be.` })
      });
      const data = await res.json();
      if (res.ok) {
        setInteractionResult(data.analysis);
      } else {
        setInteractionResult(`Analysis error: ${data.error}`);
      }
    } catch (err) {
      setInteractionResult("Failed to complete formulation check. Verify Server connection.");
    } finally {
      setComparingAI(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-transparent text-[#1A1A1A]">
      
      {/* Editorial Header */}
      <div className="border-b border-[#E8E1D5] pb-8 mb-8">
        <h1 className="text-4xl font-light tracking-tight text-[#1A1A1A] font-sans">The Botanical Science Library</h1>
        <p className="text-sm text-[#5C564F] mt-2 font-sans font-light max-w-2xl leading-relaxed">
          At LMOND, transparency is absolute. Explore the clinical profiles, cellular mechanisms, synergistic pairings, and safety limits of our active compounds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: A-Z Browsing, Search, and Ingredients Catalog List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-[#E8E1D5] bg-[#FDFBF7] p-6 space-y-4 shadow-sm">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-[#A68B67]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search compounds (e.g. Retinol)..."
                className="w-full rounded-full border border-[#E8E1D5] bg-white pl-10 pr-4 py-2.5 text-xs outline-none focus:border-[#A68B67] transition-colors"
              />
            </div>

            {/* A-Z Index filters */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Alphabetical Index</span>
              <div className="flex flex-wrap gap-1">
                {uniqueLetters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`rounded-md h-7 px-2 text-[10px] font-semibold transition-all cursor-pointer ${
                      selectedLetter === letter 
                        ? 'bg-[#1A1A1A] text-[#FDFBF7]' 
                        : 'bg-[#F4F1EC] text-[#5C564F] hover:bg-[#E8E1D5]'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Catalog List */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Botanical Catalog ({filteredIngredients.length})</span>
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
              {filteredIngredients.map((ing) => {
                const isFavorite = favorites.includes(ing.name);
                const isCompared = compareList.some(i => i.name === ing.name);

                return (
                  <div
                    key={ing.name}
                    className={`group rounded-2xl border p-4 transition-all text-left cursor-pointer ${
                      selectedIngredient?.name === ing.name
                        ? 'bg-white border-[#A68B67] shadow-sm'
                        : 'bg-white border-[#E8E1D5] hover:border-[#A68B67]'
                    }`}
                    onClick={() => setSelectedIngredient(ing)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#A68B67] transition-colors">
                          {ing.name}
                        </h3>
                        <p className="text-[10px] italic text-[#5C564F] mt-0.5">{ing.scientificName}</p>
                      </div>

                      {/* Side Actions (Favorite and Compare Toggle) */}
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleFavorite(ing.name)}
                          className={`p-1.5 rounded-full hover:bg-[#F4F1EC] ${
                            isFavorite ? 'text-red-500' : 'text-[#E8E1D5] hover:text-[#5C564F]'
                          }`}
                          title="Save to favorites"
                        >
                          <Star className="h-3.5 w-3.5 fill-current" />
                        </button>

                        <button
                          onClick={() => handleToggleCompare(ing)}
                          className={`p-1.5 rounded-full hover:bg-[#F4F1EC] ${
                            isCompared ? 'text-[#A68B67]' : 'text-[#E8E1D5] hover:text-[#5C564F]'
                          }`}
                          title="Compare compound"
                        >
                          <Layers className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-semibold">
                      <span className="bg-[#F4F1EC] text-[#5C564F] px-2 py-0.5 rounded">
                        {ing.naturalSynthetic}
                      </span>
                      <span className="text-[#A68B67] bg-[#FDFBF7] border border-[#A68B67]/25 px-2 py-0.5 rounded">
                        Conc: {ing.concentration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Selected Ingredient Deep-Dive */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {selectedIngredient ? (
              <motion.div
                key={selectedIngredient.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-[#E8E1D5] bg-[#FDFBF7] p-6 shadow-sm space-y-6 text-left"
              >
                {/* Title Card */}
                <div className="border-b border-[#E8E1D5] pb-4 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Molecular Compound Data</span>
                    <h2 className="text-2xl font-light text-[#1A1A1A] mt-1">{selectedIngredient.name}</h2>
                    <p className="text-xs italic text-[#5C564F] mt-0.5">INCI: {selectedIngredient.inciName}</p>
                  </div>
                  <span className="rounded-full bg-[#FDFBF7] border border-[#A68B67]/25 px-3.5 py-1 text-[10px] font-bold text-[#A68B67]">
                    {selectedIngredient.concentration} Optimal
                  </span>
                </div>

                {/* Narrative Description */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67]">Chemical Summary</span>
                  <p className="text-xs leading-relaxed text-[#5C564F] font-sans font-light">
                    {selectedIngredient.description}
                  </p>
                </div>

                {/* Cellular Mechanism */}
                <div className="space-y-2 rounded-2xl bg-[#F4F1EC] p-4 border border-[#E8E1D5]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Epidermal Cellular Mechanism
                  </span>
                  <p className="text-xs leading-relaxed text-[#5C564F] font-sans font-light">
                    {selectedIngredient.mechanism}
                  </p>
                </div>

                {/* Core Benefits */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67]">Primary Cutaneous Benefits</span>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedIngredient.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#5C564F]">
                        <Check className="h-3.5 w-3.5 text-[#A68B67] mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Synergistic Compatibilities & Adverse limits */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#E8E1D5] pt-5">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Synergizes With</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedIngredient.compatibleWith.map(c => (
                        <span key={c} className="text-[9px] font-medium bg-[#F4F1EC] text-[#1A1A1A] border border-[#E8E1D5] px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Incompatibilities</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedIngredient.incompatibleWith.length > 0 ? (
                        selectedIngredient.incompatibleWith.map(i => (
                          <span key={i} className="text-[9px] font-medium bg-[#FDFBF7] text-[#1A1A1A] border border-[#A68B67]/30 px-2 py-0.5 rounded flex items-center gap-1">
                            <AlertTriangle className="h-2.5 w-2.5 text-[#A68B67]" />
                            {i}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] text-[#5C564F]">Virtually universally stable</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Safety & Botanical Origin */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#E8E1D5] pt-5">
                  <div className="text-left">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Safety Rating</span>
                    <p className="text-xs font-semibold text-[#1A1A1A] mt-1">{selectedIngredient.safety}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Synthesis Origin</span>
                    <p className="text-xs font-semibold text-[#1A1A1A] mt-1">{selectedIngredient.origin} ({selectedIngredient.naturalSynthetic})</p>
                  </div>
                </div>

                {/* Products Using This Ingredient */}
                <div className="border-t border-[#E8E1D5] pt-5 text-left space-y-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">LMOND Formulations Using This Molecule</span>
                  <div className="flex flex-col gap-2">
                    {products.filter(p => p.ingredients.includes(selectedIngredient.name)).map(p => (
                      <button
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        className="flex items-center justify-between w-full p-2.5 bg-[#F4F1EC] hover:bg-[#E8E1D5] border border-[#E8E1D5] rounded-xl transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="h-8 w-8 object-cover rounded" referrerPolicy="no-referrer" />
                          <div className="text-left">
                            <p className="text-xs font-medium text-[#1A1A1A]">{p.name}</p>
                            <p className="text-[9px] text-[#5C564F]">{p.subtitle}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#1A1A1A]">${p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-[#FDFBF7] border border-[#E8E1D5] rounded-3xl text-[#5C564F]">
                <p>Select an active molecule to analyze.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Interactive Tools (Comparison Panel & AI Scanner) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TOOL 1: Molecular Comparison Engine */}
          <div className="rounded-3xl border border-[#E8E1D5] bg-[#FDFBF7] p-5 shadow-sm space-y-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-[#A68B67]" />
              Active Comparison Engine
            </span>
            <p className="text-[11px] text-[#5C564F] font-light leading-relaxed">
              Compare any two compounds to evaluate their chemical synergies, safety overlays, and formulation compatibility.
            </p>

            <div className="space-y-3">
              {compareList.length === 0 ? (
                <div className="py-4 text-center text-[10px] text-[#5C564F] border border-dashed rounded-xl border-[#E8E1D5]">
                  Select compounds from catalog to compare
                </div>
              ) : (
                <div className="space-y-2">
                  {compareList.map(ing => (
                    <div key={ing.name} className="flex items-center justify-between p-2.5 bg-white border border-[#E8E1D5] rounded-xl text-xs">
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">{ing.name}</p>
                        <p className="text-[9px] text-[#5C564F]">{ing.scientificName}</p>
                      </div>
                      <button onClick={() => handleToggleCompare(ing)} className="text-[#5C564F] hover:text-[#1A1A1A]">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {compareList.length === 2 && (
                <button
                  onClick={handleCompareAndAnalyze}
                  disabled={comparingAI}
                  className="w-full h-9 flex items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#1A1A1A]/90 text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {comparingAI ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Checking Formulation...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-[#A68B67]" />
                      <span>Check Compatibility</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Comparison Outcome */}
            {interactionResult && (
              <div className="p-3.5 bg-[#F4F1EC] border border-[#E8E1D5] rounded-2xl space-y-2 text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Formulation Outcome</span>
                <div className="text-[11px] leading-relaxed text-[#5C564F] font-light prose overflow-y-auto max-h-48 whitespace-pre-line font-sans">
                  {interactionResult}
                </div>
              </div>
            )}
          </div>

          {/* TOOL 2: AI Third-Party Ingredient Scanner */}
          <div className="rounded-3xl border border-[#E8E1D5] bg-[#FDFBF7] p-5 shadow-sm space-y-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67] flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-[#A68B67]" />
              AI Custom Ingredient Scanner
            </span>
            <p className="text-[11px] text-[#5C564F] font-light leading-relaxed">
              Have an ingredient label from another product? Paste it below to run a clinical analysis on cellular mechanisms, toxic synergies, or barrier suitability.
            </p>

            <div className="space-y-3">
              <textarea
                value={customIngredients}
                onChange={(e) => setCustomIngredients(e.target.value)}
                placeholder="Paste ingredients label (e.g., L-Ascorbic Acid, Glycerin, Phenoxyethanol...)"
                rows={3}
                className="w-full rounded-xl border border-[#E8E1D5] p-2.5 text-xs outline-none focus:border-[#A68B67] bg-white font-sans"
              />

              <button
                onClick={handleAIAnalyze}
                disabled={aiLoading}
                className="w-full h-9 flex items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] text-[#FDFBF7] hover:bg-[#1A1A1A]/90 text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {aiLoading ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Analyzing formula...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" />
                    <span>Scan Ingredient Label</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Custom Outcome */}
            {aiAnalysisResult && (
              <div className="p-4 bg-[#F4F1EC] rounded-2xl border border-[#E8E1D5] space-y-2 text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block">Scan Diagnostics</span>
                <div className="text-[11px] leading-relaxed text-[#5C564F] font-light prose overflow-y-auto max-h-48 whitespace-pre-line font-sans">
                  {aiAnalysisResult}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
