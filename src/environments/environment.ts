export const environment = {
  production: false,
  apiBaseUrl: '',
  leadEndpoint: '/api/leads',
  partnerEndpoints: {
    photographer: '/api/partners/photographers',
    editor: '/api/partners/editors',
    coordinator: '/api/partners/project-coordinators',
    partner: '/api/partners/business'
  },
  mockData: true,
  whatsappNumber: '919096820033',
  contactPhone: '+91 9096820033',
  contactEmail: 'lens@click-kaar.com',
  socialLinks: {
    instagram: 'https://instagram.com/clickkaar',
    facebook: 'https://facebook.com/clickkaar',
    linkedin: 'https://linkedin.com/company/clickkaar'
  },
  analytics: {
    ga4Id: '',
    gtmId: '',
    metaPixelId: '',
    googleAdsId: ''
  },
  siteUrl: 'https://click-kaar.com'
};
