export type GalleryType = 'archi' | 'voyage' | 'art';

export interface ImageItem {
  url: string;
  type: GalleryType;
}

export interface FolderMap {
  archi: string;
  voyage: string;
  art: string;
}

export interface ButtonItem {
  label: string;
  type: GalleryType;
}
