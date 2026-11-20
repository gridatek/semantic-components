/** A quarter turn, clockwise, in degrees. */
export type ScImageCropperNextRotation = 0 | 90 | 180 | 270;

/**
 * The crop: a box in the image's own pixels, counted from the top left of
 * the image as shown — turned by `rotation`, then mirrored by `flipX` and
 * `flipY` (on the screen's axes).
 */
export interface ScImageCropNext {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly rotation?: ScImageCropperNextRotation;
  readonly flipX?: boolean;
  readonly flipY?: boolean;
}

/** A handle's place: an edge or a corner, by the compass. */
export type ScImageCropperNextHandlePosition =
  'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

/** Which way a quarter turn goes. */
export type ScImageCropperNextRotateDirection =
  'clockwise' | 'counterclockwise';

/** Which way a flip mirrors. */
export type ScImageCropperNextFlipDirection = 'horizontal' | 'vertical';

export interface ScImageCropperNextSize {
  readonly width: number;
  readonly height: number;
}

export interface ScImageCropperNextBox extends ScImageCropperNextSize {
  readonly x: number;
  readonly y: number;
}

/** The least a crop may be, in image pixels. */
export interface ScImageCropperNextLimits {
  readonly minWidth: number;
  readonly minHeight: number;
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

/** The image's size once turned. */
export function shownSize(
  natural: ScImageCropperNextSize,
  rotation: ScImageCropperNextRotation,
): ScImageCropperNextSize {
  return rotation % 180
    ? { width: natural.height, height: natural.width }
    : natural;
}

/** The largest box at `ratio` (width / height) inside `size`, centred; all of it without one. */
export function largest(
  size: ScImageCropperNextSize,
  ratio: number | null,
): ScImageCropperNextBox {
  if (!ratio || !(ratio > 0)) return { x: 0, y: 0, ...size };
  const width = Math.min(size.width, size.height * ratio);
  const height = width / ratio;
  return {
    x: (size.width - width) / 2,
    y: (size.height - height) / 2,
    width,
    height,
  };
}

/** Whole pixels, inside the image. */
export function settle(
  box: ScImageCropperNextBox,
  size: ScImageCropperNextSize,
): ScImageCropperNextBox {
  const width = clamp(Math.round(box.width), 1, size.width);
  const height = clamp(Math.round(box.height), 1, size.height);
  return {
    x: clamp(Math.round(box.x), 0, size.width - width),
    y: clamp(Math.round(box.y), 0, size.height - height),
    width,
    height,
  };
}

/** The start: centred, at `inset` of the largest box the ratio allows. */
export function initialBox(
  size: ScImageCropperNextSize,
  ratio: number | null,
  inset: number,
): ScImageCropperNextBox {
  const full = largest(size, ratio);
  const width = full.width * inset;
  const height = full.height * inset;
  return settle(
    {
      x: (size.width - width) / 2,
      y: (size.height - height) / 2,
      width,
      height,
    },
    size,
  );
}

/** How far in a crop is: 1 at the largest box at its ratio. */
export function zoomOf(
  box: ScImageCropperNextBox,
  size: ScImageCropperNextSize,
): number {
  if (!box.width || !box.height) return 1;
  return largest(size, box.width / box.height).width / box.width;
}

/**
 * The crop at `zoom`, its ratio kept, `anchor` (an image point) staying
 * where it is in it — its middle by default.
 */
export function zoomTo(
  box: ScImageCropperNextBox,
  size: ScImageCropperNextSize,
  zoom: number,
  anchor?: { x: number; y: number },
): ScImageCropperNextBox {
  const ratio = box.width / box.height;
  const width = largest(size, ratio).width / zoom;
  const height = width / ratio;
  const at = anchor ?? {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
  const fx = (at.x - box.x) / box.width;
  const fy = (at.y - box.y) / box.height;
  return {
    x: clamp(at.x - fx * width, 0, size.width - width),
    y: clamp(at.y - fy * height, 0, size.height - height),
    width,
    height,
  };
}

/** The crop at another ratio: about its middle, at the same zoom where it can. */
export function refit(
  box: ScImageCropperNextBox,
  size: ScImageCropperNextSize,
  ratio: number,
): ScImageCropperNextBox {
  const zoom = Math.max(1, zoomOf(box, size));
  const full = largest(size, ratio);
  const width = full.width / zoom;
  const height = width / ratio;
  return {
    x: clamp(box.x + box.width / 2 - width / 2, 0, size.width - width),
    y: clamp(box.y + box.height / 2 - height / 2, 0, size.height - height),
    width,
    height,
  };
}

/** Moved by `dx`, `dy`, inside the image. */
export function moveBox(
  box: ScImageCropperNextBox,
  size: ScImageCropperNextSize,
  dx: number,
  dy: number,
): ScImageCropperNextBox {
  return {
    ...box,
    x: clamp(box.x + dx, 0, size.width - box.width),
    y: clamp(box.y + dy, 0, size.height - box.height),
  };
}

/**
 * Resized by `handle`'s edges moving `dx`, `dy`, inside the image and no
 * smaller than `limits`. At `ratio`: a corner keeps the opposite one still,
 * an edge keeps the box centred across it.
 */
export function resizeBox(
  box: ScImageCropperNextBox,
  handle: ScImageCropperNextHandlePosition,
  dx: number,
  dy: number,
  size: ScImageCropperNextSize,
  limits: ScImageCropperNextLimits,
  ratio: number | null,
): ScImageCropperNextBox {
  const west = handle.includes('w');
  const east = handle.includes('e');
  const north = handle.includes('n');
  const south = handle.includes('s');
  const right = box.x + box.width;
  const bottom = box.y + box.height;

  if (!ratio) {
    const left = west ? clamp(box.x + dx, 0, right - limits.minWidth) : box.x;
    const r = east
      ? clamp(right + dx, box.x + limits.minWidth, size.width)
      : right;
    const top = north ? clamp(box.y + dy, 0, bottom - limits.minHeight) : box.y;
    const b = south
      ? clamp(bottom + dy, box.y + limits.minHeight, size.height)
      : bottom;
    return { x: left, y: top, width: r - left, height: b - top };
  }

  // The least width at the ratio: the larger of both limits.
  const minWidth = Math.max(limits.minWidth, limits.minHeight * ratio);

  if ((west || east) && (north || south)) {
    // A corner: the opposite one stays.
    const ax = west ? right : box.x;
    const ay = north ? bottom : box.y;
    const sx = west ? -1 : 1;
    const sy = north ? -1 : 1;
    const byX = box.width + sx * dx;
    const byY = (box.height + sy * dy) * ratio;
    // The axis moved the most decides.
    const wanted =
      Math.abs(byX - box.width) >= Math.abs(byY - box.width) ? byX : byY;
    const room = Math.min(
      sx > 0 ? size.width - ax : ax,
      (sy > 0 ? size.height - ay : ay) * ratio,
    );
    const width = clamp(wanted, Math.min(minWidth, room), room);
    const height = width / ratio;
    return {
      x: sx > 0 ? ax : ax - width,
      y: sy > 0 ? ay : ay - height,
      width,
      height,
    };
  }

  if (north || south) {
    // A top or bottom edge: the other stays, the box centred across.
    const ay = north ? bottom : box.y;
    const sy = north ? -1 : 1;
    const room = Math.min(sy > 0 ? size.height - ay : ay, size.width / ratio);
    const height = clamp(
      box.height + sy * dy,
      Math.min(minWidth / ratio, room),
      room,
    );
    const width = height * ratio;
    const cx = box.x + box.width / 2;
    return {
      x: clamp(cx - width / 2, 0, size.width - width),
      y: sy > 0 ? ay : ay - height,
      width,
      height,
    };
  }

  // A left or right edge.
  const ax = west ? right : box.x;
  const sx = west ? -1 : 1;
  const room = Math.min(sx > 0 ? size.width - ax : ax, size.height * ratio);
  const width = clamp(box.width + sx * dx, Math.min(minWidth, room), room);
  const height = width / ratio;
  const cy = box.y + box.height / 2;
  return {
    x: sx > 0 ? ax : ax - width,
    y: clamp(cy - height / 2, 0, size.height - height),
    width,
    height,
  };
}

/**
 * A quarter turn of the image, the crop turning with it. `size` is the
 * image as shown before the turn.
 */
export function rotateCrop(
  crop: ScImageCropNext,
  size: ScImageCropperNextSize,
  direction: 1 | -1,
): ScImageCropNext {
  const rotation = (((crop.rotation ?? 0) + direction * 90 + 360) %
    360) as ScImageCropperNextRotation;
  const box =
    direction > 0
      ? { x: size.height - crop.y - crop.height, y: crop.x }
      : { x: crop.y, y: size.width - crop.x - crop.width };
  return {
    ...box,
    width: crop.height,
    height: crop.width,
    rotation,
    // Mirrors on the screen's axes: a turn swaps them.
    flipX: crop.flipY ?? false,
    flipY: crop.flipX ?? false,
  };
}

/** Mirrored, the crop with the image. */
export function flipCrop(
  crop: ScImageCropNext,
  size: ScImageCropperNextSize,
  direction: ScImageCropperNextFlipDirection,
): ScImageCropNext {
  return direction === 'horizontal'
    ? {
        ...crop,
        x: size.width - crop.x - crop.width,
        flipX: !crop.flipX,
      }
    : {
        ...crop,
        y: size.height - crop.y - crop.height,
        flipY: !crop.flipY,
      };
}

/** The CSS transform that shows the image turned and mirrored about its centre. */
export function imageTransform(crop: ScImageCropNext | null): string {
  const sx = crop?.flipX ? -1 : 1;
  const sy = crop?.flipY ? -1 : 1;
  return `scale(${sx}, ${sy}) rotate(${crop?.rotation ?? 0}deg)`;
}
