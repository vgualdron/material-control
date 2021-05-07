workbox.routing.registerRoute(
  new RegExp('https://animechan.vercel.app/api/(.*)'),
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 3 * 60 * 60
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200]
      }),
      new workbox.rangeRequests.RangeRequestsPlugin()
    ]
  }),
  'GET'
);
