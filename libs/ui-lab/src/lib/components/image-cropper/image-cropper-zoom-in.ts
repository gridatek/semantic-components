import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperZoomIn]',
  host: {
    'data-slot': 'image-cropper-zoom-in',
    '(click)': 'cropper.zoomIn()',
    '[disabled]': 'cropper.zoom() >= 3',
  },
})
export class ScImageCropperZoomIn {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
