<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>

<script lang="ts" setup>
  import { DialogRoot, useForwardPropsEmits } from "reka-ui";
  import type { DialogRootEmits, DialogRootProps } from "reka-ui";

  const props = defineProps<DialogRootProps>();
  const emits = defineEmits<DialogRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>