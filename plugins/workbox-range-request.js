const cacheExpirationPlugin = new workbox.expiration.ExpirationPlugin({
  maxAgeSeconds: 3 * 60 * 60
});

const cacheableResponsePlugin = new workbox.cacheableResponse.CacheableResponsePlugin({
  statuses: [200]
});

workbox.routing.registerRoute(
  new RegExp('https://animechan.vercel.app/api/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [
      cacheExpirationPlugin,
      cacheableResponsePlugin,
      new workbox.rangeRequests.RangeRequestsPlugin()
    ]
  }),
  'GET'
);
