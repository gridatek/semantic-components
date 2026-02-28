import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
  output,
  signal,
} from '@angular/core';

export interface ScImageCropperArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScImageCropperResult {
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
    '[attr.data-crop-shape]': 'cropShape()',
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'onMouseUp()',
    '(document:touchmove)': 'onTouchMove($event)',
    '(document:touchend)': 'onTouchEnd()',
  },
})
export class ScImageCropper {
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
  readonly cropArea = model<ScImageCropperArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  readonly zoom = model<number>(1);
  readonly rotation = model<number>(0);

  // Outputs
  readonly cropChange = output<ScImageCropperArea>();
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
  // Base scale fits the natural image within the container (contain mode)
  readonly baseScale = computed(() => {
    const nw = this.imageNaturalWidth();
    const nh = this.imageNaturalHeight();
    if (nw === 0 || nh === 0) return 1;
    return Math.min(
      this.containerWidth() / nw,
      this.containerHeight() / nh,
      1, // never upscale beyond natural size
    );
  });

  readonly scaledImageWidth = computed(
    () => this.imageNaturalWidth() * this.baseScale() * this.zoom(),
  );
  readonly scaledImageHeight = computed(
    () => this.imageNaturalHeight() * this.baseScale() * this.zoom(),
  );

  // Image bounds within the container (image is flex-centered)
  readonly imageBoundsX = computed(() =>
    Math.max(0, (this.containerWidth() - this.scaledImageWidth()) / 2),
  );
  readonly imageBoundsY = computed(() =>
    Math.max(0, (this.containerHeight() - this.scaledImageHeight()) / 2),
  );
  readonly imageBoundsW = computed(() =>
    Math.min(this.scaledImageWidth(), this.containerWidth()),
  );
  readonly imageBoundsH = computed(() =>
    Math.min(this.scaledImageHeight(), this.containerHeight()),
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
  startCropArea: ScImageCropperArea = { x: 0, y: 0, width: 0, height: 0 };

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
    const bx = this.imageBoundsX();
    const by = this.imageBoundsY();
    const bw = this.imageBoundsW();
    const bh = this.imageBoundsH();

    const aspectRatio = this.aspectRatio();
    let cropW = bw * 0.8;
    let cropH = bh * 0.8;

    if (aspectRatio !== null) {
      if (cropW / aspectRatio <= bh) {
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

    const x = bx + (bw - cropW) / 2;
    const y = by + (bh - cropH) / 2;

    this.cropArea.set({
      x,
      y,
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

    const bx = this.imageBoundsX();
    const by = this.imageBoundsY();
    const bw = this.imageBoundsW();
    const bh = this.imageBoundsH();
    const crop = this.startCropArea;

    let newX = crop.x + deltaX;
    let newY = crop.y + deltaY;

    newX = Math.max(bx, Math.min(newX, bx + bw - crop.width));
    newY = Math.max(by, Math.min(newY, by + bh - crop.height));

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
    const bx = this.imageBoundsX();
    const by = this.imageBoundsY();
    const bw = this.imageBoundsW();
    const bh = this.imageBoundsH();

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

    // Constrain to image bounds
    if (newX < bx) {
      newW += newX - bx;
      newX = bx;
    }
    if (newY < by) {
      newH += newY - by;
      newY = by;
    }
    if (newX + newW > bx + bw) {
      newW = bx + bw - newX;
    }
    if (newY + newH > by + bh) {
      newH = by + bh - newY;
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
  ): Promise<ScImageCropperResult> {
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

  setAspectRatio(ratio: number | null): void {
    this.aspectRatio.set(ratio);

    if (ratio === null) return;

    const crop = this.cropArea();
    const bx = this.imageBoundsX();
    const by = this.imageBoundsY();
    const bw = this.imageBoundsW();
    const bh = this.imageBoundsH();
    const currentRatio = crop.width / crop.height;

    let newW = crop.width;
    let newH = crop.height;

    if (currentRatio > ratio) {
      newW = crop.height * ratio;
    } else {
      newH = crop.width / ratio;
    }

    if (newW < this.minWidth()) {
      newW = this.minWidth();
      newH = newW / ratio;
    }
    if (newH < this.minHeight()) {
      newH = this.minHeight();
      newW = newH * ratio;
    }

    const centerX = crop.x + crop.width / 2;
    const centerY = crop.y + crop.height / 2;
    let newX = centerX - newW / 2;
    let newY = centerY - newH / 2;

    newX = Math.max(bx, Math.min(newX, bx + bw - newW));
    newY = Math.max(by, Math.min(newY, by + bh - newH));

    this.cropArea.set({ x: newX, y: newY, width: newW, height: newH });
    this.cropChange.emit(this.cropArea());
  }

  reset(): void {
    this.zoom.set(1);
    this.rotation.set(0);
    this.flipH.set(false);
    this.flipV.set(false);
    this.initializeCropArea();
  }

  protected onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.handleDrag(event.clientX, event.clientY);
    } else if (this.isResizing) {
      this.handleResize(event.clientX, event.clientY);
    }
  }

  protected onTouchMove(event: TouchEvent): void {
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

  protected onMouseUp(): void {
    this.stopInteraction();
  }

  protected onTouchEnd(): void {
    this.stopInteraction();
  }
}
