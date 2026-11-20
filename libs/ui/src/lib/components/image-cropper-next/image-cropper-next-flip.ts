import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScImageCropperNext } from './image-cropper-next';
import type { ScImageCropperNextFlipDirection } from './image-cropper-next-geometry';

/**
 * Mirrors the image (`direction`: horizontal by default), the crop with it.
 * Write its icon and its name.
 */
@Directive({
  selector: 'button[scImageCropperNextFlip]',
  host: {
    type: 'button',
    '[attr.data-direction]': 'direction()',
    '[disabled]': 'cropper.disabled() || !cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.flip(direction())',
  },
})
export class ScImageCropperNextFlip {
  private readonly cropper = inject(ScImageCropperNext);
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<ScImageCropperNextFlipDirection>('horizontal');
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperNextFlip');
  }
}
