import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScImageCropper } from './image-cropper';
import type { ScImageCropperFlipDirection } from './image-cropper-geometry';

/**
 * Mirrors the image (`direction`: horizontal by default), the crop with it.
 * Write its icon and its name.
 */
@Directive({
  selector: 'button[scImageCropperFlip]',
  host: {
    type: 'button',
    '[attr.data-direction]': 'direction()',
    '[disabled]': 'cropper.disabled() || !cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.flip(direction())',
  },
})
export class ScImageCropperFlip {
  private readonly cropper = inject(ScImageCropper);
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<ScImageCropperFlipDirection>('horizontal');
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperFlip');
  }
}
