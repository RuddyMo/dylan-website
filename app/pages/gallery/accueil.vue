<template>
  <div class="p-6">
    <div class="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Gestion des images - Accueil</h1>
        <p class="text-muted-foreground text-sm mt-1">
          {{ images.length }} image(s) — glissez-déposez pour régler l'ordre d'affichage
        </p>
      </div>
      <ImageUploader folder="accueil" @uploaded="loadImages" />
    </div>

    <p v-if="!images.length" class="text-muted-foreground py-12 text-center text-sm">Aucune image pour l'instant.</p>

    <GallerySortableImageGrid
      v-else
      :items="images"
      @reorder="onReorder"
      @preview="dialogs?.preview"
      @remove="dialogs?.requestDelete"
    />

    <GalleryActionDialogs ref="dialogs" :on-delete="removeImage" />
  </div>
</template>

<script lang="ts" setup>
import { useStorageImages } from '~/composables/useStorageImages';
import type { ImageItem } from '~/composables/useStorageImages';
import { useImageOrder } from '~/composables/useImageOrder';

definePageMeta({
  layout: 'sidebar',
  middleware: 'auth-client'
});

const { fetchImagesFromFolder, deleteImage } = useStorageImages();
const { fetchOrder, saveOrder, applyOrder } = useImageOrder();
const { success, error } = useToast();

const dialogs = useTemplateRef('dialogs');

const images = ref<ImageItem[]>([]);

const loadImages = async () => {
  const [items, order] = await Promise.all([fetchImagesFromFolder('accueil'), fetchOrder('accueil')]);
  images.value = applyOrder(items, order);
};

const onReorder = async (ordered: ImageItem[]) => {
  images.value = ordered;
  const result = await saveOrder('accueil', ordered.map((image) => image.name));
  if (result.success) {
    success('Ordre enregistré');
  } else {
    error("L'enregistrement de l'ordre a échoué");
  }
};

const removeImage = async (path: string) => {
  const result = await deleteImage(path);
  if (result.success) {
    images.value = images.value.filter((image) => image.path !== path);
    await saveOrder('accueil', images.value.map((image) => image.name));
  }
  return result;
};

onMounted(() => {
  loadImages();
});
</script>