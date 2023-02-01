import { icons } from './public/appicons/icons.json'

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
    icon: false,
    meta: {
      appleStatusBarStyle: 'black-translucent'
    },
    manifest: {
        name: 'Time Shift',
        icons: icons
    },

  },
});
