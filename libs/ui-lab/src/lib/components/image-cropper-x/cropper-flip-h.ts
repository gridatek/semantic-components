import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperFlipH]',
  host: {
    'data-slot': 'cropper-flip-h',
    '(click)': 'cropper.toggleFlipH()',
    '[attr.data-active]': 'cropper.flipH() || null',
  },
})
export class ScCropperFlipH {
  protected readonly cropper = inject(SC_CROPPER);
}
