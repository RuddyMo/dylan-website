<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/icon/logo.gif" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Dylan Morel Photographie.</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-900">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
          <div v-if="errorMessage" class="mt-2 text-sm text-red-600">
            {{ errorMessage }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { $supabase } = useNuxtApp();

const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string | null>(null);
const loading = ref<boolean>(false);

const login = async () => {
  errorMessage.value = '';
  loading.value = true;

  const { data, error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  loading.value = false;

  if (error) {
    console.error(error);
    errorMessage.value = error.message;
    return;
  }
  console.log('Connecté :', data.user);

  await navigateTo('/dashboard');
};
</script>

<style scoped>
body,
html {
  height: 100%;
  background: #fff;
}
</style>
