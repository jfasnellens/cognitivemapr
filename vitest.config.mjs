// vitest.config.ts
import { fileURLToPath } from 'node:url';
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    exclude: [
      'node_modules',
      'idea',
      'dist',
      'git',
      'tests-examples',
      'tests/e2e',
      '*.config**',
      'Mappr/app.vue',
      'Mappr/assets/*',
      'Mappr/layouts',
    ],
    coverage: {
      reporter: ['html'],
      exclude: [
        '**/{app,nuxt,playwright,vitest}.config.*',
        '**/.nuxt',
        '**/assets',
        '**/layouts',
        '.eslintrc.cjs',
        '.prettierrc.js',
        'app.vue',
        '**/types',
        '**/tests/',
        '**/components/ScrollBar.vue',
        '**/exporters/exportJpg.ts',
        '**/exporters/exportPdf.ts',
        '**/exporters/exportPng.ts',
        "**/Graph/Display.vue",
        "**/stores/graphStore.ts"
      ],
    },
    //browser: true
    // you can optionally set nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     overrides: {
    //       // other nuxt config you want to pass
    //     }
    //   }
    // }
  },
});
