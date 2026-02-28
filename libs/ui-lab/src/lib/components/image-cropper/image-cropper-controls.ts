import { computed, Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'input[scImageCropperControls]',
  exportAs: 'scImageCropperControls',
  host: {
    'data-slot': 'image-cropper-controls',
    '[min]': '"0.1"',
    '[max]': '"3"',
    '[step]': '"0.1"',
    '[value]': 'cropper.zoom()',
    '(input)': 'onZoomChange($event)',
  },
})
export class ScImageCropperControls {
  readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly zoomPercentage = computed(
    () => `${(this.cropper.zoom() * 100).toFixed(0)}%`,
  );

  onZoomChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.cropper.setZoom(value);
  }
}
