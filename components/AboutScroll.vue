<template>
  <div class="bg-white">
    <div class="hidden md:block relative h-[calc(100vh-32px)] overflow-hidden" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" @contextmenu.prevent>
      <div ref="containerDesktop" class="absolute flex h-full w-full transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${scrollPosition}px)` }">
        
        <div class="flex">
          <div class="flex justify-between min-w-[100vw] items-center bg-white">
            <div class="flex w-full h-full">
              <div class="w-1/2 flex flex-col justify-center px-12">
                <h1 class="text-6xl md:text-8xl font-bold text-black leading-none mb-4">
                  DYLAN
                </h1>
                <h2 class="text-3xl md:text-4xl font-light italic text-black mb-4">
                  MOREL
                </h2>
                <h3 class="text-2xl md:text-3xl font-bold text-black mb-2">
                  ARCHITECTE
                </h3>
                <h4 class="text-2xl md:text-3xl font-light italic text-black">
                  PHOTOGRAPHER
                </h4>
              </div>
              
              <div class=" w-1/2 h-full flex items-center justify-end overflow-hidden">
                <div class="w-2/3 h-screen overflow-hidden">
                  <NuxtImg 
                    src="/img/about/about.webp" 
                    class="w-full h-full object-cover" 
                    alt="Dylan portrait" 
                    draggable="false"
                    :style="{ transform: `translateX(${scrollPosition * 0.1}px)` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col min-w-[40%] relative">
            <div class="h-1/2" />
            
            <div class="h-1/2 flex items-end justify-center pb-16">
              <div class="text-center">
                <h2 class="text-4xl md:text-6xl font-bold text-black leading-tight mb-6 text-left">
                  ENTRE BÉTON ET LUMIÈRE,<br>
                  JE CAPTURE L'ÂME DES VILLES<br>
                  QUE JE TRAVERSE.
                </h2>
              </div>
            </div>
          </div>

          <div class="flex flex-col min-w-[40%] relative">
            <div class="h-1/2 flex pt-12 justify-start pr-12 pl-4">
              <div class="text-center">
                <h2 class="text-4xl md:text-6xl  text-black leading-tight text-left">
                  JE CONSTRUIS DES IMAGES,<br>
                  JE VOYAGE DANS LES FORMES.<br>
                </h2>
              </div>
            </div>
            
            <div class="h-1/2 w-full flex items-start justify-center">
              <div class="w-full h-72 overflow-hidden pl-20">
                <NuxtImg 
                  src="/img/about/photo.webp" 
                  class="w-auto h-full object-cover grayscale" 
                  alt="Photo" 
                  draggable="false"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col min-w-[40%] relative">
            <div class="h-1/2 flex items-center justify-center">
              <div class="w-full h-80 overflow-hidden pl-20">
                <NuxtImg 
                  src="/img/about/archi.webp" 
                  class="w-auto h-full object-cover grayscale" 
                  alt="Photo" 
                  draggable="false"
                />
              </div>
            </div>
            
            <div class="h-1/2 flex items-end pb-12 justify-start px-12">
              <div class="text-center max-w-4xl">
                <h2 class="text-4xl md:text-[52px] text-black leading-tight text-left">
                  CHAQUE VILLE UNE HISTOIRE,<br>
                  CHAQUE BÂTIMENT UNE ÉMOTION,<br>
                  CHAQUE DÉTAIL UNE RÉVÉLATION.
                </h2>
              </div>
            </div>
          </div>

          <div class="flex flex-col min-w-[30%] relative text-black">
            <div class="h-1/2 flex pt-12 justify-start px-12">
              <div class="text-center">
                <h2 class="text-4xl md:text-[52px] leading-tight text-left">
                  VOYAGER POUR COMPRENDRE,<br>
                  PHOTOGRAPHIER POUR PARTAGER,<br>
                  RACONTER POUR ÉMOUVOIR.
                </h2>
              </div>
            </div>
            
            <div class="h-1/2 w-full flex items-center justify-center">
              <div class="w-full h-80 overflow-hidden pl-20">
                <NuxtImg 
                  src="/img/about/voyage.webp" 
                  class="w-auto h-full object-cover grayscale opacity-80" 
                  alt="Background" 
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
     <ScrollBar :progress="scrollProgress" />
    </div>

    <div class="md:hidden h-full overflow-hidden" @touchstart="handleTouchStartMobile" @touchmove="handleTouchMoveMobile" @touchend="handleTouchEndMobile" @wheel="handleWheelMobile" @contextmenu.prevent>
      <div ref="containerMobile" class="transition-transform duration-300 ease-out" :style="{ transform: `translateY(-${scrollPositionMobile}px)` }">
        
        <div class="h-screen w-full flex flex-col bg-white">
          <div class="h-1/2 flex flex-col justify-center px-8">
            <h1 class="text-4xl font-bold text-black leading-none mb-4">
              DYLAN
            </h1>
            <h2 class="text-2xl font-light italic text-black mb-4">
              MOREL
            </h2>
            <h3 class="text-xl font-bold text-black mb-2">
              ARCHITECTE
            </h3>
            <h4 class="text-xl font-light italic text-black">
              PHOTOGRAPHE
            </h4>
          </div>
          <div class="h-1/2 flex items-center justify-center">
            <div class="w-48 h-80 overflow-hidden">
              <NuxtImg src="/img/about/about.webp" class="w-full h-full object-cover" alt="Dylan portrait" draggable="false" />
            </div>
          </div>
        </div>

        <div class="h-full w-full flex flex-col bg-white">
          <div class="h-1/2 flex items-center justify-center px-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-black leading-tight">
                ENTRE BÉTON ET LUMIÈRE,<br>
                JE CAPTURE L'ÂME DES VILLES<br>
                QUE JE TRAVERSE.
              </h2>
            </div>
          </div>
        </div>

        <div class="h-screen w-full flex flex-col bg-white">
          <div class="h-1/2 flex items-center justify-center px-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-black leading-tight">
                JE CONSTRUIS DES IMAGES,<br>
                JE VOYAGE DANS LES FORMES.
              </h2>
            </div>
          </div>
          <div class="h-1/2 flex items-center justify-center">
            <div class="w-full h-72 overflow-hidden">
              <NuxtImg src="/img/about/photo.webp" class="w-auto h-full object-cover grayscale" alt="Photo" draggable="false" />
            </div>
          </div>
        </div>

        <div class="h-screen w-full flex flex-col bg-white">
          <div class="h-1/2 flex items-center justify-center">
            <div class="w-48 h-64 overflow-hidden">
              <NuxtImg src="/img/about/archi.webp" class="w-auto h-full object-cover" alt="Photo" draggable="false" />
            </div>
          </div>
          <div class="h-1/2 flex items-center justify-center px-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-black leading-tight">
                CHAQUE VILLE UNE HISTOIRE,<br>
                CHAQUE BÂTIMENT UNE ÉMOTION,<br>
                CHAQUE DÉTAIL UNE RÉVÉLATION.
              </h2>
            </div>
          </div>
        </div>

        <div class="h-full w-full flex flex-col bg-white">
          <div class="h-1/2 flex items-center justify-center px-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-black leading-tight">
                VOYAGER POUR COMPRENDRE,<br>
                PHOTOGRAPHIER POUR PARTAGER,<br>
                RACONTER POUR ÉMOUVOIR.
              </h2>
            </div>
          </div>
          <div class="h-1/2 flex items-center justify-center">
            <div class="w-full h-80 overflow-hidden">
              <NuxtImg src="/img/about/voyage.webp" class="w-auto h-full object-cover grayscale opacity-80" alt="Background" draggable="false" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


const touchStartX = ref(0);
const touchStartY = ref(0);
const initialScrollPosition = ref(0);
const containerDesktop = ref(null);

const touchStartYMobile = ref(0);
const initialScrollPositionMobile = ref(0);
const containerMobile = ref(null);
const scrollPositionMobile = ref(0);

const { scrollPosition, scrollProgress, updateScrollPosition } = useScrollProgress(containerDesktop, 'horizontal');

onMounted(() => {
  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('wheel', handleWheelMobile, { passive: false });
  
  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll);
  window.removeEventListener('wheel', handleWheelMobile);
  document.removeEventListener('dragstart', null);
});

const handleScroll = (e) => {
  e.preventDefault();
  if (window.innerWidth >= 768) {
    updateScrollPosition(e.deltaY);
  }
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

const handleWheelMobile = (e) => {
  if (window.innerWidth < 768) {
    e.preventDefault();
    updateScrollPositionMobile(e.deltaY);
  }
};

const handleTouchStartMobile = (e) => {
  touchStartYMobile.value = e.touches[0].clientY;
  initialScrollPositionMobile.value = scrollPositionMobile.value;
  e.preventDefault();
};

const handleTouchMoveMobile = (e) => {
  if (!touchStartYMobile.value) return;

  const deltaY = touchStartYMobile.value - e.touches[0].clientY;
  updateScrollPositionMobile(deltaY);
  e.preventDefault();
};

const handleTouchEndMobile = () => {
  touchStartYMobile.value = 0;
};

const updateScrollPositionMobile = (delta) => {
  if (!containerMobile.value) return;
  const maxScroll = (5 * window.innerHeight) - window.innerHeight;
  scrollPositionMobile.value = Math.max(0, Math.min(maxScroll, scrollPositionMobile.value + delta));
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
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}

* {
  -ms-overflow-style: none;
}

</style>
