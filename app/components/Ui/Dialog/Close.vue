<template>
  <DialogClose v-bind="forwarded">
    <slot />
  </DialogClose>
</template>

<script lang="ts" setup>
  import { DialogClose, useForwardProps } from "reka-ui";
  import type { DialogCloseProps } from "reka-ui";

  const props = defineProps<DialogCloseProps>();
  const forwarded = useForwardProps(props);
</script>