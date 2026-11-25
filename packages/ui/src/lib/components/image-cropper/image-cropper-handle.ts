import {
  Directive,
  ElementRef,
  LOCALE_ID,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScImageCropper } from './image-cropper';
import type { ScImageCropperHandlePosition } from './image-cropper-geometry';
import { cropValueText } from './image-cropper-value-text';

/** Squares at the corners, bars on the edges; each cursor its way. */
const LOOK: Record<ScImageCropperHandlePosition, string> = {
  nw: 'size-3 cursor-nwse-resize',
  n: 'h-3 w-6 cursor-ns-resize',
  ne: 'size-3 cursor-nesw-resize',
  e: 'h-6 w-3 cursor-ew-resize',
  se: 'size-3 cursor-nwse-resize',
  s: 'h-3 w-6 cursor-ns-resize',
  sw: 'size-3 cursor-nesw-resize',
  w: 'h-6 w-3 cursor-ew-resize',
};

/**
 * Resizes the crop from an edge or a corner (`scImageCropperHandle="ne"`),
 * in box mode: a slider of its own, in the viewport beside the selection.
 * Dragged — Shift keeps the ratio when it is free — or, focused, the arrows
 * along it. Name it ("Top right corner") and say the size: `valueText`,
 * e.g. "{width} by {height} pixels".
 */
@Directive({
  selector: '[scImageCropperHandle]',
  host: {
    role: 'slider',
    '[attr.tabindex]': 'cropper.disabled() ? null : 0',
    '[attr.aria-disabled]': 'cropper.disabled() || null',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-valuemin]': 'range().min',
    '[attr.aria-valuenow]': 'range().now',
    '[attr.aria-valuemax]': 'range().max',
    '[attr.aria-valuetext]': 'text()',
    '[attr.data-position]': 'position()',
    '[attr.hidden]': 'shown() ? null : ""',
    '[style.left.px]': 'place().x',
    '[style.top.px]': 'place().y',
    '[class]': 'class()',
    '(keydown)': 'cropper.onKey($event, position())',
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class ScImageCropperHandle {
  private readonly cropper = inject(ScImageCropper);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly number = new Intl.NumberFormat(inject(LOCALE_ID));

  readonly position = input.required<ScImageCropperHandlePosition>({
    alias: 'scImageCropperHandle',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  /** How it reads: `{width}`, `{height}` (and `{x}`, `{y}`) in your words. */
  readonly valueText = input('');

  /** Only in a box, once the image is in. */
  private readonly shown = computed(
    () => this.cropper.ready() && this.cropper.mode() === 'box',
  );

  /** Top and bottom edges change the height; the others the width. */
  private readonly vertical = computed(() => {
    const position = this.position();
    return position === 'n' || position === 's';
  });

  private readonly orientation = computed(() => {
    const position = this.position();
    if (position.length === 2) return null;
    return this.vertical() ? 'vertical' : 'horizontal';
  });

  private readonly range = computed(() => {
    const crop = this.cropper.crop();
    const limits = this.cropper.ɵlimits();
    const shown = this.cropper.shown();
    return this.vertical()
      ? {
          min: Math.ceil(limits.minHeight),
          now: crop?.height ?? 0,
          max: shown.height,
        }
      : {
          min: Math.ceil(limits.minWidth),
          now: crop?.width ?? 0,
          max: shown.width,
        };
  });

  private readonly text = computed(() => {
    const crop = this.cropper.crop();
    return crop ? cropValueText(this.valueText(), crop, this.number) : null;
  });

  /** Its centre, on the selection's edge or corner. */
  private readonly place = computed(() => {
    const box = this.cropper.selectionBox();
    const position = this.position();
    const x = position.includes('w')
      ? box.x
      : position.includes('e')
        ? box.x + box.width
        : box.x + box.width / 2;
    const y = position.includes('n')
      ? box.y
      : position.includes('s')
        ? box.y + box.height
        : box.y + box.height / 2;
    return { x, y };
  });

  private readonly class = computed(() =>
    cn(
      'absolute z-10 -translate-1/2 border border-gray-400 bg-white outline-none',
      'focus-visible:ring-ring focus-visible:ring-3',
      // A larger target than it looks, for fingers.
      'before:absolute before:-inset-2',
      LOOK[this.position()],
      this.cropper.disabled() && 'cursor-default',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperHandle');
  }

  private onPointerDown(event: PointerEvent): void {
    this.cropper.ɵstartDrag(event, this.element, 'resize', this.position());
  }
}
