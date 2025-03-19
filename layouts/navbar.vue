<template>
  <div class="flex justify-between px-2 py-2 text-black bg-white">
    <a
      href="/"
      class="text-sm relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >Dylan.</a
    >
    <nav class="flex gap-3 text-sm">
      <a
        class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <nuxt-link to="/gallerie">Index</nuxt-link>
      </a>
      <a
        class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <nuxt-link to="/apropos">À propos</nuxt-link>
      </a>
      <a
        class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
      >
        <nuxt-link to="/contact">Contact</nuxt-link>
      </a>
    </nav>
  </div>
  <slot />
  <div class="fixed bottom-0 left-0 right-0 bg-white py-4 w-full"></div>
</template>
