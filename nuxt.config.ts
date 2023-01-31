// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    // https://github.com/kevinmarrec/nuxt-pwa-module
    "@kevinmarrec/nuxt-pwa",
  ],

  pwa: {
    workbox: {
      enabled: true,
    },
    icon: {
        source: 'assets/images/logo/app.png'
    },
    manifest: {
        name: 'Time Shift',
        short_name: 'TS'
    }
  },
});
