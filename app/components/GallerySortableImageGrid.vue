<template>
  <ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <li
      v-for="(image, index) in list"
      :key="image.path"
      draggable="true"
      class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
      :class="dragIndex === index ? 'opacity-40 ring-2 ring-gray-900' : 'cursor-move'"
      @dragstart="onDragStart(index, $event)"
      @dragover.prevent="onDragOver(index)"
      @dragend="onDragEnd"
      @drop.prevent="onDragEnd"
    >
      <span class="absolute left-2 top-2 z-10 inline-flex size-6 items-center justify-center rounded-full bg-gray-900/80 text-xs font-semibold text-white">
        {{ index + 1 }}
      </span>

      <img :src="thumb(image.url)" :alt="image.name" loading="lazy" draggable="false" class="aspect-square w-full object-cover" />

      <div class="flex items-center justify-between gap-1 px-2 py-1.5">
        <span class="truncate text-xs font-medium text-gray-700" :title="image.name">{{ image.name }}</span>
        <div class="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            class="inline-flex size-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            title="Voir l'image"
            aria-label="Voir l'image"
            @click="emit('preview', image)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
          </button>
          <button
            type="button"
            class="inline-flex size-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Supprimer l'image"
            aria-label="Supprimer l'image"
            @click="emit('remove', image)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { ImageItem } from '~/composables/useStorageImages';

const props = defineProps<{ items: ImageItem[] }>();

const emit = defineEmits<{
  reorder: [images: ImageItem[]];
  preview: [image: ImageItem];
  remove: [image: ImageItem];
}>();

const img = useImage();
const thumb = (url: string): string => img(url, { width: 400, height: 400, fit: 'cover', quality: 70, format: 'webp' });

const list = ref<ImageItem[]>([...props.items]);
const dragIndex = ref<number | null>(null);

watch(
  () => props.items,
  (value) => {
    if (dragIndex.value === null) list.value = [...value];
  }
);

const onDragStart = (index: number, event: DragEvent): void => {
  dragIndex.value = index;
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
};

const onDragOver = (index: number): void => {
  if (dragIndex.value === null || dragIndex.value === index) return;
  const [moved] = list.value.splice(dragIndex.value, 1);
  if (!moved) return;
  list.value.splice(index, 0, moved);
  dragIndex.value = index;
};

const onDragEnd = (): void => {
  if (dragIndex.value === null) return;
  dragIndex.value = null;
  emit('reorder', [...list.value]);
};
</script>