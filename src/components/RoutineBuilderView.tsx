import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Check, CheckCircle, RefreshCw, Calendar, DollarSign, Clock, HelpCircle, Save, ShoppingBag } from 'lucide-react';
import { Product, SavedRoutine, RoutineStep } from '../types';

interface RoutineBuilderViewProps {
  products: Product[];
  onSaveRoutine: (routine: SavedRoutine) => void;
  onAddAllToCart: (products: Product[]) => void;
}

export default function RoutineBuilderView({
  products,
  onSaveRoutine,
  onAddAllToCart
}: RoutineBuilderViewProps) {
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [complexity, setComplexity] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  // AI Output State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRoutineResult, setAiRoutineResult] = useState<string>('');
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [routineSaved, setRoutineSaved] = useState(false);

  const skinTypes = [
    { id: 'dry', label: 'Dry / Dehydrated', desc: 'Flaky skin, tightness, fine surface lines' },
    { id: 'oily', label: 'Oily / Congested', desc: 'Excess sebum, visible pores, blackheads' },
    { id: 'combination', label: 'Combination', desc: 'Oily T-zone, dry or normal cheeks' },
    { id: 'sensitive', label: 'Highly Sensitive', desc: 'Prone to redness, burning, eczema flareups' }
  ];

  const ages = ['Under 25', '25 - 34', '35 - 49', '50+'];

  const concernsList = [
    { id: 'Acne', label: 'Acne & Congestion' },
    { id: 'Aging', label: 'Fine Lines & Wrinkles' },
    { id: 'Sensitivity', label: 'Redness & Irritation' },
    { id: 'Dryness', label: 'Flaking & Dehydration' },
    { id: 'Large Pores', label: 'Visible / Dilated Pores' },
    { id: 'Dark Spots', label: 'Hyperpigmentation & Sun damage' }
  ];

  const goalsList = [
    'Smoother Texture',
    'Epidermal Firmness',
    'Deep Hydration Locking',
    'Calmed Surface Redness',
    'Clear Follicle Congestion',
    'Radiant Glass Skin Glow'
  ];

  const complexities = [
    { id: 'Minimalist (2 steps)', label: 'Minimalist', desc: 'Cleanse + Moisturize. Fast and effective.' },
    { id: 'Standard (3-4 steps)', label: 'Standard', desc: 'Cleanse + Treat + Hydrate. Complete balancing.' },
    { id: 'Advanced (5+ steps)', label: 'Advanced', desc: 'The full clinical layering. Maximizes results.' }
  ];

  const budgets = [
    { id: 'budget-conscious', label: 'Conscious Essential', desc: 'Focus strictly on necessary actives' },
    { id: 'flexible', label: 'Flexible / Complete Care', desc: 'Invest in multi-depth clinical recovery' }
  ];

  const handleConcernToggle = (concernId: string) => {
    if (concerns.includes(concernId)) {
      setConcerns(concerns.filter(c => c !== concernId));
    } else {
      setConcerns([...concerns, concernId]);
    }
  };

  const handleGoalToggle = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  // Run Gemini Routine Recommendation AI API
  const handleBuildRoutine = async () => {
    setAiLoading(true);
    setAiRoutineResult('');
    setRoutineSaved(false);

    const profile = {
      skinType,
      age: ageGroup,
      concerns,
      goals,
      complexity,
      budget
    };

    try {
      const res = await fetch('/api/ai/routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      const data = await res.json();
      
      if (res.ok) {
        setAiRoutineResult(data.recommendation);
        
        // Dynamically select products matching concerns from local mock products
        const matched = products.filter(p => 
          p.concern === concerns[0] || 
          p.concern === concerns[1] ||
          p.ingredients.some(ing => concerns.includes(ing)) ||
          p.category === 'Cleanser' || 
          p.category === 'Moisturizer'
        );
        
        const finalMatches = matched.length > 0 ? matched.slice(0, 4) : products.slice(0, 3);
        setRecommendedProducts(finalMatches);
        
        const cost = finalMatches.reduce((sum, p) => sum + (p.discountPrice || p.price), 0);
        setEstimatedCost(cost);
        setStep(7); // Show results page
      } else {
        alert(`AI Generation error: ${data.error}`);
      }
    } catch (err) {
      alert("Unable to reach the LMOND Digital Lab. Please ensure your Express dev server and Gemini API keys are active.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveToDashboard = () => {
    if (routineSaved) return;

    // Build Mock Steps structure
    const steps: RoutineStep[] = [
      { time: 'Morning', order: 1, productId: recommendedProducts[0]?.id || 'cleanser-01', instruction: 'Apply to damp skin, wash gently.' },
      { time: 'Morning', order: 2, productId: recommendedProducts[1]?.id || 'serum-niacinamide', instruction: 'Pat onto dry skin before heavier creams.' },
      { time: 'Night', order: 1, productId: recommendedProducts[0]?.id || 'cleanser-01', instruction: 'Deep cleanse to melt impurities.' },
      { time: 'Night', order: 2, productId: recommendedProducts[2]?.id || 'moisturizer-squalane', instruction: 'Lock in moisture lipid barrier.' }
    ];

    onSaveRoutine({
      id: `rot-${Date.now()}`,
      name: `${skinType.toUpperCase()} Recovery Regime`,
      skinType,
      goals,
      complexity,
      steps,
      estimatedMonthlyCost: estimatedCost,
      createdAt: new Date().toLocaleDateString()
    });

    setRoutineSaved(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-transparent text-[#1A1A1A]">
      
      {/* Wizard Card Stage */}
      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FDFBF7] p-6 sm:p-10 shadow-sm relative overflow-hidden">
        
        {/* Subtle Progress Bar */}
        {step < 7 && (
          <div className="absolute top-0 left-0 h-1 bg-[#F4F1EC] w-full">
            <motion.div 
              className="h-full bg-[#A68B67]" 
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Dynamic Questionnaire Steps */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Skin Type */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Step 1 of 6</span>
                <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">Define your biological skin type</h2>
                <p className="text-xs text-[#5C564F] font-light leading-relaxed">Select the option that best mirrors how your face feels 1 hour after cleansing without applying products.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSkinType(type.id)}
                    className={`rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                      skinType === type.id 
                        ? 'border-[#A68B67] bg-[#F4F1EC] shadow-sm' 
                        : 'border-[#E8E1D5] hover:border-[#A68B67] bg-white'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#1A1A1A]">{type.label}</p>
                    <p className="mt-1 text-xs text-[#5C564F] font-light leading-snug">{type.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  disabled={!skinType}
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-opacity-90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Age Range */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Step 2 of 6</span>
                <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">Select your current age category</h2>
                <p className="text-xs text-[#5C564F] font-light leading-relaxed">Our skin barrier behaves differently across different life cycles. This helps determine cellular turn-over pacing.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {ages.map((age) => (
                  <button
                    key={age}
                    onClick={() => setAgeGroup(age)}
                    className={`rounded-2xl border p-5 text-center transition-all cursor-pointer text-sm font-semibold ${
                      ageGroup === age 
                        ? 'border-[#A68B67] bg-[#F4F1EC] text-[#1A1A1A]' 
                        : 'border-[#E8E1D5] hover:border-[#A68B67] bg-white text-[#5C564F]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#E8E1D5]">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E8E1D5] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#5C564F] hover:bg-[#F4F1EC] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  disabled={!ageGroup}
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-opacity-90 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Skin Concerns */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Step 3 of 6</span>
                <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">Select your main skin concerns</h2>
                <p className="text-xs text-[#5C564F] font-light leading-relaxed">Choose up to 3 topics. We will prioritize these during clinical ingredient mapping.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {concernsList.map((con) => {
                  const active = concerns.includes(con.id);
                  return (
                    <button
                      key={con.id}
                      onClick={() => handleConcernToggle(con.id)}
                      className={`rounded-2xl border p-4 text-left transition-all cursor-pointer flex items-center justify-between ${
                        active 
                          ? 'border-[#A68B67] bg-[#F4F1EC] font-semibold text-[#1A1A1A]' 
                          : 'border-[#E8E1D5] hover:border-[#A68B67] bg-white text-[#5C564F]'
                      }`}
                    >
                      <span className="text-xs">{con.label}</span>
                      {active && <CheckCircle className="h-4 w-4 text-[#A68B67]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#E8E1D5]">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E8E1D5] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#5C564F] hover:bg-[#F4F1EC] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  disabled={concerns.length === 0}
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-opacity-90 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Skin Goals */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Step 4 of 6</span>
                <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">What are your absolute goals?</h2>
                <p className="text-xs text-[#5C564F] font-light leading-relaxed">What represents the ultimate success parameter for your daily skincare regimen?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goalsList.map((goal) => {
                  const active = goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`rounded-2xl border p-4 text-left transition-all cursor-pointer flex items-center justify-between ${
                        active 
                          ? 'border-[#A68B67] bg-[#F4F1EC] font-semibold text-[#1A1A1A]' 
                          : 'border-[#E8E1D5] hover:border-[#A68B67] bg-white text-[#5C564F]'
                      }`}
                    >
                      <span className="text-xs">{goal}</span>
                      {active && <CheckCircle className="h-4 w-4 text-[#A68B67]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#E8E1D5]">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E8E1D5] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#5C564F] hover:bg-[#F4F1EC] cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  disabled={goals.length === 0}
                  onClick={() => setStep(5)}
                  className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-opacity-90 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Routine Complexity */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Step 5 of 6</span>
                <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">Choose your desired routine complexity</h2>
                <p className="text-xs text-[#5C564F] font-light leading-relaxed">Some clients prefer a fast daily process, others love the ritual of advanced clinical layering.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {complexities.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setComplexity(comp.id)}
                    className={`rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                      complexity === comp.id 
                        ? 'border-[#A68B67] bg-[#F4F1EC] text-[#1A1A1A]' 
                        : 'border-[#E8E1D5] hover:border-[#A68B67] bg-white text-[#5C564F]'
                    }`}
                  >
                    <p className="text-sm font-semibold">{comp.label}</p>
                    <p className="mt-1 text-xs font-light">{comp.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#E8E1D5]">
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E8E1D5] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#5C564F] hover:bg-[#F4F1EC] cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  disabled={!complexity}
                  onClick={() => setStep(6)}
                  className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-opacity-90 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Budget Allocation & AI Fire Trigger */}
          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Step 6 of 6</span>
                <h2 className="text-3xl font-light text-[#1A1A1A] font-sans">Formula budgeting preference</h2>
                <p className="text-xs text-[#5C564F] font-light leading-relaxed">This aligns clinical recommendations to essential high-impact products or complete preventative coverage.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={`rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                      budget === b.id 
                        ? 'border-[#A68B67] bg-[#F4F1EC] text-[#1A1A1A]' 
                        : 'border-[#E8E1D5] hover:border-[#A68B67] bg-white text-[#5C564F]'
                    }`}
                  >
                    <p className="text-sm font-semibold">{b.label}</p>
                    <p className="mt-1 text-xs font-light">{b.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#E8E1D5]">
                <button
                  onClick={() => setStep(5)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E8E1D5] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#5C564F] hover:bg-[#F4F1EC] cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  disabled={!budget || aiLoading}
                  onClick={handleBuildRoutine}
                  className="flex items-center justify-center gap-2 h-11 px-8 rounded-full bg-[#A68B67] text-white text-xs font-semibold uppercase tracking-widest hover:bg-opacity-90 transition-colors cursor-pointer"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Distilling Regime...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Generate AI Routine</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: Results Page (Beautifully Designed output!) */}
          {step === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Output Header */}
              <div className="border-b border-[#E8E1D5] pb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Your Clinical Formulation</span>
                  <h2 className="text-2xl font-light text-[#1A1A1A] mt-1 font-sans">Bespoke Skincare Regime</h2>
                  <p className="text-xs text-[#5C564F] font-sans mt-0.5">Optimized for {skinType} skin based on your cellular goals.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveToDashboard}
                    disabled={routineSaved}
                    className={`flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                      routineSaved 
                        ? 'border-emerald-600 text-emerald-800 bg-emerald-50/60' 
                        : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all'
                    }`}
                  >
                    {routineSaved ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Saved to Profile</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save to Profile</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onAddAllToCart(recommendedProducts);
                      alert("All recommended formulations successfully added to your Cart!");
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] text-white hover:bg-opacity-90 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Buy Complete Routine</span>
                  </button>
                </div>
              </div>

              {/* Core Stats Overview */}
              <div className="grid grid-cols-3 gap-4 bg-[#F4F1EC] p-4 rounded-2xl border border-[#E8E1D5] text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="h-4 w-4 text-[#A68B67]" />
                  <span className="text-[9px] uppercase tracking-wider text-[#5C564F] mt-1">Duration</span>
                  <p className="text-xs font-semibold text-[#1A1A1A]">28 Days Clinical Cycle</p>
                </div>
                <div className="flex flex-col items-center">
                  <DollarSign className="h-4 w-4 text-[#A68B67]" />
                  <span className="text-[9px] uppercase tracking-wider text-[#5C564F] mt-1">Monthly Cost</span>
                  <p className="text-xs font-semibold text-[#1A1A1A]">${estimatedCost.toFixed(2)} USD</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-4 w-4 text-[#A68B67]" />
                  <span className="text-[9px] uppercase tracking-wider text-[#5C564F] mt-1">Daily Prep Time</span>
                  <p className="text-xs font-semibold text-[#1A1A1A]">~5 mins / day</p>
                </div>
              </div>

              {/* Main AI Text Recommendation Deep-dive */}
              <div className="rounded-2xl border border-[#E8E1D5] bg-[#FDFBF7] p-6 shadow-sm text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#A68B67] block mb-4 border-b border-[#E8E1D5] pb-2">Clinical Scientific Analysis</span>
                <div className="text-xs leading-relaxed text-[#5C564F] font-light prose whitespace-pre-line font-sans max-h-[450px] overflow-y-auto pr-2">
                  {aiRoutineResult}
                </div>
              </div>

              {/* Recommended Product Cards List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67] block text-left">Recommended Formulation Kit</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {recommendedProducts.map(prod => (
                    <div key={prod.id} className="flex gap-3 bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E8E1D5] items-center text-left">
                      <img src={prod.image} alt={prod.name} className="h-14 w-14 object-cover rounded-xl" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1A1A1A] truncate">{prod.name}</p>
                        <p className="text-[10px] text-[#5C564F] truncate">{prod.subtitle}</p>
                        <p className="text-xs font-semibold text-[#1A1A1A] mt-1">${prod.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restart Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={() => {
                    setStep(1);
                    setSkinType('');
                    setAgeGroup('');
                    setConcerns([]);
                    setGoals([]);
                    setComplexity('');
                    setBudget('');
                  }}
                  className="rounded-full border border-[#E8E1D5] bg-white hover:bg-[#F4F1EC] px-6 py-2.5 text-xs uppercase tracking-widest text-[#5C564F] font-semibold cursor-pointer"
                >
                  Restart AI Consultation
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
