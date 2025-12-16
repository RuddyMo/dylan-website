import { ref, computed } from 'vue';

export const useScrollProgress = (containerRef, direction = 'horizontal') => {
  const scrollPosition = ref(0);

  const scrollProgress = computed(() => {
    if (!containerRef.value) return 0;

    if (direction === 'horizontal') {
      const maxScroll = containerRef.value.scrollWidth - window.innerWidth;
      return maxScroll > 0 ? (scrollPosition.value / maxScroll) * 100 : 0;
    } else {
      const maxScroll = containerRef.value.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? (scrollPosition.value / maxScroll) * 100 : 0;
    }
  });

  const updateScrollPosition = (delta) => {
    if (!containerRef.value) return;

    const maxScroll = direction === 'horizontal' ? containerRef.value.scrollWidth - window.innerWidth : containerRef.value.scrollHeight - window.innerHeight;

    scrollPosition.value = Math.max(0, Math.min(maxScroll, scrollPosition.value + delta));
  };

  return {
    scrollPosition,
    scrollProgress,
    updateScrollPosition
  };
};
