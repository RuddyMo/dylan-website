<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Gestion des images - Accueil</h1>
      <p class="text-muted-foreground text-sm mt-1">{{ images.length }} image(s) trouvée(s)</p>
    </div>

    <UiDatatable :data="images" :options="options">
      <template #image="{ cellData }">
        <div class="flex items-center gap-3">
          <img :src="cellData.url" :alt="cellData.name" class="w-12 h-12 object-cover rounded" />
          <span class="text-sm font-medium">{{ cellData.name }}</span>
        </div>
      </template>

      <template #actions="{ rowData }">
        <div class="flex items-center gap-2">
          <button type="button" class="h-8 rounded border px-3 text-sm" @click="openPreview(rowData.url)">Voir</button>
          <button type="button" class="h-8 rounded bg-red-600 px-3 text-sm text-white" @click="confirmDelete(rowData.path)">Supprimer</button>
        </div>
      </template>
    </UiDatatable>

    <!-- Modal preview -->
    <div v-if="previewImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" @click="closePreview">
      <div class="relative max-h-[90vh] max-w-[90vw]" @click.stop>
        <img :src="previewImage" alt="Preview" class="max-h-[90vh] max-w-[90vw] object-contain" />
        <button class="absolute -top-10 right-0 text-white hover:text-gray-300" @click="closePreview">
          <Icon name="lucide:x" class="size-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStorageImages } from '~/composables/useStorageImages';

definePageMeta({
  layout: 'sidebar',
  middleware: 'auth-client'
});

const { fetchImagesFromFolder, deleteImage } = useStorageImages();

const images = ref([]);
const previewImage = ref(null);

const options = {
  dom: "<'overflow-auto't><'flex items-center justify-between gap-3 mt-4'lip>",
  paging: true,
  pageLength: 10,
  lengthMenu: [10, 25, 50, 100],
  info: true,
  ordering: false,
  columns: [
    {
      title: 'Image',
      data: null,
      defaultContent: '',
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
      defaultContent: '',
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
  images.value = await fetchImagesFromFolder('accueil');
};

const openPreview = (url) => {
  previewImage.value = url;
  document.body.style.overflow = 'hidden';
};

const closePreview = () => {
  previewImage.value = null;
  document.body.style.overflow = 'auto';
};

const confirmDelete = async (path) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
    const { success } = await deleteImage(path);
    if (success) {
      images.value = images.value.filter((img) => img.path !== path);
    }
  }
};

onMounted(() => {
  loadImages();
});
</script>
