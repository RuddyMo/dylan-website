<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <slot name="image">
        <UiAvatarImage
          v-if="src"
          :src="src"
          :alt="alt"
          :class="imageClass"
          @loading-status-change="emits('loadingStatusChange', $event)"
        />
      </slot>
      <slot name="fallback">
        <UiAvatarFallback :delay-ms="delayMs" :class="fallbackClass" :fallback="fallback" />
      </slot>
    </slot>
  </AvatarRoot>
</template>

<script lang="ts">
  import { AvatarRoot } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { AvatarImageEmits, AvatarImageProps, AvatarRootProps } from "reka-ui";

  export type AvatarProps = AvatarRootProps &
    Partial<AvatarImageProps> & {
      class?: any;
      imageClass?: any;
      fallbackClass?: any;
      alt?: string;
      fallback?: string;
      delayMs?: number;
      size?: "default" | "sm" | "lg";
    };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AvatarProps>(), {
    size: "default",
  });

  const emits = defineEmits<AvatarImageEmits>();
  const styles = tv({
    base: "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
  });
</script>
