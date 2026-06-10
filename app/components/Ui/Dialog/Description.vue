<template>
  <DialogDescription v-bind="forwarded" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </DialogDescription>
</template>

<script lang="ts" setup>
  import { DialogDescription, useForwardProps } from "reka-ui";
  import { reactiveOmit } from "@vueuse/core";
  import { cn } from "~/lib/utils";
  import type { DialogDescriptionProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));
</script>