export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  discountPrice?: number;
  size: string;
  sku: string;
  stock: number;
  category: 'Cleanser' | 'Toner' | 'Serum' | 'Moisturizer' | 'Sunscreen' | 'Treatment';
  concern: 'Dryness' | 'Sensitivity' | 'Acne' | 'Aging' | 'Dark Spots' | 'Large Pores' | 'Oil Control';
  rating: number;
  image: string;
  gallery: string[];
  video?: string;
  ingredients: string[]; // references scientific names / INCI
  texture: string;
  scent: string;
  clinicalEvidence: string;
  directions: string;
  benefits: string[];
  warnings: string;
  reviewsCount: number;
  faq: { question: string; answer: string }[];
}

export interface Ingredient {
  name: string;
  scientificName: string;
  inciName: string;
  description: string;
  benefits: string[];
  mechanism: string;
  safety: string;
  origin: string;
  naturalSynthetic: 'Natural' | 'Synthetic' | 'Naturally Derived';
  concentration: string;
  researchReferences: string[];
  compatibleWith: string[];
  incompatibleWith: string[];
}

export interface SkinConcern {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  routineExplanation: string;
  recommendedProductIds: string[];
  recommendedIngredientNames: string[];
  lifestyleTips: string[];
}

export interface RoutineStep {
  time: 'Morning' | 'Night';
  order: number;
  productId: string;
  instruction: string;
}

export interface SavedRoutine {
  id: string;
  name: string;
  skinType: string;
  goals: string[];
  complexity: string;
  steps: RoutineStep[];
  estimatedMonthlyCost: number;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Ingredient Education' | 'Routine' | 'Lifestyle' | 'Science' | 'News';
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userEmail: string;
  date: string;
  items: OrderItem[];
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  subtotal?: number;
  discountApplied?: number;
  shippingPaid?: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
  paymentMethod: string;
  rewardPointsEarned: number;
}

export interface Review {
  id: string;
  productId: string;
  userEmail: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  date: string;
  image?: string;
  video?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Products' | 'Shipping' | 'Ingredients' | 'Orders' | 'Skin Concerns';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  active: boolean;
}

export interface UserProfile {
  email: string;
  fullName: string;
  phone: string;
  rewardPoints: number;
  referralCode: string;
  addresses: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
  }[];
}
