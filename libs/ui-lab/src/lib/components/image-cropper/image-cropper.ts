import {
  afterNextRender,
  DestroyRef,
  Directive,
  inject,
  InjectionToken,
  input,
  model,
  output,
  signal,
} from '@angular/core';

export interface ScCropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScCropResult {
  dataUrl: string;
  blob: Blob | null;
  width: number;
  height: number;
}

export const SC_IMAGE_CROPPER = new InjectionToken<ScImageCropper>(
  'SC_IMAGE_CROPPER',
);

@Directive({
  selector: '[scImageCropper]',
  exportAs: 'scImageCropper',
  providers: [{ provide: SC_IMAGE_CROPPER, useExisting: ScImageCropper }],
  host: {
    'data-slot': 'image-cropper',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScImageCropper {
  // Configuration inputs
  readonly src = input.required<string>();
  readonly aspectRatio = input<number | null>(null);
  readonly minWidth = input<number>(50);
  readonly minHeight = input<number>(50);
  readonly containerHeight = input<number>(400);
  readonly showGrid = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly outputType = input<'image/png' | 'image/jpeg' | 'image/webp'>(
    'image/png',
  );
  readonly outputQuality = input<number>(0.92);

  // Models for two-way binding
  readonly cropArea = model<ScCropArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  readonly zoom = model<number>(1);

  // Outputs
  readonly cropChange = output<ScCropArea>();
  readonly imageLoaded = output<{ width: number; height: number }>();

  // Internal state signals
  readonly imageNaturalWidth = signal(0);
  readonly imageNaturalHeight = signal(0);
  readonly imageLoaded$ = signal(false);

  // Drag/resize state (not signals since they change frequently)
  isDragging = false;
  isResizing = false;
  resizeHandle = '';
  startX = 0;
  startY = 0;
  startScCropArea: ScCropArea = { x: 0, y: 0, width: 0, height: 0 };

  private readonly destroyRef = inject(DestroyRef);

  private readonly boundMouseMove = this.onMouseMove.bind(this);
  private readonly boundMouseUp = this.onMouseUp.bind(this);
  private readonly boundTouchMove = this.onTouchMove.bind(this);
  private readonly boundTouchEnd = this.onTouchEnd.bind(this);

  constructor() {
    afterNextRender(() => {
      document.addEventListener('mousemove', this.boundMouseMove);
      document.addEventListener('mouseup', this.boundMouseUp);
      document.addEventListener('touchmove', this.boundTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', this.boundTouchEnd);
    });

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('mousemove', this.boundMouseMove);
      document.removeEventListener('mouseup', this.boundMouseUp);
      document.removeEventListener('touchmove', this.boundTouchMove);
      document.removeEventListener('touchend', this.boundTouchEnd);
    });
  }

  // Public methods for child components
  getScaledImageWidth(): number {
    return this.imageNaturalWidth() * this.zoom();
  }

  getScaledImageHeight(): number {
    return this.imageNaturalHeight() * this.zoom();
  }

  onImageLoad(width: number, height: number): void {
    this.imageNaturalWidth.set(width);
    this.imageNaturalHeight.set(height);
    this.imageLoaded$.set(true);

    this.imageLoaded.emit({ width, height });
  }

  initializeScCropArea(containerWidth: number): void {
    const containerH = this.containerHeight();
    const imgW = this.getScaledImageWidth();
    const imgH = this.getScaledImageHeight();

    // Calculate displayed image dimensions within container
    const scale = Math.min(containerWidth / imgW, containerH / imgH, 1);
    const displayedW = imgW * scale;
    const displayedH = imgH * scale;

    // Center the crop area
    const aspectRatio = this.aspectRatio();
    let cropW = Math.min(displayedW * 0.8, displayedW);
    let cropH = Math.min(displayedH * 0.8, displayedH);

    if (aspectRatio !== null) {
      if (cropW / aspectRatio <= displayedH) {
        cropH = cropW / aspectRatio;
      } else {
        cropW = cropH * aspectRatio;
      }
    }

    const x = (containerWidth - cropW) / 2;
    const y = (containerH - cropH) / 2;

    this.cropArea.set({
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: cropW,
      height: cropH,
    });
  }

  startDragging(clientX: number, clientY: number): void {
    this.isDragging = true;
    this.startX = clientX;
    this.startY = clientY;
    this.startScCropArea = { ...this.cropArea() };
  }

  startResizing(clientX: number, clientY: number, handle: string): void {
    this.isResizing = true;
    this.resizeHandle = handle;
    this.startX = clientX;
    this.startY = clientY;
    this.startScCropArea = { ...this.cropArea() };
  }

  handleDrag(clientX: number, clientY: number, containerWidth: number): void {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;

    const containerH = this.containerHeight();
    const crop = this.startScCropArea;

    let newX = crop.x + deltaX;
    let newY = crop.y + deltaY;

    // Constrain to container
    newX = Math.max(0, Math.min(newX, containerWidth - crop.width));
    newY = Math.max(0, Math.min(newY, containerH - crop.height));

    this.cropArea.set({
      ...this.cropArea(),
      x: newX,
      y: newY,
    });

    this.cropChange.emit(this.cropArea());
  }

  handleResize(clientX: number, clientY: number, containerWidth: number): void {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;
    const crop = this.startScCropArea;
    const aspectRatio = this.aspectRatio();
    const minW = this.minWidth();
    const minH = this.minHeight();
    const containerH = this.containerHeight();

    let newX = crop.x;
    let newY = crop.y;
    let newW = crop.width;
    let newH = crop.height;

    switch (this.resizeHandle) {
      case 'se':
        newW = Math.max(minW, crop.width + deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height + deltaY);
        break;
      case 'sw':
        newW = Math.max(minW, crop.width - deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height + deltaY);
        newX = crop.x + crop.width - newW;
        break;
      case 'ne':
        newW = Math.max(minW, crop.width + deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height - deltaY);
        newY = crop.y + crop.height - newH;
        break;
      case 'nw':
        newW = Math.max(minW, crop.width - deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height - deltaY);
        newX = crop.x + crop.width - newW;
        newY = crop.y + crop.height - newH;
        break;
      case 'n':
        newH = Math.max(minH, crop.height - deltaY);
        if (aspectRatio !== null) newW = newH * aspectRatio;
        newY = crop.y + crop.height - newH;
        break;
      case 's':
        newH = Math.max(minH, crop.height + deltaY);
        if (aspectRatio !== null) newW = newH * aspectRatio;
        break;
      case 'w':
        newW = Math.max(minW, crop.width - deltaX);
        if (aspectRatio !== null) newH = newW / aspectRatio;
        newX = crop.x + crop.width - newW;
        break;
      case 'e':
        newW = Math.max(minW, crop.width + deltaX);
        if (aspectRatio !== null) newH = newW / aspectRatio;
        break;
    }

    // Constrain to container
    if (newX < 0) {
      newW += newX;
      newX = 0;
    }
    if (newY < 0) {
      newH += newY;
      newY = 0;
    }
    if (newX + newW > containerWidth) {
      newW = containerWidth - newX;
    }
    if (newY + newH > containerH) {
      newH = containerH - newY;
    }

    // Maintain aspect ratio after constraints
    if (aspectRatio !== null) {
      if (newW / aspectRatio > newH) {
        newW = newH * aspectRatio;
      } else {
        newH = newW / aspectRatio;
      }
    }

    this.cropArea.set({
      x: newX,
      y: newY,
      width: Math.max(minW, newW),
      height: Math.max(minH, newH),
    });

    this.cropChange.emit(this.cropArea());
  }

  stopInteraction(): void {
    this.isDragging = false;
    this.isResizing = false;
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isDragging || this.isResizing) {
      // Will be handled by container component
    }
  }

  private onTouchMove(event: TouchEvent): void {
    if (this.isDragging || this.isResizing) {
      event.preventDefault();
    }
  }

  private onMouseUp(): void {
    this.stopInteraction();
  }

  private onTouchEnd(): void {
    this.stopInteraction();
  }

  async crop(
    imageElement: HTMLImageElement,
    canvasElement: HTMLCanvasElement,
    containerWidth: number,
  ): Promise<ScCropResult> {
    const crop = this.cropArea();
    const containerH = this.containerHeight();

    // Calculate the scale between displayed image and natural image
    const displayedW = this.getScaledImageWidth();
    const displayedH = this.getScaledImageHeight();
    const scale = Math.min(
      containerWidth / displayedW,
      containerH / displayedH,
      1,
    );

    const offsetX = (containerWidth - displayedW * scale) / 2;
    const offsetY = (containerH - displayedH * scale) / 2;

    // Convert crop area to natural image coordinates
    const naturalScale = this.imageNaturalWidth() / (displayedW * scale);
    const srcX = (crop.x - offsetX) * naturalScale;
    const srcY = (crop.y - offsetY) * naturalScale;
    const srcW = crop.width * naturalScale;
    const srcH = crop.height * naturalScale;

    // Set canvas size to crop dimensions
    canvasElement.width = srcW;
    canvasElement.height = srcH;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Draw cropped portion
    ctx.drawImage(imageElement, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

    // Get result
    const dataUrl = canvasElement.toDataURL(
      this.outputType(),
      this.outputQuality(),
    );

    return new Promise((resolve) => {
      canvasElement.toBlob(
        (blob) => {
          resolve({
            dataUrl,
            blob,
            width: srcW,
            height: srcH,
          });
        },
        this.outputType(),
        this.outputQuality(),
      );
    });
  }

  resetScCropArea(containerWidth: number): void {
    this.initializeScCropArea(containerWidth);
  }

  setZoom(value: number): void {
    this.zoom.set(Math.max(0.1, Math.min(3, value)));
  }

  zoomIn(): void {
    this.setZoom(this.zoom() + 0.1);
  }

  zoomOut(): void {
    this.setZoom(this.zoom() - 0.1);
  }
}
