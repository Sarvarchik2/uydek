// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ['swiper', 'swiper/vue'],
    },
  },
  build: {
    transpile: ['swiper'],
  },
})
