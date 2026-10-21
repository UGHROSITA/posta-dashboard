import { mockPlatform } from './mock.js';

// Instagram y Facebook comparten la Graph API de Meta.
// Docs: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/insights
//       https://developers.facebook.com/docs/graph-api/reference/page/insights

const token = () => process.env.META_ACCESS_TOKEN;

export const instagram = {
  id: 'instagram',
  isConfigured: () => Boolean(token() && process.env.META_IG_USER_ID),
  async getStats(days) {
    // TODO: GET /{META_IG_USER_ID}/insights y /{META_IG_USER_ID}/media y mapear a la forma común
    return mockPlatform('instagram', days, 1);
  },
};

export const facebook = {
  id: 'facebook',
  isConfigured: () => Boolean(token() && process.env.META_PAGE_ID),
  async getStats(days) {
    // TODO: GET /{META_PAGE_ID}/insights y /{META_PAGE_ID}/posts y mapear a la forma común
    return mockPlatform('facebook', days, 2);
  },
};
