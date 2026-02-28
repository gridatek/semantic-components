import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: '[scImageCropperPreview]',
  exportAs: 'scImageCropperPreview',
  host: {
    'data-slot': 'image-cropper-preview',
    '[class]': 'class()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
  },
})
export class ScImageCropperPreview {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly width = input<number>(100);
  readonly height = input<number>(100);

  protected readonly class = computed(() =>
    cn('inline-block overflow-hidden rounded-md border', this.classInput()),
  );

  readonly src = computed(() => this.cropper.src());

  readonly imageWidth = computed(() => {
    const crop = this.cropper.cropArea();
    return (this.width() / crop.width) * this.cropper.containerHeight() * 2;
  });

  readonly imageHeight = computed(() => {
    const crop = this.cropper.cropArea();
    return (this.height() / crop.height) * this.cropper.containerHeight() * 2;
  });

  readonly imageTransform = computed(() => {
    const crop = this.cropper.cropArea();
    const scaleX = this.width() / crop.width;
    const scaleY = this.height() / crop.height;
    const translateX = -crop.x * scaleX;
    const translateY = -crop.y * scaleY;
    return `translate(${translateX}px, ${translateY}px)`;
  });
}
