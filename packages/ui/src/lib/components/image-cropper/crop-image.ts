import { type ScImageCrop, shownSize } from './image-cropper-geometry';

/** What `cropImage` makes. */
export interface ScCropImageOptions {
  /** `image/png` (the default), `image/jpeg` or `image/webp`: the browser's, else PNG. */
  readonly type?: string;
  /** For JPEG and WebP: 0 to 1. */
  readonly quality?: number;
  /** In pixels; the height follows at the crop's ratio. The crop's own by default. */
  readonly width?: number;
  /** In pixels; the width follows at the crop's ratio. */
  readonly height?: number;
  /** A circle cuts an ellipse, its corners transparent (in PNG and WebP). */
  readonly shape?: 'rectangle' | 'circle';
  /** The file's name; the source file's (or "image") with the type's extension by default. */
  readonly name?: string;
}

/** What an image can be cropped from. */
export type ScCropImageSource = string | Blob | HTMLImageElement | ImageBitmap;

const EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

/**
 * The crop as an image file: the image turned, mirrored and cut as the crop
 * says, at its own size or the one asked. In the browser only.
 */
export async function cropImage(
  source: ScCropImageSource,
  crop: ScImageCrop,
  options: ScCropImageOptions = {},
): Promise<File> {
  if (
    (options.width !== undefined && !(options.width > 0)) ||
    (options.height !== undefined && !(options.height > 0))
  ) {
    throw new RangeError('cropImage: width and height must be above 0.');
  }
  const { image, natural, close } = await decode(source);
  try {
    const ratio = crop.width / crop.height;
    const width = Math.max(
      1,
      Math.round(
        options.width ?? (options.height ? options.height * ratio : crop.width),
      ),
    );
    const height = Math.max(
      1,
      Math.round(
        options.height ?? (options.width ? options.width / ratio : crop.height),
      ),
    );

    const offscreen = typeof OffscreenCanvas !== 'undefined';
    const canvas = offscreen
      ? new OffscreenCanvas(width, height)
      : Object.assign(document.createElement('canvas'), { width, height });
    const context = canvas.getContext('2d') as
      CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
    if (!context) throw new Error('cropImage: no 2D canvas.');

    context.scale(width / crop.width, height / crop.height);
    if (options.shape === 'circle') {
      context.beginPath();
      context.ellipse(
        crop.width / 2,
        crop.height / 2,
        crop.width / 2,
        crop.height / 2,
        0,
        0,
        Math.PI * 2,
      );
      context.clip();
    }
    // The image as shown: turned, then mirrored on the screen's axes, about its centre.
    const shown = shownSize(natural, crop.rotation ?? 0);
    context.translate(-crop.x, -crop.y);
    context.translate(shown.width / 2, shown.height / 2);
    context.scale(crop.flipX ? -1 : 1, crop.flipY ? -1 : 1);
    context.rotate(((crop.rotation ?? 0) * Math.PI) / 180);
    context.drawImage(image, -natural.width / 2, -natural.height / 2);

    const type = options.type ?? 'image/png';
    const blob =
      canvas instanceof HTMLCanvasElement
        ? await new Promise<Blob>((resolve, reject) =>
            canvas.toBlob(
              (b) =>
                b ? resolve(b) : reject(new Error('cropImage: it failed.')),
              type,
              options.quality,
            ),
          )
        : await canvas.convertToBlob({ type, quality: options.quality });

    const base =
      source instanceof File ? source.name.replace(/\.[^.]+$/, '') : 'image';
    const name = options.name ?? `${base}.${EXTENSIONS[blob.type] ?? 'png'}`;
    return new File([blob], name, { type: blob.type });
  } finally {
    close();
  }
}

async function decode(source: ScCropImageSource): Promise<{
  image: CanvasImageSource;
  natural: { width: number; height: number };
  close: () => void;
}> {
  if (typeof source === 'string') {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = source;
    await image.decode();
    return {
      image,
      natural: { width: image.naturalWidth, height: image.naturalHeight },
      close: () => undefined,
    };
  }
  if (source instanceof Blob) {
    const bitmap = await createImageBitmap(source);
    return {
      image: bitmap,
      natural: { width: bitmap.width, height: bitmap.height },
      close: () => bitmap.close(),
    };
  }
  if (source instanceof HTMLImageElement) {
    if (!source.complete) await source.decode();
    return {
      image: source,
      natural: { width: source.naturalWidth, height: source.naturalHeight },
      close: () => undefined,
    };
  }
  return {
    image: source,
    natural: { width: source.width, height: source.height },
    close: () => undefined,
  };
}
