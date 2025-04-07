<template>
  <div class="bg-white h-screen">
    <NuxtLayout name="navbar">
      <div class="flex items-center justify-center py-12">
        <div class="relative inline-block">
          <div class="absolute -top-4 -left-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] bg-[#f0ede6] -z-10"></div>
          <NuxtImg src="/img/about/APROPOS.jpg" alt="Photo" class="relative w-[300px] h-[380px] object-cover z-10" />
        </div>
        <div class="ml-8 max-w-md">
          <h3 class="text-2xl font-bold mb-4">Titre</h3>
          <p>Description ou autre contenu...</p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts"></script>
