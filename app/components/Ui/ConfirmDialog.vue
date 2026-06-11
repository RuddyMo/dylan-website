<template>
  <AlertDialogRoot :open="open" @update:open="(value) => emit('update:open', value)">
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
      />
      <AlertDialogContent
        class="fixed left-1/2 top-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
      >
        <div class="flex items-start gap-4">
          <div
            v-if="variant === 'destructive'"
            class="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <Icon name="lucide:triangle-alert" class="size-5" />
          </div>
          <div class="flex flex-col gap-1.5">
            <AlertDialogTitle class="text-lg font-semibold leading-none tracking-tight">
              {{ title }}
            </AlertDialogTitle>
            <AlertDialogDescription class="text-muted-foreground text-sm">
              {{ description }}
            </AlertDialogDescription>
          </div>
        </div>

        <p v-if="error" class="text-destructive text-xs">{{ error }}</p>

        <div class="mt-2 flex items-center justify-end gap-2">
          <AlertDialogCancel as-child>
            <UiButton variant="outline" size="sm" :disabled="loading">{{ cancelLabel }}</UiButton>
          </AlertDialogCancel>
          <UiButton
            :variant="variant"
            size="sm"
            :loading="loading"
            :disabled="loading"
            @click="emit('confirm')"
          >
            {{ confirmLabel }}
          </UiButton>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script lang="ts" setup>
  import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogRoot,
    AlertDialogTitle,
  } from "reka-ui";
  import type { ButtonVariants } from "~/components/Ui/Button.vue";

  withDefaults(
    defineProps<{
      open: boolean;
      title: string;
      description: string;
      confirmLabel?: string;
      cancelLabel?: string;
      loading?: boolean;
      error?: string | null;
      variant?: NonNullable<ButtonVariants["variant"]>;
    }>(),
    {
      confirmLabel: "Confirmer",
      cancelLabel: "Annuler",
      loading: false,
      error: null,
      variant: "destructive",
    }
  );

  const emit = defineEmits<{
    "update:open": [value: boolean];
    confirm: [];
  }>();
</script>