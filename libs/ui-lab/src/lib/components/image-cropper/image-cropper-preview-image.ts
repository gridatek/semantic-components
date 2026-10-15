import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';
import { SC_IMAGE_CROPPER_PREVIEW } from './image-cropper-preview';

/**
 * The cropped image in a `scImageCropperPreview`: the cropper's image, moved,
 * scaled, rotated and flipped to show the crop. Write its `alt`.
 */
@Directive({
  selector: 'img[scImageCropperPreviewImage]',
  host: {
    'data-slot': 'image-cropper-preview-image',
    '[src]': 'cropper.imageSrc()',
    '[hidden]': '!cropper.imageSrc()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
    '[style.transform]': 'transform()',
    '[class]': 'class()',
  },
})
export class ScImageCropperPreviewImage {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);
  private readonly preview = inject(SC_IMAGE_CROPPER_PREVIEW);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('max-w-none', this.classInput()),
  );

  protected readonly width = computed(
    () => this.cropper.scaledImageWidth() * this.preview.scale(),
  );
  protected readonly height = computed(
    () => this.cropper.scaledImageHeight() * this.preview.scale(),
  );

  protected readonly transform = computed(() => {
    const crop = this.cropper.cropArea();
    const scale = this.preview.scale();
    // The image is centred in the container; the crop is relative to it.
    const offsetX =
      (this.cropper.containerWidth() - this.cropper.scaledImageWidth()) / 2;
    const offsetY =
      (this.cropper.containerHeight() - this.cropper.scaledImageHeight()) / 2;
    const parts = [
      `translate(${-(crop.x - offsetX) * scale}px, ${-(crop.y - offsetY) * scale}px)`,
    ];
    const rotation = this.cropper.rotation();
    if (rotation !== 0) parts.push(`rotate(${rotation}deg)`);
    if (this.cropper.flipH()) parts.push('scaleX(-1)');
    if (this.cropper.flipV()) parts.push('scaleY(-1)');
    return parts.join(' ');
  });
}
