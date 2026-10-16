import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';

/**
 * Sets the crop's ratio (`[scImageCropperNextAspectRatio]="16 / 9"`, `null`
 * for free), pressed while it is the one. Write its text; put them in a
 * group you name.
 */
@Directive({
  selector: 'button[scImageCropperNextAspectRatio]',
  host: {
    type: 'button',
    'data-slot': 'image-cropper-aspect-ratio',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'cropper.aspectRatio.set(ratio())',
  },
})
export class ScImageCropperNextAspectRatio {
  protected readonly cropper = inject(ScImageCropperNext);

  readonly ratio = input.required<number | null>({
    alias: 'scImageCropperNextAspectRatio',
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
