import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScImageCropperNext } from './image-cropper-next';
import type { ScImageCropperNextRotateDirection } from './image-cropper-next-geometry';

/**
 * Turns the image a quarter (`direction`: clockwise by default), the crop
 * with it. Write its icon and its name.
 */
@Directive({
  selector: 'button[scImageCropperNextRotate]',
  host: {
    type: 'button',
    '[disabled]': 'cropper.disabled() || !cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.rotate(direction())',
  },
})
export class ScImageCropperNextRotate {
  private readonly cropper = inject(ScImageCropperNext);
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<ScImageCropperNextRotateDirection>('clockwise');
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperNextRotate');
  }
}
