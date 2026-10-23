import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScImageCropper } from './image-cropper';

/** Zooms out. Write its icon and name it. */
@Directive({
  selector: 'button[scImageCropperZoomOut]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-zoom-out',
    '[disabled]': '!cropper.ready() || cropper.zoom() <= cropper.minZoom()',
    '[class]': 'class()',
    '(click)': 'cropper.zoomBy(0.8)',
  },
})
export class ScImageCropperZoomOut {
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
    ɵwarnIfUnnamed('scImageCropperZoomOut');
  }
}
