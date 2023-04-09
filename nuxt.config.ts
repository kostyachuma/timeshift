import { icons } from './public/appicons/icons.json'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    // https://github.com/kevinmarrec/nuxt-pwa-module
    "@kevinmarrec/nuxt-pwa",
    // https://vuefire.vuejs.org/nuxt/getting-started.html
    'nuxt-vuefire',
  ],

  vuefire: {
    config: {
      apiKey: 'AIzaSyAR5IYUZZ4DbUgYQYiI4kKWo5pRneKXNaQ',
      authDomain: 'timeshift-3871e.firebaseapp.com',
      projectId: 'timeshift-3871e',
      storageBucket: "timeshift-3871e.appspot.com",
      messagingSenderId: "426776611222",
      appId: '1:426776611222:web:86569f643dc2c9f27df5b7',
      measurementId: "G-BTFVC5NPDF"
    },
  },

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

  vite: {
    plugins: [
      svgLoader(),
    ],
  },
});
