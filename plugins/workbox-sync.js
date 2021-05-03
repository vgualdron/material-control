const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
  maxRetentionTime: 1 // Retry for max of 24 Hours (specified in minutes)
});

const cacheExpirationPlugin = new workbox.expiration.ExpirationPlugin({
  maxAgeSeconds: 3 * 60 * 60
});

const cacheableResponsePlugin = new workbox.cacheableResponse.CacheableResponsePlugin({
  statuses: [200]
});

workbox.routing.registerRoute(
  /https:\/\/jsonplaceholder\.typicode\.com\/posts/,
  new workbox.strategies.NetworkOnly({
    plugins: [
      bgSyncPlugin
    ]
  }),
  'POST'
);

/*
workbox.routing.registerRoute(
  new RegExp('https://animechan.vercel.app/(.*)'),
  new workbox.strategies.NetworkOnly({
    plugins: [
      bgSyncPlugin
    ]
  }),
  'GET'
);
*/

/* workbox.routing.registerRoute(
  new RegExp('https://animechan.vercel.app/api/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [
      cacheExpirationPlugin,
      cacheableResponsePlugin,
      new workbox.rangeRequests.RangeRequestsPlugin()
    ]
  }),
  'GET'
); */
