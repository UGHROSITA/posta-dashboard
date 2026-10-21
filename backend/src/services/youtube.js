import { mockPlatform } from './mock.js';

// Docs: https://developers.google.com/youtube/v3  /  https://developers.google.com/youtube/analytics

export default {
  id: 'youtube',
  isConfigured: () => Boolean(process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_CHANNEL_ID),
  async getStats(days) {
    // TODO: channels.list (suscriptores), search/videos.list (publicaciones) y Analytics API (vistas diarias)
    return mockPlatform('youtube', days, 3);
  },
};
