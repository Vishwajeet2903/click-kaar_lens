export const environment = {
  production: true,
  apiBaseUrl: '',
  leadEndpoint: '/api/leads',
  partnerEndpoints: {
    photographer: '/api/partners/photographers',
    editor: '/api/partners/editors',
    coordinator: '/api/partners/project-coordinators',
    partner: '/api/partners/business'
  },
  mockData: true,
  whatsappNumber: '919999999999',
  contactPhone: '+91 99999 99999',
  contactEmail: 'lens@click-kaar.com',
  socialLinks: {
    instagram: 'https://instagram.com/clickkaar',
    facebook: 'https://facebook.com/clickkaar',
    linkedin: 'https://linkedin.com/company/clickkaar'
  },
  analytics: { ga4Id: '', gtmId: '', metaPixelId: '', googleAdsId: '' },
  siteUrl: 'https://click-kaar.com'
};
