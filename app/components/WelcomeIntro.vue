<template>
  <div
    v-if="visible"
    ref="overlay"
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
  >
    <h1
      ref="title"
      class="flex overflow-hidden py-2 text-6xl font-bold tracking-tight text-white sm:text-8xl"
    >
      <span v-for="(char, i) in letters" :key="i" class="inline-block">{{ char }}</span>
    </h1>
    <p ref="subtitle" class="mt-4 text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm">
      Dylan Morel Photographie
    </p>

    <div ref="loader" class="mt-10 w-56 sm:w-72">
      <div class="h-0.5 w-full overflow-hidden rounded-full bg-white/15">
        <div class="h-full rounded-full bg-white" :style="{ width: `${progress}%` }" />
      </div>
      <div class="mt-2 text-center text-xs tabular-nums text-white/50">{{ progress }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
  let introPlayed = false;
</script>

<script setup lang="ts">
  import gsap from 'gsap';

  const letters = 'Bienvenue'.split('');

  const visible = ref(!introPlayed);
  const progress = ref(0);
  const overlay = ref<HTMLElement | null>(null);
  const title = ref<HTMLElement | null>(null);
  const subtitle = ref<HTMLElement | null>(null);
  const loader = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (introPlayed) {
      visible.value = false;
      return;
    }
    introPlayed = true;
    document.body.style.overflow = 'hidden';

    nextTick(() => {
      if (!overlay.value || !title.value) return;

      const counter = { value: 0 };

      const timeline = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          visible.value = false;
        }
      });

      timeline
        .from(title.value.querySelectorAll('span'), {
          yPercent: 120,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.07
        })
        .from(subtitle.value, { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, '-=0.15')
        .from(loader.value, { opacity: 0, y: 12, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        .to(
          counter,
          {
            value: 100,
            duration: 1.6,
            ease: 'power1.inOut',
            onUpdate: () => {
              progress.value = Math.round(counter.value);
            }
          },
          '-=0.1'
        )
        .to({}, { duration: 0.4 })
        .to(overlay.value, { yPercent: 100, duration: 0.9, ease: 'power3.inOut' });
    });
  });
</script>