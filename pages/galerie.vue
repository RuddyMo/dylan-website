<template>
  <div @contextmenu.prevent class="bg-white">
    <NuxtLayout name="navbar" class="">
      <div class="max-w-[90%] mx-auto">
        <div class="flex justify-center gap-4 mb-2">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            @click="typeSelected = button.type"
            class="text-sm relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
          >
            {{ button.label }}
          </button>
        </div>
        <div v-show="!loaded" class="grid w-full grid-cols-12 gap-4">
          <div class="animate-pulse col-start-2 col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-4 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-start-2 col-span-4 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-start-2 col-span-2 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-4 h-80 w-full bg-gray-300"></div>
          <div class="animate-pulse col-span-4 h-80 w-full bg-gray-300"></div>
        </div>
        <div class="grid-gallery" v-show="loaded">
          <div v-for="image in filteredImages" :key="image.url" class="grid-item" @click="openModal($event, image.url)">
            <NuxtImg :src="image.url" alt="gal" quality="70" class="select-none" draggable="false" style="-webkit-user-drag: none" />
          </div>
        </div>
      </div>

      <div v-if="selectedImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeModal">
        <div class="relative max-h-[90vh] max-w-[90vw]" @click.stop>
          <NuxtImg :src="selectedImage" alt="Selected" class="max-h-[90vh] max-w-[90vw] object-contain select-none" quality="70" draggable="false" style="-webkit-user-drag: none" />
          <button @click="closeModal" class="absolute -top-10 right-0 p-2 text-white hover:text-gray-300">Fermer</button>
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
  { url: 'img/galerie/archi/1.JPG', type: 'archi' },
  { url: 'img/galerie/archi/2.JPG', type: 'archi' },
  { url: 'img/galerie/archi/3.JPG', type: 'archi' },
  { url: 'img/galerie/archi/4.JPG', type: 'archi' },
  { url: 'img/galerie/archi/5.JPG', type: 'archi' },
  { url: 'img/galerie/archi/6.JPG', type: 'archi' },
  { url: 'img/galerie/archi/7.JPG', type: 'archi' },
  { url: 'img/galerie/archi/8.JPG', type: 'archi' },
  { url: 'img/galerie/archi/9.JPG', type: 'archi' },
  { url: 'img/galerie/archi/10.JPG', type: 'archi' },
  { url: 'img/galerie/archi/11.JPG', type: 'archi' },
  { url: 'img/galerie/archi/12.JPG', type: 'archi' },
  { url: 'img/galerie/archi/13.JPG', type: 'archi' },
  { url: 'img/galerie/archi/14.JPG', type: 'archi' },
  { url: 'img/galerie/archi/15.JPG', type: 'archi' },
  { url: 'img/galerie/archi/16.JPG', type: 'archi' },
  { url: 'img/galerie/archi/17.JPG', type: 'archi' },
  { url: 'img/galerie/archi/18.JPG', type: 'archi' },
  { url: 'img/galerie/archi/19.JPG', type: 'archi' },
  { url: 'img/galerie/archi/20.JPG', type: 'archi' },
  { url: 'img/galerie/archi/21.JPG', type: 'archi' },
  { url: 'img/galerie/archi/22.JPG', type: 'archi' },
  { url: 'img/galerie/archi/23.JPG', type: 'archi' },
  { url: 'img/galerie/archi/24.JPG', type: 'archi' },
  { url: 'img/galerie/archi/25.JPG', type: 'archi' },
  { url: 'img/galerie/archi/26.JPG', type: 'archi' },
  { url: 'img/galerie/archi/27.JPG', type: 'archi' },
  { url: 'img/galerie/archi/28.JPG', type: 'archi' },
  { url: 'img/galerie/archi/29.JPG', type: 'archi' },
  { url: 'img/galerie/archi/30.JPG', type: 'archi' },
  { url: 'img/galerie/archi/31.JPG', type: 'archi' },
  { url: 'img/galerie/archi/32.JPG', type: 'archi' },
  { url: 'img/galerie/archi/33.JPG', type: 'archi' },
  { url: 'img/galerie/archi/34.JPG', type: 'archi' },
  { url: 'img/galerie/archi/35.JPG', type: 'archi' },
  { url: 'img/galerie/archi/36.JPG', type: 'archi' },
  { url: 'img/galerie/archi/37.JPG', type: 'archi' },
  { url: 'img/galerie/archi/38.JPG', type: 'archi' },
  { url: 'img/galerie/archi/39.JPG', type: 'archi' },
  { url: 'img/galerie/archi/40.JPG', type: 'archi' },
  { url: 'img/galerie/archi/41.JPG', type: 'archi' },
  { url: 'img/galerie/archi/42.JPG', type: 'archi' },
  { url: 'img/galerie/archi/43.JPG', type: 'archi' },
  { url: 'img/galerie/archi/44.JPG', type: 'archi' },
  { url: 'img/galerie/archi/46.JPG', type: 'archi' },
  { url: 'img/galerie/archi/45.JPG', type: 'archi' },
  { url: 'img/galerie/archi/47.JPG', type: 'archi' },
  { url: 'img/galerie/archi/48.JPG', type: 'archi' },
  { url: 'img/galerie/archi/49.JPG', type: 'archi' },
  { url: 'img/galerie/archi/50.JPG', type: 'archi' },
  { url: 'img/galerie/archi/51.JPG', type: 'archi' },
  { url: 'img/galerie/archi/52.JPG', type: 'archi' },
  { url: 'img/galerie/archi/53.JPG', type: 'archi' },
  { url: 'img/galerie/archi/54.JPG', type: 'archi' },
  { url: 'img/galerie/archi/55.JPG', type: 'archi' },
  { url: 'img/galerie/archi/56.JPG', type: 'archi' },
  { url: 'img/galerie/archi/57.JPG', type: 'archi' },
  { url: 'img/galerie/archi/58.JPG', type: 'archi' },
  { url: 'img/galerie/archi/59.JPG', type: 'archi' },
  { url: 'img/galerie/archi/60.JPG', type: 'archi' },
  { url: 'img/galerie/archi/61.JPG', type: 'archi' },
  { url: 'img/galerie/archi/62.JPG', type: 'archi' },
  { url: 'img/galerie/archi/63.JPG', type: 'archi' },
  { url: 'img/galerie/archi/64.JPG', type: 'archi' },
  { url: 'img/galerie/archi/65.JPG', type: 'archi' },
  { url: 'img/galerie/archi/66.JPG', type: 'archi' },
  { url: 'img/galerie/archi/67.JPG', type: 'archi' },
  { url: 'img/galerie/archi/68.JPG', type: 'archi' },
  { url: 'img/galerie/archi/69.JPG', type: 'archi' },
  { url: 'img/galerie/archi/70.JPG', type: 'archi' },
  { url: 'img/galerie/archi/71.JPG', type: 'archi' },
  { url: 'img/galerie/archi/72.JPG', type: 'archi' },
  { url: 'img/galerie/archi/73.JPG', type: 'archi' },
  { url: 'img/galerie/art/1.JPG', type: 'art' },
  { url: 'img/galerie/art/2.JPG', type: 'art' },
  { url: 'img/galerie/art/3.JPG', type: 'art' },
  { url: 'img/galerie/art/4.JPG', type: 'art' },
  { url: 'img/galerie/art/5.JPG', type: 'art' },
  { url: 'img/galerie/art/6.JPG', type: 'art' },
  { url: 'img/galerie/art/7.JPG', type: 'art' },
  { url: 'img/galerie/art/8.JPG', type: 'art' },
  { url: 'img/galerie/art/9.JPG', type: 'art' },
  { url: 'img/galerie/art/10.JPG', type: 'art' },
  { url: 'img/galerie/art/11.JPG', type: 'art' },
  { url: 'img/galerie/art/12.JPG', type: 'art' },
  { url: 'img/galerie/art/13.JPG', type: 'art' },
  { url: 'img/galerie/art/14.JPG', type: 'art' },
  { url: 'img/galerie/art/15.JPG', type: 'art' },
  { url: 'img/galerie/art/16.JPG', type: 'art' },
  { url: 'img/galerie/art/17.JPG', type: 'art' },
  { url: 'img/galerie/art/18.JPG', type: 'art' },
  { url: 'img/galerie/art/19.JPG', type: 'art' },
  { url: 'img/galerie/art/20.JPG', type: 'art' },
  { url: 'img/galerie/art/21.JPG', type: 'art' },
  { url: 'img/galerie/art/22.JPG', type: 'art' },
  { url: 'img/galerie/art/23.JPG', type: 'art' },
  { url: 'img/galerie/art/24.JPG', type: 'art' },
  { url: 'img/galerie/art/25.JPG', type: 'art' },
  { url: 'img/galerie/art/26.JPG', type: 'art' },
  { url: 'img/galerie/art/27.JPG', type: 'art' },
  { url: 'img/galerie/art/28.JPG', type: 'art' },
  { url: 'img/galerie/art/29.JPG', type: 'art' },
  { url: 'img/galerie/voyage/1.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/2.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/3.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/4.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/5.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/6.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/7.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/8.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/9.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/10.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/11.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/12.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/13.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/14.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/15.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/16.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/17.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/18.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/19.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/20.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/21.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/22.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/23.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/24.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/25.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/26.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/27.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/28.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/29.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/30.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/31.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/32.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/33.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/34.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/35.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/36.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/37.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/38.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/39.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/40.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/41.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/42.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/43.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/44.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/45.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/46.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/47.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/48.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/49.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/50.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/51.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/52.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/53.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/54.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/55.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/56.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/57.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/58.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/59.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/60.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/61.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/62.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/63.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/64.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/65.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/66.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/67.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/68.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/69.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/70.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/71.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/72.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/73.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/74.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/75.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/76.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/77.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/78.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/79.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/80.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/81.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/82.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/83.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/84.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/85.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/86.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/87.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/88.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/89.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/90.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/91.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/92.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/93.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/94.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/95.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/96.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/97.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/98.JPG', type: 'voyage' },
  { url: 'img/galerie/voyage/99.JPG', type: 'voyage' }
];

const shuffledImages = ref<Image[]>([]);
const typeSelected = ref<string | null>(null);

function shuffleArray(array: Image[]): Image[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function saveOrderToCookie(shuffledOrder: Image[]): void {
  const orderIndices = shuffledOrder.map((img) => images.findIndex((origImg) => origImg.url === img.url));
  document.cookie = `imageOrder=${JSON.stringify(orderIndices)};max-age=${60 * 60 * 24 * 30};path=/`;
}

function getOrderFromCookie(): Image[] | null {
  const cookies = document.cookie.split(';');
  const orderCookie = cookies.find((cookie) => cookie.trim().startsWith('imageOrder='));

  if (orderCookie) {
    try {
      const orderIndices = JSON.parse(orderCookie.split('=')[1]);
      return orderIndices.map((index: number) => images[index]);
    } catch (e) {
      console.error('Erreur lors de la lecture du cookie:', e);
      return null;
    }
  }
  return null;
}

const filteredImages = computed(() => {
  if (typeSelected.value) {
    return shuffledImages.value.filter((image) => image.type === typeSelected.value);
  }
  return shuffledImages.value;
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
  const savedOrder = getOrderFromCookie();

  if (savedOrder) {
    shuffledImages.value = savedOrder;
  } else {
    const shuffled = shuffleArray([...images]);
    shuffledImages.value = shuffled;
    saveOrderToCookie(shuffled);
  }

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
