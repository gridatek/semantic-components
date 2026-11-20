import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScImageCropperNext } from './image-cropper-next';
import { imageTransform } from './image-cropper-next-geometry';
import { ScImageCropperNextPreview } from './image-cropper-next-preview';

/** The crop, in its preview: the cropper's image, placed so the crop covers it. Write its `alt`. */
@Directive({
  selector: 'img[scImageCropperNextPreviewImage]',
  host: {
    draggable: 'false',
    '[attr.src]': 'src()',
    '[style.width.px]': 'place().width',
    '[style.height.px]': 'place().height',
    '[style.left.px]': 'place().left',
    '[style.top.px]': 'place().top',
    '[style.transform]': 'place().transform',
    '[class]': 'class()',
  },
})
export class ScImageCropperNextPreviewImage {
  private readonly cropper = inject(ScImageCropperNext);
  private readonly preview = inject(ScImageCropperNextPreview);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The cropper's image (again when another loads). */
  private readonly src = computed(() => {
    this.cropper.ɵnatural();
    return this.cropper.ɵimage()?.currentSrc || null;
  });

  private readonly place = computed(() => {
    const crop = this.cropper.crop();
    const box = this.preview.size();
    const natural = this.cropper.ɵnatural();
    const shown = this.cropper.shown();
    if (!crop) return { width: 0, height: 0, left: 0, top: 0, transform: '' };
    // The crop covers the preview: preview pixels per image pixel.
    const k = Math.max(box.width / crop.width, box.height / crop.height);
    const left = (box.width - crop.width * k) / 2 - crop.x * k;
    const top = (box.height - crop.height * k) / 2 - crop.y * k;
    return {
      width: natural.width * k,
      height: natural.height * k,
      left: left + ((shown.width - natural.width) * k) / 2,
      top: top + ((shown.height - natural.height) * k) / 2,
      transform: imageTransform(crop),
    };
  });

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute max-w-none origin-center select-none',
      !this.cropper.ready() && 'invisible',
      this.classInput(),
    ),
  );
}
