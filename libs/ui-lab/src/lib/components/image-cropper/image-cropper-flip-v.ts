import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperFlipV]',
  host: {
    'data-slot': 'image-cropper-flip-v',
    '(click)': 'cropper.toggleFlipV()',
    '[attr.data-active]': 'cropper.flipV() || null',
  },
})
export class ScImageCropperFlipV {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
