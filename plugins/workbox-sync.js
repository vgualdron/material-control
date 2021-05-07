const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
  maxRetentionTime: 1 // Retry for max of 24 Hours (specified in minutes)
});
<<<<<<< HEAD
workbox.routing.registerRoute(
  /https:\/\/jsonplaceholder\.typicode\.com\/posts/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
=======

workbox.routing.registerRoute(
  /https:\/\/jsonplaceholder\.typicode\.com\/posts/,
  new workbox.strategies.NetworkOnly({
    plugins: [
      bgSyncPlugin
    ]
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
  }),
  'POST'
);
