import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperReset]',
  host: {
    'data-slot': 'image-cropper-reset',
    '(click)': 'cropper.reset()',
  },
})
export class ScImageCropperReset {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
