import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';

/** Flips the image left to right. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperNextFlipHorizontal]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-next-flip-horizontal',
    '[disabled]': '!cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.flipX.set(!cropper.flipX())',
  },
})
export class ScImageCropperNextFlipHorizontal {
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
    ɵwarnIfUnnamed('scImageCropperNextFlipHorizontal');
  }
}
