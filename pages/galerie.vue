<template>
  <div class="bg-white" @contextmenu.prevent>
    <NuxtLayout name="navbar" class="">
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
        <div v-show="!loaded" class="grid w-full grid-cols-12 gap-4">
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
        <div v-show="loaded" class="grid-gallery">
          <div v-for="image in filteredImages" :key="image.url" class="grid-item" @click="openModal($event, image.url)">
            <NuxtImg :src="image.url" alt="gal" quality="10" class="select-none" draggable="false" style="-webkit-user-drag: none" />
          </div>
        </div>
      </div>

      <div v-if="selectedImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeModal">
        <div class="relative max-h-[90vh] max-w-[90vw]" @click.stop>
          <NuxtImg :src="selectedImage" alt="Selected" class="max-h-[90vh] max-w-[90vw] object-contain select-none" quality="70" draggable="false" style="-webkit-user-drag: none" />
          <button class="absolute -top-10 right-0 p-2 text-white hover:text-gray-300" @click="closeModal">Fermer</button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Image {
  url: string;
  type: string;
}

const buttons = [
  { label: 'Architecture', type: 'archi' },
  { label: 'Voyage', type: 'voyage' },
  { label: 'Art', type: 'art' }
];

const loaded = ref<boolean>(false);

const images: Image[] = [
  { url: 'img/galerie/voyage/81.webp', type: 'voyage' },
  { url: 'img/galerie/archi/23.webp', type: 'archi' },
  { url: 'img/galerie/archi/74.webp', type: 'archi' },
  { url: 'img/galerie/voyage/54.webp', type: 'voyage' },
  { url: 'img/galerie/art/14.webp', type: 'art' },
  { url: 'img/galerie/archi/85.webp', type: 'archi' },
  { url: 'img/galerie/voyage/17.webp', type: 'voyage' },
  { url: 'img/galerie/archi/39.webp', type: 'archi' },
  { url: 'img/galerie/voyage/73.webp', type: 'voyage' },
  { url: 'img/galerie/archi/78.webp', type: 'archi' },
  { url: 'img/galerie/art/26.webp', type: 'art' },
  { url: 'img/galerie/voyage/68.webp', type: 'voyage' },
  { url: 'img/galerie/archi/40.webp', type: 'archi' },
  { url: 'img/galerie/archi/9.webp', type: 'archi' },
  { url: 'img/galerie/voyage/47.webp', type: 'voyage' },
  { url: 'img/galerie/archi/71.webp', type: 'archi' },
  { url: 'img/galerie/art/4.webp', type: 'art' },
  { url: 'img/galerie/voyage/12.webp', type: 'voyage' },
  { url: 'img/galerie/archi/47.webp', type: 'archi' },
  { url: 'img/galerie/archi/82.webp', type: 'archi' },
  { url: 'img/galerie/voyage/94.webp', type: 'voyage' },
  { url: 'img/galerie/archi/55.webp', type: 'archi' },
  { url: 'img/galerie/archi/91.webp', type: 'archi' },
  { url: 'img/galerie/voyage/29.webp', type: 'voyage' },
  { url: 'img/galerie/art/7.webp', type: 'art' },
  { url: 'img/galerie/archi/76.webp', type: 'archi' },
  { url: 'img/galerie/voyage/3.webp', type: 'voyage' },
  { url: 'img/galerie/archi/43.webp', type: 'archi' },
  { url: 'img/galerie/archi/89.webp', type: 'archi' },
  { url: 'img/galerie/voyage/79.webp', type: 'voyage' },
  { url: 'img/galerie/archi/66.webp', type: 'archi' },
  { url: 'img/galerie/art/19.webp', type: 'art' },
  { url: 'img/galerie/voyage/37.webp', type: 'voyage' },
  { url: 'img/galerie/archi/3.webp', type: 'archi' },
  { url: 'img/galerie/voyage/76.webp', type: 'voyage' },
  { url: 'img/galerie/archi/68.webp', type: 'archi' },
  { url: 'img/galerie/archi/77.webp', type: 'archi' },
  { url: 'img/galerie/art/10.webp', type: 'art' },
  { url: 'img/galerie/voyage/41.webp', type: 'voyage' },
  { url: 'img/galerie/archi/32.webp', type: 'archi' },
  { url: 'img/galerie/archi/86.webp', type: 'archi' },
  { url: 'img/galerie/voyage/61.webp', type: 'voyage' },
  { url: 'img/galerie/archi/10.webp', type: 'archi' },
  { url: 'img/galerie/art/16.webp', type: 'art' },
  { url: 'img/galerie/voyage/24.webp', type: 'voyage' },
  { url: 'img/galerie/archi/57.webp', type: 'archi' },
  { url: 'img/galerie/archi/79.webp', type: 'archi' },
  { url: 'img/galerie/voyage/86.webp', type: 'voyage' },
  { url: 'img/galerie/archi/15.webp', type: 'archi' },
  { url: 'img/galerie/archi/92.webp', type: 'archi' },
  { url: 'img/galerie/art/28.webp', type: 'art' },
  { url: 'img/galerie/voyage/9.webp', type: 'voyage' },
  { url: 'img/galerie/archi/36.webp', type: 'archi' },
  { url: 'img/galerie/archi/75.webp', type: 'archi' },
  { url: 'img/galerie/voyage/56.webp', type: 'voyage' },
  { url: 'img/galerie/archi/61.webp', type: 'archi' },
  { url: 'img/galerie/archi/84.webp', type: 'archi' },
  { url: 'img/galerie/art/1.webp', type: 'art' },
  { url: 'img/galerie/voyage/34.webp', type: 'voyage' },
  { url: 'img/galerie/archi/25.webp', type: 'archi' },
  { url: 'img/galerie/voyage/99.webp', type: 'voyage' },
  { url: 'img/galerie/archi/59.webp', type: 'archi' },
  { url: 'img/galerie/art/22.webp', type: 'art' },
  { url: 'img/galerie/voyage/50.webp', type: 'voyage' },
  { url: 'img/galerie/archi/4.webp', type: 'archi' },
  { url: 'img/galerie/archi/81.webp', type: 'archi' },
  { url: 'img/galerie/voyage/98.webp', type: 'voyage' },
  { url: 'img/galerie/archi/51.webp', type: 'archi' },
  { url: 'img/galerie/archi/88.webp', type: 'archi' },
  { url: 'img/galerie/art/13.webp', type: 'art' },
  { url: 'img/galerie/voyage/26.webp', type: 'voyage' },
  { url: 'img/galerie/archi/28.webp', type: 'archi' },
  { url: 'img/galerie/voyage/91.webp', type: 'voyage' },
  { url: 'img/galerie/archi/72.webp', type: 'archi' },
  { url: 'img/galerie/archi/80.webp', type: 'archi' },
  { url: 'img/galerie/art/2.webp', type: 'art' },
  { url: 'img/galerie/voyage/39.webp', type: 'voyage' },
  { url: 'img/galerie/archi/20.webp', type: 'archi' },
  { url: 'img/galerie/archi/83.webp', type: 'archi' },
  { url: 'img/galerie/voyage/71.webp', type: 'voyage' },
  { url: 'img/galerie/archi/46.webp', type: 'archi' },
  { url: 'img/galerie/art/25.webp', type: 'art' },
  { url: 'img/galerie/voyage/14.webp', type: 'voyage' },
  { url: 'img/galerie/archi/7.webp', type: 'archi' },
  { url: 'img/galerie/voyage/82.webp', type: 'voyage' },
  { url: 'img/galerie/archi/41.webp', type: 'archi' },
  { url: 'img/galerie/art/5.webp', type: 'art' },
  { url: 'img/galerie/voyage/59.webp', type: 'voyage' },
  { url: 'img/galerie/archi/17.webp', type: 'archi' },
  { url: 'img/galerie/voyage/95.webp', type: 'voyage' },
  { url: 'img/galerie/archi/64.webp', type: 'archi' },
  { url: 'img/galerie/archi/87.webp', type: 'archi' },
  { url: 'img/galerie/art/17.webp', type: 'art' },
  { url: 'img/galerie/voyage/31.webp', type: 'voyage' },
  { url: 'img/galerie/archi/34.webp', type: 'archi' },
  { url: 'img/galerie/archi/90.webp', type: 'archi' },
  { url: 'img/galerie/voyage/88.webp', type: 'voyage' },
  { url: 'img/galerie/archi/48.webp', type: 'archi' },
  { url: 'img/galerie/art/24.webp', type: 'art' },
  { url: 'img/galerie/voyage/5.webp', type: 'voyage' },
  { url: 'img/galerie/archi/13.webp', type: 'archi' },
  { url: 'img/galerie/voyage/66.webp', type: 'voyage' },
  { url: 'img/galerie/archi/60.webp', type: 'archi' },
  { url: 'img/galerie/art/8.webp', type: 'art' },
  { url: 'img/galerie/voyage/43.webp', type: 'voyage' },
  { url: 'img/galerie/archi/30.webp', type: 'archi' },
  { url: 'img/galerie/voyage/74.webp', type: 'voyage' },
  { url: 'img/galerie/archi/53.webp', type: 'archi' },
  { url: 'img/galerie/art/29.webp', type: 'art' },
  { url: 'img/galerie/voyage/20.webp', type: 'voyage' },
  { url: 'img/galerie/archi/1.webp', type: 'archi' },
  { url: 'img/galerie/voyage/97.webp', type: 'voyage' },
  { url: 'img/galerie/archi/70.webp', type: 'archi' },
  { url: 'img/galerie/art/20.webp', type: 'art' },
  { url: 'img/galerie/voyage/36.webp', type: 'voyage' },
  { url: 'img/galerie/archi/22.webp', type: 'archi' },
  { url: 'img/galerie/voyage/63.webp', type: 'voyage' },
  { url: 'img/galerie/archi/44.webp', type: 'archi' },
  { url: 'img/galerie/art/6.webp', type: 'art' },
  { url: 'img/galerie/voyage/4.webp', type: 'voyage' },
  { url: 'img/galerie/archi/19.webp', type: 'archi' },
  { url: 'img/galerie/voyage/80.webp', type: 'voyage' },
  { url: 'img/galerie/archi/37.webp', type: 'archi' },
  { url: 'img/galerie/art/27.webp', type: 'art' },
  { url: 'img/galerie/voyage/7.webp', type: 'voyage' },
  { url: 'img/galerie/archi/58.webp', type: 'archi' },
  { url: 'img/galerie/voyage/83.webp', type: 'voyage' },
  { url: 'img/galerie/archi/11.webp', type: 'archi' },
  { url: 'img/galerie/art/11.webp', type: 'art' },
  { url: 'img/galerie/voyage/46.webp', type: 'voyage' },
  { url: 'img/galerie/archi/52.webp', type: 'archi' },
  { url: 'img/galerie/voyage/77.webp', type: 'voyage' },
  { url: 'img/galerie/archi/26.webp', type: 'archi' },
  { url: 'img/galerie/art/18.webp', type: 'art' },
  { url: 'img/galerie/voyage/51.webp', type: 'voyage' },
  { url: 'img/galerie/archi/65.webp', type: 'archi' },
  { url: 'img/galerie/voyage/32.webp', type: 'voyage' },
  { url: 'img/galerie/archi/5.webp', type: 'archi' },
  { url: 'img/galerie/art/9.webp', type: 'art' },
  { url: 'img/galerie/voyage/64.webp', type: 'voyage' },
  { url: 'img/galerie/archi/50.webp', type: 'archi' },
  { url: 'img/galerie/voyage/90.webp', type: 'voyage' },
  { url: 'img/galerie/archi/29.webp', type: 'archi' },
  { url: 'img/galerie/art/15.webp', type: 'art' },
  { url: 'img/galerie/voyage/25.webp', type: 'voyage' },
  { url: 'img/galerie/archi/73.webp', type: 'archi' },
  { url: 'img/galerie/voyage/87.webp', type: 'voyage' },
  { url: 'img/galerie/archi/16.webp', type: 'archi' },
  { url: 'img/galerie/art/23.webp', type: 'art' },
  { url: 'img/galerie/voyage/42.webp', type: 'voyage' },
  { url: 'img/galerie/archi/63.webp', type: 'archi' },
  { url: 'img/galerie/voyage/69.webp', type: 'voyage' },
  { url: 'img/galerie/archi/2.webp', type: 'archi' },
  { url: 'img/galerie/art/3.webp', type: 'art' },
  { url: 'img/galerie/voyage/52.webp', type: 'voyage' },
  { url: 'img/galerie/archi/35.webp', type: 'archi' },
  { url: 'img/galerie/voyage/85.webp', type: 'voyage' },
  { url: 'img/galerie/archi/56.webp', type: 'archi' },
  { url: 'img/galerie/art/21.webp', type: 'art' },
  { url: 'img/galerie/voyage/23.webp', type: 'voyage' },
  { url: 'img/galerie/archi/12.webp', type: 'archi' },
  { url: 'img/galerie/voyage/78.webp', type: 'voyage' },
  { url: 'img/galerie/archi/67.webp', type: 'archi' },
  { url: 'img/galerie/art/12.webp', type: 'art' },
  { url: 'img/galerie/voyage/19.webp', type: 'voyage' },
  { url: 'img/galerie/archi/38.webp', type: 'archi' },
  { url: 'img/galerie/voyage/60.webp', type: 'voyage' },
  { url: 'img/galerie/archi/8.webp', type: 'archi' },
  { url: 'img/galerie/voyage/1.webp', type: 'voyage' },
  { url: 'img/galerie/archi/42.webp', type: 'archi' },
  { url: 'img/galerie/voyage/65.webp', type: 'voyage' },
  { url: 'img/galerie/archi/21.webp', type: 'archi' },
  { url: 'img/galerie/voyage/48.webp', type: 'voyage' },
  { url: 'img/galerie/archi/6.webp', type: 'archi' },
  { url: 'img/galerie/voyage/93.webp', type: 'voyage' },
  { url: 'img/galerie/archi/54.webp', type: 'archi' },
  { url: 'img/galerie/voyage/28.webp', type: 'voyage' },
  { url: 'img/galerie/archi/33.webp', type: 'archi' },
  { url: 'img/galerie/voyage/75.webp', type: 'voyage' },
  { url: 'img/galerie/archi/45.webp', type: 'archi' },
  { url: 'img/galerie/voyage/15.webp', type: 'voyage' },
  { url: 'img/galerie/archi/24.webp', type: 'archi' },
  { url: 'img/galerie/voyage/58.webp', type: 'voyage' },
  { url: 'img/galerie/archi/18.webp', type: 'archi' },
  { url: 'img/galerie/voyage/35.webp', type: 'voyage' },
  { url: 'img/galerie/archi/69.webp', type: 'archi' },
  { url: 'img/galerie/voyage/55.webp', type: 'voyage' },
  { url: 'img/galerie/archi/27.webp', type: 'archi' },
  { url: 'img/galerie/voyage/10.webp', type: 'voyage' },
  { url: 'img/galerie/archi/62.webp', type: 'archi' },
  { url: 'img/galerie/voyage/67.webp', type: 'voyage' },
  { url: 'img/galerie/archi/14.webp', type: 'archi' },
  { url: 'img/galerie/voyage/2.webp', type: 'voyage' },
  { url: 'img/galerie/archi/31.webp', type: 'archi' },
  { url: 'img/galerie/voyage/89.webp', type: 'voyage' },
  { url: 'img/galerie/archi/49.webp', type: 'archi' },
  { url: 'img/galerie/voyage/33.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/40.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/16.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/70.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/92.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/8.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/30.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/44.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/18.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/38.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/62.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/53.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/6.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/96.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/57.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/45.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/13.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/22.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/72.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/27.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/11.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/49.webp', type: 'voyage' },
  { url: 'img/galerie/voyage/84.webp', type: 'voyage' }
];

const typeSelected = ref<string>('archi');

const filteredImages = computed(() => {
  if (typeSelected.value) {
    return images.filter((image) => image.type === typeSelected.value);
  }
  return images;
});

const selectedImage = ref<string | null>(null);

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

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('dragstart', preventImageDrag);
  document.addEventListener('copy', preventImageCopy);

  setTimeout(() => {
    loaded.value = true;
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('dragstart', preventImageDrag);
  document.removeEventListener('copy', preventImageCopy);
});
</script>

<style scoped>
.grid-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.grid-item {
  position: relative;
  grid-column: span 3;
}

.grid-item.normal {
  grid-column: span 3;
}

.grid-item.large {
  grid-column: span 3;
  grid-row: span 2;
}

.grid-item.wide {
  grid-column: span 6;
}

.grid-item img {
  display: block;
  width: auto;
  height: 33vh;
  min-height: 10rem;
  object-fit: cover;
  transition: opacity 0.3s ease;
  -webkit-user-drag: none;
  pointer-events: none;
}

.grid-item.large img {
  height: calc(66vh + 2rem);
}

.grid-item img:hover {
  opacity: 0.9;
}

.select-none {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
