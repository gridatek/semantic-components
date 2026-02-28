import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: '[scImageCropperDragRegion]',
  host: {
    'data-slot': 'image-cropper-drag-region',
    class: 'absolute inset-0 cursor-move',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
})
export class ScImageCropperDragRegion {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  protected onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.cropper.startDragging(event.clientX, event.clientY);
  }

  protected onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    this.cropper.startDragging(touch.clientX, touch.clientY);
  }
}
