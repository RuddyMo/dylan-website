<template>
  <CustomCursor />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster />
</template>
<script setup lang="ts">
onMounted(() => {
  // Décourage le vol d'images : bloque le menu contextuel et le glisser-déposer
  // sur toutes les <img> du site (la capture d'écran reste possible côté client).
  const blockOnImages = (event: Event) => {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  };

  document.addEventListener('contextmenu', blockOnImages);
  document.addEventListener('dragstart', blockOnImages);
});
</script>
