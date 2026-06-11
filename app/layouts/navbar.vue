<template>
  <div>
    <div class="flex justify-between items-center px-4 text-black bg-white" :class="route.path === '/galerie' ? 'pt-2' : 'py-2'">
      <nuxt-link
        to="/"
        class="text-sm relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <span class="font-semibold">Dylan Morel</span> Photographie.
      </nuxt-link>

      <nav class="hidden items-center gap-3 text-sm md:flex">
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
          ><a size="icon" class="h-5 w-5"><ShieldUser :size="20" /></a>
        </nuxt-link>
      </nav>

      <button
        class="flex size-9 items-center justify-center md:hidden"
        :aria-expanded="isMenuOpen"
        aria-label="Menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="size-6" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        class="flex flex-col gap-1 border-b bg-white px-4 pb-4 text-sm text-black md:hidden"
      >
        <nuxt-link to="/galerie" class="py-2" @click="isMenuOpen = false">galerie</nuxt-link>
        <nuxt-link to="/apropos" class="py-2" @click="isMenuOpen = false">à propos</nuxt-link>
        <nuxt-link to="/contact" class="py-2" @click="isMenuOpen = false">contact</nuxt-link>
        <nuxt-link
          v-if="isAuthenticated"
          to="/dashboard"
          class="flex items-center gap-2 py-2"
          @click="isMenuOpen = false"
        >
          <ShieldUser :size="18" /> Dashboard
        </nuxt-link>
      </nav>
    </Transition>

    <slot />
    <InstagramFooter />
  </div>
</template>

<script setup lang="ts">
import { ShieldUser } from 'lucide-vue-next';

const route = useRoute();
const { $supabase } = useNuxtApp();
const isAuthenticated = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);

watch(() => route.path, () => {
  isMenuOpen.value = false;
});

onMounted(async () => {
  if (import.meta.client && $supabase) {
    const { data } = await $supabase.auth.getSession();
    isAuthenticated.value = !!data?.session;

    $supabase.auth.onAuthStateChange((_event, session) => {
      isAuthenticated.value = !!session;
    });
  }
});
</script>
