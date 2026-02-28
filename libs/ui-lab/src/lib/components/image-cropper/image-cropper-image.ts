import {
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'img[scImageCropperImage]',
  host: {
    'data-slot': 'image-cropper-image',
    class: 'max-w-none',
    '[style.width.px]': 'scaledWidth()',
    '[style.height.px]': 'scaledHeight()',
    '[style.transform]': 'transform()',
    '[src]': 'src()',
    '[attr.draggable]': '"false"',
    crossorigin: 'anonymous',
    '(load)': 'onLoad()',
  },
})
export class ScImageCropperImage {
  private readonly cropper = inject(SC_IMAGE_CROPPER);
  private readonly elementRef = inject(ElementRef<HTMLImageElement>);
  private readonly injector = inject(Injector);

  readonly initialSrc = input<string>('', { alias: 'src' });

  protected readonly src = computed(
    () => this.cropper.imageSrc() || this.initialSrc(),
  );

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
