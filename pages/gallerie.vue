<template>
  <div>
    <NuxtLayout name="navbar">
      <div class="max-w-[90%] mx-auto">
        <p class="mb-8 text-2xl font-bold">Cultural</p>
        <div class="grid-gallery">
          <div
            v-for="(image, index) in shuffledImages"
            :key="index"
            class="grid-item"
            @click="openModal(image)"
          >
            <img :src="image" alt="gal" class="cursor-pointer" />
          </div>
        </div>
      </div>

      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        @click="closeModal"
      >
        <div class="relative max-h-[90vh] max-w-[90vw]">
          <img
            :src="selectedImage"
            alt="Selected"
            class="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            @click="closeModal"
            class="absolute -top-10 right-0 p-2 text-white hover:text-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const images = ref([
  'img/index/1.jpg',
  'img/index/2.jpg',
  'img/index/3.jpg',
  'img/index/4.jpg',
  'img/index/5.jpg',
  'img/index/6.jpg',
  'img/index/7.jpg',
  'img/index/8.jpg',
  'img/index/9.jpg',
  'img/index/10.jpg',
  'img/index/11.jpg',
  'img/index/12.jpg',
  'img/index/13.jpg',
  'img/index/14.jpg',
  'img/index/15.jpg',
  'img/index/16.jpg',
  'img/index/17.jpg',
  'img/index/18.jpg',
  'img/index/19.jpg',
  'img/index/20.jpg',
  'img/index/21.jpg',
  'img/index/22.jpg',
  'img/index/23.jpg',
  'img/index/24.jpg',
  'img/index/25.jpg',
  'img/index/26.jpg',
  'img/index/27.jpg',
  'img/index/28.jpg',
  'img/index/29.jpg',
  'img/index/30.jpg',
  'img/index/31.jpg',
  'img/index/32.jpg',
  'img/index/33.jpg',
  'img/index/34.jpg',
  'img/index/35.jpg',
  'img/index/36.jpg',
  'img/index/37.jpg',
  'img/index/38.jpg',
  'img/index/39.jpg',
  'img/index/40.jpg',
  'img/index/41.jpg',
  'img/index/42.jpg',
  'img/index/43.jpg',
  'img/index/44.jpg',
  'img/index/45.jpg',
]);

const selectedImage = ref(null);

const openModal = (image: any) => {
  selectedImage.value = image;
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

const shuffledImages = computed(() => shuffleArray([...images.value]));


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
  cursor: zoom-in;
}
</style>
