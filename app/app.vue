<template>
  <CustomCursor />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
