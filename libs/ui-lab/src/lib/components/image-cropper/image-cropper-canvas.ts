import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER, ScImageCropperResult } from './image-cropper';

@Component({
  selector: '[scImageCropperCanvas]',
  exportAs: 'scImageCropperCanvas',
  template: `
    <div class="absolute inset-0 flex items-center justify-center">
      <ng-content select="img[scImageCropperImage]" />
    </div>

    <ng-content />

    <canvas #canvasEl class="hidden"></canvas>
  `,
  host: {
    'data-slot': 'image-cropper-canvas',
    '[class]': 'class()',
    '[style.height.px]': 'cropper.containerHeight()',
    '(wheel)': 'onWheel($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperCanvas {
  readonly cropper = inject(SC_IMAGE_CROPPER);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'relative block overflow-hidden bg-black/90 select-none',
      this.classInput(),
    ),
  );

  readonly maskId = inject(_IdGenerator).getId('sc-crop-mask-');

  private readonly canvasEl =
    viewChild<ElementRef<HTMLCanvasElement>>('canvasEl');

  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.updateContainerWidth();

      this.resizeObserver = new ResizeObserver(() => {
        this.updateContainerWidth();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  private updateContainerWidth(): void {
    const width = this.elementRef.nativeElement.clientWidth;
    if (width > 0) {
      this.cropper.containerWidth.set(width);
    }
  }

  protected onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.cropper.setZoom(this.cropper.zoom() + delta);
  }

  async crop(): Promise<ScImageCropperResult> {
    const canvas = this.canvasEl()?.nativeElement;
    const img = this.elementRef.nativeElement.querySelector(
      'img[scImageCropperImage]',
    ) as HTMLImageElement | null;

    if (!img || !canvas) {
      throw new Error('Image or canvas not found');
    }

    return this.cropper.crop(img, canvas);
  }
}
