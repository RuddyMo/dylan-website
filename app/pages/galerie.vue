<template>
  <div class="bg-white" @contextmenu.prevent>
    <div class="max-w-[90%] mx-auto">
      <div class="flex justify-center gap-4 mb-2">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          class="text-sm text-black relative cursor-none px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
          :class="{ 'font-bold': typeSelected === button.type }"
          @click="typeSelected = button.type"
        >
          {{ button.label }}
        </button>
      </div>

      <div v-if="isInitialLoading" class="grid w-full grid-cols-12 gap-4">
        <div class="animate-pulse col-start-2 col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-4 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-start-2 col-span-4 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-start-2 col-span-2 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-4 h-80 w-full bg-gray-300" />
        <div class="animate-pulse col-span-4 h-80 w-full bg-gray-300" />
      </div>

      <div v-else class="grid-gallery">
        <div v-for="image in filteredImages" :key="image.url" class="grid-item relative" @click="openModal($event, image.url)">
          <img
            :src="gridSrc(image.url)"
            alt="gal"
            loading="lazy"
            decoding="async"
            class="block w-full h-[200px] min-h-0 object-cover select-none transition-opacity duration-300 hover:opacity-90 md:h-[33vh] md:min-h-40 md:w-auto pointer-events-none"
            draggable="false"
            style="-webkit-user-drag: none"
          />
        </div>

        <p v-if="!filteredImages.length && !isLoadingMore" class="col-span-12 mt-8 text-center text-sm text-gray-500">Aucune image à afficher pour cette catégorie.</p>

        <div v-if="hasMore" ref="loadMoreTrigger" class="w-full py-6 mb-6 text-center text-sm text-gray-500">
          <span v-if="isLoadingMore">Chargement...</span>
          <span v-else>Scroll pour charger plus</span>
        </div>
      </div>
    </div>

    <div
      v-if="selectedImage"
      ref="modalBackdrop"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      @click="closeModal"
    >
      <div ref="modalFrame" class="relative max-h-[90vh] max-w-[90vw]" @click.stop>
        <!-- Vignette basse déf (déjà en cache) : agrandissement instantané, floutée tant que la HD charge -->
        <img
          :src="selectedThumb"
          aria-hidden="true"
          class="block max-h-[90vh] max-w-[90vw] object-contain select-none transition duration-700"
          :class="imageLoading ? 'blur-lg' : 'blur-0'"
          draggable="false"
          style="-webkit-user-drag: none"
        />
        <!-- Image haute définition, en fondu une fois chargée -->
        <img
          :src="previewSrc(selectedImage)"
          alt="Selected"
          class="absolute inset-0 h-full w-full object-contain select-none transition-opacity duration-700"
          :class="imageLoading ? 'opacity-0' : 'opacity-100'"
          draggable="false"
          style="-webkit-user-drag: none"
          @load="imageLoading = false"
        />
        <!-- Loader pendant le chargement de la HD -->
        <div v-if="imageLoading" class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span class="block size-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
        <button class="absolute -top-10 right-0 p-2 text-white hover:text-gray-300" @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, type ComputedRef, type Ref } from 'vue';
import gsap from 'gsap';
import type { ButtonItem, ImageItem, FolderMap, GalleryType } from '~/types/IGalerieImage';

definePageMeta({
  layout: 'navbar'
});

const { $supabase } = useNuxtApp();
const img = useImage();

// Versions optimisées (redimensionnées + WebP) servies via l'optimiseur d'image.
// La grille n'a besoin que de ~600px ; la modale plein écran de ~1600px.
const gridSrc = (url: string): string => img(url, { width: 600, quality: 70, format: 'webp' });
const previewSrc = (url: string): string => img(url, { width: 2000, quality: 88, format: 'webp' });

const buttons: ButtonItem[] = [
  { label: 'Architecture', type: 'archi' },
  { label: 'Voyage', type: 'voyage' },
  { label: 'Art', type: 'art' }
];

const images: Ref<ImageItem[]> = ref<ImageItem[]>([]);
const typeSelected: Ref<GalleryType> = ref<GalleryType>('archi');

const pageSize = 10;
const offset: Ref<number> = ref<number>(0);
const hasMore: Ref<boolean> = ref<boolean>(true);
const isInitialLoading: Ref<boolean> = ref<boolean>(true);
const isLoadingMore: Ref<boolean> = ref<boolean>(false);

const loadMoreTrigger: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const folderByType: FolderMap = {
  archi: 'gallerie/archi',
  voyage: 'gallerie/voyage',
  art: 'gallerie/art'
};

const currentFolder: ComputedRef<string> = computed(() => folderByType[typeSelected.value]);

const preloadImage = (url: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });

const fetchNextPage = async (): Promise<void> => {
  if (isLoadingMore.value || !hasMore.value) return;

  const isInitial = isInitialLoading.value;
  isLoadingMore.value = true;

  const { data, error } = await $supabase.storage.from('Photos').list(currentFolder.value, {
    limit: pageSize,
    offset: offset.value,
    sortBy: { column: 'name', order: 'asc' }
  });

  if (error) {
    console.error('Erreur list Supabase', error);
    hasMore.value = false;
    isLoadingMore.value = false;
    isInitialLoading.value = false;
    return;
  }

  if (!data || data.length === 0) {
    hasMore.value = false;
    isLoadingMore.value = false;
    isInitialLoading.value = false;
    return;
  }

  const newImages: ImageItem[] = [];
  for (const file of data) {
    if (!file.name) continue;

    const fullPath = `${currentFolder.value}/${file.name}`;

    const { data: publicData } = $supabase.storage.from('Photos').getPublicUrl(fullPath);

    newImages.push({
      url: publicData.publicUrl,
      type: typeSelected.value
    });
  }

  if (isInitial) {
    await Promise.all(newImages.map((image) => preloadImage(gridSrc(image.url))));
  }

  images.value.push(...newImages);

  offset.value += data.length;
  isLoadingMore.value = false;
  isInitialLoading.value = false;
};

const filteredImages: ComputedRef<ImageItem[]> = computed(() => images.value);

const selectedImage: Ref<string | null> = ref<string | null>(null);
const selectedThumb: Ref<string> = ref<string>('');
const imageLoading: Ref<boolean> = ref<boolean>(false);
const modalBackdrop: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);
const modalFrame: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);

// Position de la vignette cliquée, pour l'animation d'agrandissement (FLIP).
let thumbRect: DOMRect | null = null;

// Décalage entre la vignette d'origine et la modale centrée (technique FLIP).
const flipDeltas = (): { x: number; y: number; scaleX: number; scaleY: number } | null => {
  if (!modalFrame.value || !thumbRect) return null;
  const target = modalFrame.value.getBoundingClientRect();
  if (target.width === 0 || target.height === 0) return null;
  return {
    x: thumbRect.left - target.left,
    y: thumbRect.top - target.top,
    scaleX: thumbRect.width / target.width,
    scaleY: thumbRect.height / target.height
  };
};

const openModal = async (event: MouseEvent, imageUrl: string): Promise<void> => {
  thumbRect = (event.currentTarget as HTMLElement).getBoundingClientRect();

  selectedThumb.value = gridSrc(imageUrl); // vignette en cache → agrandissement instantané
  imageLoading.value = true;
  selectedImage.value = imageUrl;
  document.body.style.overflow = 'hidden';

  await nextTick();
  const deltas = flipDeltas();
  if (!modalBackdrop.value || !modalFrame.value || !deltas) return;

  gsap.fromTo(modalBackdrop.value, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  gsap.fromTo(
    modalFrame.value,
    { x: deltas.x, y: deltas.y, scaleX: deltas.scaleX, scaleY: deltas.scaleY, transformOrigin: 'top left' },
    { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.55, ease: 'power3.out' }
  );
};

const closeModal = (): void => {
  const deltas = flipDeltas();
  const finish = (): void => {
    selectedImage.value = null;
    imageLoading.value = false;
    document.body.style.overflow = 'auto';
  };

  if (!modalBackdrop.value || !modalFrame.value || !deltas) {
    finish();
    return;
  }

  gsap.to(modalBackdrop.value, { opacity: 0, duration: 0.4, ease: 'power2.in' });
  gsap.to(modalFrame.value, {
    x: deltas.x,
    y: deltas.y,
    scaleX: deltas.scaleX,
    scaleY: deltas.scaleY,
    transformOrigin: 'top left',
    duration: 0.45,
    ease: 'power3.in',
    onComplete: finish
  });
};

function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && selectedImage.value) {
    closeModal();
  }
}

function preventImageDrag(e: Event): void {
  if (e.target instanceof HTMLImageElement) {
    e.preventDefault();
  }
}

function preventImageCopy(e: Event): void {
  if (e.target instanceof HTMLImageElement) {
    e.preventDefault();
  }
}

const setupObserver = async (): Promise<void> => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (!entries || entries.length === 0) return;

    for (const entry of entries) {
      if (entry.isIntersecting) {
        void fetchNextPage();
      }
    }
  });

  await nextTick();

  if (loadMoreTrigger.value && observer) {
    observer.observe(loadMoreTrigger.value);
  }
};

watch(typeSelected, async () => {
  images.value = [];
  offset.value = 0;
  hasMore.value = true;
  isInitialLoading.value = true;
  isLoadingMore.value = false;

  await fetchNextPage();
  await setupObserver();
});

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('dragstart', preventImageDrag);
  document.addEventListener('copy', preventImageCopy);

  await fetchNextPage();
  await setupObserver();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('dragstart', preventImageDrag);
  document.removeEventListener('copy', preventImageCopy);

  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
.grid-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 5px;
}
@media (min-width: 768px) {
  .grid-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding: 0;
  }
}
</style>
