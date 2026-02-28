import {
  afterNextRender,
  computed,
  DestroyRef,
  Directive,
  inject,
  InjectionToken,
  input,
  model,
  output,
  signal,
} from '@angular/core';

export interface ScCropperArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScCropperResult {
  dataUrl: string;
  blob: Blob | null;
  width: number;
  height: number;
}

export const SC_CROPPER = new InjectionToken<ScCropper>('SC_CROPPER');

@Directive({
  selector: '[scCropper]',
  exportAs: 'scCropper',
  providers: [{ provide: SC_CROPPER, useExisting: ScCropper }],
  host: {
    'data-slot': 'cropper',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-crop-shape]': 'cropShape()',
  },
})
export class ScCropper {
  // Configuration inputs
  readonly aspectRatio = model<number | null>(null);
  readonly minWidth = input<number>(50);
  readonly minHeight = input<number>(50);
  readonly containerHeight = input<number>(400);
  readonly disabled = input<boolean>(false);
  readonly outputType = input<'image/png' | 'image/jpeg' | 'image/webp'>(
    'image/png',
  );
  readonly outputQuality = input<number>(0.92);
  readonly cropShape = input<'rect' | 'circle'>('rect');

  // Two-way models
  readonly cropArea = model<ScCropperArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  readonly zoom = model<number>(1);
  readonly rotation = model<number>(0);

  // Outputs
  readonly cropChange = output<ScCropperArea>();
  readonly imageLoaded = output<{ width: number; height: number }>();

  // Internal state signals
  readonly imageSrc = signal('');
  readonly imageNaturalWidth = signal(0);
  readonly imageNaturalHeight = signal(0);
  readonly imageLoaded$ = signal(false);
  readonly containerWidth = signal(400);
  readonly flipH = signal(false);
  readonly flipV = signal(false);

  // Computed
  readonly scaledImageWidth = computed(
    () => this.imageNaturalWidth() * this.zoom(),
  );
  readonly scaledImageHeight = computed(
    () => this.imageNaturalHeight() * this.zoom(),
  );

  readonly imageTransform = computed(() => {
    const rot = this.rotation();
    const fH = this.flipH();
    const fV = this.flipV();

    const parts: string[] = [];
    if (rot !== 0) {
      parts.push(`rotate(${rot}deg)`);
    }
    if (fH) {
      parts.push('scaleX(-1)');
    }
    if (fV) {
      parts.push('scaleY(-1)');
    }
    return parts.length > 0 ? parts.join(' ') : 'none';
  });

  // Drag/resize state
  isDragging = false;
  isResizing = false;
  resizeHandle = '';
  startX = 0;
  startY = 0;
  startCropArea: ScCropperArea = { x: 0, y: 0, width: 0, height: 0 };

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

  onImageLoad(width: number, height: number): void {
    this.imageNaturalWidth.set(width);
    this.imageNaturalHeight.set(height);
    this.imageLoaded$.set(true);
    this.imageLoaded.emit({ width, height });
  }

  setImageSrc(src: string): void {
    this.imageSrc.set(src);
  }

  initializeCropArea(): void {
    const cw = this.containerWidth();
    const containerH = this.containerHeight();
    const imgW = this.scaledImageWidth();
    const imgH = this.scaledImageHeight();

    // Visible portion of the image within the container
    const displayedW = Math.min(imgW, cw);
    const displayedH = Math.min(imgH, containerH);

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

    if (this.cropShape() === 'circle') {
      const size = Math.min(cropW, cropH);
      cropW = size;
      cropH = size;
    }

    const x = (cw - cropW) / 2;
    const y = (containerH - cropH) / 2;

    this.cropArea.set({
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: cropW,
      height: cropH,
    });
  }

  startDragging(clientX: number, clientY: number): void {
    if (this.disabled()) return;
    this.isDragging = true;
    this.startX = clientX;
    this.startY = clientY;
    this.startCropArea = { ...this.cropArea() };
  }

  startResizing(clientX: number, clientY: number, handle: string): void {
    if (this.disabled()) return;
    this.isResizing = true;
    this.resizeHandle = handle;
    this.startX = clientX;
    this.startY = clientY;
    this.startCropArea = { ...this.cropArea() };
  }

  handleDrag(clientX: number, clientY: number): void {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;

    const cw = this.containerWidth();
    const containerH = this.containerHeight();
    const crop = this.startCropArea;

    let newX = crop.x + deltaX;
    let newY = crop.y + deltaY;

    newX = Math.max(0, Math.min(newX, cw - crop.width));
    newY = Math.max(0, Math.min(newY, containerH - crop.height));

    this.cropArea.set({
      ...this.cropArea(),
      x: newX,
      y: newY,
    });

    this.cropChange.emit(this.cropArea());
  }

  handleResize(clientX: number, clientY: number): void {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;
    const crop = this.startCropArea;
    const aspectRatio = this.aspectRatio();
    const minW = this.minWidth();
    const minH = this.minHeight();
    const cw = this.containerWidth();
    const containerH = this.containerHeight();

    let newX = crop.x;
    let newY = crop.y;
    let newW = crop.width;
    let newH = crop.height;

    switch (this.resizeHandle) {
      case 'se':
      case 'bottom-right':
        newW = Math.max(minW, crop.width + deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height + deltaY);
        break;
      case 'sw':
      case 'bottom-left':
        newW = Math.max(minW, crop.width - deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height + deltaY);
        newX = crop.x + crop.width - newW;
        break;
      case 'ne':
      case 'top-right':
        newW = Math.max(minW, crop.width + deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height - deltaY);
        newY = crop.y + crop.height - newH;
        break;
      case 'nw':
      case 'top-left':
        newW = Math.max(minW, crop.width - deltaX);
        newH =
          aspectRatio !== null
            ? newW / aspectRatio
            : Math.max(minH, crop.height - deltaY);
        newX = crop.x + crop.width - newW;
        newY = crop.y + crop.height - newH;
        break;
      case 'n':
      case 'top':
        newH = Math.max(minH, crop.height - deltaY);
        if (aspectRatio !== null) newW = newH * aspectRatio;
        newY = crop.y + crop.height - newH;
        break;
      case 's':
      case 'bottom':
        newH = Math.max(minH, crop.height + deltaY);
        if (aspectRatio !== null) newW = newH * aspectRatio;
        break;
      case 'w':
      case 'left':
        newW = Math.max(minW, crop.width - deltaX);
        if (aspectRatio !== null) newH = newW / aspectRatio;
        newX = crop.x + crop.width - newW;
        break;
      case 'e':
      case 'right':
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
    if (newX + newW > cw) {
      newW = cw - newX;
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

  async crop(
    imageElement: HTMLImageElement,
    canvasElement: HTMLCanvasElement,
  ): Promise<ScCropperResult> {
    const crop = this.cropArea();
    const cw = this.containerWidth();
    const containerH = this.containerHeight();

    // The image is rendered at scaledImageWidth/Height pixels,
    // centered in the container via flex centering
    const displayedW = this.scaledImageWidth();
    const displayedH = this.scaledImageHeight();

    const offsetX = (cw - displayedW) / 2;
    const offsetY = (containerH - displayedH) / 2;

    // Convert from displayed pixels to natural image pixels
    const naturalScale = this.imageNaturalWidth() / displayedW;
    const srcX = (crop.x - offsetX) * naturalScale;
    const srcY = (crop.y - offsetY) * naturalScale;
    const srcW = crop.width * naturalScale;
    const srcH = crop.height * naturalScale;

    canvasElement.width = srcW;
    canvasElement.height = srcH;

    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Apply rotation and flip transforms
    const rot = this.rotation();
    const fH = this.flipH();
    const fV = this.flipV();

    if (rot !== 0 || fH || fV) {
      ctx.save();
      ctx.translate(srcW / 2, srcH / 2);
      if (rot !== 0) {
        ctx.rotate((rot * Math.PI) / 180);
      }
      if (fH) {
        ctx.scale(-1, 1);
      }
      if (fV) {
        ctx.scale(1, -1);
      }
      ctx.translate(-srcW / 2, -srcH / 2);
    }

    ctx.drawImage(imageElement, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

    if (rot !== 0 || fH || fV) {
      ctx.restore();
    }

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

  setZoom(value: number): void {
    this.zoom.set(Math.max(0.1, Math.min(3, value)));
  }

  zoomIn(): void {
    this.setZoom(this.zoom() + 0.1);
  }

  zoomOut(): void {
    this.setZoom(this.zoom() - 0.1);
  }

  rotateLeft(): void {
    this.rotation.set((this.rotation() - 90 + 360) % 360);
  }

  rotateRight(): void {
    this.rotation.set((this.rotation() + 90) % 360);
  }

  toggleFlipH(): void {
    this.flipH.update((v) => !v);
  }

  toggleFlipV(): void {
    this.flipV.update((v) => !v);
  }

  reset(): void {
    this.zoom.set(1);
    this.rotation.set(0);
    this.flipH.set(false);
    this.flipV.set(false);
    this.initializeCropArea();
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.handleDrag(event.clientX, event.clientY);
    } else if (this.isResizing) {
      this.handleResize(event.clientX, event.clientY);
    }
  }

  private onTouchMove(event: TouchEvent): void {
    if (this.isDragging || this.isResizing) {
      event.preventDefault();
      const touch = event.touches[0];
      if (this.isDragging) {
        this.handleDrag(touch.clientX, touch.clientY);
      } else if (this.isResizing) {
        this.handleResize(touch.clientX, touch.clientY);
      }
    }
  }

  private onMouseUp(): void {
    this.stopInteraction();
  }

  private onTouchEnd(): void {
    this.stopInteraction();
  }
}
