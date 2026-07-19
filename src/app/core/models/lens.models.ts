export type LensGroup = 'occasion' | 'business';
export type JoinRole = 'photographer' | 'editor' | 'coordinator' | 'partner';

export interface LensHighlight {
  title: string;
  text: string;
}

export interface LensGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  style?: string;
  location?: string;
}

export interface LensPackage {
  name: string;
  description: string;
  features: string[];
}

export interface LensFaq {
  question: string;
  answer: string;
}

export interface LensCategory {
  slug: string;
  group: LensGroup;
  title: string;
  shortTitle: string;
  description: string;
  heroImage: string;
  mobileHeroImage?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  highlights: LensHighlight[];
  gallery: LensGalleryItem[];
  packages: LensPackage[];
  faqs: LensFaq[];
  relatedSlugs: string[];
}

export interface LensStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  category: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  content: string[];
}

export interface IdeaItem extends LensGalleryItem {
  occasion: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  city: string;
  serviceType: string;
  eventDate: string;
  message: string;
  source: string;
  pageUrl: string;
}

export interface PartnerPayload {
  role: JoinRole;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  experience?: number;
  specializations?: string;
  equipment?: string;
  portfolioUrl?: string;
  socialProfile?: string;
  serviceAreas?: string;
  availability?: string;
  pricingNote?: string;
  about: string;
  files: string[];
}
