import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';

/** Zooms in. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperNextZoomIn]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-next-zoom-in',
    '[disabled]': '!cropper.ready() || cropper.zoom() >= cropper.maxZoom()',
    '[class]': 'class()',
    '(click)': 'cropper.zoomBy(1.25)',
  },
})
export class ScImageCropperNextZoomIn {
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
    ɵwarnIfUnnamed('scImageCropperNextZoomIn');
  }
}
