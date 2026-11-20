import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils';
import {
  type ScImageCrop,
  type ScImageCropperBox,
  type ScImageCropperFlipDirection,
  type ScImageCropperHandlePosition,
  type ScImageCropperLimits,
  type ScImageCropperRotateDirection,
  type ScImageCropperSize,
  clamp,
  flipCrop,
  imageTransform,
  initialBox,
  largest,
  moveBox,
  refit,
  resizeBox,
  rotateCrop,
  settle,
  shownSize,
  zoomOf,
  zoomTo,
} from './image-cropper-geometry';

/** A box moved and resized over the image, or a frame the image moves under. */
export type ScImageCropperMode = 'box' | 'frame';

/** How the selection looks; a circle crops to an ellipse with `cropImage`'s `shape`. */
export type ScImageCropperShape = 'rectangle' | 'circle';

/** The frame's room from the viewport's edges, in pixels. */
const FRAME_INSET = 24;

interface ScImageCropperDrag {
  readonly id: number;
  readonly element: HTMLElement;
  readonly kind: 'move' | 'resize' | 'pan';
  readonly handle: ScImageCropperHandlePosition | null;
  readonly start: ScImageCrop;
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly stop: () => void;
}

/**
 * An image cropper: holds the crop — a box in the image's own pixels, with
 * its quarter turn and flips — and what moves it. Put its parts inside: a
 * `scImageCropperViewport` with your `img[scImageCropperImage]`, a
 * `scImageCropperSelection` and, for a box, its handles; then the zoom,
 * rotate and flip controls you want. Name it (`aria-label`).
 */
@Directive({
  selector: '[scImageCropper]',
  exportAs: 'scImageCropper',
  host: {
    role: 'group',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.data-mode]': 'mode()',
    '[attr.data-shape]': 'shape()',
    '[attr.data-loading]': 'loading() ? "" : null',
    '[attr.data-error]': 'error() ? "" : null',
    '[attr.data-dragging]': 'dragging() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScImageCropper {
  readonly classInput = input<string>('', { alias: 'class' });

  /**
   * The crop (two-way): written once the image loads (centred, at four
   * fifths of the largest the ratio allows; all the frame in frame mode).
   * Set it to restore a saved one; `null` starts again.
   */
  readonly crop = model<ScImageCrop | null>(null);
  readonly mode = input<ScImageCropperMode>('box');
  /** Width / height; free when null. A change refits the crop about its middle. */
  readonly aspectRatio = input<number | null>(null);
  readonly shape = input<ScImageCropperShape>('rectangle');
  /** The least crop, in image pixels. */
  readonly minWidth = input(1);
  readonly minHeight = input(1);
  /** How far in: 1 is the largest crop the image allows. */
  readonly maxZoom = input(10);
  /** Nothing moves; the selection and handles leave the tab order. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** The image's own size: set by `scImageCropperImage` once it loads. */
  readonly ɵnatural = signal<ScImageCropperSize>({ width: 0, height: 0 });
  /** The image element: for the preview. */
  readonly ɵimage = signal<HTMLImageElement | null>(null);
  /** The viewport: its element and size, set by `scImageCropperViewport`. */
  readonly ɵviewport = signal<HTMLElement | null>(null);
  readonly ɵviewportSize = signal<ScImageCropperSize>({
    width: 0,
    height: 0,
  });
  /** The selection element: `focus()` goes there. */
  readonly ɵselection = signal<HTMLElement | null>(null);

  /** The image failed to load. */
  readonly error = signal(false);
  /** Until the image is in. */
  readonly loading = computed(() => !this.ɵnatural().width && !this.error());
  /** Being dragged (pointer). */
  readonly dragging = signal(false);
  /** Image, viewport and crop: the parts can show. */
  readonly ready = computed(
    () =>
      this.ɵnatural().width > 0 &&
      this.ɵviewportSize().width > 0 &&
      !!this.crop(),
  );

  private readonly ratio = computed(() => {
    const ratio = this.aspectRatio();
    return ratio && ratio > 0 ? ratio : null;
  });

  /** The image as shown: turned. */
  readonly shown = computed(() =>
    shownSize(this.ɵnatural(), this.crop()?.rotation ?? 0),
  );

  /** How far in the crop is: 1 at the largest box at its ratio. */
  readonly zoom = computed(() => {
    const crop = this.crop();
    return crop ? zoomOf(crop, this.shown()) : 1;
  });

  /** The most zoom: `maxZoom`, or less where the least size comes first. */
  readonly mostZoom = computed(() => {
    const crop = this.crop();
    if (!crop) return this.maxZoom();
    const full = largest(this.shown(), crop.width / crop.height);
    return Math.max(
      1,
      Math.min(
        this.maxZoom(),
        full.width / Math.max(1, this.minWidth()),
        full.height / Math.max(1, this.minHeight()),
      ),
    );
  });

  /** The least crop: the limits, and what `maxZoom` allows. */
  readonly ɵlimits = computed<ScImageCropperLimits>(() => {
    const full = largest(this.shown(), this.ratio());
    const most = Math.max(1, this.maxZoom());
    return {
      minWidth: Math.max(1, this.minWidth(), full.width / most),
      minHeight: Math.max(1, this.minHeight(), full.height / most),
    };
  });

  /** In frame mode, the frame: the largest box at the ratio in the viewport, inset. */
  private readonly frame = computed(() => {
    const crop = this.crop();
    const ratio =
      this.ratio() ?? (crop ? crop.width / crop.height : null) ?? null;
    // Inset: the shaded image shows round it, and that it goes on.
    const viewport = this.ɵviewportSize();
    const inset = Math.min(
      FRAME_INSET,
      viewport.width / 8,
      viewport.height / 8,
    );
    const box = largest(
      {
        width: viewport.width - inset * 2,
        height: viewport.height - inset * 2,
      },
      ratio,
    );
    return { ...box, x: box.x + inset, y: box.y + inset };
  });

  /** Viewport pixels per image pixel. */
  readonly ɵscale = computed(() => {
    const crop = this.crop();
    const shown = this.shown();
    const viewport = this.ɵviewportSize();
    if (!crop || !shown.width || !viewport.width) return 1;
    if (this.mode() === 'frame') return this.frame().width / crop.width;
    return Math.min(
      viewport.width / shown.width,
      viewport.height / shown.height,
    );
  });

  /** Where the shown image's top left is, in the viewport. */
  private readonly origin = computed(() => {
    const crop = this.crop();
    const shown = this.shown();
    const viewport = this.ɵviewportSize();
    const s = this.ɵscale();
    if (this.mode() === 'frame' && crop) {
      const frame = this.frame();
      return { x: frame.x - crop.x * s, y: frame.y - crop.y * s };
    }
    return {
      x: (viewport.width - shown.width * s) / 2,
      y: (viewport.height - shown.height * s) / 2,
    };
  });

  /** The selection, in the viewport. */
  readonly selectionBox = computed<ScImageCropperBox>(() => {
    const crop = this.crop();
    if (!crop) return { x: 0, y: 0, width: 0, height: 0 };
    if (this.mode() === 'frame') return this.frame();
    const origin = this.origin();
    const s = this.ɵscale();
    return {
      x: origin.x + crop.x * s,
      y: origin.y + crop.y * s,
      width: crop.width * s,
      height: crop.height * s,
    };
  });

  /** The image element's place: its own size, scaled, turned and mirrored about its centre. */
  readonly imageStyle = computed(() => {
    // Until it can be placed, its own size (hidden, in the clipped
    // viewport): never 0 px, which Angular's dev check takes for an
    // oversized image (NG0913).
    if (!this.ready()) {
      return {
        width: null,
        height: null,
        left: null,
        top: null,
        transform: null,
      };
    }
    const natural = this.ɵnatural();
    const shown = this.shown();
    const s = this.ɵscale();
    const origin = this.origin();
    return {
      width: natural.width * s,
      height: natural.height * s,
      left: origin.x + ((shown.width - natural.width) * s) / 2,
      top: origin.y + ((shown.height - natural.height) * s) / 2,
      transform: imageTransform(this.crop()),
    };
  });

  private readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );

  private loaded = false;
  private drag: ScImageCropperDrag | null = null;

  constructor() {
    ɵwarnIfUnnamed('scImageCropper');

    // No crop (at the start, or set to null) once the image is in: the default.
    effect(() => {
      const natural = this.ɵnatural();
      if (natural.width && this.crop() === null) {
        untracked(() => this.crop.set(this.initial()));
      }
    });

    // Another ratio: the crop refitted about its middle.
    effect(() => {
      const ratio = this.ratio();
      untracked(() => {
        const crop = this.crop();
        if (!crop || !ratio || !this.ɵnatural().width) return;
        if (Math.abs(crop.width - crop.height * ratio) <= 1) return;
        this.setBox(refit(crop, this.shown(), ratio));
      });
    });
  }

  /** The image has loaded: a crop given before the first is kept; another image starts again. */
  ɵload(natural: ScImageCropperSize): void {
    const first = !this.loaded;
    this.loaded = true;
    this.error.set(false);
    this.ɵnatural.set(natural);
    const crop = this.crop();
    if (first && crop) {
      const shown = shownSize(natural, crop.rotation ?? 0);
      this.crop.set({ ...crop, ...settle(crop, shown) });
    } else {
      this.crop.set(this.initial());
    }
  }

  /** Zooms to `zoom` (1 to `mostZoom()`), about the crop's middle or an image point. */
  setZoom(zoom: number, anchor?: { x: number; y: number }): void {
    const crop = this.crop();
    if (!crop || this.disabled()) return;
    const next = clamp(zoom, 1, this.mostZoom());
    this.setBox(zoomTo(crop, this.shown(), next, anchor));
  }

  /** Zooms by `factor`. */
  zoomBy(factor: number, anchor?: { x: number; y: number }): void {
    this.setZoom(this.zoom() * factor, anchor);
  }

  /** A quarter turn of the image; the crop turns with it. */
  rotate(direction: ScImageCropperRotateDirection = 'clockwise'): void {
    const crop = this.crop();
    if (!crop || this.disabled()) return;
    const turned = rotateCrop(
      crop,
      this.shown(),
      direction === 'clockwise' ? 1 : -1,
    );
    const shown = shownSize(this.ɵnatural(), turned.rotation ?? 0);
    const ratio = this.ratio();
    const box = ratio ? refit(turned, shown, ratio) : turned;
    this.crop.set({ ...turned, ...settle(box, shown) });
  }

  /** Mirrors the image; the crop with it. */
  flip(direction: ScImageCropperFlipDirection = 'horizontal'): void {
    const crop = this.crop();
    if (!crop || this.disabled()) return;
    this.crop.set(flipCrop(crop, this.shown(), direction));
  }

  /** Focuses the selection. */
  focus(): void {
    this.ɵselection()?.focus();
  }

  /** The keyboard, on the selection or a handle. */
  onKey(
    event: KeyboardEvent,
    handle: ScImageCropperHandlePosition | null = null,
  ): void {
    const crop = this.crop();
    if (!crop || !this.ready() || this.disabled()) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    // One screen pixel, in image pixels; ten with Shift.
    const step =
      Math.max(1, Math.round(1 / this.ɵscale())) * (event.shiftKey ? 10 : 1);
    let dx = 0;
    let dy = 0;
    switch (event.key) {
      case 'ArrowLeft':
        dx = -step;
        break;
      case 'ArrowRight':
        dx = step;
        break;
      case 'ArrowUp':
        dy = -step;
        break;
      case 'ArrowDown':
        dy = step;
        break;
      case '+':
      case '=':
        event.preventDefault();
        this.zoomBy(1.25);
        return;
      case '-':
      case '_':
        event.preventDefault();
        this.zoomBy(0.8);
        return;
      case 'r':
      case 'R':
        event.preventDefault();
        this.rotate(event.shiftKey ? 'counterclockwise' : 'clockwise');
        return;
      default:
        return;
    }
    if (handle) {
      // An edge takes only the arrows along it.
      const across = handle === 'n' || handle === 's' ? dx : 0;
      const along = handle === 'e' || handle === 'w' ? dy : 0;
      if (across || along) return;
      event.preventDefault();
      this.setBox(
        resizeBox(
          crop,
          handle,
          dx,
          dy,
          this.shown(),
          this.ɵlimits(),
          this.ratio(),
        ),
      );
      return;
    }
    event.preventDefault();
    this.setBox(moveBox(crop, this.shown(), dx, dy));
  }

  /**
   * A pointer drag: the selection moved, a handle resized or (frame) the
   * image panned. Escape during it puts the crop back.
   */
  ɵstartDrag(
    event: PointerEvent,
    element: HTMLElement,
    kind: ScImageCropperDrag['kind'],
    handle: ScImageCropperHandlePosition | null = null,
  ): void {
    const crop = this.crop();
    if (!crop || !this.ready() || this.disabled() || event.button !== 0) {
      return;
    }
    event.preventDefault();
    // Focused for the keys that follow, without the keyboard's ring.
    if (element.tabIndex >= 0) {
      element.focus({ preventScroll: true, focusVisible: false });
    }
    this.ɵendDrag();
    element.setPointerCapture?.(event.pointerId);

    const doc = element.ownerDocument;
    const move = (e: PointerEvent) => this.onDragMove(e);
    const end = (e: PointerEvent) => {
      if (e.pointerId === this.drag?.id) this.ɵendDrag();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !this.drag) return;
      e.preventDefault();
      e.stopPropagation();
      this.crop.set(this.drag.start);
      this.ɵendDrag();
    };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerup', end);
    element.addEventListener('pointercancel', end);
    doc.addEventListener('keydown', key, true);

    this.drag = {
      id: event.pointerId,
      element,
      kind,
      handle,
      start: crop,
      x: event.clientX,
      y: event.clientY,
      scale: this.ɵscale(),
      stop: () => {
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerup', end);
        element.removeEventListener('pointercancel', end);
        doc.removeEventListener('keydown', key, true);
        if (element.hasPointerCapture?.(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
      },
    };
    this.dragging.set(true);
  }

  /** Ends a drag where it is. */
  ɵendDrag(): void {
    const drag = this.drag;
    if (!drag) return;
    this.drag = null;
    drag.stop();
    this.dragging.set(false);
  }

  /** A viewport point as an image point. */
  ɵimagePoint(clientX: number, clientY: number): { x: number; y: number } {
    const viewport = this.ɵviewport();
    const rect = viewport?.getBoundingClientRect();
    const origin = this.origin();
    const s = this.ɵscale();
    const vx = clientX - (rect?.left ?? 0) - (viewport?.clientLeft ?? 0);
    const vy = clientY - (rect?.top ?? 0) - (viewport?.clientTop ?? 0);
    return { x: (vx - origin.x) / s, y: (vy - origin.y) / s };
  }

  /** Pans the image by viewport pixels (frame): the crop the other way. */
  ɵpan(dx: number, dy: number): void {
    const crop = this.crop();
    if (!crop || this.disabled()) return;
    const s = this.ɵscale();
    this.setBox(moveBox(crop, this.shown(), -dx / s, -dy / s));
  }

  private onDragMove(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.id) return;
    const dx = (event.clientX - drag.x) / drag.scale;
    const dy = (event.clientY - drag.y) / drag.scale;
    const shown = this.shown();
    const start = drag.start;
    if (drag.kind === 'resize' && drag.handle) {
      // Shift keeps the crop's ratio when it is free.
      const ratio =
        this.ratio() ?? (event.shiftKey ? start.width / start.height : null);
      this.setBox(
        resizeBox(start, drag.handle, dx, dy, shown, this.ɵlimits(), ratio),
      );
    } else if (drag.kind === 'move') {
      this.setBox(moveBox(start, shown, dx, dy));
    } else {
      this.setBox(moveBox(start, shown, -dx, -dy));
    }
  }

  /** The default crop, unturned. */
  private initial(): ScImageCrop {
    const natural = this.ɵnatural();
    const inset =
      this.mode() === 'frame'
        ? 1
        : clamp(
            Math.max(
              0.8,
              this.minWidth() / natural.width,
              this.minHeight() / natural.height,
            ),
            0.8,
            1,
          );
    return {
      ...initialBox(natural, this.ratio(), inset),
      rotation: 0,
      flipX: false,
      flipY: false,
    };
  }

  /** A new box for the crop, its turn and flips kept: whole pixels, inside the image. */
  private setBox(box: ScImageCropperBox): void {
    const crop = this.crop();
    if (!crop) return;
    const next = settle(box, this.shown());
    if (
      next.x === crop.x &&
      next.y === crop.y &&
      next.width === crop.width &&
      next.height === crop.height
    ) {
      return;
    }
    this.crop.set({ ...crop, ...next });
  }
}
