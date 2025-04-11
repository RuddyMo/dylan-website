<template>
  <div class="bg-white min-h-screen">
    <NuxtLayout name="navbar">
      <div class="flex flex-col lg:flex-row items-center justify-center py-20 px-4">
        <div class="relative inline-block mb-8 lg:mb-0">
          <div class="absolute top-10 right-10 w-[calc(100%+2rem)] h-[calc(100%+2rem)] bg-black z-10"></div>
          <NuxtImg src="/img/about/APROPOS.jpg" alt="Photo" class="relative w-[400px] h-[480px] object-cover z-20" />
        </div>

        <div class="lg:ml-12 max-w-2xl text-gray-800">
          <h3 class="text-3xl font-bold sm:mb-10 mt-20">Salut, moi c'est Dylan !</h3>
          <p class="text-lg leading-relaxed">
            Je m'appelle Dylan et j'ai 27 ans. Je suis architecte passionné de photographie, et je travaille en Suisse. J'y puise mon inspiration dans la rigueur de l'architecture contemporaine ainsi
            que dans la beauté des paysages et des espaces urbains que je capture en photo. Diplômé d'une école d'architecture réputée à Montpellier, j'ai appris à marier fonctionnalité et sensibilité
            artistique.
          </p>
          <p class="mt-6 text-lg leading-relaxed">
            Mon approche photographique est profondément influencée par mon parcours en architecture. J'adore explorer les lignes, les formes et les textures, que ce soit dans un bâtiment moderne ou
            dans un paysage naturel. Chaque image raconte une histoire, une interaction subtile entre l'homme et son environnement.
          </p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts"></script>
