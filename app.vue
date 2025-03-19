<template>
  <CustomCursor />
  <NuxtPage />
</template>
<script setup lang="ts">
import CustomCursor from '~/components/customCursor.vue';

onMounted(() => {
  document.addEventListener('contextmenu', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
    }
  });
});
</script>
