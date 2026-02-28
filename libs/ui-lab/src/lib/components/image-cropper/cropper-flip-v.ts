import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperFlipV]',
  host: {
    'data-slot': 'cropper-flip-v',
    '(click)': 'cropper.toggleFlipV()',
    '[attr.data-active]': 'cropper.flipV() || null',
  },
})
export class ScCropperFlipV {
  protected readonly cropper = inject(SC_CROPPER);
}
