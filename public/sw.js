// Simple Service Worker to fix 404 error
const CACHE_NAME = 'medical-app-cache-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Simple fetch handling - no caching for now
  event.respondWith(fetch(event.request));
});