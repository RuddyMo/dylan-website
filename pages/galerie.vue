<template>
  <div class="bg-white" @contextmenu.prevent>
    <NuxtLayout name="navbar">
      <div class="max-w-[90%] mx-auto">
        <div class="flex justify-center gap-4 mb-2">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            class="text-sm relative cursor-none px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
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
            <NuxtImg
              :src="image.url"
              alt="gal"
              quality="70"
              loading="lazy"
              placeholder
              class="block w-full h-[200px] min-h-0 object-cover select-none transition-opacity duration-300 hover:opacity-90 md:h-[33vh] md:min-h-[10rem] md:w-auto pointer-events-none"
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

      <div v-if="selectedImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeModal">
        <div class="relative max-h-[90vh] max-w-[90vw]" @click.stop>
          <NuxtImg :src="selectedImage" alt="Selected" class="max-h-[90vh] max-w-[90vw] object-contain select-none" quality="70" placeholder draggable="false" style="-webkit-user-drag: none" />
          <button class="absolute -top-10 right-0 p-2 text-white hover:text-gray-300" @click="closeModal">Fermer</button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch, type ComputedRef, type Ref } from 'vue';
import type { ButtonItem, ImageItem, FolderMap, GalleryType } from '~/types/IGalerieImage';

const { $supabase } = useNuxtApp();

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

const fetchNextPage = async (): Promise<void> => {
  if (isLoadingMore.value || !hasMore.value) return;

  isLoadingMore.value = true;

  const { data, error } = await $supabase.storage.from('Photos').list(currentFolder.value, {
    limit: pageSize,
    offset: offset.value,
    sortBy: { column: 'name', order: 'asc' }
  });

  console.log(`LIST "${currentFolder.value}" [offset=${offset.value}] =>`, {
    data,
    error
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

  for (const file of data) {
    if (!file.name) continue;

    const fullPath = `${currentFolder.value}/${file.name}`;

    const { data: publicData } = $supabase.storage.from('Photos').getPublicUrl(fullPath);

    images.value.push({
      url: publicData.publicUrl,
      type: typeSelected.value
    });
  }

  offset.value += data.length;
  isLoadingMore.value = false;
  isInitialLoading.value = false;
};

const filteredImages: ComputedRef<ImageItem[]> = computed(() => images.value);

const selectedImage: Ref<string | null> = ref<string | null>(null);

const openModal = (_event: MouseEvent, imageUrl: string): void => {
  selectedImage.value = imageUrl;
  document.body.style.overflow = 'hidden';
};

const closeModal = (): void => {
  selectedImage.value = null;
  document.body.style.overflow = 'auto';
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
