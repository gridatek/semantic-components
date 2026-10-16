import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';

/**
 * Sets the crop's ratio (`[scImageCropperAspectRatio]="16 / 9"`, `null`
 * for free), pressed while it is the one. Write its text; put them in a
 * group you name.
 */
@Directive({
  selector: 'button[scImageCropperAspectRatio]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-aspect-ratio',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'cropper.aspectRatio.set(ratio())',
  },
})
export class ScImageCropperAspectRatio {
  protected readonly cropper = inject(ScImageCropper);

  readonly ratio = input.required<number | null>({
    alias: 'scImageCropperAspectRatio',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly pressed = computed(
    () => this.cropper.aspectRatio() === this.ratio(),
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({
        variant: this.pressed() ? 'secondary' : 'ghost',
        size: this.size(),
      }),
      this.classInput(),
    ),
  );
}
