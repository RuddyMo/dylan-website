import { embedCopyrightWebp } from './embedCopyrightXmp';

export const convertImageToWebp = (file: File, quality = 0.8): Promise<File> =>
  new Promise((resolve, reject) => {
    if (file.type === 'image/webp') {
      resolve(file);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Canvas non supporté par ce navigateur'));
        return;
      }

      context.drawImage(img, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error('La conversion WebP a échoué'));
            return;
          }
          const webpName = `${file.name.replace(/\.[^.]+$/, '')}.webp`;
          const stamped = await embedCopyrightWebp(blob, canvas.width, canvas.height);
          resolve(new File([stamped], webpName, { type: 'image/webp' }));
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Image illisible'));
    };

    img.src = objectUrl;
  });
