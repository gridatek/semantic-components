import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';

/** Back to the start: no zoom, turn or flip, the crop centred. Write its text or icon and name. */
@Directive({
  selector: 'button[scImageCropperReset]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-reset',
    '[disabled]': '!cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.reset()',
  },
})
export class ScImageCropperReset {
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
    ɵwarnIfUnnamed('scImageCropperReset');
  }
}
