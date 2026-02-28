import {
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'img[scCropperImage]',
  host: {
    'data-slot': 'cropper-image',
    class: 'max-w-none',
    '[style.width.px]': 'scaledWidth()',
    '[style.height.px]': 'scaledHeight()',
    '[style.transform]': 'transform()',
    '[attr.draggable]': '"false"',
    '(load)': 'onLoad()',
  },
})
export class ScCropperImage {
  private readonly cropper = inject(SC_CROPPER);
  private readonly elementRef = inject(ElementRef<HTMLImageElement>);
  private readonly injector = inject(Injector);

  protected readonly scaledWidth = computed(() =>
    this.cropper.scaledImageWidth(),
  );
  protected readonly scaledHeight = computed(() =>
    this.cropper.scaledImageHeight(),
  );
  protected readonly transform = computed(() => this.cropper.imageTransform());

  protected onLoad(): void {
    const img = this.elementRef.nativeElement;
    this.cropper.onImageLoad(img.naturalWidth, img.naturalHeight);
    this.cropper.setImageSrc(img.src);

    runInInjectionContext(this.injector, () => {
      afterNextRender(() => {
        this.cropper.initializeCropArea();
      });
    });
  }
}
