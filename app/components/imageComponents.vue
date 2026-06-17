<template>
  <div class="bg-white">
    <div
      v-if="isHorizontal"
      class="relative w-full overflow-hidden"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @contextmenu.prevent
    >
      <div
        ref="containerDesktop"
        class="flex w-full gap-x-4 ease-out"
        :class="isDragging ? '' : 'transition-transform duration-300'"
        :style="{ transform: `translateX(-${scrollPosition}px)` }"
      >
        <div v-for="(image, index) in images" :key="index" class="relative flex min-w-full items-center justify-center">
          <img :src="image.url" alt="Slide" class="max-h-[calc(100dvh-72px)] max-w-full w-auto object-contain pointer-events-none select-none" draggable="false" style="-webkit-user-drag: none" @load="scheduleRecalc" />
          <div class="absolute inset-0 z-10" />
        </div>
      </div>
      <ScrollBar :progress="scrollProgress" bottom-class="bottom-0" />
    </div>
    <div v-else class="flex flex-col gap-y-4 px-2 pt-2 pb-12" @contextmenu.prevent>
      <div v-for="(image, index) in images" :key="index" class="flex items-center justify-center">
        <img :src="image.url" alt="Slide" class="h-auto w-full object-contain pointer-events-none select-none" draggable="false" style="-webkit-user-drag: none" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, type Ref } from 'vue';

const { $supabase } = useNuxtApp();
const { fetchOrder, applyOrder } = useImageOrder();

interface AccueilImage {
  url: string;
  name: string;
}

const containerDesktop: Ref<HTMLElement | null> = ref(null);
const images: Ref<AccueilImage[]> = ref([]);

const isHorizontal: Ref<boolean> = ref(true);
let mediaQuery: MediaQueryList | null = null;

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

const scheduleRecalc = () => {
  requestAnimationFrame(() => requestAnimationFrame(recalcMaxScroll));
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

  const files: AccueilImage[] = data
    .filter((file) => !!file.name && !file.name.startsWith('.'))
    .filter((file) => file.name.toLowerCase().endsWith('.webp'))
    .map((file) => {
      const { data: publicData } = $supabase.storage.from('Photos').getPublicUrl(`accueil/${file.name}`);

      return { url: publicData.publicUrl, name: file.name };
    });

  const order = await fetchOrder('accueil');
  images.value = applyOrder(files, order);

  await nextTick();
  scheduleRecalc();
};

const touchStartX: Ref<number | null> = ref(null);
const isDragging: Ref<boolean> = ref(false);

const handleTouchStart = (e: TouchEvent): void => {
  const touch = e.touches.item(0);
  if (!touch) return;
  touchStartX.value = touch.clientX;
  isDragging.value = true;
};

const handleTouchMove = (e: TouchEvent): void => {
  if (touchStartX.value === null) return;
  const touch = e.touches.item(0);
  if (!touch) return;
  const dx = touchStartX.value - touch.clientX;
  touchStartX.value = touch.clientX;
  updateScrollPosition(dx);
  e.preventDefault();
};

const handleTouchEnd = (): void => {
  touchStartX.value = null;
  isDragging.value = false;
};

const handleWheel = (e: WheelEvent): void => {
  if (!isHorizontal.value) return;
  e.preventDefault();
  updateScrollPosition(e.deltaY);
};

const handleResize = () => {
  recalcMaxScroll();
};

const handleMediaChange = (e: MediaQueryListEvent): void => {
  isHorizontal.value = e.matches;
  nextTick(recalcMaxScroll);
};

const preventDrag = (e: Event): void => {
  if (e.target instanceof HTMLImageElement) {
    e.preventDefault();
  }
};

onMounted(async () => {
  mediaQuery = window.matchMedia('(min-width: 768px)');
  isHorizontal.value = mediaQuery.matches;
  mediaQuery.addEventListener('change', handleMediaChange);

  await fetchImages();

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('resize', handleResize);
  document.addEventListener('dragstart', preventDrag);
});

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', handleMediaChange);
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