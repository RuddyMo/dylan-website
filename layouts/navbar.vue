<template>
  <div class="flex justify-between px-2 py-1 text-white bg-black">
    <h1>Dylan.</h1>
    <nav class="flex gap-3">
      <a>
        <nuxt-link to="/">Index</nuxt-link>
      </a>
      <a>
        <nuxt-link to="/about">About</nuxt-link>
      </a>
      <a>
        <nuxt-link to="/contact">Contact</nuxt-link>
      </a>
    </nav>
  </div>
  <slot />
</template>