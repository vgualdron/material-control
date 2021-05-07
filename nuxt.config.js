import environmentConfig from './config/env.config.js'
<<<<<<< HEAD
const envConfig = environmentConfig[process.env.NODE_ENV];
console.log(envConfig);

export default {
=======
const env = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV !== 'production';
const envConfig = environmentConfig[env];
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
  mode: 'spa',
  env: envConfig,
  generate: {
    dir: 'docs'
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'es'
    },
    title: envConfig.appName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
<<<<<<< HEAD
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
=======
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
<<<<<<< HEAD
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa'
=======
    '@nuxtjs/eslint-module'
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
<<<<<<< HEAD
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
=======
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
<<<<<<< HEAD
=======
    icon: {

    },
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
    manifest: {
      name: envConfig.appName,
      short_name: envConfig.appName,
      lang: 'es',
      display: 'standalone'
    },
    workbox: {
<<<<<<< HEAD
      cachingExtensions: '@/plugins/workbox-sync.js',
      enabled: true //should be off actually per workbox docs due to complications when used in prod
=======
      cachingExtensions: [
        '@/plugins/workbox-sync.js',
        '@/plugins/workbox-range-request.js'
      ],
      // enabled: true,
      dev: isDev
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
<<<<<<< HEAD
  build: {
    extend (config, ctx) {
      config.node = {
        child_process: 'empty',
        fs: 'empty'
      }
    }
  },
  router: {
    base: envConfig.appBaseDir
    // middleware: ['auth']
=======
  build: {},
  router: {
    base: envConfig.appBaseDir
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
  }
}
