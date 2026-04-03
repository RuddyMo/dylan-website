import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
  },

  image: {
    domains: ['pxgouygdlgvcbprppwtk.supabase.co']
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap'
        }
      ]
    }
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    }
  },

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    'motion-v/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
  ],

  imports: {
    imports: [{
      from: 'tailwind-variants',
      name: 'tv',
    }, {
      from: 'tailwind-variants',
      name: 'VariantProps',
      type: true,
    }],
  },

  colorMode: {
    storageKey: 'dylan-website-color-mode',
    classSuffix: '',
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 0,
    },

    mode: 'svg',
    class: 'shrink-0',
    fetchTimeout: 2000,
    serverBundle: 'local',
  },

  vite: {
    plugins: [tailwindcss()]
  }
});