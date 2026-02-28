import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: '[scCropperDragRegion]',
  host: {
    'data-slot': 'cropper-drag-region',
    class: 'absolute inset-0 cursor-move',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
})
export class ScCropperDragRegion {
  private readonly cropper = inject(SC_CROPPER);

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
