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
        class="h-auto sm:h-full w-auto sm:w-screen flex-shrink-0 flex justify-center"
      >
        <img :src="image" class="h-full w-auto" alt="Slide image" />
      </div>
    </div>
  </div>
</template>

<script setup>
const screenWidth = ref(1920);
const screenHeight = ref(1080);
const adjustedHeight = computed(() => screenHeight.value - 32);

const images = ref([
  'img/accueil/1.jpg',
  'img/accueil/2.jpg',
  'img/accueil/3.jpg',
  'img/accueil/4.jpg',
  'img/accueil/5.jpg',
  'img/accueil/6.jpg',
  'img/accueil/7.jpg',
  'img/accueil/8.jpg',
  'img/accueil/9.jpg',
  'img/accueil/10.jpg',
  'img/accueil/11.jpg',
  'img/accueil/12.jpg',
  'img/accueil/13.jpg',
  'img/accueil/14.jpg',

]);

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
