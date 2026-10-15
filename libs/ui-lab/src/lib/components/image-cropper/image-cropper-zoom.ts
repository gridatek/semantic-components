import { Directive, computed, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

/**
 * The zoom slider, on an `input` of yours: from 10% to 300%. Name it
 * (`aria-label`); `percent()` is the zoom to write beside it
 * (`#zoom="scImageCropperZoom"`).
 */
@Directive({
  selector: 'input[scImageCropperZoom]',
  exportAs: 'scImageCropperZoom',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'image-cropper-zoom',
  },
})
export class ScImageCropperZoom {
  private readonly cropper = inject(SC_IMAGE_CROPPER);
  private readonly slider = inject(ScSlider);

  /** The zoom, as a whole percentage (150). */
  readonly percent = computed(() => Math.round(this.cropper.zoom() * 100));

  constructor() {
    ɵwarnIfUnnamed('scImageCropperZoom');
    bindInput(this.slider.min, 0.1);
    bindInput(this.slider.max, 3);
    bindInput(this.slider.step, 0.1);
    // The cropper's zoom, into the slider; the slider's, back.
    effect(() => {
      const zoom = this.cropper.zoom();
      untracked(() => this.slider.value.set(zoom));
    });
    this.slider.value.subscribe((zoom) => {
      if (zoom !== this.cropper.zoom()) this.cropper.setZoom(zoom);
    });
  }
}
