import { icons } from './public/appicons/icons.json'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: 'Time Shift - be in time',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      meta: [
        { name: 'description', content: 'Stay connected with the world, wherever you go. TimeShift app displays time zone differences on a world map, making global communication effortless.' },
      ],
      script: [{
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9141697667638275",
        crossorigin: "anonymous",
      }],
    },
  },

  modules: ["@nuxtjs/tailwindcss", // https://github.com/kevinmarrec/nuxt-pwa-module
  "@kevinmarrec/nuxt-pwa", // https://vuefire.vuejs.org/nuxt/getting-started.html
  'nuxt-vuefire', // https://github.com/vuejs/pinia
  '@pinia/nuxt', "nuxt-security"],

  // security: {
  //   headers: {

  //   }
  // },

  imports: {
    dirs: ['./stores'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },

  vuefire: {
    config: {
      apiKey: 'AIzaSyAR5IYUZZ4DbUgYQYiI4kKWo5pRneKXNaQ',
      authDomain: 'timeshift-3871e.firebaseapp.com',
      projectId: 'timeshift-3871e',
      // storageBucket: "timeshift-3871e.appspot.com",
      // messagingSenderId: "426776611222",
      appId: '1:426776611222:web:86569f643dc2c9f27df5b7',
      // measurementId: "G-BTFVC5NPDF"
    },
  },

  pwa: {
    // workbox: {
    //   enabled: false,
    // },
    icon: false,
    meta: {
      appleStatusBarStyle: 'black',
      theme_color: '#c9d2d3',
      ogSiteName: 'Time Shift',
      ogTitle: 'Time Shift - be in time',
      ogDescription: 'Stay connected with the world, wherever you go. TimeShift app displays time zone differences on a world map, making global communication effortless.',
      ogHost: 'https://timeshift.cc',
      ogImage: 'https://timeshift.cc/og-image.png',
      ogUrl: 'https://timeshift.cc',
      twitterCard: 'summary_large_image',
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
