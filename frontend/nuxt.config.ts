// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui'],
  imports: {
    dirs: ['./types'],
  },
  runtimeConfig: {
    public: {
      API_URL: 'https://studyapp-yqmt.onrender.com',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'study-app ',
    },
  },
})
