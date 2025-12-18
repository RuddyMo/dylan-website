<template>
  <NuxtLayout name="sidebar">
    <div class="min-h-screen flex bg-gray-50"></div>
  </NuxtLayout>
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
