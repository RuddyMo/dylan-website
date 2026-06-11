import { formatBytes } from '~/utils/format-bytes';

export type UploadFile = {
  id: string;
  file: File;
};

type UseFileUploadOptions = {
  /** Autoriser plusieurs fichiers. */
  multiple?: boolean;
  /** Nombre maximum de fichiers. */
  maxFiles?: number;
  /** Taille maximale par fichier, en octets. */
  maxSize?: number;
  /** Filtre MIME (ex: 'image/*'). */
  accept?: string;
};

let idCounter = 0;
const nextId = (name: string) => `${name}-${++idCounter}`;

/**
 * Gestion d'une zone d'upload (drag & drop + sélection) avec validation.
 * Reproduit l'API attendue par le composant d'upload : liste de fichiers en
 * attente, erreurs, et helpers pour ouvrir le sélecteur ou retirer un fichier.
 */
export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const { multiple = false, maxFiles = Infinity, maxSize = Infinity, accept = '*' } = options;

  const files = ref<UploadFile[]>([]);
  const errors = ref<string[]>([]);
  const dropzoneRef = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);

  const matchesAccept = (file: File) => {
    if (accept === '*' || accept === '') return true;
    return accept.split(',').some((rule) => {
      const pattern = rule.trim();
      if (!pattern) return false;
      if (pattern.endsWith('/*')) {
        return file.type.startsWith(pattern.slice(0, -1));
      }
      if (pattern.startsWith('.')) {
        return file.name.toLowerCase().endsWith(pattern.toLowerCase());
      }
      return file.type === pattern;
    });
  };

  const addFiles = (incoming: FileList | File[]) => {
    errors.value = [];
    const list = Array.from(incoming);

    for (const file of list) {
      if (!matchesAccept(file)) {
        errors.value = [`Le fichier "${file.name}" n'est pas d'un type autorisé.`];
        continue;
      }
      if (file.size > maxSize) {
        errors.value = [`Le fichier "${file.name}" dépasse ${formatBytes(maxSize)}.`];
        continue;
      }

      if (!multiple) {
        files.value = [{ id: nextId(file.name), file }];
        return;
      }

      if (files.value.length >= maxFiles) {
        errors.value = [`Vous ne pouvez pas dépasser ${maxFiles} fichiers.`];
        break;
      }

      const isDuplicate = files.value.some(
        (entry) => entry.file.name === file.name && entry.file.size === file.size
      );
      if (!isDuplicate) {
        files.value = [...files.value, { id: nextId(file.name), file }];
      }
    }
  };

  const openFileDialog = () => inputRef.value?.click();

  const removeFile = (id: string) => {
    files.value = files.value.filter((entry) => entry.id !== id);
  };

  const clearFiles = () => {
    files.value = [];
    errors.value = [];
    if (inputRef.value) inputRef.value.value = '';
  };

  const onInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) addFiles(input.files);
    input.value = '';
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    dropzoneRef.value?.setAttribute('data-dragging', 'true');
  };

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault();
    dropzoneRef.value?.removeAttribute('data-dragging');
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    dropzoneRef.value?.removeAttribute('data-dragging');
    if (event.dataTransfer?.files?.length) addFiles(event.dataTransfer.files);
  };

  watch(inputRef, (input, _old, onCleanup) => {
    if (!input) return;
    input.type = 'file';
    input.multiple = multiple;
    if (accept !== '*') input.accept = accept;
    input.addEventListener('change', onInputChange);
    onCleanup(() => input.removeEventListener('change', onInputChange));
  });

  watch(dropzoneRef, (zone, _old, onCleanup) => {
    if (!zone) return;
    zone.addEventListener('dragover', onDragOver);
    zone.addEventListener('dragleave', onDragLeave);
    zone.addEventListener('drop', onDrop);
    onCleanup(() => {
      zone.removeEventListener('dragover', onDragOver);
      zone.removeEventListener('dragleave', onDragLeave);
      zone.removeEventListener('drop', onDrop);
    });
  });

  return { files, errors, openFileDialog, removeFile, clearFiles, addFiles, dropzoneRef, inputRef };
};