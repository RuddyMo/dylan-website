export type ImageItem = {
  url: string;
  thumbUrl: string;
  previewUrl: string;
  name: string;
  path: string;
  size: number;
  createdAt?: string;
};

export const useStorageImages = () => {
  const nuxtApp = tryUseNuxtApp();
  if (!nuxtApp) {
    return {
      fetchImagesFromFolder: async (_folderPath: string): Promise<ImageItem[]> => [],
      deleteImage: async (_path: string) => ({ success: false })
    };
  }

  const supabase = (nuxtApp as any).$supabase;
  if (!supabase) {
    return {
      fetchImagesFromFolder: async (_folderPath: string): Promise<ImageItem[]> => [],
      deleteImage: async (_path: string) => ({ success: false })
    };
  }

  const fetchImagesFromFolder = async (folderPath: string): Promise<ImageItem[]> => {
    try {
      const pageSize = 100;
      let offset = 0;
      const allFiles: any[] = [];

      while (true) {
        const { data, error } = await supabase.storage.from('Photos').list(folderPath, {
          limit: pageSize,
          offset,
          sortBy: { column: 'name', order: 'asc' } as any
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

      return allFiles.map((file: any): ImageItem => {
        const fullPath = `${folderPath}/${file.name}`;

        const { data: fullData } = supabase.storage.from('Photos').getPublicUrl(fullPath);
        const fullUrl = fullData?.publicUrl ?? '';

        const { data: thumbData } = supabase.storage.from('Photos').getPublicUrl(fullPath, {
          transform: { width: 96, height: 96, resize: 'cover', quality: 35 }
        });

        const { data: previewData } = supabase.storage.from('Photos').getPublicUrl(fullPath, {
          transform: { width: 1400, quality: 75 }
        });

        const thumbUrl = thumbData?.publicUrl || fullUrl;
        const previewUrl = previewData?.publicUrl || fullUrl;

        return {
          url: fullUrl,
          thumbUrl,
          previewUrl,
          name: file.name,
          path: fullPath,
          size: Number(file.metadata?.size ?? file.size ?? 0),
          createdAt: file.created_at
        };
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const deleteImage = async (path: string) => {
    try {
      const { error } = await supabase.storage.from('Photos').remove([path]);
      if (error) return { success: false, error };
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return { fetchImagesFromFolder, deleteImage };
};
