workbox.routing.registerRoute(
  '/https://jsonplaceholder.typicode.com/posts',
  new workbox.strategies.NetworkFirst({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin('queueExample', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
      })
    ]
  }),
  'POST'
);
