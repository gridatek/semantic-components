import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperFlipV]',
  host: {
    '[class]': 'class()',
    type: 'button',
    '(click)': 'cropper.toggleFlipV()',
    '[attr.data-active]': 'cropper.flipV() || null',
  },
})
export class ScImageCropperFlipV {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly cropper = inject(SC_IMAGE_CROPPER);
}
