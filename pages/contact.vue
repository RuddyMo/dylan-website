<template>
  <NuxtLayout name="navbar">
    <div class="hidden lg:flex w-full h-[calc(100vh-76px)] overflow-hidden">
      <div class="w-1/2 relative">
        <NuxtImg 
          src="/img/contact/contact.webp" 
          class="w-full h-full object-cover grayscale" 
          alt="Contact" 
        />
        <div class="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div class="w-1/2 bg-white flex items-center justify-center p-6">
        <div class="w-full max-w-lg">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-light text-gray-900 mb-3">Contactez-moi</h1>
            <p class="text-gray-600 text-sm">
              Discutons de votre projet ensemble.
            </p>
          </div>

          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="Votre nom complet">
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="votre@email.com">
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="3"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Décrivez votre projet ou votre demande..."
              />
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Envoyer le message
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Envoi en cours...
              </span>
            </button>
          </form>

          <div v-if="showSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <p class="text-green-800 font-medium text-sm">Message envoyé avec succès !</p>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="text-center space-y-2">
              <p class="text-xs text-gray-500">Email</p>
              <p class="text-gray-900 font-medium text-sm">moreldylan966@gmail.com</p>
              <p class="text-xs text-gray-500 mt-3">Téléphone</p>
              <p class="text-gray-900 font-medium text-sm">+33 6 86 40 14 14</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:hidden h-[calc(100vh-76px)] overflow-y-auto bg-white">
      <div class="relative h-48 overflow-hidden">
        <NuxtImg 
          src="/img/contact/contact.webp" 
          class="w-full h-full object-cover grayscale" 
          alt="Contact" 
        />
        <div class="absolute inset-0 bg-black bg-opacity-40" />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white">
            <h1 class="text-3xl font-light mb-2">Contactez-moi</h1>
            <p class="text-white/90 text-sm">Discutons de votre projet ensemble.</p>
          </div>
        </div>
      </div>

      <div class="px-6 py-8">
        <form class="space-y-5" @submit.prevent="submitForm">
          <div>
            <label for="name-mobile" class="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              id="name-mobile"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="Votre nom complet">
          </div>

          <div>
            <label for="email-mobile" class="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <input
              id="email-mobile"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="votre@email.com">
          </div>

          <div>
            <label for="message-mobile" class="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message-mobile"
              v-model="form.message"
              rows="4"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
              placeholder="Décrivez votre projet ou votre demande..."
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubmitting" class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Envoyer le message
            </span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Envoi en cours...
            </span>
          </button>
        </form>

        <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <p class="text-green-800 font-medium">Message envoyé avec succès !</p>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-2">Email</p>
              <p class="text-gray-900 font-medium text-sm">moreldylan966@gmail.com</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-2">Téléphone</p>
              <p class="text-gray-900 font-medium text-sm">+33 6 86 40 14 14</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)

// Submit form function
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    showSuccess.value = true
    
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

