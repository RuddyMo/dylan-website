/**
 * Transforme un nom de fichier en clé valide pour Supabase Storage.
 * Retire les accents, et remplace espaces, apostrophes et tout caractère
 * non sûr par un tiret. L'extension est conservée.
 *
 * Ex: "Capture d'écran 2026-04-16 165323.webp" -> "capture-d-ecran-2026-04-16-165323.webp"
 */
export const sanitizeFilename = (filename: string): string => {
  const dotIndex = filename.lastIndexOf('.');
  const hasExt = dotIndex > 0;
  const base = hasExt ? filename.slice(0, dotIndex) : filename;
  const ext = hasExt ? filename.slice(dotIndex + 1) : '';

  const slug = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // diacritiques
      .replace(/[^a-zA-Z0-9._-]+/g, '-') // caractères non sûrs
      .replace(/-+/g, '-') // tirets multiples
      .replace(/^-|-$/g, '') // tirets en bord
      .toLowerCase();

  const safeBase = slug(base) || 'image';
  const safeExt = slug(ext);

  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
};