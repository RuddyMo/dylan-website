<template>
  <CustomCursor />
  <NuxtPage class="" />
</template>
<script setup lang="ts">
onMounted(() => {
  document.addEventListener('contextmenu', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
    }
  });
});
</script>
