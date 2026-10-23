import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';

/** Turns the image a quarter, anticlockwise. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperRotateLeft]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-rotate-left',
    '[disabled]': '!cropper.ready()',
    '[class]': 'class()',
    '(click)': 'cropper.rotate(-1)',
  },
})
export class ScImageCropperRotateLeft {
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
    ɵwarnIfUnnamed('scImageCropperRotateLeft');
  }
}
