<template>
  <div>
    <NuxtLayout name="navbar">
      <div class="max-w-[90%] mx-auto">
        <div class="flex justify-center gap-4 mb-2">
          <button
            class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
          >
            Architecture
          </button>
          <button
            class="relative px-1 before:inline-block before:content-['.'] before:absolute before:left-0 before:opacity-0 before:translate-x-2 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
          >
            Voyage
          </button>
        </div>
        <div class="grid-gallery">
          <div v-if="loading" v-for="(image, index) in images" :key="index" class="grid-item" @click="openModal" :class="loading ? '' : 'hidden'">
            <NuxtImg :src="image.url" alt="gal" class="cursor-pointer" quality="60" />
          </div>
          <div class="grid w-full grid-cols-12 gap-4" v-else>
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
        </div>
      </div>

      <div v-if="selectedImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" @click="closeModal">
        <div class="relative max-h-[90vh] max-w-[90vw]">
          <NuxtImg :src="selectedImage" alt="Selected" class="max-h-[90vh] max-w-[90vw] object-contain" quality="100" />
          <button @click="closeModal" class="absolute -top-10 right-0 p-2 text-white hover:text-gray-300">Fermer</button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const loading = ref(false);

setTimeout(() => {
  loading.value = true;
}, 1200);

const images = shuffleArray([
  { url: 'img/index/1.JPG', type: 'archi' },
  { url: 'img/index/2.JPG', type: 'voyage' },
  { url: 'img/index/3.JPG', type: 'archi' },
  { url: 'img/index/4.JPG', type: 'archi' },
  { url: 'img/index/5.JPG', type: 'archi' },
  { url: 'img/index/6.JPG', type: 'archi' },
  { url: 'img/index/7.JPG', type: 'archi' },
  { url: 'img/index/8.JPG', type: 'archi' },
  { url: 'img/index/9.JPG', type: 'archi' },
  { url: 'img/index/10.JPG', type: 'archi' },
  { url: 'img/index/11.JPG', type: 'archi' },
  { url: 'img/index/12.JPG', type: 'archi' },
  { url: 'img/index/13.JPG', type: 'archi' },
  { url: 'img/index/14.JPG', type: 'archi' },
  { url: 'img/index/15.JPG', type: 'archi' },
  { url: 'img/index/16.JPG', type: 'archi' },
  { url: 'img/index/17.JPG', type: 'archi' },
  { url: 'img/index/18.JPG', type: 'archi' },
  { url: 'img/index/19.JPG', type: 'archi' },
  { url: 'img/index/20.JPG', type: 'archi' },
  { url: 'img/index/21.JPG', type: 'archi' },
  { url: 'img/index/22.JPG', type: 'archi' },
  { url: 'img/index/23.JPG', type: 'archi' },
  { url: 'img/index/24.JPG', type: 'archi' },
  { url: 'img/index/25.JPG', type: 'archi' },
  { url: 'img/index/26.JPG', type: 'archi' },
  { url: 'img/index/27.JPG', type: 'archi' },
  { url: 'img/index/28.JPG', type: 'archi' },
  { url: 'img/index/29.JPG', type: 'archi' },
  { url: 'img/index/30.JPG', type: 'archi' },
  { url: 'img/index/31.JPG', type: 'archi' },
  { url: 'img/index/32.JPG', type: 'archi' },
  { url: 'img/index/33.JPG', type: 'archi' },
  { url: 'img/index/34.JPG', type: 'archi' },
  { url: 'img/index/35.JPG', type: 'archi' },
  { url: 'img/index/36.JPG', type: 'archi' },
  { url: 'img/index/37.JPG', type: 'archi' },
  { url: 'img/index/38.JPG', type: 'archi' },
  { url: 'img/index/39.JPG', type: 'archi' },
  { url: 'img/index/40.JPG', type: 'archi' },
  { url: 'img/index/41.JPG', type: 'archi' },
  { url: 'img/index/42.JPG', type: 'archi' },
  { url: 'img/index/43.JPG', type: 'archi' },
  { url: 'img/index/44.JPG', type: 'archi' },
  { url: 'img/index/45.JPG', type: 'archi' }
]);

const selectedImage = ref<string | null>(null);

const openModal = ($event: MouseEvent) => {
  selectedImage.value = ($event.target as HTMLImageElement).src;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedImage.value = null;
  document.body.style.overflow = 'auto';
};

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && selectedImage.value) {
      closeModal();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape' && selectedImage.value) {
      closeModal();
    }
  });
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
}

.grid-item.large img {
  height: calc(66vh + 2rem);
}

.grid-item img:hover {
  opacity: 0.9;
}
</style>
