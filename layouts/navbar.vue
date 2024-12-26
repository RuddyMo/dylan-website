<template>
  <div class="flex justify-between px-2 py-2 text-black bg-white">
    <a href="/" class="text-sm">Dylan.</a>
    <nav class="flex gap-3 text-sm">
      <a>
        <nuxt-link to="/gallerie">Index</nuxt-link>
      </a>
      <a>
        <nuxt-link to="/apropos">À propos</nuxt-link>
      </a>
      <a>
        <nuxt-link to="/contact">Contact</nuxt-link>
      </a>
    </nav>
  </div>
  <slot />
</template>
