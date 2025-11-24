// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
  ],
  css: [
    // SCSS file in the project
    '@/assets/scss/style.scss',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    storage: 'localStorage',
    storageKey: 'color-mode',
  },
  pwa: {
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    manifest: {
      name: 'Boligvelger JSON Builder',
      short_name: 'BV JSON',
      description: 'JSON generator for Boligvelger',
      theme_color: '#ffffff',
      orientation: 'any',
      dir: 'ltr',
      categories: ['productivity'],
      scope: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      lang: 'nb',
      id: 'boligvelger-json-builder',
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
  },
});
