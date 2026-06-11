<template>
  <CustomCursor />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster />
</template>
<script setup lang="ts">
onMounted(() => {
  const blockOnImages = (event: Event) => {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  };

  document.addEventListener('contextmenu', blockOnImages);
  document.addEventListener('dragstart', blockOnImages);
});
</script>
