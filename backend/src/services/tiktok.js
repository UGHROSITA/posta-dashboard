import { mockPlatform } from './mock.js';

// Docs: https://developers.tiktok.com/doc/display-api-overview

export default {
  id: 'tiktok',
  isConfigured: () => Boolean(process.env.TIKTOK_ACCESS_TOKEN),
  async getStats(days) {
    // TODO: /v2/user/info/ (seguidores) y /v2/video/list/ (vistas, likes, comentarios, compartidos)
    return mockPlatform('tiktok', days, 4);
  },
};
