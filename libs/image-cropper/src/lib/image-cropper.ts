import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CropSettings {
  width: number;
  height: number;
  x: number;
  y: number;
  aspectRatio: string;
  format: string;
  quality: number;
}

interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'sc-image-cropper',
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-background p-4">
      <div class="mx-auto max-w-4xl space-y-6">
        <!-- Header -->
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight">Image Cropper</h1>
          <p class="text-muted-foreground">
            Upload an image and crop it to your desired dimensions
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Cropper Area -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Upload Area -->
            <div
              class="rounded-lg border border-dashed border-border bg-card p-8 text-center"
              [class.hidden]="imageLoaded"
              (keydown)="onKeyDown($event, fileInput)"
              (dragover)="onDragOver($event)"
              (drop)="onDrop($event)"
              (click)="fileInput.click()"
              role="button"
              tabIndex="0"
            >
              <div
                class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center cursor-pointer"
              >
                <svg
                  class="h-10 w-10 text-muted-foreground mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  />
                </svg>
                <h3 class="text-lg font-semibold">Upload an image</h3>
                <p class="text-sm text-muted-foreground mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Choose File
                </button>
              </div>
            </div>

            <input
              class="hidden"
              #fileInput
              (change)="onFileSelected($event)"
              type="file"
              accept="image/*"
            />

            <!-- Crop Area -->
            <div class="rounded-lg border bg-card p-4" [class.hidden]="!imageLoaded">
              <div class="relative aspect-video bg-muted rounded-md overflow-hidden" #cropContainer>
                <!-- Image -->
                @if (imageSrc) {
                  <img
                    class="absolute inset-0 w-full h-full object-contain"
                    #imageElement
                    [src]="imageSrc"
                    (load)="onImageLoad()"
                    alt=""
                  />
                }

                <!-- Crop Overlay -->
                @if (imageLoaded) {
                  <div class="absolute inset-0">
                    <!-- Dark overlay -->
                    <div class="absolute inset-0 bg-black/40"></div>
                    <!-- Crop selection box -->
                    <div
                      class="absolute border-2 border-white shadow-lg cursor-move"
                      [style.left.px]="cropBox.x"
                      [style.top.px]="cropBox.y"
                      [style.width.px]="cropBox.width"
                      [style.height.px]="cropBox.height"
                      (mousedown)="startDrag($event)"
                    >
                      <!-- Clear area inside crop box -->
                      <div class="absolute inset-0 bg-transparent"></div>
                      <!-- Corner handles -->
                      <div
                        class="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-300 cursor-nw-resize"
                        (mousedown)="startResize($event, 'nw')"
                      ></div>
                      <div
                        class="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-300 cursor-ne-resize"
                        (mousedown)="startResize($event, 'ne')"
                      ></div>
                      <div
                        class="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-300 cursor-sw-resize"
                        (mousedown)="startResize($event, 'sw')"
                      ></div>
                      <div
                        class="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-300 cursor-se-resize"
                        (mousedown)="startResize($event, 'se')"
                      ></div>
                      <!-- Edge handles -->
                      <div
                        class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border border-gray-300 cursor-n-resize"
                        (mousedown)="startResize($event, 'n')"
                      ></div>
                      <div
                        class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border border-gray-300 cursor-s-resize"
                        (mousedown)="startResize($event, 's')"
                      ></div>
                      <div
                        class="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border border-gray-300 cursor-w-resize"
                        (mousedown)="startResize($event, 'w')"
                      ></div>
                      <div
                        class="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border border-gray-300 cursor-e-resize"
                        (mousedown)="startResize($event, 'e')"
                      ></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Controls Panel -->
          <div class="space-y-4">
            <!-- Crop Settings -->
            <div class="rounded-lg border bg-card p-4">
              <h3 class="font-semibold mb-4">Crop Settings</h3>
              <div class="space-y-4">
                <!-- Aspect Ratio -->
                <div class="space-y-2">
                  <label class="text-sm font-medium" for="id12">Aspect Ratio</label>
                  <select
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="id12"
                    [(ngModel)]="cropSettings.aspectRatio"
                    (change)="onAspectRatioChange()"
                  >
                    <option value="free">Free</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="4:3">4:3</option>
                    <option value="16:9">16:9</option>
                    <option value="3:2">3:2</option>
                  </select>
                </div>

                <!-- Dimensions -->
                <div class="grid grid-cols-2 gap-2">
                  <div class="space-y-2">
                    <label class="text-sm font-medium" for="id22">Width</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="id22"
                      [(ngModel)]="cropSettings.width"
                      (change)="updateCropBox()"
                      type="number"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium" for="id127">Height</label>

                    <input
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="id127"
                      [(ngModel)]="cropSettings.height"
                      (change)="updateCropBox()"
                      type="number"
                    />
                  </div>
                </div>

                <!-- Position -->
                <div class="grid grid-cols-2 gap-2">
                  <div class="space-y-2">
                    <label class="text-sm font-medium" for="id527">X Position</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="id527"
                      [(ngModel)]="cropSettings.x"
                      (change)="updateCropBox()"
                      type="number"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium" for="id5757">Y Position</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="id5757"
                      [(ngModel)]="cropSettings.y"
                      (change)="updateCropBox()"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Export Settings -->
            <div class="rounded-lg border bg-card p-4">
              <h3 class="font-semibold mb-4">Export Settings</h3>
              <div class="space-y-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium" for="id5117">Format</label>
                  <select
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="id5117"
                    [(ngModel)]="cropSettings.format"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium" for="id5827">Quality</label>
                  <input
                    class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                    id="id5827"
                    [(ngModel)]="cropSettings.quality"
                    type="range"
                    min="1"
                    max="100"
                  />
                  <div class="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>{{ cropSettings.quality }}</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2">
              <button
                class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                [disabled]="!imageLoaded"
                (click)="cropAndDownload()"
              >
                Crop & Download
              </button>
              <button
                class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                [disabled]="!imageLoaded"
                (click)="resetCrop()"
              >
                Reset Crop
              </button>
            </div>

            <!-- Preview -->
            <div class="rounded-lg border bg-card p-4">
              <h3 class="font-semibold mb-4">Preview</h3>
              <div
                class="aspect-square bg-muted rounded-md flex items-center justify-center overflow-hidden"
              >
                @if (imageLoaded) {
                  <canvas class="max-w-full max-h-full" #previewCanvas></canvas>
                } @else {
                  <span class="text-muted-foreground text-sm">Cropped preview</span>
                }
              </div>
              <div class="mt-2 text-xs text-muted-foreground text-center">
                {{ cropSettings.width }} × {{ cropSettings.height }} px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --muted: 210 40% 96%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96%;
        --secondary-foreground: 222.2 84% 4.9%;
        --accent: 210 40% 96%;
        --accent-foreground: 222.2 84% 4.9%;
        --destructive: 0 72.22% 50.59%;
        --destructive-foreground: 210 40% 98%;
        --ring: 222.2 84% 4.9%;
      }

      .bg-background {
        background-color: hsl(var(--background));
      }
      .text-foreground {
        color: hsl(var(--foreground));
      }
      .bg-muted {
        background-color: hsl(var(--muted));
      }
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
      .bg-card {
        background-color: hsl(var(--card));
      }
      .text-card-foreground {
        color: hsl(var(--card-foreground));
      }
      .border-border {
        border-color: hsl(var(--border));
      }
      .border-input {
        border-color: hsl(var(--input));
      }
      .bg-primary {
        background-color: hsl(var(--primary));
      }
      .text-primary-foreground {
        color: hsl(var(--primary-foreground));
      }
      .bg-secondary {
        background-color: hsl(var(--secondary));
      }
      .text-secondary-foreground {
        color: hsl(var(--secondary-foreground));
      }
      .bg-accent {
        background-color: hsl(var(--accent));
      }
      .text-accent-foreground {
        color: hsl(var(--accent-foreground));
      }
    `,
  ],
})
export class ScImageCropper implements OnInit {
  readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  readonly imageElement = viewChild.required<ElementRef<HTMLImageElement>>('imageElement');
  readonly cropContainer = viewChild.required<ElementRef<HTMLDivElement>>('cropContainer');
  readonly previewCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('previewCanvas');

  imageLoaded = false;
  imageSrc = '';
  originalImage: HTMLImageElement | null = null;

  cropSettings: CropSettings = {
    width: 400,
    height: 300,
    x: 0,
    y: 0,
    aspectRatio: 'free',
    format: 'png',
    quality: 90,
  };

  cropBox: CropBox = {
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  };

  private isDragging = false;
  private isResizing = false;
  private resizeHandle = '';
  private startMousePos = { x: 0, y: 0 };
  private startCropBox = { x: 0, y: 0, width: 0, height: 0 };

  ngOnInit() {
    // Add global mouse event listeners
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.loadImage(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadImage(file);
    }
  }

  private loadImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImageLoad() {
    this.imageLoaded = true;
    this.originalImage = this.imageElement().nativeElement;
    this.resetCrop();
    this.updatePreview();
  }

  resetCrop() {
    const cropContainer = this.cropContainer();
    if (!cropContainer) return;

    const containerRect = cropContainer.nativeElement.getBoundingClientRect();
    this.cropBox = {
      x: containerRect.width * 0.25,
      y: containerRect.height * 0.25,
      width: containerRect.width * 0.5,
      height: containerRect.height * 0.5,
    };

    this.updateCropSettings();
    this.updatePreview();
  }

  onAspectRatioChange() {
    if (this.cropSettings.aspectRatio !== 'free') {
      const [widthRatio, heightRatio] = this.cropSettings.aspectRatio.split(':').map(Number);
      const aspectRatio = widthRatio / heightRatio;

      this.cropSettings.height = Math.round(this.cropSettings.width / aspectRatio);
      this.updateCropBox();
    }
  }

  updateCropBox() {
    this.cropBox.width = this.cropSettings.width;
    this.cropBox.height = this.cropSettings.height;
    this.cropBox.x = this.cropSettings.x;
    this.cropBox.y = this.cropSettings.y;
    this.updatePreview();
  }

  private updateCropSettings() {
    this.cropSettings.width = Math.round(this.cropBox.width);
    this.cropSettings.height = Math.round(this.cropBox.height);
    this.cropSettings.x = Math.round(this.cropBox.x);
    this.cropSettings.y = Math.round(this.cropBox.y);
  }

  startDrag(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
    this.startMousePos = { x: event.clientX, y: event.clientY };
    this.startCropBox = { ...this.cropBox };
  }

  startResize(event: MouseEvent, handle: string) {
    event.preventDefault();
    event.stopPropagation();
    this.isResizing = true;
    this.resizeHandle = handle;
    this.startMousePos = { x: event.clientX, y: event.clientY };
    this.startCropBox = { ...this.cropBox };
  }

  private onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.startMousePos.x;
      const deltaY = event.clientY - this.startMousePos.y;

      this.cropBox.x = this.startCropBox.x + deltaX;
      this.cropBox.y = this.startCropBox.y + deltaY;

      // Constrain to container bounds
      this.constrainCropBox();
      this.updateCropSettings();
      this.updatePreview();
    } else if (this.isResizing) {
      this.handleResize(event);
    }
  }

  private handleResize(event: MouseEvent) {
    const deltaX = event.clientX - this.startMousePos.x;
    const deltaY = event.clientY - this.startMousePos.y;

    switch (this.resizeHandle) {
      case 'nw':
        this.cropBox.x = this.startCropBox.x + deltaX;
        this.cropBox.y = this.startCropBox.y + deltaY;
        this.cropBox.width = this.startCropBox.width - deltaX;
        this.cropBox.height = this.startCropBox.height - deltaY;
        break;
      case 'ne':
        this.cropBox.y = this.startCropBox.y + deltaY;
        this.cropBox.width = this.startCropBox.width + deltaX;
        this.cropBox.height = this.startCropBox.height - deltaY;
        break;
      case 'sw':
        this.cropBox.x = this.startCropBox.x + deltaX;
        this.cropBox.width = this.startCropBox.width - deltaX;
        this.cropBox.height = this.startCropBox.height + deltaY;
        break;
      case 'se':
        this.cropBox.width = this.startCropBox.width + deltaX;
        this.cropBox.height = this.startCropBox.height + deltaY;
        break;
      case 'n':
        this.cropBox.y = this.startCropBox.y + deltaY;
        this.cropBox.height = this.startCropBox.height - deltaY;
        break;
      case 's':
        this.cropBox.height = this.startCropBox.height + deltaY;
        break;
      case 'w':
        this.cropBox.x = this.startCropBox.x + deltaX;
        this.cropBox.width = this.startCropBox.width - deltaX;
        break;
      case 'e':
        this.cropBox.width = this.startCropBox.width + deltaX;
        break;
    }

    // Ensure minimum size
    this.cropBox.width = Math.max(50, this.cropBox.width);
    this.cropBox.height = Math.max(50, this.cropBox.height);

    this.constrainCropBox();
    this.updateCropSettings();
    this.updatePreview();
  }

  private onMouseUp() {
    this.isDragging = false;
    this.isResizing = false;
    this.resizeHandle = '';
  }

  private constrainCropBox() {
    const cropContainer = this.cropContainer();
    if (!cropContainer) return;

    const containerRect = cropContainer.nativeElement.getBoundingClientRect();

    // Constrain position
    this.cropBox.x = Math.max(
      0,
      Math.min(this.cropBox.x, containerRect.width - this.cropBox.width),
    );
    this.cropBox.y = Math.max(
      0,
      Math.min(this.cropBox.y, containerRect.height - this.cropBox.height),
    );

    // Constrain size
    this.cropBox.width = Math.min(this.cropBox.width, containerRect.width - this.cropBox.x);
    this.cropBox.height = Math.min(this.cropBox.height, containerRect.height - this.cropBox.y);
  }

  private updatePreview() {
    const previewCanvas = this.previewCanvas();
    if (!this.originalImage || !previewCanvas) return;

    const canvas = previewCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.cropSettings.width;
    canvas.height = this.cropSettings.height;

    // Calculate the actual image dimensions and crop area
    const containerRect = this.cropContainer().nativeElement.getBoundingClientRect();
    const scaleX = this.originalImage.naturalWidth / containerRect.width;
    const scaleY = this.originalImage.naturalHeight / containerRect.height;

    const sourceX = this.cropBox.x * scaleX;
    const sourceY = this.cropBox.y * scaleY;
    const sourceWidth = this.cropBox.width * scaleX;
    const sourceHeight = this.cropBox.height * scaleY;

    ctx.drawImage(
      this.originalImage,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  cropAndDownload() {
    const previewCanvas = this.previewCanvas();
    if (!this.originalImage || !previewCanvas) return;

    const canvas = previewCanvas.nativeElement;
    const mimeType = `image/${this.cropSettings.format}`;
    const quality = this.cropSettings.quality / 100;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `cropped-image.${this.cropSettings.format}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      },
      mimeType,
      quality,
    );
  }

  onKeyDown(event: KeyboardEvent, fileInput: any): void {
    if (event.key === 'Enter' || event.key === ' ') {
      fileInput.click();
      event.preventDefault(); // Prevent scrolling for space key
    }
  }
}
