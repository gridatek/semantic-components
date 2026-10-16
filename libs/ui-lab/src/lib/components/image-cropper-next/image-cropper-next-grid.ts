import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** Thirds, in the selection: shown while the crop is moved or resized. */
@Component({
  selector: 'div[scImageCropperNextGrid]',
  template: `
    <div class="absolute inset-y-0 left-1/3 border-s border-white/60"></div>
    <div class="absolute inset-y-0 left-2/3 border-s border-white/60"></div>
    <div class="absolute inset-x-0 top-1/3 border-t border-white/60"></div>
    <div class="absolute inset-x-0 top-2/3 border-t border-white/60"></div>
  `,
  host: {
    'data-slot': 'image-cropper-grid',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScImageCropperNextGrid {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity',
      'in-data-active:opacity-100',
      this.classInput(),
    ),
  );
}
