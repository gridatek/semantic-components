import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';

/** Turns the image a quarter, clockwise. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperRotateRight]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-rotate-right',
    '[disabled]': '!cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.rotate(1)',
  },
})
export class ScImageCropperRotateRight {
  private readonly buttonStyles = injectPreset().button;

  protected readonly cropper = inject(ScImageCropper);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperRotateRight');
  }
}
