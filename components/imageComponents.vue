<template>
  <div
      class="relative h-[calc(100vh-32px)] overflow-hidden"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
  >
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
  'img/accueil/14.JPG',
]);

const container = ref(null);
const scrollPosition = ref(0);

onMounted(() => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll);
  window.removeEventListener('resize', handleResize);
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
  scrollPosition.value = Math.max(
      0,
      Math.min(maxScroll, scrollPosition.value + delta)
  );
};
</script>