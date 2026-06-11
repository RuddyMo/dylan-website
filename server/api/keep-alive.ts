export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl as string;
  const supabaseAnonKey = config.public.supabaseAnonKey as string;

  await $fetch(`${supabaseUrl}/storage/v1/object/list/Photos`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: { prefix: '', limit: 1 }
  });

  return { alive: true };
});
