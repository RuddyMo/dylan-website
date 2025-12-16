export default defineNuxtRouteMiddleware(async (to) => {
  const { $supabase } = useNuxtApp();

  if (!$supabase) {
    return;
  }

  const { data } = await $supabase.auth.getSession();
  const session = data?.session;

  if (session && to.path === '/login') {
    return navigateTo('/');
  }

  if (!session && to.path !== '/login') {
    return navigateTo('/login');
  }
});
