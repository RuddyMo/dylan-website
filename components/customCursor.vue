<template>
  <div ref="cursor" class="cursor-round"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const cursor = ref<HTMLElement | null>(null);

let hideCursorTimeout: ReturnType<typeof setTimeout> | undefined;

const handleMouseMove = (e: MouseEvent) => {
  const posX = e.clientX;
  const posY = e.clientY;

  if (cursor.value) {
    cursor.value.style.left = `${posX}px`;
    cursor.value.style.top = `${posY}px`;

    cursor.value.style.opacity = '1';
  }

  resetCursorTimer();
};

const resetCursorTimer = () => {
  if (hideCursorTimeout !== undefined) {
    clearTimeout(hideCursorTimeout);
  }

  hideCursorTimeout = setTimeout(() => {
    if (cursor.value) {
      cursor.value.style.opacity = '0';
    }
  }, 2000);
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('cursor-none');
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove);
    document.body.classList.remove('cursor-none');
  }
});
</script>

<style scoped>
.cursor-round {
  width: 15px;
  height: 15px;
  background: black;
  filter: invert(1);
  mix-blend-mode: difference;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 60;
  pointer-events: none;
  transition: opacity 0.2s;
  opacity: 1;
}

:global(.cursor-none) {
  cursor: none;
}
</style>
