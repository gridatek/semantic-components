import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';

/** Zooms out. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperNextZoomOut]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-next-zoom-out',
    '[disabled]': '!cropper.ready() || cropper.zoom() <= cropper.minZoom()',
    '[class]': 'class()',
    '(click)': 'cropper.zoomBy(0.8)',
  },
})
export class ScImageCropperNextZoomOut {
  protected readonly cropper = inject(ScImageCropperNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperNextZoomOut');
  }
}
