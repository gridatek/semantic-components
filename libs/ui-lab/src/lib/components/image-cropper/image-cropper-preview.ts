import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

export const SC_IMAGE_CROPPER_PREVIEW =
  new InjectionToken<ScImageCropperPreview>('SC_IMAGE_CROPPER_PREVIEW');

/**
 * A live preview of the crop, at most `width` × `height` (keeping the crop's
 * shape): put an `img[scImageCropperPreviewImage]` in it, with your `alt`.
 */
@Directive({
  selector: 'div[scImageCropperPreview]',
  providers: [
    { provide: SC_IMAGE_CROPPER_PREVIEW, useExisting: ScImageCropperPreview },
  ],
  host: {
    'data-slot': 'image-cropper-preview',
    '[class]': 'class()',
    '[style.width.px]': 'previewWidth()',
    '[style.height.px]': 'previewHeight()',
  },
})
export class ScImageCropperPreview {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly width = input<number>(150);
  readonly height = input<number>(150);

  protected readonly class = computed(() =>
    cn('inline-block overflow-hidden', this.classInput()),
  );

  /** The crop fitted into the preview, keeping its shape. */
  readonly scale = computed(() => {
    const crop = this.cropper.cropArea();
    return Math.min(this.width() / crop.width, this.height() / crop.height);
  });

  protected readonly previewWidth = computed(
    () => this.cropper.cropArea().width * this.scale(),
  );
  protected readonly previewHeight = computed(
    () => this.cropper.cropArea().height * this.scale(),
  );
}
