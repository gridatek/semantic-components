import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_CROPPER } from './cropper';

@Component({
  selector: '[scCropperPreview]',
  template: `
    @if (src()) {
      <img
        [src]="src()"
        class="max-w-none"
        [style.width.px]="imageWidth()"
        [style.height.px]="imageHeight()"
        [style.transform]="previewTransform()"
        alt="Crop preview"
      />
    }
  `,
  host: {
    'data-slot': 'cropper-preview',
    '[class]': 'class()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCropperPreview {
  private readonly cropper = inject(SC_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly width = input<number>(150);
  readonly height = input<number>(150);

  protected readonly class = computed(() =>
    cn('inline-block overflow-hidden', this.classInput()),
  );

  protected readonly src = computed(() => this.cropper.imageSrc());

  protected readonly imageWidth = computed(() => {
    const crop = this.cropper.cropArea();
    const scaleX = this.width() / crop.width;
    return this.cropper.scaledImageWidth() * scaleX;
  });

  protected readonly imageHeight = computed(() => {
    const crop = this.cropper.cropArea();
    const scaleY = this.height() / crop.height;
    return this.cropper.scaledImageHeight() * scaleY;
  });

  protected readonly previewTransform = computed(() => {
    const crop = this.cropper.cropArea();
    const cw = this.cropper.containerWidth();
    const ch = this.cropper.containerHeight();
    const imgW = this.cropper.scaledImageWidth();
    const imgH = this.cropper.scaledImageHeight();

    // Image is centered in the container
    const offsetX = (cw - imgW) / 2;
    const offsetY = (ch - imgH) / 2;

    // Crop position relative to the image (not the container)
    const cropImgX = crop.x - offsetX;
    const cropImgY = crop.y - offsetY;

    const scaleX = this.width() / crop.width;
    const scaleY = this.height() / crop.height;
    const translateX = -cropImgX * scaleX;
    const translateY = -cropImgY * scaleY;

    const parts: string[] = [`translate(${translateX}px, ${translateY}px)`];

    const rot = this.cropper.rotation();
    if (rot !== 0) {
      parts.push(`rotate(${rot}deg)`);
    }
    if (this.cropper.flipH()) {
      parts.push('scaleX(-1)');
    }
    if (this.cropper.flipV()) {
      parts.push('scaleY(-1)');
    }

    return parts.join(' ');
  });
}
