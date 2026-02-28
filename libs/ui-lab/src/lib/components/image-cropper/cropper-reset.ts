import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperReset]',
  host: {
    'data-slot': 'cropper-reset',
    '(click)': 'cropper.reset()',
  },
})
export class ScCropperReset {
  protected readonly cropper = inject(SC_CROPPER);
}
