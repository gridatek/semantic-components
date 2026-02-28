import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: '[scCropperSelection]',
  host: {
    'data-slot': 'cropper-selection',
    '[class]': 'class()',
    '[style.left.px]': 'cropper.cropArea().x',
    '[style.top.px]': 'cropper.cropArea().y',
    '[style.width.px]': 'cropper.cropArea().width',
    '[style.height.px]': 'cropper.cropArea().height',
    tabindex: '0',
    role: 'slider',
    'aria-label': 'Crop selection',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class ScCropperSelection {
  readonly cropper = inject(SC_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute border-2 border-white',
      this.isCircle() && 'rounded-full',
      this.classInput(),
    ),
  );

  protected readonly isCircle = computed(
    () => this.cropper.cropShape() === 'circle',
  );

  protected onKeyDown(event: KeyboardEvent): void {
    if (this.cropper.disabled()) return;

    const step = 5;
    const crop = this.cropper.cropArea();

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (event.shiftKey) {
          this.cropper.cropArea.set({
            ...crop,
            width: Math.max(this.cropper.minWidth(), crop.width - step),
          });
        } else {
          this.cropper.cropArea.set({
            ...crop,
            x: Math.max(0, crop.x - step),
          });
        }
        this.cropper.cropChange.emit(this.cropper.cropArea());
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (event.shiftKey) {
          this.cropper.cropArea.set({
            ...crop,
            width: crop.width + step,
          });
        } else {
          this.cropper.cropArea.set({
            ...crop,
            x: Math.min(
              this.cropper.containerWidth() - crop.width,
              crop.x + step,
            ),
          });
        }
        this.cropper.cropChange.emit(this.cropper.cropArea());
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.shiftKey) {
          this.cropper.cropArea.set({
            ...crop,
            height: Math.max(this.cropper.minHeight(), crop.height - step),
          });
        } else {
          this.cropper.cropArea.set({
            ...crop,
            y: Math.max(0, crop.y - step),
          });
        }
        this.cropper.cropChange.emit(this.cropper.cropArea());
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (event.shiftKey) {
          this.cropper.cropArea.set({
            ...crop,
            height: crop.height + step,
          });
        } else {
          this.cropper.cropArea.set({
            ...crop,
            y: Math.min(
              this.cropper.containerHeight() - crop.height,
              crop.y + step,
            ),
          });
        }
        this.cropper.cropChange.emit(this.cropper.cropArea());
        break;
      case '+':
      case '=':
        event.preventDefault();
        this.cropper.zoomIn();
        break;
      case '-':
        event.preventDefault();
        this.cropper.zoomOut();
        break;
    }
  }
}
