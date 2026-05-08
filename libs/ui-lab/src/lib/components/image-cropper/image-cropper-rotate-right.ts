import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperRotateRight]',
  host: {
    '(click)': 'cropper.rotateRight()',
  },
})
export class ScImageCropperRotateRight {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
