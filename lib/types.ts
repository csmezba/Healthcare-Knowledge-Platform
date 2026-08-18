export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReferenceItem {
  id: string;
  citation: string;
  link?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Medicines" | "Diseases" | "Medical Equipment" | "Health Tips" | "Nutrition" | "First Aid" | "Vitamins" | "Men's Health" | "Women's Health";
  author: Author;
  medicalReviewer?: Author;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
  popularity: number;
  likes: number;
  references: ReferenceItem[];
  faqs: FAQItem[];
  tableOfContents: { id: string; label: string }[];
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  type: string;
  prescriptionStatus: "Over-the-Counter (OTC)" | "Rx - Prescription Required";
  dosageForms: string[];
  image: string;
  overview: string;
  uses: string[];
  dosage: string;
  administration: string;
  sideEffects: { symptom: string; severity: "Common" | "Rare" | "Severe" }[];
  warnings: string[];
  pregnancy: string;
  breastfeeding: string;
  elderly: string;
  children: string;
  drugInteractions: string[];
  foodInteractions: string[];
  alcoholInteraction: string;
  storage: string;
  faqs: FAQItem[];
  references: ReferenceItem[];
}

export interface Disease {
  id: string;
  name: string;
  overview: string;
  image: string;
  symptoms: string[];
  riskLevel: "Low" | "Moderate" | "High" | "Critical";
  commonAge: string;
  treatments: string[];
  guideContent: string;
  prevention: string[];
  whenToSeeDoctor: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  priceRange: "Budget" | "Mid-range" | "Premium";
  specs: { label: string; value: string }[];
  benefits: string[];
  usageGuide: string[];
  maintenance: string;
  cleaning: string;
  buyingGuide: string;
  faqs: FAQItem[];
}
