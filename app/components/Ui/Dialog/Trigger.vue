<template>
  <DialogTrigger v-bind="forwarded">
    <slot />
  </DialogTrigger>
</template>

<script lang="ts" setup>
  import { DialogTrigger, useForwardProps } from "reka-ui";
  import type { DialogTriggerProps } from "reka-ui";

  const props = defineProps<DialogTriggerProps>();
  const forwarded = useForwardProps(props);
</script>