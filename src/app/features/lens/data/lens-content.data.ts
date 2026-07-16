import { BlogPost, IdeaItem, JoinRole, LensCategory, LensGalleryItem, LensStat, Testimonial } from '../../../core/models/lens.models';

const image = (name: string) => `https://picsum.photos/seed/clickkaar-lens-${name}/1200/820`;

const occasionImages: Record<string, string> = {
  wedding: '/assets/images/OG_Images/wedding.jpg',
  'pre-wedding': '/assets/images/OG_Images/prewedding.jpg',
  maternity: '/assets/images/OG_Images/maternity.jpg',
  'baby-kids': 'https://picsum.photos/seed/clickkaar-occasion-family-kids/1200/820',
  vacation: 'https://picsum.photos/seed/clickkaar-occasion-travel-memory/1200/820',
  parties: 'https://picsum.photos/seed/clickkaar-occasion-party-event/1200/820'
};

export const occasionCategories: LensCategory[] = [
  ['wedding', 'Wedding', 'Rituals, portraits and reception coverage with a coordinated crew plan.'],
  ['pre-wedding', 'Pre-Wedding', 'Editorial couple shoots with location, styling and frame planning.'],
  ['maternity', 'Maternity', 'Warm maternity portraits with gentle direction at home or studio.'],
  ['baby-kids', 'Baby and Kids', 'Baby, toddler and family milestone sessions paced with care.'],
  ['vacation', 'Vacation', 'Travel memories captured beautifully while you explore.'],
  ['parties', 'Birthday and Parties', 'Celebrations, birthdays and private events covered end to end.']
].map(([slug, title, description], index) => ({
  slug,
  group: 'occasion',
  title,
  shortTitle: title.replace('Birthday and ', ''),
  description,
  heroImage: occasionImages[slug],
  metaTitle: `${title} Photographers | Click-Kaar Lens`,
  metaDescription: description,
  keywords: [title, 'photographer', 'Click-Kaar Lens'],
  highlights: [
    { title: 'Planned coverage', text: 'Shot lists, timings and must-have frames are aligned before shoot day.' },
    { title: 'Trusted professionals', text: 'Photographers are matched to the tone, scale and gear needs of your occasion.' },
    { title: 'Edited delivery', text: 'Selected images are color corrected and prepared for sharing or print.' }
  ],
  gallery: gallerySeed(title, slug),
  packages: [
    { name: 'Essential', description: 'Best for intimate shoots.', features: ['One photographer', 'Edited highlights', 'Online delivery'] },
    { name: 'Signature', description: 'Balanced coverage for families and events.', features: ['Lead photographer', 'Planning call', 'Priority edits'] }
  ],
  faqs: [
    { question: `How early should I book ${title.toLowerCase()} photography?`, answer: 'For popular dates, two to six weeks gives the team more room to match the right photographer.' },
    { question: 'Can I request a style?', answer: 'Yes. Share references in the enquiry form and the coordinator will align the brief.' }
  ],
  relatedSlugs: relatedSlugs(index, ['wedding', 'pre-wedding', 'maternity', 'baby-kids', 'vacation', 'parties'])
})) as LensCategory[];

export const businessCategories: LensCategory[] = [
  ['food-photography', 'Food Photography', 'Menu, cloud kitchen and restaurant content built to sell.'],
  ['interior-photography', 'Interior Photography', 'Clean architectural and hospitality visuals for listings and campaigns.'],
  ['product-photography', 'Product Photography', 'Catalogue and campaign imagery for ecommerce and launches.'],
  ['corporate-events', 'Corporate Events', 'Conference, team, launch and annual-day coverage with reliable coordination.'],
  ['brand-videos', 'Brand Videos', 'Short-form brand films, reels and product explainers for digital campaigns.'],
  ['profile-headshots', 'Profile and Headshots', 'Professional portraits for founders, teams and personal brands.']
].map(([slug, title, description], index) => ({
  slug,
  group: 'business',
  title,
  shortTitle: title.replace(' Photography', ''),
  description,
  heroImage: image(`business-${slug}`),
  metaTitle: `${title} Services | Click-Kaar Lens`,
  metaDescription: description,
  keywords: [title, 'business photography', 'Click-Kaar Lens'],
  highlights: [
    { title: 'Brand-first planning', text: 'Brief, usage, visual references and required production kit are captured before the shoot.' },
    { title: 'Commercial delivery', text: 'Outputs are prepared for menus, listings, marketplaces and social campaigns.' },
    { title: 'Reliable coordination', text: 'A Click-Kaar coordinator keeps dates, crew, shot lists and delivery on track.' }
  ],
  gallery: gallerySeed(title, slug),
  packages: [
    { name: 'Starter', description: 'For small batches or quick campaigns.', features: ['Briefing call', 'Curated shot list', 'Edited delivery'] },
    { name: 'Campaign', description: 'For launches and multi-location work.', features: ['Production planning', 'Dedicated coordinator', 'Usage-ready assets'] }
  ],
  faqs: [
    { question: `Can Click-Kaar Lens handle ${title.toLowerCase()} for multiple locations?`, answer: 'Yes. Share the cities and timeline so the team can coordinate coverage.' },
    { question: 'Do you provide videos too?', answer: 'Brand video, reels and short edits can be planned with the shoot where relevant.' }
  ],
  relatedSlugs: relatedSlugs(index, ['food-photography', 'interior-photography', 'product-photography', 'corporate-events', 'brand-videos', 'profile-headshots'])
})) as LensCategory[];

export const lensCategories = [...occasionCategories, ...businessCategories];

export const stats: LensStat[] = [
  { label: 'Shoots completed', value: 1250, suffix: '+' },
  { label: 'Creator professionals', value: 180, suffix: '+' },
  { label: 'Cities coordinated', value: 22, suffix: '+' },
  { label: 'Edited assets delivered', value: 95000, suffix: '+' }
];

export const portfolioItems: LensGalleryItem[] = [
  ...gallerySeed('Wedding', 'wedding'),
  ...gallerySeed('Pre-Wedding', 'pre-wedding'),
  ...gallerySeed('Maternity', 'maternity'),
  ...gallerySeed('Product', 'product-photography'),
  ...gallerySeed('Food', 'food-photography'),
  ...gallerySeed('Corporate', 'corporate-events')
];

export const ideas: IdeaItem[] = portfolioItems.map((item, index) => ({
  ...item,
  id: `idea-${index + 1}`,
  occasion: item.category,
  style: index % 2 ? 'Editorial' : 'Natural',
  location: index % 3 ? 'Outdoor' : 'Studio'
}));

export const testimonials: Testimonial[] = [
  { name: 'Aarav Mehta', location: 'Mumbai', text: 'The team understood our wedding timeline and made the portraits feel effortless.', rating: 5, category: 'Wedding', avatar: image('avatar-aarav') },
  { name: 'Nisha Rao', location: 'Bengaluru', text: 'Our restaurant menu looked sharper and more premium after the food shoot.', rating: 5, category: 'Food', avatar: image('avatar-nisha') },
  { name: 'Kabir Sethi', location: 'Delhi NCR', text: 'Fast coordination, calm photographer and clean delivery for our office headshots.', rating: 5, category: 'Headshots', avatar: image('avatar-kabir') }
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'plan-a-wedding-photography-brief',
    title: 'How to Plan a Wedding Photography Brief',
    excerpt: 'A practical guide to rituals, family portraits, couple shots and delivery expectations.',
    category: 'Wedding',
    tags: ['planning', 'wedding'],
    author: 'Click-Kaar Lens Studio',
    publishedAt: '2026-07-01',
    readingTime: '5 min read',
    image: image('blog-wedding-brief'),
    content: ['Start with the event timeline and non-negotiable rituals.', 'Add family combinations, style references and delivery priorities.', 'Keep one coordinator available on the day so the photographer can move quickly.']
  },
  {
    slug: 'food-shoot-checklist',
    title: 'Food Photography Checklist for Restaurants',
    excerpt: 'Prep dishes, surfaces, angles and usage needs before the camera arrives.',
    category: 'Business',
    tags: ['food', 'business'],
    author: 'Click-Kaar Lens Studio',
    publishedAt: '2026-06-18',
    readingTime: '4 min read',
    image: image('blog-food-checklist'),
    content: ['Choose hero dishes by margin and popularity.', 'Prepare garnishes, clean plates and branded packaging.', 'Confirm where each image will be used so framing fits menus and campaigns.']
  }
];

export const legalPages: Record<string, { title: string; body: string[] }> = {
  terms: { title: 'Terms and Conditions', body: ['Bookings, availability and final commercials are confirmed after coordinator review.', 'Click-Kaar Lens is part of the CLICK-KAAR LLP creator marketplace experience. Frontend content is indicative until confirmed in writing.'] },
  privacy: { title: 'Privacy Policy', body: ['Enquiry details are used to respond to booking and partner requests.', 'Do not submit sensitive personal data through public forms.'] },
  refund: { title: 'Refund Policy', body: ['Refund eligibility depends on booking stage, cancellation window and vendor allocation.'] },
  cancellation: { title: 'Cancellation Policy', body: ['Cancellation charges may apply once photographers or production resources are blocked.'] },
  disclaimer: { title: 'Disclaimer', body: ['Sample content and placeholder metrics are for demonstration until replaced with verified business data.'] }
};

export const joinRoleLabels: Record<JoinRole, string> = {
  photographer: 'Photographer',
  editor: 'Editor',
  coordinator: 'Project Coordinator',
  partner: 'Business Partner'
};

function gallerySeed(category: string, slug: string): LensGalleryItem[] {
  return [1, 2, 3].map((number) => ({
    id: `${slug}-${number}`,
    title: `${category} sample ${number}`,
    category,
    image: image(`${slug}-${number}`),
    alt: `${category} photography sample ${number}`
  }));
}

function relatedSlugs(index: number, slugs: string[]): string[] {
  return [slugs[(index + 1) % slugs.length], slugs[(index + 2) % slugs.length]];
}
