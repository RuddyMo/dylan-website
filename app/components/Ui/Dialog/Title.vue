<template>
  <DialogTitle
    v-bind="forwarded"
    :class="cn('text-lg font-semibold leading-none tracking-tight', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<script lang="ts" setup>
  import { DialogTitle, useForwardProps } from "reka-ui";
  import { reactiveOmit } from "@vueuse/core";
  import { cn } from "~/lib/utils";
  import type { DialogTitleProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = useForwardProps(reactiveOmit(props, "class"));
</script>