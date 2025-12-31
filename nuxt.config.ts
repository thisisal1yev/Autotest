// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-auth-utils",
    "@vueuse/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  fonts: {
    families: [{ name: "Montserrat", provider: "google" }],
    defaults: {
      weights: [400, 500, 600, 700, 800],
    },
    processCSSVariables: true,
  },

  pinia: {
    storesDirs: ["./app/stores"],
  },
});
