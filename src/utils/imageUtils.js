/**
 * Utility to strip EXIF, GPS, and device metadata from uploaded citizen photos
 * by re-rendering through an HTML5 canvas element before sending to the server.
 */
export async function stripImageMetadata(file, maxDimension = 1600) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image into canvas.'));

      img.onload = () => {
        // Calculate proportional dimensions
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        // Draw onto offscreen canvas (inherently strips all EXIF/GPS tags)
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas 2D context unavailable.'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as clean sanitized JPEG without metadata
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        const base64 = dataUrl.split(',')[1];

        canvas.toBlob(
          (blob) => {
            resolve({
              blob,
              dataUrl,
              base64,
              mimeType: 'image/jpeg',
              width,
              height,
              originalName: file.name,
              metadataStripped: true,
            });
          },
          'image/jpeg',
          0.88
        );
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Convert a public image URL (like /sample-damage.jpg) to a stripped base64 payload.
 */
export async function stripImageUrlMetadata(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'sample-damage.jpg', { type: blob.type || 'image/jpeg' });
  return stripImageMetadata(file);
}
