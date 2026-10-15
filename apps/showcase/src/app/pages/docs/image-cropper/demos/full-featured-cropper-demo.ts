import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';
import {
  ScImageCropper,
  ScImageCropperAspectRatio,
  ScImageCropperCanvas,
  ScImageCropperDragRegion,
  ScImageCropperFileInput,
  ScImageCropperFlipH,
  ScImageCropperFlipV,
  ScImageCropperGrid,
  ScImageCropperHandle,
  ScImageCropperImage,
  ScImageCropperOverlay,
  ScImageCropperPreview,
  ScImageCropperPreviewImage,
  ScImageCropperReset,
  ScImageCropperResult,
  ScImageCropperRotateLeft,
  ScImageCropperRotateRight,
  ScImageCropperSelection,
  ScImageCropperZoom,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
} from '@semantic-components/ui-lab';
import {
  SiFlipHorizontal2Icon,
  SiFlipVertical2Icon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-full-featured-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperCanvas,
    ScImageCropperImage,
    ScImageCropperOverlay,
    ScImageCropperSelection,
    ScImageCropperDragRegion,
    ScImageCropperHandle,
    ScImageCropperGrid,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScImageCropperZoom,
    ScImageCropperRotateLeft,
    ScImageCropperRotateRight,
    ScImageCropperFlipH,
    ScImageCropperFlipV,
    ScImageCropperAspectRatio,
    ScImageCropperPreview,
    ScImageCropperPreviewImage,
    ScSlider,
    ScImageCropperReset,
    ScImageCropperFileInput,
    SiFlipHorizontal2Icon,
    SiFlipVertical2Icon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div scImageCropper [containerHeight]="350" class="space-y-4">
      <div
        scImageCropperCanvas
        #canvas="scImageCropperCanvas"
        class="overflow-hidden rounded-lg border"
      >
        <img scImageCropperImage [src]="imageSrc()" alt="Image to crop" />
        <div scImageCropperOverlay></div>
        <div scImageCropperSelection aria-label="Crop selection">
          <div scImageCropperDragRegion></div>
          <div scImageCropperHandle position="top-left"></div>
          <div scImageCropperHandle position="top-right"></div>
          <div scImageCropperHandle position="bottom-left"></div>
          <div scImageCropperHandle position="bottom-right"></div>
          <div scImageCropperHandle position="top"></div>
          <div scImageCropperHandle position="right"></div>
          <div scImageCropperHandle position="bottom"></div>
          <div scImageCropperHandle position="left"></div>
          <div scImageCropperGrid [columns]="3" [rows]="3"></div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <!-- Aspect ratio -->
        <div class="flex items-center gap-1">
          @for (option of aspectRatioOptions; track option.value) {
            <button [scImageCropperAspectRatio]="option.value">
              {{ option.label }}
            </button>
          }
        </div>

        <!-- Rotate & Flip -->
        <div class="flex items-center gap-1">
          <button scImageCropperRotateLeft>
            <svg siRotateCcwIcon class="size-4"></svg>
            <span class="sr-only">Rotate left</span>
          </button>
          <button scImageCropperRotateRight>
            <svg siRotateCwIcon class="size-4"></svg>
            <span class="sr-only">Rotate right</span>
          </button>
          <button scImageCropperFlipH>
            <svg siFlipHorizontal2Icon class="size-4"></svg>
            <span class="sr-only">Flip horizontal</span>
          </button>
          <button scImageCropperFlipV>
            <svg siFlipVertical2Icon class="size-4"></svg>
            <span class="sr-only">Flip vertical</span>
          </button>
        </div>

        <!-- Zoom -->
        <div class="flex items-center gap-2">
          <button scImageCropperZoomOut>
            <svg siZoomOutIcon class="size-4"></svg>
            <span class="sr-only">Zoom out</span>
          </button>

          <div class="flex items-center gap-2">
            <input
              scSlider
              scImageCropperZoom
              #zoom="scImageCropperZoom"
              aria-label="Zoom"
              class="flex-1"
            />
            <span class="text-muted-foreground min-w-[50px] text-center text-sm"
              >{{ zoom.percent() }}%</span
            >
          </div>

          <button scImageCropperZoomIn>
            <svg siZoomInIcon class="size-4"></svg>
            <span class="sr-only">Zoom in</span>
          </button>
        </div>
      </div>

      <div class="flex gap-8">
        <div class="flex-1 space-y-4">
          <!-- File input -->
          <label
            class="hover:bg-accent inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm"
          >
            Upload Image
            <input scImageCropperFileInput accept="image/*" class="hidden" />
          </label>

          <!-- Actions -->
          <div class="flex gap-4">
            <button
              type="button"
              class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
              (click)="cropImage(canvas)"
            >
              Crop Image
            </button>
            <button
              scImageCropperReset
              type="button"
              class="hover:bg-accent rounded-md border px-4 py-2"
            >
              Reset
            </button>
          </div>

          @if (croppedImage()) {
            <div class="space-y-2">
              <p class="text-sm font-medium">Cropped Result:</p>
              <img
                [src]="croppedImage()"
                class="max-w-xs rounded-md border"
                alt="Cropped result"
              />
              <a
                [href]="croppedImage()"
                download="cropped-image.png"
                class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-md px-4 py-2 text-sm"
              >
                Download
              </a>
            </div>
          }
        </div>

        <!-- Preview -->
        <div class="space-y-2">
          <p class="text-sm font-medium">Preview:</p>
          <div
            scImageCropperPreview
            [width]="150"
            [height]="150"
            class="rounded-md border"
          >
            <img scImageCropperPreviewImage alt="Crop preview" />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FullFeaturedCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );
  readonly croppedImage = signal<string | null>(null);

  readonly aspectRatioOptions = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
  ];

  async cropImage(
    canvas: InstanceType<typeof ScImageCropperCanvas>,
  ): Promise<void> {
    try {
      const result: ScImageCropperResult = await canvas.crop();
      this.croppedImage.set(result.dataUrl);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }
}
