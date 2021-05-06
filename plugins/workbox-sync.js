const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
  maxRetentionTime: 1 // Retry for max of 24 Hours (specified in minutes)
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
