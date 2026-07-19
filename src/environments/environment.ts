export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  leadEndpoint: '/api/v1/enquiries',
  partnerEndpoints: {
    photographer: '/api/v1/join-applications',
    editor: '/api/v1/join-applications',
    coordinator: '/api/v1/join-applications',
    partner: '/api/v1/partner-applications'
  },
  mockData: false,
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
