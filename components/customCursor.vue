<template>
  <div ref="cursor" class="cursor-round"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';

const cursor = ref<HTMLElement | null>(null);
const route = useRoute();

let hideCursorTimeout: ReturnType<typeof setTimeout> | undefined;
let enlargeTimeout: ReturnType<typeof setTimeout> | undefined;

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

const handleMouseEnter = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.closest('a, button, nav')) {
    if (cursor.value) {
      cursor.value.classList.add('cursor-grow');
    }
    if (enlargeTimeout !== undefined) {
      clearTimeout(enlargeTimeout);
    }
  }
};

const handleMouseLeave = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.closest('a, button, nav')) {
    enlargeTimeout = setTimeout(() => {
      if (cursor.value) {
        cursor.value.classList.remove('cursor-grow');
      }
    }, 200);
  }
};

watch(route, () => {
  if (cursor.value) {
    cursor.value.classList.remove('cursor-grow');
  }
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('cursor-none');

    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove);
    document.body.classList.remove('cursor-none');

    document.removeEventListener('mouseover', handleMouseEnter, true);
    document.removeEventListener('mouseout', handleMouseLeave, true);
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
  transition:
    opacity 0.2s,
    transform 0.2s ease-in-out;
  opacity: 1;
}

:global(.cursor-none) {
  cursor: none;
}

.cursor-grow {
  transform: translate(-50%, -50%) scale(2);
}

a,
button {
  cursor: none;
}
</style>
