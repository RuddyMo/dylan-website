<template>
  <div class="flex min-h-screen">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isSidebarOpen" class="fixed inset-0 z-40 bg-black/40 md:hidden" @click="isSidebarOpen = false" />
    </Transition>

    <aside
      class="fixed left-0 top-0 z-50 h-screen w-75 border-r bg-background transition-transform duration-300 md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <button
        class="absolute right-4 top-4 z-10 flex size-8 items-center justify-center md:hidden"
        aria-label="Fermer le menu"
        @click="isSidebarOpen = false"
      >
        <Icon name="lucide:x" class="size-5" />
      </button>
      <UiScrollArea class="size-full">
        <div class="flex h-screen flex-col pt-7">
          <NuxtLink to="/" class="flex w-full items-center gap-3 px-5">
            <img class="h-8 w-auto rounded-sm" src="/icon/logo.gif" alt="Your Company" />
            Dylan Morel Photographie.
          </NuxtLink>
          <div class="my-6 px-5">
            <UiVeeInput v-model="search" placeholder="Search..." icon="lucide:search" />
          </div>
          <div class="flex h-full grow flex-col px-5 pb-8">
            <div class="mb-10 flex flex-col gap-10">
              <nav class="flex flex-col gap-1">
                <template v-for="(n, i) in topNav" :key="i">
                  <UiButton v-if="!n.items" :to="n.link" size="default" variant="ghost" class="justify-start gap-3 px-3">
                    <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                    <span>{{ n.title }}</span>
                  </UiButton>
                  <UiCollapsible v-if="n.items">
                    <UiCollapsibleTrigger as-child>
                      <UiButton size="default" variant="ghost" class="group w-full justify-start gap-3 px-3">
                        <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                        <span>{{ n.title }}</span>
                        <Icon name="lucide:chevron-down" class="ml-auto size-4 text-muted-foreground transition group-data-[state=open]:rotate-180" />
                      </UiButton>
                    </UiCollapsibleTrigger>
                    <UiCollapsibleContent class="flex flex-col gap-1.5 pr-2 pl-4">
                      <template v-for="(item, index) in n.items" :key="index">
                        <UiButton :to="item.link" size="sm" variant="ghost" class="justify-start gap-4 px-3">
                          <span>{{ item.title }}</span>
                        </UiButton>
                      </template>
                    </UiCollapsibleContent>
                  </UiCollapsible>
                </template>
              </nav>
            </div>
          </div>
          <UiDivider />
          <div class="flex items-center gap-3 p-6">
            <div class="flex items-center gap-3">
              <UiAvatar :src="user.avatar" class="size-9" />
              <div>
                <p class="text-sm font-semibold">{{ user.username }}</p>
                <p class="text-xs text-muted-foreground">{{ user.email }}</p>
              </div>
            </div>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton class="ml-auto shrink-0" size="icon-sm" variant="ghost" @click="logout">
                  <Icon name="lucide:log-out" class="size-4 text-muted-foreground" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent side="right" align="center">Logout</UiTooltipContent>
            </UiTooltip>
          </div>
        </div>
      </UiScrollArea>
    </aside>
    <main class="flex-1 md:ml-75">
      <div class="sticky top-0 z-30 flex items-center gap-3 border-b bg-background px-4 py-3 md:hidden">
        <button
          class="flex size-9 items-center justify-center"
          aria-label="Ouvrir le menu"
          @click="isSidebarOpen = true"
        >
          <Icon name="lucide:menu" class="size-6" />
        </button>
        <span class="text-sm font-semibold">Dylan Morel Photographie.</span>
      </div>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const { $supabase } = useNuxtApp();
const route = useRoute();

const search = ref<string>('');
const isSidebarOpen = ref<boolean>(false);

watch(() => route.path, () => {
  isSidebarOpen.value = false;
});

const logout = async () => {
  await $supabase.auth.signOut();
  await navigateTo('/login');
};

const user = {
  avatar: '/img/about/about.webp',
  username: 'Dylan Morel',
  email: 'moreldylan966@gmail.com'
};

const topNav = [
  { title: 'Home', icon: 'lucide:home', link: '/dashboard' },
  {
    title: 'Photo',
    icon: 'lucide:folder',
    items: [
      { title: 'About', link: '/gallery/about' },
      { title: 'Accueil', link: '/gallery/accueil' },
      { title: 'Contact', link: '/gallery/contact' }
    ]
  },
  {
    title: 'Galerie',
    icon: 'lucide:images',
    items: [
      { title: 'Architecture', link: '/gallery/archi' },
      { title: 'Art', link: '/gallery/art' },
      { title: 'Voyage', link: '/gallery/voyage' }
    ]
  }
];
</script>
