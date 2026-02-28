import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperZoomIn]',
  host: {
    'data-slot': 'cropper-zoom-in',
    '(click)': 'cropper.zoomIn()',
    '[disabled]': 'cropper.zoom() >= 3',
  },
})
export class ScCropperZoomIn {
  protected readonly cropper = inject(SC_CROPPER);
}
