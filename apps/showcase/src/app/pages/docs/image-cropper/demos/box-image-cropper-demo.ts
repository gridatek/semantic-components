import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScImageCropper,
  ScImageCropperAspectRatio,
  ScImageCropperFlipHorizontal,
  ScImageCropperFlipVertical,
  ScImageCropperGrid,
  ScImageCropperHandle,
  ScImageCropperImage,
  ScImageCropperPreview,
  ScImageCropperPreviewImage,
  ScImageCropperReset,
  ScImageCropperRotateLeft,
  ScImageCropperRotateRight,
  ScImageCropperSelection,
  ScImageCropperStage,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
  ScSlider,
} from '@semantic-components/ui';
import {
  SiFlipHorizontal2Icon,
  SiFlipVertical2Icon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

/**
 * A box over the image, resized by its handles: ratios, turns, flips, zoom,
 * a live preview, your own file, and the crop as a file to download.
 */
@Component({
  selector: 'app-box-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperStage,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperHandle,
    ScImageCropperGrid,
    ScImageCropperAspectRatio,
    ScImageCropperRotateLeft,
    ScImageCropperRotateRight,
    ScImageCropperFlipHorizontal,
    ScImageCropperFlipVertical,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScImageCropperReset,
    ScImageCropperPreview,
    ScImageCropperPreviewImage,
    ScButton,
    ScSlider,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiFlipHorizontal2Icon,
    SiFlipVertical2Icon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div scImageCropper #cropper="scImageCropper" [(zoom)]="zoom">
      <div class="flex flex-wrap gap-6">
        <div scImageCropperStage class="h-80 min-w-0 flex-1 rounded-lg border">
          <img scImageCropperImage [src]="src()" alt="Mountains at dawn" />
          <div scImageCropperSelection aria-label="Crop area">
            <div scImageCropperGrid></div>
            @for (handle of handles; track handle) {
              <div [scImageCropperHandle]="handle"></div>
            }
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium">Preview</p>
          <div scImageCropperPreview class="h-28 w-40 rounded-md border">
            <img scImageCropperPreviewImage alt="The crop" />
          </div>
          <p class="text-muted-foreground text-xs tabular-nums">
            {{ round(cropper.area().width) }} ×
            {{ round(cropper.area().height) }} px
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Aspect ratio" class="flex gap-1">
          @for (ratio of ratios; track ratio.label) {
            <button [scImageCropperAspectRatio]="ratio.value">
              {{ ratio.label }}
            </button>
          }
        </div>
        <button scImageCropperRotateLeft>
          <svg siRotateCcwIcon></svg>
          <span class="sr-only">Rotate left</span>
        </button>
        <button scImageCropperRotateRight>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate right</span>
        </button>
        <button scImageCropperFlipHorizontal>
          <svg siFlipHorizontal2Icon></svg>
          <span class="sr-only">Flip horizontally</span>
        </button>
        <button scImageCropperFlipVertical>
          <svg siFlipVertical2Icon></svg>
          <span class="sr-only">Flip vertically</span>
        </button>
        <button scImageCropperZoomOut>
          <svg siZoomOutIcon></svg>
          <span class="sr-only">Zoom out</span>
        </button>
        <input
          scSlider
          aria-label="Zoom"
          [min]="cropper.minZoom()"
          [max]="cropper.maxZoom()"
          [step]="0.01"
          [(value)]="zoom"
          class="w-40"
        />
        <span class="text-muted-foreground w-12 text-sm tabular-nums"
          >{{ percent() }}%</span
        >
        <button scImageCropperZoomIn>
          <svg siZoomInIcon></svg>
          <span class="sr-only">Zoom in</span>
        </button>
        <button scImageCropperReset size="default">Reset</button>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <label
          class="hover:bg-muted focus-within:ring-ring/50 inline-flex h-8 cursor-pointer items-center rounded-lg border px-2.5 text-sm font-medium focus-within:ring-3"
        >
          Open an image
          <input
            type="file"
            accept="image/*"
            class="sr-only"
            (change)="open($event)"
          />
        </label>
        <button scButton (click)="crop(cropper)">Crop</button>
      </div>

      @if (result(); as result) {
        <div class="space-y-2">
          <p class="text-sm font-medium">The crop</p>
          <img
            [src]="result"
            alt="The cropped image"
            class="max-h-48 rounded-md border"
          />
          <a scButton variant="outline" [href]="result" download="crop.png">
            Download
          </a>
        </div>
      }
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BoxImageCropperDemo {
  readonly src = signal('/images/cropper-mountains.jpg');
  readonly zoom = signal(1);
  readonly result = signal<string | null>(null);

  readonly percent = computed(() => Math.round(this.zoom() * 100));
  readonly round = Math.round;

  readonly handles = [
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
  ] as const;

  readonly ratios = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
  ];

  /** Your own image: shown from the file, not uploaded. */
  open(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.src.set(URL.createObjectURL(file));
  }

  async crop(cropper: ScImageCropper): Promise<void> {
    const blob = await cropper.crop({ type: 'image/png' });
    const previous = this.result();
    if (previous) URL.revokeObjectURL(previous);
    this.result.set(URL.createObjectURL(blob));
  }
}
