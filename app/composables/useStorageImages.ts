export const useStorageImages = () => {
  const { $supabase } = useNuxtApp();

  const fetchImagesFromFolder = async (folderPath: string) => {
    if (!$supabase) return [];

    const pageSize = 100;
    let offset = 0;
    const allFiles: any[] = [];

    while (true) {
      const { data, error } = await $supabase.storage.from('Photos').list(folderPath, {
        limit: pageSize,
        offset,
        sortBy: { column: 'name', order: 'asc' }
      });

      if (error) {
        console.error('Erreur lors du chargement des images:', error);
        return [];
      }

      if (!data || data.length === 0) break;

      allFiles.push(...data);
      if (data.length < pageSize) break;
      offset += pageSize;
    }

    return allFiles.map((file: any) => {
      const fullPath = `${folderPath}/${file.name}`;
      const { data: publicData } = $supabase.storage.from('Photos').getPublicUrl(fullPath);
      return {
        url: publicData.publicUrl,
        name: file.name,
        path: fullPath,
        size: file.metadata?.size || 0,
        createdAt: file.created_at
      };
    });
  };


  const deleteImage = async (path: string) => {
    if (!$supabase) return { success: false };

    const { error } = await $supabase.storage.from('Photos').remove([path]);
    if (error) {
      console.error('Erreur lors de la suppression:', error);
      return { success: false, error };
    }
    return { success: true };
  };

  return { fetchImagesFromFolder, deleteImage };
};