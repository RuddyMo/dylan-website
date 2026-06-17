export const useImageOrder = () => {
  const supabase = tryUseNuxtApp()?.$supabase;

  const orderPath = (folder: string): string => `${folder}/.order.json`;

  const fetchOrder = async (folder: string): Promise<string[]> => {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.storage.from('Photos').download(orderPath(folder));
      if (error || !data) return [];
      const parsed = JSON.parse(await data.text());
      return Array.isArray(parsed) ? parsed.filter((name: unknown): name is string => typeof name === 'string') : [];
    } catch {
      return [];
    }
  };

  const saveOrder = async (folder: string, names: string[]): Promise<{ success: boolean; error?: unknown }> => {
    if (!supabase) return { success: false };
    try {
      const blob = new Blob([JSON.stringify(names)], { type: 'application/json' });
      const { error } = await supabase.storage.from('Photos').upload(orderPath(folder), blob, {
        upsert: true,
        cacheControl: '0',
        contentType: 'application/json'
      });
      if (error) return { success: false, error };
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  const applyOrder = <T extends { name: string }>(items: T[], order: string[]): T[] => {
    const rank = new Map(order.map((name, index) => [name, index]));
    return [...items].sort((a, b) => {
      const rankA = rank.get(a.name) ?? Number.MAX_SAFE_INTEGER;
      const rankB = rank.get(b.name) ?? Number.MAX_SAFE_INTEGER;
      return rankA === rankB ? a.name.localeCompare(b.name) : rankA - rankB;
    });
  };

  return { fetchOrder, saveOrder, applyOrder };
};