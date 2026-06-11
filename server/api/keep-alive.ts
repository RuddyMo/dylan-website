// Ping quotidien (déclenché par le cron Vercel, cf. vercel.json) pour éviter
// la mise en pause du projet Supabase sur le plan gratuit : Supabase suspend
// les projets après 7 jours sans aucune requête à la base. Une requête légère
// suffit à remettre ce compteur à zéro.
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl as string;
  const supabaseAnonKey = config.public.supabaseAnonKey as string;

  // Le site stocke ses images dans le bucket Storage « Photos ». On liste un
  // objet : c'est l'activité minimale qui maintient le projet réveillé.
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
