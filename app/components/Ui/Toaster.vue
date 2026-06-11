<template>
  <ToastProvider :duration="4000">
    <ToastRoot
      v-for="item in toasts"
      :key="item.id"
      :duration="4000"
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right-full data-[state=closed]:fade-out-0 bg-background flex items-center gap-3 rounded-lg border p-3 pe-4 shadow-lg"
      @update:open="(open) => !open && dismiss(item.id)"
    >
      <div
        class="flex size-7 shrink-0 items-center justify-center rounded-full"
        :class="iconWrapperClass(item.variant)"
        aria-hidden="true"
      >
        <Icon :name="iconName(item.variant)" class="size-4" />
      </div>
      <ToastTitle class="text-sm font-medium">{{ item.message }}</ToastTitle>
      <ToastClose
        class="text-muted-foreground/80 hover:text-foreground -me-1 ms-auto"
        aria-label="Fermer"
      >
        <Icon name="lucide:x" class="size-4" />
      </ToastClose>
    </ToastRoot>

    <ToastViewport
      class="fixed bottom-0 right-0 z-[100] flex max-w-full flex-col gap-2 p-4 sm:w-96"
    />
  </ToastProvider>
</template>

<script lang="ts" setup>
  import { ToastClose, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from "reka-ui";
  import type { ToastVariant } from "~/composables/useToast";

  const { toasts, dismiss } = useToast();

  const iconName = (variant: ToastVariant) => {
    if (variant === "success") return "lucide:circle-check";
    if (variant === "error") return "lucide:circle-alert";
    return "lucide:info";
  };

  const iconWrapperClass = (variant: ToastVariant) => {
    if (variant === "success") return "bg-emerald-500/10 text-emerald-600";
    if (variant === "error") return "bg-destructive/10 text-destructive";
    return "bg-muted text-muted-foreground";
  };
</script>