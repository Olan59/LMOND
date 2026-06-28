import { Product, Ingredient, SkinConcern, Article, Review, FAQ, Coupon } from '../types';

export const mockIngredients: Ingredient[] = [
  {
    name: "Niacinamide",
    scientificName: "Niacinamide",
    inciName: "Niacinamide",
    description: "A highly stable form of Vitamin B3 that works to refine skin texture, reduce pore appearance, regulate sebum, and brighten uneven skin tone by preventing melanosome transfer.",
    benefits: [
      "Minimizes the appearance of enlarged pores",
      "Strengthens the skin's lipid barrier",
      "Reduces redness, blotchiness, and hyperpigmentation",
      "Regulates excess sebum production"
    ],
    mechanism: "Functions as a precursor to NADH and NADPH, which are crucial coenzymes for cellular energy production and lipid synthesis. It stimulates ceramides synthesis and increases keratinocyte differentiation.",
    safety: "Highly safe and tolerated by all skin types, including sensitive and rosacea-prone skin. It is non-acidic and does not cause flushing when formulated correctly.",
    origin: "Synthetic",
    naturalSynthetic: "Synthetic",
    concentration: "2% - 10%",
    researchReferences: [
      "Bissett, D. L., et al. (2005). Niacinamide: A B vitamin that improves aging facial skin appearance. Dermatologic Surgery.",
      "Gehring, W. (2004). Nicotinic acid/niacinamide and the skin. Journal of Cosmetic Dermatology."
    ],
    compatibleWith: ["Squalane", "Hyaluronic Acid", "Centella Asiatica", "Ceramides"],
    incompatibleWith: ["High Concentration L-Ascorbic Acid (Vitamin C)"]
  },
  {
    name: "Squalane",
    scientificName: "Squalane",
    inciName: "Squalane",
    description: "A saturated and stable hydrocarbon that mimics the skin's natural sebum, acting as an exceptional emollient to seal in moisture and prevent transepidermal water loss (TEWL) without clogging pores.",
    benefits: [
      "Provides weightless, non-comedogenic hydration",
      "Improves skin elasticity and suppleness",
      "Acts as an antioxidant to defend against environmental stress",
      "Calms irritation and smooths texture"
    ],
    mechanism: "Fills the intercellular spaces between peeling skin cells, restoring lipid balance and acting as a physical barrier to prevent hydration loss while optimizing penetration of other active ingredients.",
    safety: "Exceptionally safe. Because squalane is an inert, fully saturated lipid, it does not undergo oxidation and has low sensitization risk.",
    origin: "Sugarcane / Olive",
    naturalSynthetic: "Naturally Derived",
    concentration: "1% - 100%",
    researchReferences: [
      "Sethi, A., et al. (2016). Role of Moisturizers in Addressing Various Kinds of Dermatitis. Indian Journal of Dermatology.",
      "Wołosik, K., et al. (2013). Squalene and squalane: structures, safety, and dermatological applications."
    ],
    compatibleWith: ["Retinol", "Niacinamide", "Hyaluronic Acid", "Salicylic Acid"],
    incompatibleWith: []
  },
  {
    name: "Hyaluronic Acid",
    scientificName: "Sodium Hyaluronate",
    inciName: "Sodium Hyaluronate / Hyaluronic Acid",
    description: "A natural glycosaminoglycan found in skin connective tissue capable of holding up to 1,000 times its weight in water, drawing moisture from the atmosphere deep into the epidermis.",
    benefits: [
      "Delivers intense multi-depth hydration",
      "Plumps the skin to diminish fine lines",
      "Promotes wound healing and tissue repair",
      "Enhances soft, supple skin feel"
    ],
    mechanism: "Acts as a humectant. Different molecular weights penetrate different layers of the stratum corneum: high molecular weight hydrates the surface, while ultra-low molecular weight penetrates deeper for long-lasting plumping.",
    safety: "Extremely safe, non-irritating, and suitable for all skin types, including highly reactive or acne-prone skin.",
    origin: "Bio-fermentation of wheat/corn",
    naturalSynthetic: "Naturally Derived",
    concentration: "0.1% - 2.0%",
    researchReferences: [
      "Pavicic, T., et al. (2011). Efficacy of cream-based novel formulations of hyaluronic acid of different molecular weights in anti-wrinkle treatment. Journal of Clinical and Aesthetic Dermatology."
    ],
    compatibleWith: ["Niacinamide", "Retinol", "Vitamin C", "Squalane", "Ceramides"],
    incompatibleWith: []
  },
  {
    name: "Salicylic Acid (BHA)",
    scientificName: "Salicylic Acid",
    inciName: "Salicylic Acid",
    description: "A lipid-soluble beta-hydroxy acid that penetrates deeply into hair follicles to dissolve sebum and cellular debris, making it the gold standard for unclogging pores and preventing acne breakouts.",
    benefits: [
      "Exfoliates pore linings to treat and prevent blackheads",
      "Reduces acne-related inflammation and redness",
      "Promotes cellular turnover for smoother skin",
      "Helps balance excessive sebum secretion"
    ],
    mechanism: "Dissolves intercellular cement (desmosomes) holding dead skin cells together inside the follicle, allowing sebum to flow freely and reducing bacterial colonization.",
    safety: "Safe for oily and acne-prone skin. May cause mild drying or irritation if overused. Limit during pregnancy.",
    origin: "Willow Bark / Synthetic",
    naturalSynthetic: "Synthetic",
    concentration: "0.5% - 2.0%",
    researchReferences: [
      "Arif, T. (2015). Salicylic acid as a peeling agent: a comprehensive review. Clinical, Cosmetic and Investigational Dermatology."
    ],
    compatibleWith: ["Niacinamide", "Squalane", "Hyaluronic Acid"],
    incompatibleWith: ["Retinol", "Glycolic Acid (AHA)", "L-Ascorbic Acid"]
  },
  {
    name: "Retinol",
    scientificName: "Retinol (Vitamin A)",
    inciName: "Retinol",
    description: "A powerful derivative of Vitamin A that communicates with skin cell receptors to accelerate cellular renewal, stimulate collagen synthesis, and reverse visible signs of photoaging and pigmentation.",
    benefits: [
      "Visibly reduces the appearance of wrinkles and fine lines",
      "Accelerates cellular turnover to smooth rough texture",
      "Fades hyperpigmentation, age spots, and sun damage",
      "Improves skin density and overall firmness"
    ],
    mechanism: "Converts in the skin into retinoic acid, which binds to nuclear retinoic acid receptors, promoting transcription of genes that increase epidermal thickness and stimulate fibroblasts to synthesize collagen and elastin.",
    safety: "High efficacy but can trigger initial 'purging', dryness, or peeling (retinization). Start slowly and use sunscreen diligently. Strictly avoid during pregnancy.",
    origin: "Synthetic",
    naturalSynthetic: "Synthetic",
    concentration: "0.1% - 1.0%",
    researchReferences: [
      "Kafi, R., et al. (2007). Improvement of naturally aged skin with topical retinol. Archives of Dermatology.",
      "Mukherjee, S., et al. (2006). Retinoids in the treatment of skin aging: an overview of clinical efficacy and safety."
    ],
    compatibleWith: ["Squalane", "Hyaluronic Acid", "Ceramides", "Centella Asiatica"],
    incompatibleWith: ["Salicylic Acid (BHA)", "Glycolic Acid (AHA)", "Benzoyl Peroxide"]
  },
  {
    name: "Centella Asiatica",
    scientificName: "Centella Asiatica Leaf Extract",
    inciName: "Centella Asiatica Extract",
    description: "An ancient therapeutic botanical, also known as Cica or Tiger Grass, packed with active saponins (madecassoside, asiaticoside) that powerfully accelerate skin barrier repair, soothe inflammation, and stimulate collagen.",
    benefits: [
      "Dramatically accelerates skin barrier repair",
      "Soothes intense redness, irritation, and itching",
      "Stimulates Type I collagen synthesis",
      "Provides powerful rich antioxidant defense"
    ],
    mechanism: "Active compounds stimulate GAGs (glycosaminoglycans) synthesis, promote fibroblast proliferation, increase microcirculation, and suppress inflammatory cytokines like TNF-alpha.",
    safety: "Extremely gentle with virtually zero risk of sensitization, making it perfect for highly sensitive, eczema-prone, or post-procedure skin.",
    origin: "Centella Asiatica Leaf",
    naturalSynthetic: "Natural",
    concentration: "1% - 10%",
    researchReferences: [
      "Bylka, W., et al. (2013). Centella asiatica in cosmetology. Postepy Dermatologii i Alergologii."
    ],
    compatibleWith: ["Niacinamide", "Retinol", "Hyaluronic Acid", "Squalane", "Vitamin C"],
    incompatibleWith: []
  }
];

export const mockProducts: Product[] = [
  {
    id: "cleanser-almond-oil",
    name: "LMOND Almond Cleansing Oil",
    subtitle: "Deeply dissolving sweet almond lipid oil cleanser",
    description: "A premium, high-affinity botanical cleansing oil designed to effortlessly dissolve stubborn sebum, heavy makeup, and water-resistant sunscreen while nourishing the cellular lipid barrier. Leveraging cold-pressed Sweet Almond Oil and protective Tocopheryl Acetate, it micro-emulsifies upon contact with water, leaving the skin touchably soft, calm, and perfectly hydrated with no greasy residue.",
    price: 14,
    priceTHB: 490,
    size: "200 ml",
    sku: "LMD-CLN-OIL",
    stock: 30,
    category: "Cleanser",
    concern: "Dryness",
    rating: 4.9,
    image: "/src/assets/images/almond_cleansing_oil_1782645938097.jpg",
    gallery: [
      "/src/assets/images/almond_cleansing_oil_1782645938097.jpg"
    ],
    ingredients: ["Squalane"],
    texture: "Luxurious Botanical Oil",
    scent: "Sweet cold-pressed almond essence",
    clinicalEvidence: "Dermatological testing on 40 subjects demonstrated a 100% complete removal of water-resistant cosmetics and a 42% increase in skin barrier hydration post-cleanse.",
    directions: "Apply 2-3 pumps onto dry palms and massage gently onto dry face for 60 seconds. Add a splash of warm water to emulsify into a light milky lotion, then rinse clean.",
    benefits: [
      "Effortlessly dissolves waterproof makeup and deep follicular sebum",
      "Softens dry, flaky epidermal skin cells",
      "Maintains cellular hydration with essential fatty acids",
      "Leaves zero heavy residue, fully water-soluble"
    ],
    warnings: "For external use only. Keep out of reach of children. Discontinue if redness or discomfort occurs.",
    reviewsCount: 88,
    faq: [
      { question: "Do I need to double cleanse?", answer: "While this cleansing oil emulsifies and rinses off completely clean, you can follow with our Refining Face Cleanser for a bespoke double-cleanse ritual if you have active congestion." },
      { question: "Is it suitable for eyelash extensions?", answer: "Because it contains natural plant lipids, we recommend avoiding rubbing directly on lash bonds to prolong extension lifespan." }
    ]
  },
  {
    id: "moisturizer-almond-brightening",
    name: "LMOND Almond Brightening Cream",
    subtitle: "Skin Regeneration & Intense Moisture",
    description: "A masterfully calibrated moisturizing treatment designed to accelerate epidermal cell regeneration, hydrate deep stratum corneum layers, and promote standard tone uniformity. Synergizing nourishing Sweet Almond Oil and Macadamia Nut Oil with active Vitamin C and Niacinamide, it seals the cutaneous lipid barrier and reveals a bright, smooth, and resilient skin state.",
    price: 14,
    priceTHB: 490,
    size: "50 ml",
    sku: "LMD-ALM-050",
    stock: 35,
    category: "Moisturizer",
    concern: "Dark Spots",
    rating: 4.9,
    image: "/src/assets/images/almond_brightening_cream_1782645951696.jpg",
    gallery: [
      "/src/assets/images/almond_brightening_cream_1782645951696.jpg"
    ],
    ingredients: ["Niacinamide", "Squalane"],
    texture: "Velvety Emulsion Cream",
    scent: "Delicate natural cold-pressed sweet almond and light vanilla",
    clinicalEvidence: "Clinical trials showed a 38% increase in epidermal hydration and a 29% improvement in skin tone radiance over a 28-day testing period with twice-daily application.",
    directions: "Smooth a dime-sized amount onto clean face and neck in the morning and evening. Massage gently in upward circular motions until absorbed. Excellent under makeup.",
    benefits: [
      "Fades dark spots and optimizes overall tone radiance",
      "Delivers intense, long-lasting moisture to dry cellular zones",
      "Nourishes the lipid barrier to prevent transepidermal moisture loss",
      "Accelerates natural skin regeneration and recovery"
    ],
    warnings: "For external use only. If irritation occurs, discontinue use. We recommend a patch test behind the neck before initial active facial application.",
    reviewsCount: 112,
    faq: [
      { question: "Can I use this in my morning routine?", answer: "Yes! In fact, the Vitamin C and Niacinamide inside provide excellent antioxidant defense against environmental stressors during the day." },
      { question: "Is it suitable for sensitive skin?", answer: "Absolutely. Sweet almond oil and macadamia nut oil are extremely gentle emollient lipids, and when paired with standard active concentrations, they soothe skin sensitivity." }
    ]
  },
  {
    id: "serum-vit-c-990",
    name: "LMOND Vitamin C Whitening Premium Serum",
    subtitle: "High-potency Vitamin C & Hyaluronic brightening elixir",
    description: "A high-performance whitening treatment synergizing active Vitamin C (VitaCE 990) with high-density Hyaluronic Acid and natural Aloe Vera. Engineered to target deep melanosome synthesis, reverse photoaging damage, and restore a luminous cellular glow, this lightweight fluid sinks in instantly to reveal a completely unified, glass-like complexion.",
    price: 17,
    priceTHB: 590,
    size: "30 ml",
    sku: "LMD-VTC-990",
    stock: 25,
    category: "Serum",
    concern: "Dark Spots",
    rating: 4.9,
    image: "/src/assets/images/vit_c_serum_1782645963026.jpg",
    gallery: [
      "/src/assets/images/vit_c_serum_1782645963026.jpg"
    ],
    ingredients: ["Hyaluronic Acid"],
    texture: "Fluid elixir",
    scent: "Subtle fresh cold-pressed sweet orange and vanilla",
    clinicalEvidence: "Clinical assessments over a 28-day study revealed a 47% increase in skin brightness, 31% reduction in visible hyperpigmentation, and complete moisture retention across dry skin boundaries.",
    directions: "Massage 3-4 drops onto clean face and neck in the morning and evening before applying moisturizer. Follow with SPF during the day.",
    benefits: [
      "Provides powerful antioxidant defense against UV stressors",
      "Fades dark spots, acne scars, and uneven pigmentation",
      "Deeply hydrates the epidermal layers with multi-weight hyaluronic acid",
      "Boosts natural skin collagen and resilience"
    ],
    warnings: "For external use only. Avoid contact with eyes. Store in a cool, dark place to maintain optimal active freshness.",
    reviewsCount: 124,
    faq: [
      { question: "Can I use this with Niacinamide?", answer: "Yes! While high-concentration L-ascorbic acid can occasionally flush when mixed with Niacinamide, our stabilized VitaCE 990 formula is designed to layer beautifully without reaction." },
      { question: "Why does it look amber?", answer: "The active is stored in a protective light-shielding amber glass dropper bottle to preserve potency and prevent oxidation from ambient lighting." }
    ]
  },
  {
    id: "cleanser-01",
    name: "LMOND Refining Face Cleanser",
    subtitle: "Squalane & Centella Soothing Emulsion",
    description: "A beautifully pH-balanced, low-foaming botanical cleanser designed to melt away daily impurities, makeup, and sebum while fully maintaining the integrity of the skin's lipid barrier. Fortified with 2% sugarcane Squalane and Centella Asiatica, it transforms from a rich emulsion into a milky veil, leaving the skin thoroughly cleansed, touchably soft, and refreshed.",
    price: 32,
    discountPrice: 28,
    size: "150 ml",
    sku: "LMD-CLN-150",
    stock: 45,
    category: "Cleanser",
    concern: "Sensitivity",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600",
    gallery: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600"
    ],
    ingredients: ["Squalane", "Centella Asiatica"],
    texture: "Milky Emulsion",
    scent: "Subtle herbaceous chamomile and sweet almond",
    clinicalEvidence: "In a 4-week clinical study on 32 subjects with sensitive skin, 97% reported skin felt deeply cleansed without dryness, and 94% observed a visible reduction in dry surface redness.",
    directions: "Massage 1-2 pumps onto damp skin using gentle, circular motions for 60 seconds. Rinse thoroughly with lukewarm water. Use morning and night.",
    benefits: [
      "Gently cleanses without stripping essential natural lipids",
      "Infused with botanical anti-inflammatories to soothe redness",
      "Maintains optimal skin pH of 5.5",
      "Easily removes light makeup and water-resistant sunscreen"
    ],
    warnings: "For external use only. Avoid direct contact with eyes. If irritation occurs, discontinue use and consult a dermatologist.",
    reviewsCount: 148,
    faq: [
      { question: "Is this cleanser suitable for acne-prone skin?", answer: "Yes, it is non-comedogenic and formulated without heavy pore-clogging oils, making it excellent for congested or breakout-prone skin." },
      { question: "Can it remove waterproof mascara?", answer: "It easily removes daily light makeup and sunscreen. For heavy or waterproof eye makeup, we recommend a double-cleanse using a dedicated makeup remover first." }
    ]
  },
  {
    id: "serum-niacinamide",
    name: "LMOND 10% Niacinamide Serum",
    subtitle: "Pore-Refining & Barrier Strengthener",
    description: "A high-strength clinical serum crafted with 10% pure Niacinamide paired with Zinc PCA. Designed for maximum molecular efficacy, this lightweight, fast-absorbing fluid works to visually tighten dilated pore walls, regulate excessive sebum, even out dark spots, and fortify the skin's defense against moisture loss.",
    price: 38,
    size: "30 ml",
    sku: "LMD-NIA-030",
    stock: 82,
    category: "Serum",
    concern: "Large Pores",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600"
    ],
    ingredients: ["Niacinamide", "Hyaluronic Acid"],
    texture: "Silky Fluid",
    scent: "Unscented / Fragrance-Free",
    clinicalEvidence: "Clinical trials showed a 31% reduction in visible pore surface area and a 24% reduction in sebum secretion after 28 days of twice-daily application.",
    directions: "Apply 3-4 drops to clean, dry face in the morning and evening before heavier moisturizers. Gently press into the skin until fully absorbed.",
    benefits: [
      "Visibly tightens and refines enlarged pores",
      "Evens skin tone and fades hyperpigmentation",
      "Reduces congestion and balances oily zones",
      "Improves natural ceramide synthesis for a resilient barrier"
    ],
    warnings: "Do not combine in the same routine with high-concentration Vitamin C (L-Ascorbic Acid) to prevent temporary flushing. If irritation occurs, space out applications.",
    reviewsCount: 215,
    faq: [
      { question: "Can I use Niacinamide with Retinol?", answer: "Absolutely! Niacinamide is actually excellent to layer under Retinol as it helps calm the skin and reduces potential irritation." },
      { question: "Why is Zinc PCA included?", answer: "Zinc PCA is a synergistic active that enhances Niacinamide's oil-regulating and skin-soothing properties, making it great for oily-combination skin." }
    ]
  },
  {
    id: "moisturizer-squalane",
    name: "LMOND 100% Sugarcane Squalane",
    subtitle: "Weightless Barrier-Repairing Lipid",
    description: "Experience the ultimate in pure, biological hydration. Our 100% plant-derived Squalane is sustainably sourced from Brazilian sugarcane, delivering a clinical-grade, ultra-lightweight lipid oil that absorbs instantly to lock in hydration, soften skin texture, and restore natural elasticity without leaving a greasy residue.",
    price: 34,
    discountPrice: 29,
    size: "50 ml",
    sku: "LMD-SQL-050",
    stock: 12, // Low stock for urgency!
    category: "Moisturizer",
    concern: "Dryness",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    gallery: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600"
    ],
    ingredients: ["Squalane"],
    texture: "Ultra-Light Oil",
    scent: "Unscented / Natural sugarcane whisper",
    clinicalEvidence: "100% of participants in a dermatological safety trial agreed that the oil did not cause acne breakouts, and 95% reported immediate alleviation of dry flakes and itching.",
    directions: "Apply a few drops daily to the entire face, neck, or body after water-based treatments. Can also be mixed into your favorite moisturizer or applied to damp hair tips.",
    benefits: [
      "Provides rapid, deep moisture locking",
      "Completely non-comedogenic and hypoallergenic",
      "Highly stable—will not oxidize on the skin",
      "Multi-purpose lipid for face, cuticles, and hair"
    ],
    warnings: "Store in a cool, dry place away from direct sunlight.",
    reviewsCount: 96,
    faq: [
      { question: "Is this suitable for oily skin?", answer: "Yes! Squalane is bio-identical to a portion of human sebum. It tricks the skin into producing less oil while absorbing completely dry with zero heaviness." }
    ]
  },
  {
    id: "serum-bha",
    name: "LMOND Salicylic Acid 2% Purifier",
    subtitle: "Congestion Clarifying & Blemish Solution",
    description: "An advanced, non-stripping treatment formulated with 2% Salicylic Acid (BHA) in a soothing green tea and Centella base. Specially structured to dissolve oil plugs inside the pores, exfoliate dead surface cells, and clear blemishes while keeping the skin barrier fully protected against redness and dehydration.",
    price: 36,
    size: "30 ml",
    sku: "LMD-BHA-030",
    stock: 54,
    category: "Serum",
    concern: "Acne",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
    gallery: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600"
    ],
    ingredients: ["Salicylic Acid (BHA)", "Centella Asiatica"],
    texture: "Lightweight Water-Gel",
    scent: "Faint natural tea tree and botanical aroma",
    clinicalEvidence: "In clinical evaluation, 89% of subjects showed a measurable reduction in active acne lesions and blackheads within 14 days of alternate-night application.",
    directions: "In the evening, apply 2-3 drops to areas of concern or across the entire face after cleansing. Follow with a moisturizer. Always use sun protection during the day.",
    benefits: [
      "Unclogs pores and treats persistent blackheads",
      "Visibly reduces active acne and breakouts",
      "Exfoliates cellular buildup for uniform texture",
      "Cica extract minimizes peeling and irritation"
    ],
    warnings: "Contains Beta-Hydroxy Acid which may increase sun sensitivity. Use sunscreen daily. Do not use if pregnant or allergic to aspirin.",
    reviewsCount: 182,
    faq: [
      { question: "Can I use this every day?", answer: "We recommend starting 2-3 times per week at night. If your skin tolerates it well, you can increase to nightly use." }
    ]
  },
  {
    id: "serum-retinol",
    name: "LMOND Retinol Rejuvenating Elixir",
    subtitle: "0.5% Stabilized Active Retinol in Squalane",
    description: "An exceptional, highly stable age-defying treatment containing 0.5% pure Retinol suspended in a luxurious Squalane lipid base. Formulated to speed up cellular turnover, stimulate collagen production, diminish fine lines, and clarify sun spots while minimizing the irritation commonly associated with vitamin A therapies.",
    price: 45,
    size: "30 ml",
    sku: "LMD-RET-030",
    stock: 29,
    category: "Serum",
    concern: "Aging",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    gallery: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600"
    ],
    ingredients: ["Retinol", "Squalane"],
    texture: "Nourishing Oil-Serum",
    scent: "Unscented",
    clinicalEvidence: "A 12-week independent clinical trial demonstrated a 34% improvement in fine lines around eyes, a 28% increase in skin elasticity, and a 41% reduction in UV-induced pigmentation spots.",
    directions: "Apply 2-3 drops to clean, dry skin in the evening only. Start with 2 applications per week, gradually increasing frequency as tolerated. Use SPF diligently the next morning.",
    benefits: [
      "Accelerates dermal cellular renewal",
      "Fades wrinkles, fine lines, and expression creases",
      "Diminishes dark spots and optimizes tone uniformity",
      "Squalane base shields skin against retinization dryness"
    ],
    warnings: "Do not use if pregnant or lactating. Avoid simultaneous use with AHAs, BHAs, or strong Vitamin C. Mild peeling/redness is normal in the first 2 weeks.",
    reviewsCount: 164,
    faq: [
      { question: "What is retinization?", answer: "It is the period of adjustment where skin adapts to Vitamin A, occasionally presenting mild dryness or flaking. Our squalane suspension is engineered to highly reduce this effect." }
    ]
  },
  {
    id: "moisturizer-barrier",
    name: "LMOND Ceramide Barrier Restorative Cream",
    subtitle: "Deep Lipid Infusion & Sensitive Skin Recovery",
    description: "A rich, comforting moisturizer formulated to rescue dry, damaged, or highly sensitive skin. Packed with natural ceramides, colloidal oat lipids, and 5% Centella Asiatica, it works to seal micro-cracks in the epidermal barrier, provide intensive moisture, and soothe inflammation for resilient, hydrated skin.",
    price: 42,
    size: "50 ml",
    sku: "LMD-BRC-050",
    stock: 63,
    category: "Moisturizer",
    concern: "Sensitivity",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&q=80&w=600",
    gallery: [
      "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&q=80&w=600"
    ],
    ingredients: ["Centella Asiatica", "Hyaluronic Acid", "Squalane"],
    texture: "Rich Whipped Cream",
    scent: "Creamy vanilla and light botanical almond oil",
    clinicalEvidence: "Dermatological tests confirm that this cream repairs the skin barrier by 74% in just 1 hour, providing continuous 48-hour moisture locking.",
    directions: "Apply a nickel-sized amount onto the face and neck morning and evening. Pat gently into the skin. Excellent as a soothing night mask or recovery treatment.",
    benefits: [
      "Instantly repairs and locks in moisture",
      "Provides relief to extremely irritated or red skin",
      "Shields skin against severe weather or acid peel damage",
      "Glides on velvety dry without greasy residue"
    ],
    warnings: "Keep out of eyes. Patch test on wrist before initial use.",
    reviewsCount: 198,
    faq: [
      { question: "Is this suitable for oily acne skin?", answer: "While non-comedogenic, it is a richer, lipid-restoring cream. If you have extremely oily skin, you might prefer a lighter gel-cream during the day and save this as a restorative night cream." }
    ]
  },
];

export const mockSkinConcerns: SkinConcern[] = [
  {
    id: "dryness",
    name: "Dry Skin & Dehydration",
    description: "Skin lacking natural lipids or moisture, resulting in tightness, peeling, fine dehydration lines, and a dull complexion.",
    symptoms: ["Constant skin tightness", "Flaking or rough texture", "Fine lines around eyes and mouth", "Increased sensitivity"],
    causes: ["Compromised lipid barrier", "Low air humidity / dry climates", "Over-washing or harsh surfactants", "Inadequate water intake"],
    routineExplanation: "Focus heavily on multi-weight humectants (Hyaluronic Acid) to pull water in, followed by rich emollients (Squalane, Ceramides) to lock in that water and rebuild the protective skin barrier.",
    recommendedProductIds: ["moisturizer-squalane", "moisturizer-barrier"],
    recommendedIngredientNames: ["Squalane", "Hyaluronic Acid", "Centella Asiatica"],
    lifestyleTips: ["Use a humidifier in your bedroom", "Avoid hot showers; wash face with lukewarm water", "Pat skin damp before applying serums", "Drink at least 2.5L of water daily"]
  },
  {
    id: "sensitivity",
    name: "Sensitive & Reactive Skin",
    description: "Skin that easily gets red, irritated, itchy, or stinging in response to cosmetics, environmental triggers, or active acids.",
    symptoms: ["Frequent blotchy redness", "Burning or stinging on product application", "Prone to dry eczema patches", "Tight, heated sensation"],
    causes: ["Thin stratum corneum", "Environmental allergens or pollution", "Genetic rosacea tendencies", "Overuse of peeling acids (AHA/BHA)"],
    routineExplanation: "Strip your routine back to the absolute basics: a ultra-gentle milky cleanser, a soothing barrier serum (Cica/Squalane), and a comforting ceramide moisturizer. Avoid active exfoliating acids and retinoids until calmed.",
    recommendedProductIds: ["cleanser-01", "moisturizer-barrier"],
    recommendedIngredientNames: ["Centella Asiatica", "Squalane", "Hyaluronic Acid"],
    lifestyleTips: ["Always patch test new products on your inner wrist first", "Avoid fragrances, denatured alcohols, and essential oils", "Wear a physical mineral sunscreen daily", "Gently pat your face dry; never rub with rough towels"]
  },
  {
    id: "acne",
    name: "Acne, Congestion & Breakouts",
    description: "Excessive sebum combining with dead skin cells to clog hair follicles, leading to blackheads, whiteheads, papules, and inflammatory acne.",
    symptoms: ["Active whiteheads and inflammatory bumps", "Stubborn blackheads on the nose and forehead", "Enlarged, clogged pores", "Oily sheen throughout the day"],
    causes: ["Overactive sebaceous glands", "Bacterial accumulation (C. acnes)", "Hormonal fluctuations", "Slow cellular turnover causing blockages"],
    routineExplanation: "Use Salicylic Acid (BHA) to deep-clean the follicle walls and dissolve blackheads, paired with Niacinamide to calm inflammation, regulate sebum, and prevent dark spot scarring.",
    recommendedProductIds: ["serum-bha", "serum-niacinamide"],
    recommendedIngredientNames: ["Salicylic Acid (BHA)", "Niacinamide", "Centella Asiatica"],
    lifestyleTips: ["Wash your pillowcases twice a week", "Never pop or pick at active acne spots to prevent scarring", "Clean your phone screen daily", "Incorporate non-comedogenic light gel-based hydrators"]
  },
  {
    id: "aging",
    name: "Aging & Fine Lines",
    description: "Natural decline in collagen and elastin production combined with cumulative sun damage, leading to loss of firmness, fine lines, and wrinkles.",
    symptoms: ["Crow's feet and smile lines", "Loss of elasticity and skin sagging", "Thinning, delicate skin", "Dull, uneven complexion"],
    causes: ["Slowing cellular renewal rate", "UV radiation producing free radicals", "Decline in natural hyaluronic acid levels", "Glycation degrading collagen fibers"],
    routineExplanation: "Incorporate Retinol in the evening to accelerate cellular turnover and stimulate collagen synthesis, supported by Squalane to lock in moisture and combat retinoid dryness. Protect with SPF daily.",
    recommendedProductIds: ["serum-retinol", "moisturizer-squalane"],
    recommendedIngredientNames: ["Retinol", "Squalane", "Niacinamide", "Hyaluronic Acid"],
    lifestyleTips: ["Apply broad-spectrum SPF 50 sunscreen every single morning", "Eat antioxidant-rich foods like berries and leafy greens", "Get 7-8 hours of quality sleep to optimize nightly cellular repair", "Perform gentle upward facial massage to stimulate microcirculation"]
  }
];

export const mockArticles: Article[] = [
  {
    id: "art-01",
    title: "The Molecular Science of Niacinamide: Why Your Skin Needs Vitamin B3",
    category: "Ingredient Education",
    summary: "Discover how Niacinamide works at a cellular level to refine pores, repair lipid barriers, regulate oil, and fade hyperpigmentation.",
    content: `Niacinamide, also known as nicotinamide, is a water-soluble form of Vitamin B3 that has taken the skincare world by storm—and for very good reason. Unlike many volatile ingredients, Niacinamide is exceptionally stable, highly tolerated, and offers a vast array of clinically proven benefits.

### Cellular Energy & Barrier Repair
At its core, Niacinamide functions as a precursor to two essential cofactors within your skin cells: **Nicotinamide Adenine Dinucleotide (NAD+)** and its phosphate derivative (**NADP+**). These coenzymes are crucial for the chemical reactions that fuel cellular repair, lipid synthesis, and antioxidant protection.
By boosting cellular energy, Niacinamide stimulates the synthesis of **ceramides, free fatty acids, and cholesterol** in the stratum corneum. This dramatically strengthens your skin's protective lipid barrier, reducing transepidermal water loss (TEWL) and helping dry or sensitive skin lock in natural moisture.

### Pore Refinement & Sebum Control
For oily or combination skin, Niacinamide is a game-changer. It acts as an effective sebum regulator, gently normalizing oil gland activity to prevent the pores from stretching and becoming clogged with excess oil and dead skin cells. As sebum production is balanced, dilated pore walls naturally contract, revealing a smoother, highly refined skin texture.

### Brightening Uneven Skin Tone
Hyperpigmentation occurs when pigment-producing cells (melanocytes) transfer pigment packets (melanosomes) to surrounding skin cells (keratinocytes). Niacinamide uniquely interrupts this pathway. It does not inhibit pigment synthesis like some harsh brighteners; instead, it prevents the *transfer* of melanosomes into the upper layers of the skin, resulting in a safer, more uniform, and glowing complexion.

*How to Use:* Incorporate a 5% to 10% Niacinamide serum into your daily morning and night routine after cleansing. It layers perfectly with Hyaluronic Acid, Squalane, and Ceramides.`,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    date: "June 25, 2026",
    author: "Dr. Evelyn Vance, Head of R&D",
    tags: ["Niacinamide", "Pore Care", "Barrier Repair", "Science"]
  },
  {
    id: "art-02",
    title: "A Clinical Guide to Layering: Retinol and Squalane",
    category: "Routine",
    summary: "Learn how to formulate a high-efficiency anti-aging evening routine that delivers powerful retinol results with zero irritation.",
    content: `Retinol is universally celebrated by dermatologists as the gold standard for reducing wrinkles, stimulating collagen, and smoothing skin texture. However, the powerful cellular renewal triggered by Vitamin A can sometimes lead to dry, flaky, or sensitive skin—a temporary process known as *retinization*.
The secret to bypassing this discomfort while enjoying maximum anti-aging efficacy lies in pairing Retinol with **Squalane**.

### Understanding Squalane: The Bio-Identical Emollient
Squalene is a natural lipid that makes up about 10-12% of our skin's sebum. However, as we age, squalene production declines, leading to dry, vulnerable skin.
In skincare, we use **Squalane**, which is the fully saturated, hydrogenated version of squalene. It is exceptionally stable, has an indefinite shelf life, and is 100% non-comedogenic. Because of its bio-identical structure, Squalane absorbs rapidly, sealing intercellular gaps and preventing irritation.

### The Synergistic Mechanism
When Retinol is suspended in a pure Squalane base, it acts as a protective buffer.
1. **Sustained Delivery:** Squalane slows down the rapid, aggressive penetration of Retinol, allowing it to enter the epidermal layers in a controlled, sustained manner. This minimizes shock to the skin.
2. **Instant Lipid Replenishment:** As Retinol signals the cells to renew, Squalane immediately replaces lost lipids, keeping the skin barrier fully nourished, soft, and moist.
3. **Reduced TEWL:** Squalane creates a weightless physical seal, preventing moisture from escaping the skin overnight.

### Step-by-Step Evening Routine
1. **Cleanse:** Wash with a gentle, non-stripping cleanser like the *LMOND Refining Face Cleanser*.
2. **Apply Retinol in Squalane:** Pat your face completely dry, then press 2-3 drops of the *LMOND Retinol Rejuvenating Elixir* into your face and neck.
3. **Barrier Cream:** Follow with a ceramide cream if your skin requires extra nourishment. Always apply a broad-spectrum SPF the following morning!`,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
    date: "June 18, 2026",
    author: "Marcus Thorne, Clinical Esthetician",
    tags: ["Retinol", "Squalane", "Layering", "Anti-Aging"]
  }
];

export const mockReviews: Review[] = [
  {
    id: "rev-01",
    productId: "cleanser-01",
    userEmail: "clarissa.j@example.com",
    userName: "Clarissa Jennings",
    rating: 5,
    comment: "I have incredibly sensitive rosacea-prone skin, and almost every cleanser leaves my face burning and red. This emulsion is a complete lifester. It's so silky, doesn't foam heavily, and washes off perfectly clean without that tight squeaky feeling. My redness is visibly reduced. Will never use anything else!",
    verifiedPurchase: true,
    date: "2026-06-15"
  },
  {
    id: "rev-02",
    productId: "serum-niacinamide",
    userEmail: "devon.k@example.com",
    userName: "Devon Kim",
    rating: 5,
    comment: "Simply incredible. Within 3 weeks of using this Niacinamide serum every morning, my persistent oily t-zone has balanced out, and the large pores on my cheeks are visibly tightened. Texture is lightweight, water-like, and absorbs instantly under sunscreen.",
    verifiedPurchase: true,
    date: "2026-06-20",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "rev-03",
    productId: "moisturizer-squalane",
    userEmail: "sarah.m@example.com",
    userName: "Sarah Miller",
    rating: 5,
    comment: "This squalane oil is so pure and lightweight! I put a few drops on top of my nighttime moisturizer, and I wake up with the softest, most glowing skin. It has also helped get rid of my dry nose flakes completely. Love that it is sugarcane-derived!",
    verifiedPurchase: true,
    date: "2026-06-10"
  },
  {
    id: "rev-04",
    productId: "serum-bha",
    userEmail: "lucas.v@example.com",
    userName: "Lucas Vance",
    rating: 4,
    comment: "Really effective for my stubborn blackheads and occasional jawline breakouts. It is much gentler than other salicylic acid serums I've used because of the Cica extract. Dropped one star because it leaves a slightly tacky feeling if you apply too much, but once moisturizer goes over, it's fine.",
    verifiedPurchase: true,
    date: "2026-06-24"
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: "faq-1",
    question: "What makes LMOND different from other skincare brands?",
    answer: "LMOND combines the minimalist aesthetic of high-end design with clinically-proven, bio-identical ingredients. We focus on active- ingredient integrity, using stable carrier lipids like pure sugarcane squalane and soothing botanical extracts like Centella Asiatica to maximize molecular potency while protecting the skin barrier from irritation.",
    category: "Products"
  },
  {
    id: "faq-2",
    question: "Are LMOND products cruelty-free and vegan?",
    answer: "Yes, 100%. All LMOND products are certified cruelty-free, and we do not test on animals at any stage of research or manufacturing. Our ingredients are 100% vegan, utilizing plant-derived lipids (such as sugarcane-derived squalane) instead of animal or petroleum-derived alternatives.",
    category: "Products"
  },
  {
    id: "faq-3",
    question: "Can I use multiple active serums in the same routine?",
    answer: "Yes, but with caution. Humectants like Hyaluronic Acid and Niacinamide can be paired with almost anything. However, you should avoid using strong exfoliants (Salicylic Acid BHA) and Retinol in the exact same evening routine to prevent irritation. Instead, alternate nights or use BHA in the morning and Retinol at night.",
    category: "Ingredients"
  },
  {
    id: "faq-4",
    question: "Do you ship internationally and how much does it cost?",
    answer: "Yes, we ship worldwide! We offer free standard express shipping on all orders over $75. For orders below $75, standard shipping is a flat rate of $6.90. All shipments include tracking numbers and carbon-neutral transit.",
    category: "Shipping"
  }
];

export const mockCoupons: Coupon[] = [
  { code: "LMOND15", discountType: "percentage", value: 15, active: true },
  { code: "WELCOME10", discountType: "percentage", value: 10, active: true },
  { code: "SQUALANE5", discountType: "fixed", value: 5, active: true }
];
