import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectDisplayLocale, ɵwarnIfUnnamed } from '../../utils';
import { ScImageCropper } from './image-cropper';
import { cropValueText } from './image-cropper-value-text';

/**
 * The crop over the image: a slider — one tab stop. The arrows move it (one
 * screen pixel; Shift: ten), + and − zoom, R turns the image (Shift + R
 * back). In a box, dragged to move it; in a frame, the image moves under it.
 * Name it (`aria-label`) and say where it is: `valueText`, e.g.
 * "{width} by {height} pixels, at {x}, {y}".
 */
@Directive({
  selector: '[scImageCropperSelection]',
  host: {
    role: 'slider',
    '[attr.tabindex]': 'cropper.disabled() ? null : 0',
    '[attr.aria-disabled]': 'cropper.disabled() || null',
    'aria-valuemin': '0',
    '[attr.aria-valuenow]': 'cropper.crop()?.x ?? 0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuetext]': 'text()',
    '[attr.hidden]': 'cropper.ready() ? null : ""',
    '[style.left.px]': 'cropper.selectionBox().x',
    '[style.top.px]': 'cropper.selectionBox().y',
    '[style.width.px]': 'cropper.selectionBox().width',
    '[style.height.px]': 'cropper.selectionBox().height',
    '[class]': 'class()',
    '(keydown)': 'cropper.onKey($event)',
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class ScImageCropperSelection {
  private readonly cropper = inject(ScImageCropper);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();
  private readonly number = computed(
    () => new Intl.NumberFormat(this.displayLocale()),
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** How it reads: `{x}`, `{y}`, `{width}`, `{height}` in your words. */
  readonly valueText = input('');

  private readonly max = computed(() => {
    const crop = this.cropper.crop();
    return crop ? this.cropper.shown().width - crop.width : 0;
  });

  private readonly text = computed(() => {
    const crop = this.cropper.crop();
    return crop ? cropValueText(this.valueText(), crop, this.number()) : null;
  });

  private readonly class = computed(() =>
    cn(
      'absolute outline-none',
      // The shade around: one shadow, as large as any viewport.
      'shadow-[0_0_0_9999px_rgb(0_0_0/0.55)] ring-2 ring-white',
      'focus-visible:ring-ring focus-visible:ring-3',
      this.cropper.shape() === 'circle' && 'rounded-full',
      // In a frame, the pointer goes through to the viewport, which pans.
      this.cropper.mode() === 'frame'
        ? 'pointer-events-none'
        : !this.cropper.disabled() && 'cursor-move',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperSelection');
    this.cropper.ɵselection.set(this.element);
  }

  private onPointerDown(event: PointerEvent): void {
    if (this.cropper.mode() !== 'box') return;
    this.cropper.ɵstartDrag(event, this.element, 'move');
  }
}
