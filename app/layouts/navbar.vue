<template>
  <div>
    <div class="flex justify-between px-4 text-black bg-white" :class="route.path === '/galerie' ? 'pt-2' : 'py-2'">
      <nuxt-link
        to="/public"
        class="text-sm relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <span class="font-semibold">Dylan Morel</span> Photographie.
      </nuxt-link>

      <nav class="flex gap-3 text-sm">
        <nuxt-link
          to="/galerie"
          class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
        >
          galerie
        </nuxt-link>
        <nuxt-link
          to="/apropos"
          class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
        >
          à propos
        </nuxt-link>
        <nuxt-link
          to="/contact"
          class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
        >
          contact
        </nuxt-link>
        <nuxt-link v-if="isAuthenticated" to="/dashboard" title="Dashboard"
          ><Button size="icon" class="h-3 w-3"><ShieldUser :size="17" /></Button
        ></nuxt-link>
      </nav>
    </div>
    <slot />
    <InstagramFooter />
  </div>
</template>

<script setup lang="ts">
import { ShieldUser } from 'lucide-vue-next';

const route = useRoute();
const { $supabase } = useNuxtApp();
const isAuthenticated = ref<boolean>(false);

onMounted(async () => {
  if (import.meta.client && $supabase) {
    const { data } = await $supabase.auth.getSession();
    isAuthenticated.value = !!data?.session;

    $supabase.auth.onAuthStateChange((session) => {
      isAuthenticated.value = !!session;
    });
  }
});
</script>
