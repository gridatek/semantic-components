import { DOCUMENT } from '@angular/common';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  type ScImageCropperNextHandlePosition,
  type ScImageCropperNextRect,
  type ScImageCropperNextRotation,
  type ScImageCropperNextSize,
  centredRect,
  clamp,
  fitScale,
  oriented,
  resize,
  withRatio,
  within,
} from './image-cropper-next-geometry';

/** What `crop()` makes. */
export interface ScImageCropperNextCropOptions {
  /** `image/png` (the default), `image/jpeg` or `image/webp`. */
  readonly type?: string;
  /** For JPEG and WebP: 0 to 1. */
  readonly quality?: number;
  /** The width in pixels (the height follows); the crop's own by default. */
  readonly width?: number;
}

/** The smallest crop, in the image's pixels. */
const MIN_SIZE = 20;

/**
 * An image cropper: the image's place and the crop. Put its parts inside — a
 * `scImageCropperNextStage` with your `img[scImageCropperNextImage]` and a
 * `scImageCropperNextSelection`, and the buttons you want. With handles in
 * the selection, it is a box you resize over the image; without, a frame
 * the image moves under.
 */
@Directive({
  selector: '[scImageCropperNext]',
  exportAs: 'scImageCropperNext',
  host: {
    'data-slot': 'image-cropper',
    '[attr.data-active]': 'active() || null',
    '[attr.data-shape]': 'shape()',
    '[class]': 'class()',
  },
})
export class ScImageCropperNext {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });

  /** 1: the image fits the stage. */
  readonly zoom = model(1);
  readonly maxZoom = input(4);
  /** In quarter turns, clockwise. */
  readonly rotation = model<ScImageCropperNextRotation>(0);
  readonly flipX = model(false);
  readonly flipY = model(false);
  /** Width / height, or free. */
  readonly aspectRatio = model<number | null>(null);
  /** A circle crops to an ellipse (transparent around, in a PNG). */
  readonly shape = input<'rect' | 'circle'>('rect');

  /** The image: set by `scImageCropperNextImage`. */
  readonly ɵimage = signal<HTMLImageElement | null>(null);
  readonly ɵnatural = signal<ScImageCropperNextSize>({ width: 0, height: 0 });
  /** The stage's size: set by `scImageCropperNextStage`. */
  readonly ɵstage = signal<ScImageCropperNextSize>({ width: 0, height: 0 });
  /** How many handles the selection has: with some, it is resized. */
  readonly ɵhandles = signal(0);
  /** Being dragged, zoomed or moved with keys. */
  readonly active = signal(false);

  /** A box resized over the image (handles), or a frame it moves under. */
  readonly resizable = computed(() => this.ɵhandles() > 0);
  readonly ready = computed(
    () => this.ɵnatural().width > 0 && this.ɵstage().width > 0,
  );

  /** The image as shown (turned): its size in pixels. */
  readonly orientedSize = computed(() =>
    oriented(this.ɵnatural(), this.rotation()),
  );

  private readonly fit = computed(() =>
    fitScale(this.orientedSize(), this.ɵstage()),
  );

  private readonly ratio = computed(() => {
    const size = this.orientedSize();
    return this.aspectRatio() ?? (size.width / size.height || 1);
  });

  /** The frame, in the stage, when the image moves under it. */
  readonly frame = computed(() => centredRect(this.ɵstage(), this.ratio()));

  /** The lowest zoom: the image fits — or, under a frame, covers it. */
  readonly minZoom = computed(() => {
    if (this.resizable()) return 1;
    const size = this.orientedSize();
    const frame = this.frame();
    const fit = this.fit();
    if (!size.width || !fit) return 1;
    return Math.max(
      frame.width / (size.width * fit),
      frame.height / (size.height * fit),
      0.01,
    );
  });

  /** Stage pixels per image pixel. */
  readonly scale = computed(
    () => this.fit() * clamp(this.zoom(), this.minZoom(), this.maxZoom()),
  );

  /** The image's point at the stage's centre. */
  private readonly focus = linkedSignal(() => {
    const size = this.orientedSize();
    return { x: size.width / 2, y: size.height / 2 };
  });

  /** Where the (turned) image's top-left is, in the stage. */
  readonly offset = computed(() => {
    const stage = this.ɵstage();
    const size = this.orientedSize();
    const s = this.scale();
    const focus = this.focus();
    const axis = (
      stageSize: number,
      imageSize: number,
      point: number,
      frameStart: number,
      frameSize: number,
    ) => {
      const shown = imageSize * s;
      const raw = stageSize / 2 - point * s;
      if (!this.resizable()) {
        return clamp(raw, frameStart + frameSize - shown, frameStart);
      }
      return shown <= stageSize
        ? (stageSize - shown) / 2
        : clamp(raw, stageSize - shown, 0);
    };
    const frame = this.frame();
    return {
      x: axis(stage.width, size.width, focus.x, frame.x, frame.width),
      y: axis(stage.height, size.height, focus.y, frame.y, frame.height),
    };
  });

  /** The box, in image pixels, when it is resized. */
  private readonly box = linkedSignal<
    { size: ScImageCropperNextSize; ratio: number | null },
    ScImageCropperNextRect
  >({
    source: () => ({
      size: this.orientedSize(),
      ratio: this.aspectRatio(),
    }),
    computation: (source, previous) =>
      previous &&
      previous.source.size.width === source.size.width &&
      previous.source.size.height === source.size.height
        ? source.ratio
          ? withRatio(previous.value, source.ratio, source.size)
          : previous.value
        : centredRect(source.size, this.ratio()),
  });

  /** The crop, in the (turned) image's pixels. */
  readonly area = computed<ScImageCropperNextRect>(() => {
    if (this.resizable()) return within(this.box(), this.orientedSize());
    const frame = this.frame();
    const offset = this.offset();
    const s = this.scale() || 1;
    return {
      x: (frame.x - offset.x) / s,
      y: (frame.y - offset.y) / s,
      width: frame.width / s,
      height: frame.height / s,
    };
  });

  /** The crop, in the stage. */
  readonly selection = computed<ScImageCropperNextRect>(() => {
    if (!this.resizable()) return this.frame();
    const area = this.area();
    const offset = this.offset();
    const s = this.scale();
    return {
      x: offset.x + area.x * s,
      y: offset.y + area.y * s,
      width: area.width * s,
      height: area.height * s,
    };
  });

  /** The image element's place in the stage (turned and flipped around its centre). */
  readonly imageStyle = computed(() => {
    const natural = this.ɵnatural();
    const size = this.orientedSize();
    const s = this.scale();
    const offset = this.offset();
    return {
      width: natural.width * s,
      height: natural.height * s,
      left: offset.x + ((size.width - natural.width) * s) / 2,
      top: offset.y + ((size.height - natural.height) * s) / 2,
      transform: `rotate(${this.rotation()}deg) scale(${this.flipX() ? -1 : 1}, ${this.flipY() ? -1 : 1})`,
    };
  });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );

  constructor() {
    // A zoom below the lowest (a frame the image no longer covers) moves up.
    effect(() => {
      const min = this.minZoom();
      untracked(() => {
        if (this.zoom() < min) this.zoom.set(min);
      });
    });
  }

  /** Moves the image by `dx`, `dy` stage pixels. */
  pan(dx: number, dy: number): void {
    const s = this.scale() || 1;
    this.focus.update((f) => ({ x: f.x - dx / s, y: f.y - dy / s }));
    this.settle();
  }

  /** Zooms by `factor`, keeping `around` (a stage point; its centre by default) still. */
  zoomBy(factor: number, around?: { x: number; y: number }): void {
    const stage = this.ɵstage();
    const point = around ?? { x: stage.width / 2, y: stage.height / 2 };
    const before = this.scale() || 1;
    const offset = this.offset();
    const at = {
      x: (point.x - offset.x) / before,
      y: (point.y - offset.y) / before,
    };
    this.zoom.set(clamp(this.zoom() * factor, this.minZoom(), this.maxZoom()));
    const after = this.scale() || 1;
    this.focus.set({
      x: at.x + (stage.width / 2 - point.x) / after,
      y: at.y + (stage.height / 2 - point.y) / after,
    });
    this.settle();
  }

  /** Moves the crop by `dx`, `dy` image pixels (the image, under a frame). */
  move(dx: number, dy: number): void {
    if (!this.resizable()) {
      const s = this.scale();
      this.pan(-dx * s, -dy * s);
      return;
    }
    this.box.update((box) =>
      within({ ...box, x: box.x + dx, y: box.y + dy }, this.orientedSize()),
    );
  }

  /** Resizes the crop by moving `handle`'s edges by `dx`, `dy` image pixels. */
  resizeBy(
    handle: ScImageCropperNextHandlePosition,
    dx: number,
    dy: number,
  ): void {
    if (!this.resizable()) return;
    this.box.update((box) =>
      resize(
        within(box, this.orientedSize()),
        handle,
        dx,
        dy,
        this.orientedSize(),
        MIN_SIZE,
        this.aspectRatio(),
      ),
    );
  }

  /** A quarter turn: clockwise (1) or anticlockwise (-1). */
  rotate(direction: 1 | -1): void {
    this.rotation.update(
      (r) => ((r + direction * 90 + 360) % 360) as ScImageCropperNextRotation,
    );
  }

  /** Back to the start: no zoom, turn or flip, the crop centred. */
  reset(): void {
    this.rotation.set(0);
    this.flipX.set(false);
    this.flipY.set(false);
    this.zoom.set(this.minZoom());
    const size = this.orientedSize();
    this.focus.set({ x: size.width / 2, y: size.height / 2 });
    this.box.set(centredRect(size, this.ratio()));
  }

  /** The crop as an image file (`Blob`): turned, flipped, in its shape. */
  crop(options: ScImageCropperNextCropOptions = {}): Promise<Blob> {
    const image = this.ɵimage();
    if (!image || !this.ready()) {
      return Promise.reject(new Error('ScImageCropperNext: no image yet.'));
    }
    const area = this.area();
    const size = this.orientedSize();
    const natural = this.ɵnatural();
    const out = options.width ? options.width / area.width : 1;

    const canvas = this.document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(area.width * out));
    canvas.height = Math.max(1, Math.round(area.height * out));
    const context = canvas.getContext('2d');
    if (!context) {
      return Promise.reject(new Error('ScImageCropperNext: no 2D canvas.'));
    }
    context.scale(out, out);
    if (this.shape() === 'circle') {
      context.beginPath();
      context.ellipse(
        area.width / 2,
        area.height / 2,
        area.width / 2,
        area.height / 2,
        0,
        0,
        Math.PI * 2,
      );
      context.clip();
    }
    context.translate(-area.x, -area.y);
    context.translate(size.width / 2, size.height / 2);
    context.rotate((this.rotation() * Math.PI) / 180);
    context.scale(this.flipX() ? -1 : 1, this.flipY() ? -1 : 1);
    context.drawImage(image, -natural.width / 2, -natural.height / 2);

    return new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error('ScImageCropperNext: the crop failed.')),
        options.type ?? 'image/png',
        options.quality,
      ),
    );
  }

  /** The image's offset written back as where it is centred (after a clamp). */
  private settle(): void {
    const stage = this.ɵstage();
    const offset = this.offset();
    const s = this.scale() || 1;
    this.focus.set({
      x: (stage.width / 2 - offset.x) / s,
      y: (stage.height / 2 - offset.y) / s,
    });
  }
}
