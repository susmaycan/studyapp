// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  modules: ['@vueuse/nuxt', '@nuxtjs/i18n', '@nuxt/ui'],
  i18n: {
    locales: [],
  },
  imports: {
    dirs: ['./types'],
  },
  runtimeConfig: {
    public: {
      API_URL: 'https://studyapp-yqmt.onrender.com',
    },
  },
  extends: [['susmaycan-library', { install: true }]],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'study-app ',
    },
  },
})
