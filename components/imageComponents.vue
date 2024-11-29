<!-- Horizontal.vue -->
<template>
  <div class="relative h-[calc(100vh-32px)] overflow-hidden">
    <div
      ref="container"
      class="absolute flex h-full transition-transform duration-300 ease-out"
      :style="{ transform: `translateX(-${scrollPosition}px)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="h-full w-screen flex-shrink-0"
      >
        <img
          :src="`https://picsum.photos/${screenWidth}/${adjustedHeight}?random=${index}`"
          class="h-full w-full object-cover"
          alt="Random image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const screenWidth = ref(1920);
const screenHeight = ref(1080);
const adjustedHeight = computed(() => screenHeight.value - 32);
const numImages = 5;

const images = ref(Array(numImages).fill(null));
const container = ref(null);
const scrollPosition = ref(0);

onMounted(() => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
  window.addEventListener('wheel', handleScroll, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll);
});

const handleScroll = (e) => {
  e.preventDefault();
  const maxScroll = container.value.scrollWidth - window.innerWidth;
  scrollPosition.value = Math.max(
    0,
    Math.min(maxScroll, scrollPosition.value + e.deltaY)
  );
};
</script>
