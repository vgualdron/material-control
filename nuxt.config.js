import environmentConfig from './config/env.config.js'
const env = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV !== 'production';
const envConfig = environmentConfig[env];
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  env: envConfig,
  devtools: true,
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
      { hid: 'description', name: 'description', content: 'fsdfds' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    'nuxt-i18n'
  ],
  i18n: {
    locales: [
      {
        name: 'Español',
        code: 'es',
        iso: 'es-CO',
        file: 'es-CO.js'
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js'
      },
    ],
    langDir: 'lang/',
    defaultLocale: 'es'
  },
  styleResources: {
    scss: [
      './assets/scss/*.scss'
    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, // Can be also an object with default options
    credentials: false
  },
  proxy: {
    '/api': {
      target:  envConfig.url
    },
    changeOrigin: true
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      theme_color: envConfig.themeColor
    },
    icon: {

    },
    manifest: {
      name: envConfig.appName,
      short_name: envConfig.appName,
      lang: 'es',
      display: 'standalone',
      theme_color: envConfig.themeColor,
      description: envConfig.description
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://novumcolombia.com/.*',
          strategyOptions: {
            cacheName: 'our-cache',
          },
          strategyPlugins: [{
             use: 'Expiration',
             config: {
               maxEntries: 10,
               maxAgeSeconds: 300
             }
           }]
        }
      ],
      cachingExtensions: [
        '@/plugins/workbox-sync.js',
        '@/plugins/workbox-range-request.js'
      ],
      enabled: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    base: envConfig.appBaseDir,
    middleware: ['auth']
  }
}
