// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: false,
    pages: true,
  },
  // build:{
  //   transpile: ["graphology"],
  // },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module', 'dayjs-nuxt', 'nuxt-svgo', '@nuxt/ui'],
  dayjs: {
    locales: ['en', 'nl'],
    plugins: ['customParseFormat'],
  },
  css: ['@/assets/app.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/standardcolors.scss" as *;',
        },
      },
    },
  },
  colorMode: {
    preference: 'light'
  }
});
