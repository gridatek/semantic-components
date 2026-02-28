import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperRotateRight]',
  host: {
    'data-slot': 'cropper-rotate-right',
    '(click)': 'cropper.rotateRight()',
  },
})
export class ScCropperRotateRight {
  protected readonly cropper = inject(SC_CROPPER);
}
