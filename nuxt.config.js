let development = process.env.NODE_ENV !== 'production'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  buildDir: 'build',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
        integrity:
          'sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css',
      },
    ],
    script: [
      {
        src: 'https://cdn.tailwindcss.com',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [`@/assets/style.css`],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue-chart.js', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: development ? 'http://159.223.188.155/api' : 'http://159.223.188.155/api'
  },

  server: {
    port: 4000,
  },

/*  generate: {
    dir: '../backend/client'
  },*/

  ssr: false,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
}
