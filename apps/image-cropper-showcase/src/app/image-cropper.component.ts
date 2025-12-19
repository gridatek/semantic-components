import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';

interface CropPosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Position {
  x: number;
  y: number;
}

interface CropInfo {
  originalWidth: number;
  originalHeight: number;
  croppedWidth: number;
  croppedHeight: number;
  aspectRatio: string;
  estimatedSize: number;
}

@Component({
  selector: 'app-image-cropper',
  imports: [],
  template: `
    <!-- Upload Section -->
    <div class="upload-section">
      <label class="file-input-wrapper" for="imageInput">
        📁 Choose Image File
        <input
          class="file-input"
          id="imageInput"
          #fileInput
          (change)="onFileSelect($event)"
          type="file"
          accept="image/*"
        />
      </label>

      <div class="demo-buttons">
        <button class="demo-btn" (click)="loadDemoImage('landscape')">🏔️ Landscape</button>
        <button class="demo-btn" (click)="loadDemoImage('portrait')">👤 Portrait</button>
        <button class="demo-btn" (click)="loadDemoImage('square')">⬜ Square</button>
        <button class="demo-btn" (click)="loadDemoImage('wide')">📐 Wide</button>
      </div>
    </div>

    <!-- Cropper Container -->
    <div class="cropper-container">
      <!-- Original Image & Cropper -->
      <div class="cropper-section">
        <h3>📷 Original Image</h3>
        <div class="image-cropper-container" #cropperContainer>
          @if (!currentImage()) {
            <div class="no-image">
              <p>Select an image to start cropping</p>
            </div>
          }

          @if (currentImage()) {
            <div class="cropper-canvas">
              <img
                class="source-image"
                #sourceImage
                [src]="currentImage()"
                (load)="onImageLoad()"
                crossorigin="anonymous"
                alt="Source image"
              />
              <div class="crop-overlay" [style.display]="showOverlay() ? 'block' : 'none'">
                <div
                  class="crop-area"
                  #cropArea
                  [style.left.px]="cropPosition().x1"
                  [style.top.px]="cropPosition().y1"
                  [style.width.px]="cropPosition().x2 - cropPosition().x1"
                  [style.height.px]="cropPosition().y2 - cropPosition().y1"
                  (mousedown)="startMove($event)"
                  (touchstart)="startMove($event)"
                >
                  <!-- Corner resize handles -->
                  <div
                    class="resize-handle tl"
                    (mousedown)="startResize($event, 'tl')"
                    (touchstart)="startResize($event, 'tl')"
                  ></div>
                  <div
                    class="resize-handle tr"
                    (mousedown)="startResize($event, 'tr')"
                    (touchstart)="startResize($event, 'tr')"
                  ></div>
                  <div
                    class="resize-handle bl"
                    (mousedown)="startResize($event, 'bl')"
                    (touchstart)="startResize($event, 'bl')"
                  ></div>
                  <div
                    class="resize-handle br"
                    (mousedown)="startResize($event, 'br')"
                    (touchstart)="startResize($event, 'br')"
                  ></div>
                  <!-- Side resize handles -->
                  <div
                    class="resize-handle t"
                    (mousedown)="startResize($event, 't')"
                    (touchstart)="startResize($event, 't')"
                  ></div>
                  <div
                    class="resize-handle r"
                    (mousedown)="startResize($event, 'r')"
                    (touchstart)="startResize($event, 'r')"
                  ></div>
                  <div
                    class="resize-handle b"
                    (mousedown)="startResize($event, 'b')"
                    (touchstart)="startResize($event, 'b')"
                  ></div>
                  <div
                    class="resize-handle l"
                    (mousedown)="startResize($event, 'l')"
                    (touchstart)="startResize($event, 'l')"
                  ></div>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="preset-buttons">
          <button
            class="preset-btn"
            [class.active]="aspectRatio() === null"
            (click)="setAspectRatio(null)"
          >
            Free
          </button>
          <button
            class="preset-btn"
            [class.active]="aspectRatio() === 1"
            (click)="setAspectRatio(1)"
          >
            1:1
          </button>
          <button
            class="preset-btn"
            [class.active]="aspectRatio() === 4 / 3"
            (click)="setAspectRatio(4 / 3)"
          >
            4:3
          </button>
          <button
            class="preset-btn"
            [class.active]="aspectRatio() === 16 / 9"
            (click)="setAspectRatio(16 / 9)"
          >
            16:9
          </button>
          <button
            class="preset-btn"
            [class.active]="aspectRatio() === 3 / 2"
            (click)="setAspectRatio(3 / 2)"
          >
            3:2
          </button>
        </div>

        <div class="controls">
          <button class="control-btn" [disabled]="!currentImage()" (click)="cropImage()">
            ✂️ Crop Image
          </button>
          <button class="control-btn" [disabled]="!currentImage()" (click)="resetCrop()">
            🔄 Reset
          </button>
          <button class="control-btn" [disabled]="!croppedImageData()" (click)="downloadImage()">
            💾 Download
          </button>
        </div>
      </div>

      <!-- Cropped Result -->
      <div class="result-section">
        <h3>✨ Cropped Result</h3>
        <div id="resultContainer">
          @if (!croppedImageData()) {
            <div class="no-image">
              <p>Cropped image will appear here</p>
            </div>
          }
          @if (croppedImageData()) {
            <img class="result-image" [src]="croppedImageData()" alt="Cropped image" />
          }
        </div>

        @if (cropInfo()) {
          <div class="crop-info">
            <h4>📊 Crop Information</h4>
            <p>Original: {{ cropInfo()!.originalWidth }} × {{ cropInfo()!.originalHeight }}px</p>
            <p>Cropped: {{ cropInfo()!.croppedWidth }} × {{ cropInfo()!.croppedHeight }}px</p>
            <p>Aspect Ratio: {{ cropInfo()!.aspectRatio }}:1</p>
            <p>Estimated Size: ~{{ cropInfo()!.estimatedSize }}KB</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperComponent implements OnInit, OnDestroy {
  readonly cropperContainer = viewChild.required<ElementRef>('cropperContainer');
  readonly sourceImage = viewChild.required<ElementRef<HTMLImageElement>>('sourceImage');
  readonly cropArea = viewChild.required<ElementRef>('cropArea');

  currentImage = signal<string | null>(null);
  showOverlay = signal(false);
  aspectRatio = signal<number | null>(null);
  croppedImageData = signal<string | null>(null);

  cropPosition = signal<CropPosition>({ x1: 0, y1: 0, x2: 0, y2: 0 });
  startPosition: Position = { x: 0, y: 0 };
  moveType: 'crop' | 'resize' = 'crop';
  resizeHandle: string | null = null;
  isCropping = false;

  cropInfo = signal<CropInfo | null>(null);

  // Store crop position as percentages for responsiveness
  private cropPercentages = { x1: 0.1, y1: 0.1, x2: 0.9, y2: 0.9 };

  // Bound methods for proper event listener cleanup
  private readonly boundOnMove = this.onMove.bind(this);
  private readonly boundEndMove = this.endMove.bind(this);

  demoImages = {
    landscape: 'https://picsum.photos/800/600?random=1',
    portrait: 'https://picsum.photos/600/800?random=2',
    square: 'https://picsum.photos/600/600?random=3',
    wide: 'https://picsum.photos/1000/400?random=4',
  };

  @HostListener('window:resize')
  onWindowResize() {
    if (this.showOverlay() && this.sourceImage()) {
      // Debounce resize events
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.updateCropPositionFromPercentages();
      }, 100);
    }
  }

  private resizeTimeout: any;

  ngOnInit() {
    // Load demo image by default
    setTimeout(() => this.loadDemoImage('landscape'), 500);
  }

  ngOnDestroy() {
    this.cleanup();
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  private cleanup() {
    if (this.isCropping) {
      document.removeEventListener('mousemove', this.boundOnMove);
      document.removeEventListener('mouseup', this.boundEndMove);
      document.removeEventListener('touchmove', this.boundOnMove);
      document.removeEventListener('touchend', this.boundEndMove);
    }
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loadImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  loadDemoImage(type: keyof typeof this.demoImages) {
    this.loadImage(this.demoImages[type]);
  }

  loadImage(src: string) {
    this.currentImage.set(src);
    this.showOverlay.set(false);
    this.croppedImageData.set(null);
    this.cropInfo.set(null);
    // Reset crop percentages
    this.cropPercentages = { x1: 0.1, y1: 0.1, x2: 0.9, y2: 0.9 };
  }

  onImageLoad() {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      this.showOverlay.set(true);
      this.initializeCropArea();
    }, 100);
  }

  private initializeCropArea() {
    this.updateCropPositionFromPercentages();
  }

  private updateCropPositionFromPercentages() {
    const sourceImage = this.sourceImage();
    const cropperContainer = this.cropperContainer();
    if (!sourceImage || !cropperContainer) return;

    const container = cropperContainer.nativeElement;
    const img = sourceImage.nativeElement;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Calculate image position within container (relative to container)
    const imgLeft = imgRect.left - containerRect.left;
    const imgTop = imgRect.top - containerRect.top;

    // Convert percentages to pixel positions
    const cropWidth = imgRect.width * (this.cropPercentages.x2 - this.cropPercentages.x1);
    const cropHeight = imgRect.height * (this.cropPercentages.y2 - this.cropPercentages.y1);

    const x1 = imgLeft + imgRect.width * this.cropPercentages.x1;
    const y1 = imgTop + imgRect.height * this.cropPercentages.y1;

    // Apply aspect ratio if set
    const aspectRatio = this.aspectRatio();
    const finalX2 = x1 + cropWidth;
    let finalY2 = y1 + cropHeight;

    if (aspectRatio) {
      const currentRatio = cropWidth / cropHeight;
      if (Math.abs(currentRatio - aspectRatio) > 0.01) {
        const newHeight = cropWidth / aspectRatio;
        const centerY = y1 + cropHeight / 2;
        const finalY1 = Math.max(imgTop, centerY - newHeight / 2);
        finalY2 = Math.min(imgTop + imgRect.height, finalY1 + newHeight);
      }
    }

    this.cropPosition.set({
      x1: Math.max(imgLeft, x1),
      y1: Math.max(imgTop, y1),
      x2: Math.min(imgLeft + imgRect.width, finalX2),
      y2: Math.min(imgTop + imgRect.height, finalY2),
    });
  }

  private updateCropPercentages() {
    const sourceImage = this.sourceImage();
    const cropperContainer = this.cropperContainer();
    if (!sourceImage || !cropperContainer) return;

    const container = cropperContainer.nativeElement;
    const img = sourceImage.nativeElement;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const imgLeft = imgRect.left - containerRect.left;
    const imgTop = imgRect.top - containerRect.top;

    const position = this.cropPosition();

    // Convert pixel positions to percentages
    this.cropPercentages = {
      x1: (position.x1 - imgLeft) / imgRect.width,
      y1: (position.y1 - imgTop) / imgRect.height,
      x2: (position.x2 - imgLeft) / imgRect.width,
      y2: (position.y2 - imgTop) / imgRect.height,
    };
  }

  startMove(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.moveType = 'crop';
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    this.startPosition = { x: clientX, y: clientY };
    this.isCropping = true;

    document.addEventListener('mousemove', this.boundOnMove);
    document.addEventListener('mouseup', this.boundEndMove);
    document.addEventListener('touchmove', this.boundOnMove, { passive: false });
    document.addEventListener('touchend', this.boundEndMove);
  }

  startResize(event: MouseEvent | TouchEvent, handle: string) {
    event.preventDefault();
    event.stopPropagation();

    this.moveType = 'resize';
    this.resizeHandle = handle;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    this.startPosition = { x: clientX, y: clientY };
    this.isCropping = true;

    document.addEventListener('mousemove', this.boundOnMove);
    document.addEventListener('mouseup', this.boundEndMove);
    document.addEventListener('touchmove', this.boundOnMove, { passive: false });
    document.addEventListener('touchend', this.boundEndMove);
  }

  onMove(event: MouseEvent | TouchEvent) {
    if (!this.isCropping) return;

    event.preventDefault();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX = clientX - this.startPosition.x;
    const deltaY = clientY - this.startPosition.y;

    this.startPosition = { x: clientX, y: clientY };

    if (this.moveType === 'crop') {
      this.moveCropArea(deltaX, deltaY);
    } else if (this.moveType === 'resize') {
      this.resizeCropArea(deltaX, deltaY);
    }
  }

  moveCropArea(deltaX: number, deltaY: number) {
    const img = this.sourceImage().nativeElement;
    const container = this.cropperContainer().nativeElement;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const imgLeft = imgRect.left - containerRect.left;
    const imgTop = imgRect.top - containerRect.top;
    const imgRight = imgLeft + imgRect.width;
    const imgBottom = imgTop + imgRect.height;

    const width = this.cropPosition().x2 - this.cropPosition().x1;
    const height = this.cropPosition().y2 - this.cropPosition().y1;

    let x1 = this.cropPosition().x1 + deltaX;
    let y1 = this.cropPosition().y1 + deltaY;

    // Keep within image bounds
    x1 = Math.max(imgLeft, Math.min(x1, imgRight - width));
    y1 = Math.max(imgTop, Math.min(y1, imgBottom - height));

    this.cropPosition.set({
      x1,
      y1,
      x2: x1 + width,
      y2: y1 + height,
    });

    this.updateCropPercentages();
  }

  resizeCropArea(deltaX: number, deltaY: number) {
    const img = this.sourceImage().nativeElement;
    const container = this.cropperContainer().nativeElement;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const imgLeft = imgRect.left - containerRect.left;
    const imgTop = imgRect.top - containerRect.top;
    const imgRight = imgLeft + imgRect.width;
    const imgBottom = imgTop + imgRect.height;

    let { x1, y1, x2, y2 } = this.cropPosition();

    const minSize = 50;

    switch (this.resizeHandle) {
      case 'tl':
        x1 = Math.min(x1 + deltaX, x2 - minSize);
        y1 = Math.min(y1 + deltaY, y2 - minSize);
        break;
      case 'tr':
        x2 = Math.max(x2 + deltaX, x1 + minSize);
        y1 = Math.min(y1 + deltaY, y2 - minSize);
        break;
      case 'bl':
        x1 = Math.min(x1 + deltaX, x2 - minSize);
        y2 = Math.max(y2 + deltaY, y1 + minSize);
        break;
      case 'br':
        x2 = Math.max(x2 + deltaX, x1 + minSize);
        y2 = Math.max(y2 + deltaY, y1 + minSize);
        break;
      case 't':
        y1 = Math.min(y1 + deltaY, y2 - minSize);
        break;
      case 'r':
        x2 = Math.max(x2 + deltaX, x1 + minSize);
        break;
      case 'b':
        y2 = Math.max(y2 + deltaY, y1 + minSize);
        break;
      case 'l':
        x1 = Math.min(x1 + deltaX, x2 - minSize);
        break;
    }

    // Maintain aspect ratio if set
    const aspectRatio = this.aspectRatio();
    if (aspectRatio) {
      const width = x2 - x1;
      const height = y2 - y1;

      if (Math.abs(width / height - aspectRatio) > 0.01) {
        switch (this.resizeHandle) {
          case 'tl':
          case 'tr':
          case 'bl':
          case 'br':
            // For corner handles, adjust height based on width
            if (this.resizeHandle === 'tl' || this.resizeHandle === 'tr') {
              y1 = y2 - width / aspectRatio;
            } else {
              y2 = y1 + width / aspectRatio;
            }
            break;
          case 't':
          case 'b': {
            // For top/bottom handles, adjust width based on height
            const newWidth = height * aspectRatio;
            const centerX = (x1 + x2) / 2;
            x1 = centerX - newWidth / 2;
            x2 = centerX + newWidth / 2;
            break;
          }
          case 'l':
          case 'r': {
            // For left/right handles, adjust height based on width
            const newHeight = width / aspectRatio;
            const centerY = (y1 + y2) / 2;
            y1 = centerY - newHeight / 2;
            y2 = centerY + newHeight / 2;
            break;
          }
        }
      }
    }

    // Keep within image bounds
    x1 = Math.max(imgLeft, x1);
    y1 = Math.max(imgTop, y1);
    x2 = Math.min(imgRight, x2);
    y2 = Math.min(imgBottom, y2);

    // Ensure minimum size is maintained
    if (x2 - x1 < minSize) {
      if (this.resizeHandle?.includes('l')) x1 = x2 - minSize;
      else x2 = x1 + minSize;
    }
    if (y2 - y1 < minSize) {
      if (this.resizeHandle?.includes('t')) y1 = y2 - minSize;
      else y2 = y1 + minSize;
    }

    this.cropPosition.set({ x1, y1, x2, y2 });
    this.updateCropPercentages();
  }

  endMove(event: MouseEvent | TouchEvent) {
    if (!this.isCropping) return;

    this.isCropping = false;
    this.resizeHandle = null;

    document.removeEventListener('mousemove', this.boundOnMove);
    document.removeEventListener('mouseup', this.boundEndMove);
    document.removeEventListener('touchmove', this.boundOnMove);
    document.removeEventListener('touchend', this.boundEndMove);
  }

  setAspectRatio(ratio: number | null) {
    this.aspectRatio.set(ratio);

    const sourceImage = this.sourceImage();
    if (sourceImage && this.showOverlay() && ratio) {
      // Adjust current crop area to match aspect ratio
      const width = this.cropPosition().x2 - this.cropPosition().x1;
      const newHeight = width / ratio;
      const centerY = (this.cropPosition().y1 + this.cropPosition().y2) / 2;

      const img = sourceImage.nativeElement;
      const container = this.cropperContainer().nativeElement;

      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      const imgTop = imgRect.top - containerRect.top;
      const imgBottom = imgTop + imgRect.height;

      let y1 = centerY - newHeight / 2;
      let y2 = centerY + newHeight / 2;

      // Ensure it fits within image bounds
      if (y2 > imgBottom) {
        const overflow = y2 - imgBottom;
        y1 -= overflow;
        y2 -= overflow;
      }
      if (y1 < imgTop) {
        const overflow = imgTop - y1;
        y1 += overflow;
        y2 += overflow;
      }

      this.cropPosition.update((prev) => ({
        ...prev,
        y1,
        y2,
      }));

      this.updateCropPercentages();
    }
  }

  cropImage() {
    const sourceImage = this.sourceImage();
    if (!sourceImage || !this.showOverlay()) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = sourceImage.nativeElement;

    // Calculate crop dimensions relative to original image
    const imgRect = img.getBoundingClientRect();
    const containerRect = this.cropperContainer().nativeElement.getBoundingClientRect();

    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;

    // Calculate correct crop position relative to image
    const imgLeft = imgRect.left - containerRect.left;
    const imgTop = imgRect.top - containerRect.top;

    const cropWidth = (this.cropPosition().x2 - this.cropPosition().x1) * scaleX;
    const cropHeight = (this.cropPosition().y2 - this.cropPosition().y1) * scaleY;
    const cropX = (this.cropPosition().x1 - imgLeft) * scaleX;
    const cropY = (this.cropPosition().y1 - imgTop) * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
      img,
      Math.max(0, cropX),
      Math.max(0, cropY),
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight,
    );

    this.croppedImageData.set(canvas.toDataURL('image/png'));

    // Show crop info
    this.showCropInfo(cropWidth, cropHeight);
  }

  showCropInfo(width: number, height: number) {
    const img = this.sourceImage().nativeElement;
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    // Estimate file size (rough approximation)
    const estimatedSize = Math.round(((this.croppedImageData()?.length ?? 0) * 0.75) / 1024);

    this.cropInfo.set({
      originalWidth,
      originalHeight,
      croppedWidth: Math.round(width),
      croppedHeight: Math.round(height),
      aspectRatio: (width / height).toFixed(2),
      estimatedSize,
    });
  }

  resetCrop() {
    if (this.sourceImage()) {
      // Reset to default crop percentages
      this.cropPercentages = { x1: 0.1, y1: 0.1, x2: 0.9, y2: 0.9 };
      this.onImageLoad();
    }
  }

  downloadImage() {
    const croppedImageData = this.croppedImageData();
    if (croppedImageData) {
      const link = document.createElement('a');
      link.download = `cropped-image-${Date.now()}.png`;
      link.href = croppedImageData;
      link.click();
    }
  }
}
