import {
  afterNextRender,
  computed,
  contentChild,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  runInInjectionContext,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: '[scImageCropperContainer]',
  exportAs: 'scImageCropperContainer',
  host: {
    'data-slot': 'image-cropper-container',
    '[class]': 'class()',
  },
})
export class ScImageCropperContainer {
  readonly cropper = inject(SC_IMAGE_CROPPER);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly imageEl =
    contentChild<ElementRef<HTMLImageElement>>('cropImageEl');
  private readonly canvasEl =
    contentChild<ElementRef<HTMLCanvasElement>>('cropCanvasEl');

  readonly scaledImageWidth = computed(() =>
    this.cropper.getScaledImageWidth(),
  );
  readonly scaledImageHeight = computed(() =>
    this.cropper.getScaledImageHeight(),
  );

  readonly imageTransform = computed(() => `scale(1)`);

  constructor() {
    afterNextRender(() => {
      document.addEventListener(
        'mousemove',
        this.onDocumentMouseMove.bind(this),
      );
    });
  }

  private getContainerWidth(): number {
    return this.elementRef.nativeElement.clientWidth || 400;
  }

  onImageLoad(): void {
    const img = this.imageEl()?.nativeElement;
    if (!img) return;

    this.cropper.onImageLoad(img.naturalWidth, img.naturalHeight);

    runInInjectionContext(this.injector, () => {
      afterNextRender(() => {
        this.cropper.initializeCropArea(this.getContainerWidth());
      });
    });
  }

  onCropAreaMouseDown(event: MouseEvent): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    this.cropper.startDragging(event.clientX, event.clientY);
  }

  onCropAreaTouchStart(event: TouchEvent): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.cropper.startDragging(touch.clientX, touch.clientY);
  }

  onHandleMouseDown(event: MouseEvent, handle: string): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.cropper.startResizing(event.clientX, event.clientY, handle);
  }

  onHandleTouchStart(event: TouchEvent, handle: string): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    const touch = event.touches[0];
    this.cropper.startResizing(touch.clientX, touch.clientY, handle);
  }

  private onDocumentMouseMove(event: MouseEvent): void {
    if (this.cropper.isDragging) {
      this.cropper.handleDrag(
        event.clientX,
        event.clientY,
        this.getContainerWidth(),
      );
    } else if (this.cropper.isResizing) {
      this.cropper.handleResize(
        event.clientX,
        event.clientY,
        this.getContainerWidth(),
      );
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.cropper.isDragging) {
      this.cropper.handleDrag(
        event.clientX,
        event.clientY,
        this.getContainerWidth(),
      );
    } else if (this.cropper.isResizing) {
      this.cropper.handleResize(
        event.clientX,
        event.clientY,
        this.getContainerWidth(),
      );
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.cropper.isDragging || this.cropper.isResizing) {
      event.preventDefault();
      const touch = event.touches[0];
      if (this.cropper.isDragging) {
        this.cropper.handleDrag(
          touch.clientX,
          touch.clientY,
          this.getContainerWidth(),
        );
      } else if (this.cropper.isResizing) {
        this.cropper.handleResize(
          touch.clientX,
          touch.clientY,
          this.getContainerWidth(),
        );
      }
    }
  }

  async crop(): Promise<ReturnType<typeof this.cropper.crop>> {
    const img = this.imageEl()?.nativeElement;
    const canvas = this.canvasEl()?.nativeElement;

    if (!img || !canvas) {
      throw new Error('Image or canvas not found');
    }

    return this.cropper.crop(img, canvas, this.getContainerWidth());
  }

  resetCropArea(): void {
    this.cropper.resetCropArea(this.getContainerWidth());
  }
}
