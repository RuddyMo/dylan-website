<template>
  <UiDialog v-model:open="previewOpen">
    <UiDialogContent
      class="max-w-[90vw] border-0 bg-transparent p-0 shadow-none"
      @click="previewOpen = false"
    >
      <UiDialogTitle class="sr-only">{{ previewName ?? "Aperçu de l'image" }}</UiDialogTitle>
      <img
        v-if="previewUrl"
        :src="previewUrl"
        :alt="previewName ?? 'Aperçu'"
        class="mx-auto max-h-[85vh] max-w-full rounded-lg object-contain"
        @click.stop
      >
    </UiDialogContent>
  </UiDialog>

  <UiConfirmDialog
    v-model:open="confirmOpen"
    title="Supprimer cette image ?"
    :description="confirmDescription"
    confirm-label="Supprimer"
    :loading="deleting"
    :error="deleteError"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
  type DeleteResult = { success: boolean; error?: unknown };
  type RowImage = { url: string; path: string; name?: string };

  const props = defineProps<{
    /** Suppression réelle, fournie par la page (contexte Nuxt valide). */
    onDelete: (path: string) => Promise<DeleteResult>;
  }>();

  const previewOpen = ref(false);
  const previewUrl = ref<string | null>(null);
  const previewName = ref<string | undefined>();

  const confirmOpen = ref(false);
  const target = ref<RowImage | null>(null);
  const deleting = ref(false);
  const deleteError = ref<string | null>(null);

  const confirmDescription = computed(() => {
    const name = target.value?.name;
    return `Cette action est irréversible. ${name ? `« ${name} »` : "Cette image"} sera définitivement supprimée.`;
  });

  const preview = (image: RowImage) => {
    previewUrl.value = image.url;
    previewName.value = image.name;
    previewOpen.value = true;
  };

  const requestDelete = (image: RowImage) => {
    target.value = image;
    deleteError.value = null;
    confirmOpen.value = true;
  };

  const onConfirm = async () => {
    if (!target.value) return;

    deleting.value = true;
    deleteError.value = null;

    const result = await props.onDelete(target.value.path);

    deleting.value = false;

    if (result.success) {
      confirmOpen.value = false;
      return;
    }

    const error = "error" in result ? (result.error as Error) : null;
    deleteError.value = `La suppression a échoué : ${error?.message ?? "erreur inconnue"}`;
  };

  defineExpose({ preview, requestDelete });
</script>