import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[sc-image-cropper-container]',
  template: `
    <div
      class="relative overflow-hidden bg-black/90 select-none"
      [style.height.px]="cropper.containerHeight()"
    >
      <!-- Image container -->
      <div
        class="absolute inset-0 flex items-center justify-center"
        [style.transform]="imageTransform()"
      >
        <img
          #imageEl
          [src]="cropper.src()"
          class="max-w-none"
          [style.width.px]="scaledImageWidth()"
          [style.height.px]="scaledImageHeight()"
          (load)="onImageLoad()"
          draggable="false"
          alt="Image to crop"
        />
      </div>

      <!-- Overlay mask -->
      <div class="absolute inset-0 pointer-events-none">
        <svg class="w-full h-full">
          <defs>
            <mask id="cropMask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                [attr.x]="cropper.cropArea().x"
                [attr.y]="cropper.cropArea().y"
                [attr.width]="cropper.cropArea().width"
                [attr.height]="cropper.cropArea().height"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.5)"
            mask="url(#cropMask)"
          />
        </svg>
      </div>

      <!-- Crop area -->
      <div
        class="absolute border-2 border-white cursor-move"
        [style.left.px]="cropper.cropArea().x"
        [style.top.px]="cropper.cropArea().y"
        [style.width.px]="cropper.cropArea().width"
        [style.height.px]="cropper.cropArea().height"
        (mousedown)="onCropAreaMouseDown($event)"
        (touchstart)="onCropAreaTouchStart($event)"
        (mousemove)="onMouseMove($event)"
        (touchmove)="onTouchMove($event)"
      >
        <!-- Grid lines -->
        @if (cropper.showGrid()) {
          <div class="absolute inset-0 pointer-events-none">
            <div
              class="absolute left-1/3 top-0 bottom-0 w-px bg-white/30"
            ></div>
            <div
              class="absolute left-2/3 top-0 bottom-0 w-px bg-white/30"
            ></div>
            <div class="absolute top-1/3 left-0 right-0 h-px bg-white/30"></div>
            <div class="absolute top-2/3 left-0 right-0 h-px bg-white/30"></div>
          </div>
        }

        <!-- Resize handles -->
        @if (!cropper.disabled()) {
          <!-- Corners -->
          <div
            class="absolute -left-1.5 -top-1.5 size-3 bg-white border border-gray-400 cursor-nw-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'nw')"
            (touchstart)="onHandleTouchStart($event, 'nw')"
          ></div>
          <div
            class="absolute -right-1.5 -top-1.5 size-3 bg-white border border-gray-400 cursor-ne-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'ne')"
            (touchstart)="onHandleTouchStart($event, 'ne')"
          ></div>
          <div
            class="absolute -left-1.5 -bottom-1.5 size-3 bg-white border border-gray-400 cursor-sw-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'sw')"
            (touchstart)="onHandleTouchStart($event, 'sw')"
          ></div>
          <div
            class="absolute -right-1.5 -bottom-1.5 size-3 bg-white border border-gray-400 cursor-se-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'se')"
            (touchstart)="onHandleTouchStart($event, 'se')"
          ></div>

          <!-- Edges -->
          <div
            class="absolute left-1/2 -translate-x-1/2 -top-1.5 w-6 h-3 bg-white border border-gray-400 cursor-n-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'n')"
            (touchstart)="onHandleTouchStart($event, 'n')"
          ></div>
          <div
            class="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-6 h-3 bg-white border border-gray-400 cursor-s-resize z-10"
            (mousedown)="onHandleMouseDown($event, 's')"
            (touchstart)="onHandleTouchStart($event, 's')"
          ></div>
          <div
            class="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-6 bg-white border border-gray-400 cursor-w-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'w')"
            (touchstart)="onHandleTouchStart($event, 'w')"
          ></div>
          <div
            class="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-6 bg-white border border-gray-400 cursor-e-resize z-10"
            (mousedown)="onHandleMouseDown($event, 'e')"
            (touchstart)="onHandleTouchStart($event, 'e')"
          ></div>
        }
      </div>
    </div>

    <!-- Hidden canvas for cropping -->
    <canvas #canvasEl class="hidden"></canvas>

    <!-- Content projection -->
    <ng-content />
  `,
  host: {
    'data-slot': 'image-cropper-container',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperContainer {
  readonly cropper = inject(SC_IMAGE_CROPPER);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly imageEl = viewChild<ElementRef<HTMLImageElement>>('imageEl');
  readonly canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasEl');

  protected readonly scaledImageWidth = computed(() =>
    this.cropper.getScaledImageWidth(),
  );
  protected readonly scaledImageHeight = computed(() =>
    this.cropper.getScaledImageHeight(),
  );

  protected readonly imageTransform = computed(() => {
    return `scale(1)`;
  });

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

  protected onImageLoad(): void {
    const img = this.imageEl()?.nativeElement;
    if (!img) return;

    this.cropper.onImageLoad(img.naturalWidth, img.naturalHeight);

    // Initialize crop area after image loads
    afterNextRender(() => {
      this.cropper.initializeCropArea(this.getContainerWidth());
    });
  }

  protected onCropAreaMouseDown(event: MouseEvent): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    this.cropper.startDragging(event.clientX, event.clientY);
  }

  protected onCropAreaTouchStart(event: TouchEvent): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.cropper.startDragging(touch.clientX, touch.clientY);
  }

  protected onHandleMouseDown(event: MouseEvent, handle: string): void {
    if (this.cropper.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.cropper.startResizing(event.clientX, event.clientY, handle);
  }

  protected onHandleTouchStart(event: TouchEvent, handle: string): void {
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

  protected onMouseMove(event: MouseEvent): void {
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

  protected onTouchMove(event: TouchEvent): void {
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

  // Public method for cropping - can be called via template reference
  async crop(): Promise<ReturnType<typeof this.cropper.crop>> {
    const img = this.imageEl()?.nativeElement;
    const canvas = this.canvasEl()?.nativeElement;

    if (!img || !canvas) {
      throw new Error('Image or canvas not found');
    }

    return this.cropper.crop(img, canvas, this.getContainerWidth());
  }

  // Public method for resetting crop area
  resetCropArea(): void {
    this.cropper.resetCropArea(this.getContainerWidth());
  }
}
