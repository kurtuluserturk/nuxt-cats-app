// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  typescript: {
    typeCheck: true
  },

  modules: ['@primevue/nuxt-module', '@nuxt/eslint', '@pinia/nuxt'],
  eslint: {
    config: {
      stylistic: true
    }
  },

  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  }
})