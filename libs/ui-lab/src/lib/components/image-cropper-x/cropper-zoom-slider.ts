import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'input[scCropperZoomSlider]',
  host: {
    'data-slot': 'cropper-zoom-slider',
    type: 'range',
    '[min]': '0.1',
    '[max]': '3',
    '[step]': '0.1',
    '[value]': 'cropper.zoom()',
    '(input)': 'onInput($event)',
  },
})
export class ScCropperZoomSlider {
  protected readonly cropper = inject(SC_CROPPER);

  protected onInput(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.cropper.setZoom(value);
  }
}
