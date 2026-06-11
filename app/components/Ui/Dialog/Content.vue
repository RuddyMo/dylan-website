<template>
  <DialogPortal :to="to">
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
    />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          props.class
        )
      "
    >
      <slot />

      <DialogClose
        v-if="showClose"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Fermer"
      >
        <Icon name="lucide:x" class="size-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<script lang="ts" setup>
  import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
  } from "reka-ui";
  import { reactiveOmit } from "@vueuse/core";
  import { cn } from "~/lib/utils";
  import type { DialogContentEmits, DialogContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<
      DialogContentProps & {
        to?: string | HTMLElement;
        class?: HTMLAttributes["class"];
        showClose?: boolean;
      }
    >(),
    { showClose: true }
  );
  const emits = defineEmits<DialogContentEmits>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to", "showClose"), emits);
</script>