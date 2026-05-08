import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperRotateLeft]',
  host: {
    '(click)': 'cropper.rotateLeft()',
  },
})
export class ScImageCropperRotateLeft {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
