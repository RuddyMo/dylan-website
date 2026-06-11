export const usePublicFolderImages = (folder: string) => {
  const { $supabase } = useNuxtApp();
  const img = useImage();

  const images = ref<string[]>([]);

  onMounted(async () => {
    if (!$supabase) return;

    const { data, error } = await $supabase.storage.from('Photos').list(folder, {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' }
    });

    if (error || !data) {
      console.error(`Erreur chargement du dossier « ${folder} »`, error);
      return;
    }

    images.value = data
      .filter((file) => !!file.name && !file.name.startsWith('.') && file.name.toLowerCase().endsWith('.webp'))
      .map((file) => {
        const { data: publicData } = $supabase.storage.from('Photos').getPublicUrl(`${folder}/${file.name}`);
        return img(publicData.publicUrl, { width: 1400, quality: 75, format: 'webp' });
      });
  });

  return { images };
};