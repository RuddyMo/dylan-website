<template>
  <div class="bg-white">
    <div class="relative h-[calc(100vh-32px)] overflow-hidden" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @contextmenu.prevent>
      <div ref="containerDesktop" class="absolute flex h-full w-full gap-x-4 transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${scrollPosition}px)` }">
        <div v-for="(image, index) in images" :key="index" class="relative flex min-w-full items-center justify-center">
          <NuxtImg :src="image.url" alt="Slide" class="h-full w-auto object-contain pointer-events-none select-none" draggable="false" style="-webkit-user-drag: none" />
          <div class="absolute inset-0 z-10" />
        </div>
      </div>

      <ScrollBar :progress="scrollProgress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, type Ref } from 'vue';

const { $supabase } = useNuxtApp();

interface AccueilImage {
  url: string;
}

const containerDesktop: Ref<HTMLElement | null> = ref(null);
const images: Ref<AccueilImage[]> = ref([]);

const scrollPosition: Ref<number> = ref(0);
const maxScroll: Ref<number> = ref(0);

const scrollProgress = computed(() => (maxScroll.value <= 0 ? 0 : (scrollPosition.value / maxScroll.value) * 100));

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const recalcMaxScroll = () => {
  const slideContainer = containerDesktop.value;
  if (!slideContainer) return;

  const totalWidth = slideContainer.scrollWidth;
  const viewportWidth = slideContainer.clientWidth;
  maxScroll.value = Math.max(0, totalWidth - viewportWidth);
  scrollPosition.value = clamp(scrollPosition.value, 0, maxScroll.value);
};

const updateScrollPosition = (delta: number) => {
  scrollPosition.value = clamp(scrollPosition.value + delta, 0, maxScroll.value);
};

const fetchImages = async (): Promise<void> => {
  const { data, error } = await $supabase.storage.from('Photos').list('accueil', {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (error) {
    console.error('Erreur Supabase accueil', error);
    return;
  }
  if (!data) return;

  images.value = data
    .filter((file) => !!file.name && !file.name.startsWith('.'))
    .filter((file) => file.name.toLowerCase().endsWith('.webp'))
    .map((file) => {
      const { data: publicData } = $supabase.storage.from('Photos').getPublicUrl(`accueil/${file.name}`);

      return { url: publicData.publicUrl };
    });

  await nextTick();
  recalcMaxScroll();
};

const touchStartX: Ref<number | null> = ref(null);

const handleTouchStart = (e: TouchEvent): void => {
  const touch = e.touches.item(0);
  if (!touch) return;
  touchStartX.value = touch.clientX;
};

const handleTouchMove = (e: TouchEvent): void => {
  if (touchStartX.value === null) return;
  const touch = e.touches.item(0);
  if (!touch) return;
  const dx = touchStartX.value - touch.clientX;
  updateScrollPosition(dx);
  e.preventDefault();
};

const handleTouchEnd = (): void => {
  touchStartX.value = null;
};

const handleWheel = (e: WheelEvent): void => {
  e.preventDefault();
  updateScrollPosition(e.deltaY);
};

const handleResize = () => {
  recalcMaxScroll();
};

const preventDrag = (e: Event): void => {
  if (e.target instanceof HTMLImageElement) {
    e.preventDefault();
  }
};

onMounted(async () => {
  await fetchImages();

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('resize', handleResize);
  document.addEventListener('dragstart', preventDrag);
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('dragstart', preventDrag);
});
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
