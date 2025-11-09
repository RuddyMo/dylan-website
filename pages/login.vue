
<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
  <img class="mx-auto h-10 w-auto" src="/icon/logo.gif" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Dylan Morel Photographie.</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required class="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-900">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required class="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
          </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Add logic here if needed
</script>

<style scoped>
body, html {
  height: 100%;
  background: #fff;
}
</style>
