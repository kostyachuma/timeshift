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
        source: 'assets/images/logo/app.png',
        maskablePadding: 0,
        maskableSource: null,
        splash: {
            backgroundColor: '#FFFFFF',
            devices: [],
            targetDir: "splash"
        }
    },
    manifest: {
        name: 'Time Shift',
    }
  },
});
