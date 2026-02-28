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
    'data-slot': 'image-cropper-preview',
    '[class]': 'class()',
    '[style.width.px]': 'previewWidth()',
    '[style.height.px]': 'previewHeight()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperPreview {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly width = input<number>(150);
  readonly height = input<number>(150);

  protected readonly class = computed(() =>
    cn('inline-block overflow-hidden', this.classInput()),
  );

  protected readonly src = computed(() => this.cropper.imageSrc());

  // Fit the crop area into the preview bounds while preserving aspect ratio
  protected readonly scale = computed(() => {
    const crop = this.cropper.cropArea();
    return Math.min(this.width() / crop.width, this.height() / crop.height);
  });

  protected readonly previewWidth = computed(
    () => this.cropper.cropArea().width * this.scale(),
  );

  protected readonly previewHeight = computed(
    () => this.cropper.cropArea().height * this.scale(),
  );

  protected readonly imageWidth = computed(
    () => this.cropper.scaledImageWidth() * this.scale(),
  );

  protected readonly imageHeight = computed(
    () => this.cropper.scaledImageHeight() * this.scale(),
  );

  protected readonly previewTransform = computed(() => {
    const crop = this.cropper.cropArea();
    const cw = this.cropper.containerWidth();
    const ch = this.cropper.containerHeight();
    const imgW = this.cropper.scaledImageWidth();
    const imgH = this.cropper.scaledImageHeight();
    const scale = this.scale();

    // Image is centered in the container
    const offsetX = (cw - imgW) / 2;
    const offsetY = (ch - imgH) / 2;

    // Crop position relative to the image (not the container)
    const cropImgX = crop.x - offsetX;
    const cropImgY = crop.y - offsetY;

    const translateX = -cropImgX * scale;
    const translateY = -cropImgY * scale;

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
