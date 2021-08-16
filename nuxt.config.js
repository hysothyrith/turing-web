export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Turing Cinemas',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/normalize.css',
    '@/assets/css/main.css',
    '@/assets/css/utils.css',
    '@/assets/css/v-tooltip.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-js-modal.js',
    '~plugins/phosphor-vue.js',
    '~plugins/v-tooltip.js',
    { src: '~plugins/epic-spinners.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // 'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    [
      'vue-toastification/nuxt',
      {
        transition: 'Vue-Toastification__fade',
        position: 'top-center',
        hideProgressBar: true,
        showCloseButtonOnHover: true,
        icon: false,
      },
    ],
  ],
  axios: {
    baseURL: process.env.API_BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 8080,
  },

  router: {
    middleware: 'auth',
  },

  ssr: false,

  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },

  loadingIndicator: '~/static/firstLoad.html',
}
