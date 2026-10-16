import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';

/** Turns the image a quarter, clockwise. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperNextRotateRight]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-next-rotate-right',
    '[disabled]': '!cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.rotate(1)',
  },
})
export class ScImageCropperNextRotateRight {
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
    ɵwarnIfUnnamed('scImageCropperNextRotateRight');
  }
}
