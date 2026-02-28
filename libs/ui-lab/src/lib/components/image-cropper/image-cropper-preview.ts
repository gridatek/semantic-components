import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[scImageCropperPreview]',
  exportAs: 'scImageCropperPreview',
  template: `
    <img
      [src]="src()"
      class="max-w-none"
      [style.width.px]="imageWidth()"
      [style.height.px]="imageHeight()"
      [style.transform]="imageTransform()"
      alt="Crop preview"
    />
  `,
  host: {
    'data-slot': 'image-cropper-preview',
    '[class]': 'class()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperPreview {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly width = input<number>(100);
  readonly height = input<number>(100);

  protected readonly class = computed(() =>
    cn('inline-block overflow-hidden', this.classInput()),
  );

  protected readonly src = computed(() => this.cropper.src());

  protected readonly imageWidth = computed(() => {
    const crop = this.cropper.cropArea();
    return (this.width() / crop.width) * this.cropper.containerHeight() * 2;
  });

  protected readonly imageHeight = computed(() => {
    const crop = this.cropper.cropArea();
    return (this.height() / crop.height) * this.cropper.containerHeight() * 2;
  });

  protected readonly imageTransform = computed(() => {
    const crop = this.cropper.cropArea();
    const scaleX = this.width() / crop.width;
    const scaleY = this.height() / crop.height;
    const translateX = -crop.x * scaleX;
    const translateY = -crop.y * scaleY;
    return `translate(${translateX}px, ${translateY}px)`;
  });
}
