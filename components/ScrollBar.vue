<template>
  <div class="absolute bottom-10 left-0 w-full h-[2px] bg-gray-200 z-50">
    <div 
      class="h-full bg-black transition-all duration-300 ease-out" 
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    required: true
  },
  height: {
    type: String,
    default: 'h-1'
  },
  backgroundColor: {
    type: String,
    default: 'bg-gray-200'
  },
  progressColor: {
    type: String,
    default: 'bg-black'
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (value) => ['bottom', 'top'].includes(value)
  }
});
</script>