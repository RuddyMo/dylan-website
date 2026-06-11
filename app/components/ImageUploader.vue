<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <button
        type="button"
        class="inline-flex h-9 items-center gap-2 rounded-md bg-black px-3 text-sm font-medium text-white hover:bg-black/80"
      >
        <Icon name="lucide:upload" class="size-4" />
        Ajouter des images
      </button>
    </UiDialogTrigger>

    <UiDialogContent class="max-w-md" @interact-outside="onInteractOutside">
      <div class="flex flex-col gap-2">
        <UiDialogTitle>Ajouter des images</UiDialogTitle>
        <UiDialogDescription>
          Glissez-déposez vos images ou cliquez pour parcourir. Elles seront converties en WebP
          avant l'envoi.
        </UiDialogDescription>

        <!-- Zone de drop -->
        <Motion as-child :variants="dropAreaContainer" initial="hidden" animate="visible">
          <div
            ref="dropzoneRef"
            role="button"
            class="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 mt-2 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
            @click="openFileDialog"
          >
            <input ref="inputRef" hidden aria-label="Ajouter des images" >

            <div class="flex flex-col items-center justify-center text-center">
              <Motion
                :variants="dropAreaItem"
                class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <Icon name="lucide:image-up" class="size-4 opacity-60" />
              </Motion>
              <Motion :variants="dropAreaItem" as="p" class="mb-1.5 text-sm font-medium">
                Déposer vos images
              </Motion>
              <Motion :variants="dropAreaItem" as="p" class="text-muted-foreground mb-2 text-xs">
                Glisser-déposer ou cliquer pour parcourir
              </Motion>
              <Motion
                :variants="dropAreaItem"
                class="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs"
              >
                <span>Images uniquement</span>
                <span>∙</span>
                <span>Max {{ maxFiles }} fichiers</span>
                <span>∙</span>
                <span>Jusqu'à {{ formatBytes(maxSize) }}</span>
              </Motion>
            </div>
          </div>
        </Motion>

        <div
          v-if="errors.length > 0"
          class="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
          <span>{{ errors[0] }}</span>
        </div>

        <!-- Liste des fichiers -->
        <LayoutGroup id="file-list">
          <AnimatePresence>
            <Motion v-if="files.length > 0" layout="position" class="mt-1 space-y-2">
              <AnimatePresence>
                <Motion
                  v-for="entry in files"
                  :key="entry.id"
                  layout="position"
                  :variants="fileListItem"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  class="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                >
                  <div class="flex items-center gap-3 overflow-hidden">
                    <div
                      class="flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden rounded border"
                    >
                      <img
                        :src="previewUrl(entry)"
                        :alt="entry.file.name"
                        class="size-full object-cover"
                      >
                    </div>
                    <div class="flex min-w-0 flex-col gap-0.5">
                      <p class="truncate text-[13px] font-medium">{{ entry.file.name }}</p>
                      <p class="text-muted-foreground text-xs">{{ formatBytes(entry.file.size) }}</p>
                    </div>
                  </div>

                  <UiButton
                    size="icon-sm"
                    variant="ghost"
                    :disabled="isUploading"
                    class="text-muted-foreground/80 hover:text-foreground -me-2 hover:bg-transparent"
                    aria-label="Retirer le fichier"
                    @click="removeFile(entry.id)"
                  >
                    <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                  </UiButton>
                </Motion>
              </AnimatePresence>

              <AnimatePresence>
                <Motion v-if="files.length > 1" layout="position">
                  <UiButton size="sm" variant="outline" :disabled="isUploading" @click="clearFiles">
                    Tout retirer
                  </UiButton>
                </Motion>
              </AnimatePresence>
            </Motion>
          </AnimatePresence>
        </LayoutGroup>

        <p v-if="uploadError" class="text-destructive mt-1 text-xs">{{ uploadError }}</p>

        <!-- Actions -->
        <div class="mt-3 flex items-center justify-end gap-2">
          <UiDialogClose as-child>
            <UiButton variant="outline" size="sm" :disabled="isUploading">Annuler</UiButton>
          </UiDialogClose>
          <UiButton
            size="sm"
            :loading="isUploading"
            :disabled="files.length === 0 || isUploading"
            @click="handleUpload"
          >
            {{ isUploading ? `Envoi ${done}/${total}…` : `Envoyer (${files.length})` }}
          </UiButton>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";
  import { useStorageImages } from "~/composables/useStorageImages";
  import { useFileUpload } from "~/composables/useFileUpload";
  import type { UploadFile } from "~/composables/useFileUpload";
  import { formatBytes } from "~/utils/format-bytes";

  const props = defineProps<{
    /** Dossier Supabase cible (ex: 'accueil' ou 'gallerie/archi'). */
    folder: string;
    /** Qualité WebP entre 0 et 1. */
    quality?: number;
  }>();

  const emit = defineEmits<{ uploaded: [] }>();

  const { uploadImage, fetchImagesFromFolder } = useStorageImages();

  const maxSize = 100 * 1024 * 1024; // 100 Mo
  const maxFiles = 10;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      accept: "image/*",
    });

  const isOpen = ref(false);
  const isUploading = ref(false);
  const total = ref(0);
  const done = ref(0);
  const uploadError = ref<string | null>(null);

  // URLs de prévisualisation locales (révoquées à la fermeture / au démontage).
  const previewCache = new Map<string, string>();
  const previewUrl = (entry: UploadFile) => {
    if (!previewCache.has(entry.id)) {
      previewCache.set(entry.id, URL.createObjectURL(entry.file));
    }
    return previewCache.get(entry.id) as string;
  };

  const revokePreviews = () => {
    previewCache.forEach((url) => URL.revokeObjectURL(url));
    previewCache.clear();
  };

  const onInteractOutside = (event: Event) => {
    if (isUploading.value) event.preventDefault();
  };

  const handleUpload = async () => {
    if (!files.value.length || isUploading.value) return;

    uploadError.value = null;
    isUploading.value = true;
    total.value = files.value.length;
    done.value = 0;

    const failures: string[] = [];
    let successCount = 0;

    const existing = await fetchImagesFromFolder(props.folder);
    let nextNumber =
      existing.reduce((max, image) => {
        const n = parseInt(image.name, 10);
        return Number.isNaN(n) ? max : Math.max(max, n);
      }, 0) + 1;

    for (const entry of files.value) {
      try {
        const webp = await convertImageToWebp(entry.file, props.quality ?? 0.8);
        const { success, error } = await uploadImage(props.folder, webp, `${nextNumber}.webp`);
        if (success) {
          successCount += 1;
          nextNumber += 1;
        } else {
          failures.push(`${entry.file.name} : ${(error as Error)?.message ?? "échec de l'envoi"}`);
        }
      } catch (e) {
        failures.push(`${entry.file.name} : ${(e as Error)?.message ?? "conversion échouée"}`);
      }
      done.value += 1;
    }

    isUploading.value = false;

    if (successCount > 0) emit("uploaded");

    if (failures.length) {
      uploadError.value = `Certaines images ont échoué — ${failures.join(" ; ")}`;
      const failedNames = new Set(failures.map((f) => f.split(" : ")[0]));
      files.value = files.value.filter((entry) => failedNames.has(entry.file.name));
      return;
    }

    clearFiles();
    isOpen.value = false;
  };

  watch(isOpen, (open) => {
    if (!open) {
      clearFiles();
      revokePreviews();
      uploadError.value = null;
    }
  });

  onBeforeUnmount(revokePreviews);

  const dropAreaContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
  };

  const dropAreaItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fileListItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { opacity: 0, y: 5, transition: { duration: 0.2, ease: "easeInOut" } },
  };
</script>