<template>
  <div class="bg-white">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row md:gap-16 md:py-20">
      <div class="w-full md:w-1/2">
        <img :src="aboutImg" alt="Dylan Morel" class="aspect-[1/1] w-full rounded-lg object-cover" draggable="false" />
      </div>

      <div class="w-full md:w-1/2">
        <h2 class="mt-2 font-display text-3xl font-medium text-black md:text-5xl">Morel Dylan</h2>
        <p class="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Architecte · Photographe</p>

        <div class="mt-8 space-y-3 text-sm leading-relaxed text-gray-600">
          <p>
            Entre béton et lumière, je capture l'âme des villes que je traverse. Je construis des images,
            je voyage dans les formes.
          </p>
          <p>
            Architecte de formation, photographe par passion, je porte un regard à la frontière de ces deux
            mondes. Les lignes d'un bâtiment, le grain d'une façade, le jeu d'une ombre à l'heure dorée :
            chaque cadrage est une manière de raconter ce que l'œil presse, mais ne dit pas toujours.
          </p>
          <p>
            Chaque ville une histoire, chaque bâtiment une émotion, chaque détail une révélation.
            Voyager pour comprendre, photographier pour partager, raconter pour émouvoir.
          </p>
          <p>
            Mon travail explore la rencontre entre la rigueur de l'architecture et la sensibilité de
            l'instant : des géométries franches, des matières brutes, et cette lumière qui transforme
            le quotidien en récit. Une invitation à regarder autrement les lieux que l'on croit connaître.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { images: aboutImages } = usePublicFolderImages('about');
const aboutImg = computed(() => aboutImages.value[0] ?? '/img/about/about.webp');

definePageMeta({
  layout: 'navbar'
});
</script>