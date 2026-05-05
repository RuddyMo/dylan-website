export type GalleryType = 'archi' | 'voyage' | 'art' | 'about' | 'accueil' | 'contact';

export interface ImageItem {
  url: string;
  type: GalleryType;
  name: string;
  path: string;
  size?: number;
  createdAt?: string;
}

export interface FolderMap {
  archi: string;
  voyage: string;
  art: string;
  about: string;
  accueil: string;
  contact: string;
}

export interface ButtonItem {
  label: string;
  type: GalleryType;
}
