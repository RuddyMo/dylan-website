<template>
  <div ref="cursorDot" class="cursor-dot"></div>
  <div ref="cursorOutline" class="cursor-outline"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  const posX = e.clientX;
  const posY = e.clientY;

  if (cursorDot.value) {
    cursorDot.value.style.left = `${posX}px`;
    cursorDot.value.style.top = `${posY}px`;
  }

  if (cursorOutline.value) {
    cursorOutline.value.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`
      },
      {
        duration: 300,
        fill: 'forwards'
      }
    );
  }
};

const showCustomCursor = () => {
  if (import.meta.client) {
    document.body.classList.add('cursor-none');
  }
};

const restoreDefaultCursor = () => {
  if (import.meta.client) {
    document.body.classList.remove('cursor-none');
  }
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('mousemove', handleMouseMove);
    showCustomCursor();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('mousemove', handleMouseMove);
    restoreDefaultCursor();
  }
});
</script>

<style scoped>
.cursor-dot {
  width: 5px;
  height: 5px;
  background-color: black;
}
.cursor-outline {
  width: 30px;
  height: 30px;
  border: 2px solid hsla(0, 0%, 0%, 0.5);
}

.cursor-outline:hover {
  border: 2px solid hsla(0, 0%, 0%, 0.5);
}

.cursor-dot,
.cursor-outline {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 60;
  pointer-events: none;
}

:global(.cursor-none) {
  cursor: none;
}
</style>
