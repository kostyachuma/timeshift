import { icons } from './public/appImages/icons.json'

console.log(icons)

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
    manifest: {
        name: 'Time Shift',
        icons: icons
    }
  },
});
