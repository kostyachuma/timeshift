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
    // workbox: {
    //   enabled: false,
    // },
    icon: false,
    meta: {
      appleStatusBarStyle: 'black',
      theme_color: '#c9d2d3'
    },
    manifest: {
        name: 'Time Shift',
        icons: icons,
        background_color: '#c9d2d3',
        theme_color: '#c9d2d3'
    },

  },
});
