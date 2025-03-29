<template>
  <div class="flex justify-between px-4 text-black bg-white" :class="route.path === '/galerie' ? 'pt-2' : 'py-2'">
    <a
      href="/"
      class="text-sm relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      ><span class="font-semibold">Dylan Morel</span> Photographie.</a
    >
    <nav class="flex gap-3 text-sm">
      <a
        class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <nuxt-link to="/galerie">galerie</nuxt-link>
      </a>
      <a
        class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <nuxt-link to="/apropos">à propos</nuxt-link>
      </a>
      <a
        class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <nuxt-link to="/contact">contact</nuxt-link>
      </a>
    </nav>
  </div>
  <slot />
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
