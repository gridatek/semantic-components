import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperRotateLeft]',
  host: {
    'data-slot': 'cropper-rotate-left',
    '(click)': 'cropper.rotateLeft()',
  },
})
export class ScCropperRotateLeft {
  protected readonly cropper = inject(SC_CROPPER);
}
