/** A rectangle: in the image's pixels, or the stage's. */
export interface ScImageCropperRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface ScImageCropperSize {
  readonly width: number;
  readonly height: number;
}

/** A quarter turn: rotation is in steps of 90°. */
export type ScImageCropperRotation = 0 | 90 | 180 | 270;

/** The image as shown: turned a quarter, its width and height swap. */
export function oriented(
  natural: ScImageCropperSize,
  rotation: ScImageCropperRotation,
): ScImageCropperSize {
  return rotation % 180 === 0
    ? natural
    : { width: natural.height, height: natural.width };
}

/** The scale at which `size` fits in `box` (contain). */
export function fitScale(
  size: ScImageCropperSize,
  box: ScImageCropperSize,
): number {
  if (!size.width || !size.height) return 1;
  return Math.min(box.width / size.width, box.height / size.height);
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

/**
 * The largest rectangle of `ratio` (width / height) that fits in `box`
 * with `margin` (a fraction of it) around, centred.
 */
export function centredRect(
  box: ScImageCropperSize,
  ratio: number,
  margin = 0.1,
): ScImageCropperRect {
  const maxWidth = box.width * (1 - margin * 2);
  const maxHeight = box.height * (1 - margin * 2);
  const width = Math.min(maxWidth, maxHeight * ratio);
  const height = width / ratio;
  return {
    x: (box.width - width) / 2,
    y: (box.height - height) / 2,
    width,
    height,
  };
}

/** `rect` kept inside `bounds` (moved first, shrunk only if it must). */
export function within(
  rect: ScImageCropperRect,
  bounds: ScImageCropperSize,
): ScImageCropperRect {
  const width = Math.min(rect.width, bounds.width);
  const height = Math.min(rect.height, bounds.height);
  return {
    x: clamp(rect.x, 0, bounds.width - width),
    y: clamp(rect.y, 0, bounds.height - height),
    width,
    height,
  };
}

/** A resize handle: the edges it moves. */
export type ScImageCropperHandlePosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left';

/**
 * `rect` resized by moving `handle`'s edges by `dx`, `dy` (image pixels),
 * within `bounds`, at least `min` wide and high, keeping `ratio` if given
 * (the opposite edge or corner stays put).
 */
export function resize(
  rect: ScImageCropperRect,
  handle: ScImageCropperHandlePosition,
  dx: number,
  dy: number,
  bounds: ScImageCropperSize,
  min: number,
  ratio: number | null,
): ScImageCropperRect {
  const left = handle.includes('left');
  const right = handle.includes('right');
  const top = handle.startsWith('top');
  const bottom = handle.startsWith('bottom');

  let x1 = rect.x;
  let y1 = rect.y;
  let x2 = rect.x + rect.width;
  let y2 = rect.y + rect.height;
  if (left) x1 = clamp(x1 + dx, 0, x2 - min);
  if (right) x2 = clamp(x2 + dx, x1 + min, bounds.width);
  if (top) y1 = clamp(y1 + dy, 0, y2 - min);
  if (bottom) y2 = clamp(y2 + dy, y1 + min, bounds.height);

  if (!ratio) return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };

  // Keep the ratio: the side moved most leads; edges and corners hold.
  let width = x2 - x1;
  let height = y2 - y1;
  const horizontal = left || right;
  const vertical = top || bottom;
  if (horizontal && (!vertical || width / ratio >= height)) {
    height = width / ratio;
  } else {
    width = height * ratio;
  }
  // Room for it: from the edge or corner that stays.
  const anchorX = left ? x2 : right ? x1 : (x1 + x2) / 2;
  const anchorY = top ? y2 : bottom ? y1 : (y1 + y2) / 2;
  const roomX = left
    ? anchorX
    : right
      ? bounds.width - anchorX
      : Math.min(anchorX, bounds.width - anchorX) * 2;
  const roomY = top
    ? anchorY
    : bottom
      ? bounds.height - anchorY
      : Math.min(anchorY, bounds.height - anchorY) * 2;
  const scale = Math.min(1, roomX / width, roomY / height);
  width *= scale;
  height *= scale;
  return {
    x: left ? anchorX - width : right ? anchorX : anchorX - width / 2,
    y: top ? anchorY - height : bottom ? anchorY : anchorY - height / 2,
    width,
    height,
  };
}

/** `rect` given `ratio`, around the same centre, as large as fits in it. */
export function withRatio(
  rect: ScImageCropperRect,
  ratio: number,
  bounds: ScImageCropperSize,
): ScImageCropperRect {
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  const width = Math.min(rect.width, rect.height * ratio);
  const height = width / ratio;
  return within(
    { x: cx - width / 2, y: cy - height / 2, width, height },
    bounds,
  );
}
