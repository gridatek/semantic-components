import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';

/**
 * The crop, in the stage: around it, the image is shaded. Focused, the
 * arrows move it (Shift: by more), Alt + arrows resize it (with handles), +
 * and − zoom. Name it ("Crop area"); put handles and a grid inside.
 */
@Directive({
  selector: '[scImageCropperNextSelection]',
  host: {
    'data-slot': 'image-cropper-selection',
    tabindex: '0',
    role: 'group',
    '[style.left.px]': 'cropper.selection().x',
    '[style.top.px]': 'cropper.selection().y',
    '[style.width.px]': 'cropper.selection().width',
    '[style.height.px]': 'cropper.selection().height',
    '[attr.hidden]': 'cropper.ready() ? null : ""',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(keyup)': 'cropper.active.set(false)',
    '(blur)': 'cropper.active.set(false)',
  },
})
export class ScImageCropperNextSelection {
  protected readonly cropper = inject(ScImageCropperNext);

  readonly classInput = input<string>('', { alias: 'class' });

  constructor() {
    ɵwarnIfUnnamed('scImageCropperNextSelection');
  }

  protected readonly class = computed(() =>
    cn(
      'absolute outline-none',
      // The shade around: one shadow, as large as any stage.
      'shadow-[0_0_0_9999px_rgb(0_0_0/0.55)] ring-2 ring-white',
      'focus-visible:ring-3 focus-visible:ring-ring',
      this.cropper.shape() === 'circle' && 'rounded-full',
      this.cropper.resizable() && 'cursor-move',
      this.classInput(),
    ),
  );

  protected onKeydown(event: KeyboardEvent): void {
    const size = this.cropper.orientedSize();
    // A step: 1% of the image, 10% with Shift.
    const step =
      (Math.max(size.width, size.height) / 100) * (event.shiftKey ? 10 : 1);
    const arrows: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = arrows[event.key];
    if (delta) {
      event.preventDefault();
      this.cropper.active.set(true);
      if (event.altKey) {
        this.cropper.resizeBy('bottom-right', delta[0], delta[1]);
      } else {
        this.cropper.move(delta[0], delta[1]);
      }
      return;
    }
    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      this.cropper.zoomBy(1.1);
    } else if (event.key === '-') {
      event.preventDefault();
      this.cropper.zoomBy(1 / 1.1);
    }
  }
}
