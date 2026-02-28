import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperZoomOut]',
  host: {
    'data-slot': 'cropper-zoom-out',
    '(click)': 'cropper.zoomOut()',
    '[disabled]': 'cropper.zoom() <= 0.1',
  },
})
export class ScCropperZoomOut {
  protected readonly cropper = inject(SC_CROPPER);
}
