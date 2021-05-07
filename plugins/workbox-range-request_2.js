const cacheExpirationPlugin = new workbox.expiration.ExpirationPlugin({
  maxEntries: 100,
  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
});
workbox.routing.registerRoute(
  new RegExp('/api/(.*)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'apiCache',
    plugins: [
      cacheExpirationPlugin
    ],
  }),
  'POST'
);
