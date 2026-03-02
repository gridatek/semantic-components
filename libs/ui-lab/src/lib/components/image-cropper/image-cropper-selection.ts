import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: '[scImageCropperSelection]',
  host: {
    'data-slot': 'image-cropper-selection',
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
export class ScImageCropperSelection {
  readonly cropper = inject(SC_IMAGE_CROPPER);

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
    const bx = this.cropper.imageBoundsX();
    const by = this.cropper.imageBoundsY();
    const bw = this.cropper.imageBoundsW();
    const bh = this.cropper.imageBoundsH();

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
            x: Math.max(bx, crop.x - step),
          });
        }
        this.cropper.cropChange.emit(this.cropper.cropArea());
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (event.shiftKey) {
          this.cropper.cropArea.set({
            ...crop,
            width: Math.min(crop.width + step, bx + bw - crop.x),
          });
        } else {
          this.cropper.cropArea.set({
            ...crop,
            x: Math.min(bx + bw - crop.width, crop.x + step),
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
            y: Math.max(by, crop.y - step),
          });
        }
        this.cropper.cropChange.emit(this.cropper.cropArea());
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (event.shiftKey) {
          this.cropper.cropArea.set({
            ...crop,
            height: Math.min(crop.height + step, by + bh - crop.y),
          });
        } else {
          this.cropper.cropArea.set({
            ...crop,
            y: Math.min(by + bh - crop.height, crop.y + step),
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
