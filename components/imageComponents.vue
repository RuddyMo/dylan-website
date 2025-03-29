<template>
  <div class="bg-white">
    <div class="relative h-[calc(100vh-32px)] overflow-hidden" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @contextmenu.prevent>
      <div ref="container" class="absolute flex h-full w-full transition-transform duration-300 ease-out gap-x-4" :style="{ transform: `translateX(-${scrollPosition}px)` }">
        <div v-for="(image, index) in images" :key="index" class="flex justify-center items-center min-w-full relative">
          <NuxtImg :src="image" class="h-full w-auto object-contain pointer-events-none select-none" alt="Slide image" draggable="false" style="-webkit-user-drag: none" />
          <div class="absolute inset-0 z-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const screenWidth = ref(1920);
const screenHeight = ref(1080);
const touchStartX = ref(0);
const touchStartY = ref(0);
const initialScrollPosition = ref(0);

const images = ref([
  'img/accueil/1.JPG',
  'img/accueil/2.JPG',
  'img/accueil/3.JPG',
  'img/accueil/4.JPG',
  'img/accueil/5.JPG',
  'img/accueil/6.JPG',
  'img/accueil/7.JPG',
  'img/accueil/8.JPG',
  'img/accueil/9.JPG',
  'img/accueil/10.JPG',
  'img/accueil/11.JPG',
  'img/accueil/12.JPG',
  'img/accueil/13.JPG',
  'img/accueil/14.JPG'
]);

const container = ref(null);
const scrollPosition = ref(0);

onMounted(() => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('resize', handleResize);

  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('dragstart', null);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

const handleScroll = (e) => {
  e.preventDefault();
  updateScrollPosition(e.deltaY);
};

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
  initialScrollPosition.value = scrollPosition.value;
};

const handleTouchMove = (e) => {
  if (!touchStartX.value) return;

  const deltaX = touchStartX.value - e.touches[0].clientX;
  updateScrollPosition(deltaX);
  e.preventDefault();
};

const handleTouchEnd = () => {
  touchStartX.value = 0;
  touchStartY.value = 0;
};

const updateScrollPosition = (delta) => {
  const maxScroll = container.value.scrollWidth - window.innerWidth;
  scrollPosition.value = Math.max(0, Math.min(maxScroll, scrollPosition.value + delta));
};
</script>

<style scoped>
.select-none {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
