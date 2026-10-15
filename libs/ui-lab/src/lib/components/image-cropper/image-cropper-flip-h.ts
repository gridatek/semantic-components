import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperFlipH]',
  host: {
    '[class]': 'class()',
    type: 'button',
    '(click)': 'cropper.toggleFlipH()',
    '[attr.data-active]': 'cropper.flipH() || null',
  },
})
export class ScImageCropperFlipH {
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
