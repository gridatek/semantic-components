import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperFlipH]',
  host: {
    'data-slot': 'image-cropper-flip-h',
    '(click)': 'cropper.toggleFlipH()',
    '[attr.data-active]': 'cropper.flipH() || null',
  },
})
export class ScImageCropperFlipH {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
