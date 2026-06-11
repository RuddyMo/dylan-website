<template>
  <div class="p-6">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="text-muted-foreground mt-1 text-sm">Vue d'ensemble de vos photos sur le storage</p>
      </div>
      <span v-if="loading" class="text-muted-foreground flex items-center gap-2 text-sm">
        <span class="border-muted-foreground/30 border-t-muted-foreground block size-4 animate-spin rounded-full border-2" />
        Chargement…
      </span>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="kpi in kpis"
        :key="kpi.label"
        class="rounded-xl border bg-background p-5 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <span class="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-lg">
            <Icon :name="kpi.icon" class="size-5" />
          </span>
        </div>
        <p class="mt-4 text-2xl font-bold tabular-nums">{{ kpi.value }}</p>
        <p class="text-muted-foreground text-sm">{{ kpi.label }}</p>
      </div>
    </div>

    <div class="mt-4 grid gap-4 lg:grid-cols-3">
      <div class="rounded-xl border bg-background p-5 shadow-sm lg:col-span-2">
        <h2 class="mb-5 font-semibold">Répartition par catégorie</h2>
        <div class="space-y-4">
          <div v-for="cat in stats" :key="cat.key">
            <div class="mb-1.5 flex items-center justify-between text-sm">
              <span class="flex items-center gap-2">
                <Icon :name="cat.icon" class="text-muted-foreground size-4" />
                {{ cat.label }}
              </span>
              <span class="text-muted-foreground tabular-nums">{{ cat.count }} photo{{ cat.count > 1 ? 's' : '' }}</span>
            </div>
            <div class="bg-muted h-2 w-full overflow-hidden rounded-full">
              <div
                class="h-full rounded-full transition-all duration-700"
                :class="cat.color"
                :style="{ width: `${maxCount ? (cat.count / maxCount) * 100 : 0}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center rounded-xl border bg-background p-5 shadow-sm">
        <h2 class="mb-2 self-start font-semibold">Stockage utilisé</h2>
        <div class="relative my-3 flex items-center justify-center">
          <svg viewBox="0 0 100 100" class="size-40 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke-width="9" class="stroke-muted" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke-width="9"
              stroke-linecap="round"
              class="stroke-primary transition-all duration-1000"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
            />
          </svg>
          <div class="absolute flex flex-col items-center">
            <span class="text-2xl font-bold tabular-nums">{{ usedPct.toFixed(1) }}%</span>
            <span class="text-muted-foreground text-xs">de 1 Go</span>
          </div>
        </div>
        <p class="text-muted-foreground text-sm">
          <span class="text-foreground font-medium">{{ formatBytes(totalSize) }}</span> utilisés
        </p>
      </div>
    </div>

    <div class="mt-4 rounded-xl border bg-background p-5 shadow-sm">
      <h2 class="mb-4 font-semibold">Détail par dossier</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-muted-foreground border-b text-left">
              <th class="pb-3 pr-4 font-medium">Dossier</th>
              <th class="pb-3 pr-4 font-medium">Photos</th>
              <th class="pb-3 pr-4 font-medium">Taille</th>
              <th class="hidden pb-3 pr-4 font-medium sm:table-cell">Part du stockage</th>
              <th class="hidden pb-3 font-medium md:table-cell">Dernier ajout</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in stats" :key="cat.key" class="border-b last:border-0">
              <td class="py-3 pr-4">
                <span class="flex items-center gap-2 font-medium">
                  <span class="flex size-7 items-center justify-center rounded-md text-white" :class="cat.color">
                    <Icon :name="cat.icon" class="size-4" />
                  </span>
                  {{ cat.label }}
                </span>
              </td>
              <td class="py-3 pr-4 tabular-nums">{{ cat.count }}</td>
              <td class="py-3 pr-4 tabular-nums">{{ formatBytes(cat.size) }}</td>
              <td class="hidden py-3 pr-4 sm:table-cell">
                <div class="flex items-center gap-2">
                  <div class="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                    <div class="h-full rounded-full" :class="cat.color" :style="{ width: `${totalSize ? (cat.size / totalSize) * 100 : 0}%` }" />
                  </div>
                  <span class="text-muted-foreground tabular-nums text-xs">
                    {{ totalSize ? ((cat.size / totalSize) * 100).toFixed(0) : 0 }}%
                  </span>
                </div>
              </td>
              <td class="text-muted-foreground hidden py-3 md:table-cell">{{ formatDate(cat.lastUpload) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: 'sidebar',
    middleware: 'auth-client'
  });

  interface FolderStat {
    key: string;
    label: string;
    folder: string;
    icon: string;
    color: string;
    count: number;
    size: number;
    lastUpload: string | null;
  }

  const { $supabase } = useNuxtApp();

  const stats = ref<FolderStat[]>([
    { key: 'accueil', label: 'Accueil', folder: 'accueil', icon: 'lucide:home', color: 'bg-violet-500', count: 0, size: 0, lastUpload: null },
    { key: 'archi', label: 'Architecture', folder: 'gallerie/archi', icon: 'lucide:building-2', color: 'bg-blue-500', count: 0, size: 0, lastUpload: null },
    { key: 'art', label: 'Art', folder: 'gallerie/art', icon: 'lucide:palette', color: 'bg-emerald-500', count: 0, size: 0, lastUpload: null },
    { key: 'voyage', label: 'Voyage', folder: 'gallerie/voyage', icon: 'lucide:plane', color: 'bg-amber-500', count: 0, size: 0, lastUpload: null },
    { key: 'about', label: 'À propos', folder: 'about', icon: 'lucide:user', color: 'bg-rose-500', count: 0, size: 0, lastUpload: null },
    { key: 'contact', label: 'Contact', folder: 'contact', icon: 'lucide:mail', color: 'bg-cyan-500', count: 0, size: 0, lastUpload: null }
  ]);

  const loading = ref(true);

  const totalCount = computed(() => stats.value.reduce((sum, cat) => sum + cat.count, 0));
  const totalSize = computed(() => stats.value.reduce((sum, cat) => sum + cat.size, 0));
  const activeCategories = computed(() => stats.value.filter((cat) => cat.count > 0).length);
  const avgSize = computed(() => (totalCount.value ? totalSize.value / totalCount.value : 0));
  const maxCount = computed(() => Math.max(0, ...stats.value.map((cat) => cat.count)));

  const QUOTA = 1024 * 1024 * 1024; // 1 Go (plan gratuit Supabase)
  const circumference = 2 * Math.PI * 42;
  const usedPct = computed(() => Math.min(100, (totalSize.value / QUOTA) * 100));
  const dashOffset = computed(() => circumference * (1 - usedPct.value / 100));

  const kpis = computed(() => [
    { label: 'Photos au total', icon: 'lucide:images', value: String(totalCount.value) },
    { label: 'Stockage utilisé', icon: 'lucide:database', value: formatBytes(totalSize.value) },
    { label: 'Catégories actives', icon: 'lucide:folders', value: String(activeCategories.value) },
    { label: 'Taille moyenne', icon: 'lucide:scaling', value: formatBytes(avgSize.value) }
  ]);

  const formatDate = (iso: string | null): string => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const listFolder = async (folder: string) => {
    const files: Array<{ name?: string; created_at?: string; updated_at?: string; metadata?: { size?: number } }> = [];
    let offset = 0;

    while (true) {
      const { data, error } = await $supabase.storage.from('Photos').list(folder, {
        limit: 100,
        offset,
        sortBy: { column: 'name', order: 'asc' }
      });
      if (error || !data || data.length === 0) break;
      files.push(...data);
      if (data.length < 100) break;
      offset += 100;
    }

    return files.filter(
      (file) => !!file.name && !file.name.startsWith('.') && file.name.toLowerCase().endsWith('.webp')
    );
  };

  onMounted(async () => {
    if (!$supabase) {
      loading.value = false;
      return;
    }

    const results = await Promise.all(
      stats.value.map(async (cat) => {
        const files = await listFolder(cat.folder);
        const size = files.reduce((sum, file) => sum + Number(file.metadata?.size ?? 0), 0);
        const lastUpload = files.reduce<string | null>((latest, file) => {
          const date = file.created_at ?? file.updated_at ?? null;
          return date && (!latest || date > latest) ? date : latest;
        }, null);
        return { ...cat, count: files.length, size, lastUpload };
      })
    );

    stats.value = results;
    loading.value = false;
  });
</script>