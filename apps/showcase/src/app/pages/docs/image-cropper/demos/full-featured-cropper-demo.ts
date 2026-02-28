import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
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
  ScImageCropperZoomSlider,
  ScImageCropperRotateLeft,
  ScImageCropperRotateRight,
  ScImageCropperFlipH,
  ScImageCropperFlipV,
  ScImageCropperAspectRatio,
  ScImageCropperPreview,
  ScImageCropperReset,
  ScImageCropperFileInput,
  ScImageCropperResult,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
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
    ScImageCropperZoomSlider,
    ScImageCropperRotateLeft,
    ScImageCropperRotateRight,
    ScImageCropperFlipH,
    ScImageCropperFlipV,
    ScImageCropperAspectRatio,
    ScImageCropperPreview,
    ScImageCropperReset,
    ScImageCropperFileInput,
    ScButton,
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
        <div scImageCropperSelection>
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
          <button
            scButton
            scImageCropperRotateLeft
            variant="outline"
            size="icon"
            aria-label="Rotate left"
          >
            <svg siRotateCcwIcon class="size-4"></svg>
          </button>
          <button
            scButton
            scImageCropperRotateRight
            variant="outline"
            size="icon"
            aria-label="Rotate right"
          >
            <svg siRotateCwIcon class="size-4"></svg>
          </button>
          <button
            scButton
            scImageCropperFlipH
            variant="outline"
            size="icon"
            aria-label="Flip horizontal"
          >
            <svg siFlipHorizontal2Icon class="size-4"></svg>
          </button>
          <button
            scButton
            scImageCropperFlipV
            variant="outline"
            size="icon"
            aria-label="Flip vertical"
          >
            <svg siFlipVertical2Icon class="size-4"></svg>
          </button>
        </div>

        <!-- Zoom -->
        <div class="flex items-center gap-2">
          <button
            scButton
            scImageCropperZoomOut
            variant="outline"
            size="icon"
            aria-label="Zoom out"
          >
            <svg siZoomOutIcon class="size-4"></svg>
          </button>

          <div scImageCropperZoomSlider></div>

          <button
            scButton
            scImageCropperZoomIn
            variant="outline"
            size="icon"
            aria-label="Zoom in"
          >
            <svg siZoomInIcon class="size-4"></svg>
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
          ></div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
