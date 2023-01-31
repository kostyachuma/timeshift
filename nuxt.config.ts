// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRules: {
        '/': { ssr: false },
    },
    modules: ['@nuxtjs/tailwindcss']
})
