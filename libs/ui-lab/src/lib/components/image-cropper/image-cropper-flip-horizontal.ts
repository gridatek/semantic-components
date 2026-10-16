import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';

/** Flips the image left to right. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperFlipHorizontal]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-flip-horizontal',
    '[disabled]': '!cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.flipX.set(!cropper.flipX())',
  },
})
export class ScImageCropperFlipHorizontal {
  protected readonly cropper = inject(ScImageCropper);

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
    ɵwarnIfUnnamed('scImageCropperFlipHorizontal');
  }
}
