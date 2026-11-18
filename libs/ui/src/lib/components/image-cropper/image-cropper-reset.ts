import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
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
  private readonly buttonStyles = injectStyle().button;

  private readonly cropper = inject(ScImageCropper);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperReset');
  }
}
