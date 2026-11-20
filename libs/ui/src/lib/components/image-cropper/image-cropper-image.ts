import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScImageCropper } from './image-cropper';

/**
 * The image to crop, in the viewport: your `img` with its `src` and `alt`.
 * From another site, it needs CORS (`crossorigin="anonymous"`) to be cropped.
 */
@Directive({
  selector: 'img[scImageCropperImage]',
  host: {
    draggable: 'false',
    '[class]': 'class()',
    '[style.width.px]': 'cropper.imageStyle().width',
    '[style.height.px]': 'cropper.imageStyle().height',
    '[style.left.px]': 'cropper.imageStyle().left',
    '[style.top.px]': 'cropper.imageStyle().top',
    '[style.transform]': 'cropper.imageStyle().transform',
    '(load)': 'onLoad()',
    '(error)': 'cropper.error.set(true)',
  },
})
export class ScImageCropperImage {
  private readonly cropper = inject(ScImageCropper);
  private readonly element =
    inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute max-w-none origin-center select-none',
      !this.cropper.ready() && 'invisible',
      this.classInput(),
    ),
  );

  constructor() {
    this.cropper.ɵimage.set(this.element);
    // Already loaded (from the cache, or before hydration): no load event comes.
    if (this.element.complete && this.element.naturalWidth) this.onLoad();
  }

  private onLoad(): void {
    this.cropper.ɵload({
      width: this.element.naturalWidth,
      height: this.element.naturalHeight,
    });
  }
}
