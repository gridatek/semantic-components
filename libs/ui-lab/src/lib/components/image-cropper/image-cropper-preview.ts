import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[sc-image-cropper-preview]',
  template: `
    <div
      class="overflow-hidden bg-muted"
      [style.width.px]="width()"
      [style.height.px]="height()"
    >
      <img
        [src]="cropper.src()"
        class="max-w-none"
        [style.width.px]="imageWidth()"
        [style.height.px]="imageHeight()"
        [style.transform]="transform()"
        alt="Crop preview"
      />
    </div>
  `,
  host: {
    'data-slot': 'image-cropper-preview',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperPreview {
  readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly width = input<number>(100);
  readonly height = input<number>(100);

  protected readonly class = computed(() =>
    cn('inline-block rounded-md border', this.classInput()),
  );

  protected readonly imageWidth = computed(() => {
    const crop = this.cropper.cropArea();
    return (this.width() / crop.width) * this.cropper.containerHeight() * 2;
  });

  protected readonly imageHeight = computed(() => {
    const crop = this.cropper.cropArea();
    return (this.height() / crop.height) * this.cropper.containerHeight() * 2;
  });

  protected readonly transform = computed(() => {
    const crop = this.cropper.cropArea();
    const scaleX = this.width() / crop.width;
    const scaleY = this.height() / crop.height;
    const translateX = -crop.x * scaleX;
    const translateY = -crop.y * scaleY;
    return `translate(${translateX}px, ${translateY}px)`;
  });
}
