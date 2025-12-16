<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-white border-r p-4">
      <h2 class="text-xl font-semibold mb-6">Dashboard</h2>
      <nav>
        <ul class="space-y-2">
          <li v-for="item in menu" :key="item" class="text-gray-700 hover:text-black cursor-pointer">{{ item }}</li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold">Bienvenue, RuddyMo</h1>
          <p class="text-sm text-gray-600">Aperçu rapide</p>
        </div>
        <div>
          <button @click="startProgress" class="px-4 py-2 bg-blue-600 text-white rounded mr-2">Simuler chargement</button>
          <button @click="reset" class="px-4 py-2 bg-gray-200 rounded">Reset</button>
        </div>
      </header>

      <section class="grid grid-cols-3 gap-4 mb-6">
        <div v-for="card in cards" :key="card.title" class="bg-white p-4 rounded shadow-sm">
          <div class="text-sm text-gray-500">{{ card.title }}</div>
          <div class="mt-2 text-2xl font-semibold">{{ card.value }}</div>
          <div class="text-xs text-gray-400 mt-1">{{ card.subtitle }}</div>
        </div>
      </section>

      <section class="bg-white p-4 rounded shadow-sm">
        <h3 class="font-semibold mb-2">Activité récente</h3>
        <ul class="space-y-2 text-sm text-gray-700">
          <li v-for="(a, i) in activity" :key="i">{{ a }}</li>
        </ul>
      </section>
    </main>
  </div>

  <div class="fixed bottom-10 left-0 w-full h-[2px] bg-gray-200 z-50">
    <div class="h-full bg-black transition-all duration-300 ease-out" :style="{ width: progress + '%' }" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

definePageMeta({
  middleware: 'auth-client'
});

const menu = ['Accueil', 'Analytics', 'Utilisateurs', 'Paramètres'];

const cards = [
  { title: 'Utilisateurs', value: '1,234', subtitle: 'Ce mois' },
  { title: 'Ventes', value: '$12,345', subtitle: 'Ce mois' },
  { title: 'Taux de conversion', value: '3.4%', subtitle: 'Dernière semaine' }
];

const activity = ref<string[]>(['Nouvel utilisateur: alice@example.com', 'Commande #345 traitée', 'Compte mis à jour: bob@example.com']);

const progress = ref<number>(0);
let timer: ReturnType<typeof setInterval> | null = null;

function startProgress() {
  if (timer) return;
  progress.value = 0;
  timer = setInterval(() => {
    progress.value += Math.floor(Math.random() * 15) + 5;
    if (progress.value >= 100) {
      progress.value = 100;
      clearInterval(timer!);
      timer = null;
      setTimeout(() => (progress.value = 0), 800);
    }
  }, 400);
}

function reset() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  progress.value = 0;
}
</script>
