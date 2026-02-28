import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperZoomOut]',
  host: {
    'data-slot': 'image-cropper-zoom-out',
    '(click)': 'cropper.zoomOut()',
    '[disabled]': 'cropper.zoom() <= 0.1',
  },
})
export class ScImageCropperZoomOut {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
