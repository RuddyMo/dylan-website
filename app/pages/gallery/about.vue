<template>
  <div class="p-6">
    <div class="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold">Gestion des images - About</h1>
        <p class="text-muted-foreground text-sm mt-1">{{ images.length }} image(s) trouvée(s)</p>
      </div>
      <ImageUploader folder="about" @uploaded="loadImages" />
    </div>

    <UiDatatable :data="images" :options="options">
      <template #image="{ cellData }">
        <div class="flex items-center gap-3">
          <img :src="cellData.url" :alt="cellData.name" class="w-12 h-12 object-cover rounded" />
          <span class="text-sm font-medium">{{ cellData.name }}</span>
        </div>
      </template>

      <template #actions="{ rowData }">
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            title="Voir l'image"
            aria-label="Voir l'image"
            @click="dialogs?.preview(rowData)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
          </button>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Supprimer l'image"
            aria-label="Supprimer l'image"
            @click="dialogs?.requestDelete(rowData)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
          </button>
        </div>
      </template>
    </UiDatatable>

    <GalleryActionDialogs ref="dialogs" :on-delete="removeImage" />
  </div>
</template>

<script lang="ts" setup>
import { useStorageImages } from '~/composables/useStorageImages';

definePageMeta({
  layout: 'sidebar',
  middleware: 'auth-client'
});

const { fetchImagesFromFolder, deleteImage } = useStorageImages();

const dialogs = useTemplateRef('dialogs');

const images = ref([]);

const options = {
  dom: `<'${`overflow-auto`}'t>`,
  ordering: false,
  pageLength: 10,
  columns: [
    {
      title: 'Image',
      data: null,
      render: {
        _: 'name',
        display: '#image'
      },
      searchable: false
    },
    { title: 'Nom du fichier', data: 'name' },
    {
      title: 'Taille',
      data: 'size',
      render: (value) => `${(value / 1024).toFixed(2)} KB`
    },
    {
      title: 'Actions',
      data: null,
      render: {
        _: 'path',
        display: '#actions'
      },
      searchable: false,
      orderable: false
    }
  ]
};

const loadImages = async () => {
  images.value = await fetchImagesFromFolder('about');
};

const removeImage = async (path) => {
  const result = await deleteImage(path);
  if (result.success) {
    images.value = images.value.filter((img) => img.path !== path);
  }
  return result;
};

onMounted(() => {
  loadImages();
});
</script>
