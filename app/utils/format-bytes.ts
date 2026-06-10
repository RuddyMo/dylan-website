/**
 * Formate une taille en octets en chaîne lisible (Ko, Mo, Go…).
 *
 * @param bytes    Nombre d'octets.
 * @param decimals Nombre de décimales (défaut 1).
 */
export const formatBytes = (bytes: number, decimals = 1): string => {
  if (!bytes || bytes <= 0) return '0 o';

  const k = 1024;
  const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`;
};