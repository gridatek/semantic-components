import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageCropperNext } from './image-cropper-next';
import { ScImageCropperNextPreview } from './image-cropper-next-preview';

/** The crop, in its preview: the cropper's image, placed so the crop covers it. Write its `alt`. */
@Directive({
  selector: 'img[scImageCropperNextPreviewImage]',
  host: {
    'data-slot': 'image-cropper-preview-image',
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
  protected readonly cropper = inject(ScImageCropperNext);
  private readonly preview = inject(ScImageCropperNextPreview);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The cropper's image (again when another loads). */
  protected readonly src = computed(() => {
    this.cropper.ɵnatural();
    return this.cropper.ɵimage()?.currentSrc || null;
  });

  protected readonly place = computed(() => {
    const area = this.cropper.area();
    const box = this.preview.size();
    const natural = this.cropper.ɵnatural();
    const size = this.cropper.orientedSize();
    // The crop covers the preview: preview pixels per image pixel.
    const k =
      area.width && area.height
        ? Math.max(box.width / area.width, box.height / area.height)
        : 0;
    const left = (box.width - area.width * k) / 2 - area.x * k;
    const top = (box.height - area.height * k) / 2 - area.y * k;
    return {
      width: natural.width * k,
      height: natural.height * k,
      left: left + ((size.width - natural.width) * k) / 2,
      top: top + ((size.height - natural.height) * k) / 2,
      transform: `rotate(${this.cropper.rotation()}deg) scale(${this.cropper.flipX() ? -1 : 1}, ${this.cropper.flipY() ? -1 : 1})`,
    };
  });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute max-w-none origin-center select-none',
      !this.cropper.ready() && 'invisible',
      this.classInput(),
    ),
  );
}
