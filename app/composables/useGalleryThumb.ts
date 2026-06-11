/**
 * Renvoie une fonction qui transforme l'URL d'une image en une vignette
 * optimisée (WebP redimensionné) via l'optimiseur d'image @nuxt/image.
 *
 * Utilisé dans les tableaux d'administration `/gallery` où les images
 * s'affichent en 48px : inutile de charger l'original pleine résolution,
 * on sert ~96px (2× pour les écrans retina).
 */
export const useGalleryThumb = () => {
  const img = useImage();
  return (url: string): string => img(url, { width: 96, height: 96, fit: 'cover', quality: 70, format: 'webp' });
};
