import { instagram, facebook } from './meta.js';
import youtube from './youtube.js';
import tiktok from './tiktok.js';

const services = [instagram, facebook, youtube, tiktok];

export function connectionStatus() {
  return Object.fromEntries(services.map((s) => [s.id, s.isConfigured()]));
}

export async function getAllStats(days) {
  return Promise.all(services.map((s) => s.getStats(days)));
}
