import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BoxImageCropperNextDemo } from './box-image-cropper-next-demo';

@Component({
  selector: 'app-box-image-cropper-next-demo-container',
  imports: [DemoContainer, BoxImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Crop box"
      [code]="code"
      demoUrl="/demos/image-cropper-next/box-image-cropper-next-demo"
    >
      <app-box-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BoxImageCropperNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScButton, ScSlider } from '@semantic-components/ui';
import {
  ScImageCropperNext,
  ScImageCropperNextAspectRatio,
  ScImageCropperNextFlipHorizontal,
  ScImageCropperNextFlipVertical,
  ScImageCropperNextGrid,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextPreview,
  ScImageCropperNextPreviewImage,
  ScImageCropperNextReset,
  ScImageCropperNextRotateLeft,
  ScImageCropperNextRotateRight,
  ScImageCropperNextSelection,
  ScImageCropperNextStage,
  ScImageCropperNextZoomIn,
  ScImageCropperNextZoomOut,
} from '@semantic-components/ui-lab';
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
  selector: 'app-box-image-cropper-next-demo',
  imports: [
    ScImageCropperNext,
    ScImageCropperNextStage,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextHandle,
    ScImageCropperNextGrid,
    ScImageCropperNextAspectRatio,
    ScImageCropperNextRotateLeft,
    ScImageCropperNextRotateRight,
    ScImageCropperNextFlipHorizontal,
    ScImageCropperNextFlipVertical,
    ScImageCropperNextZoomIn,
    ScImageCropperNextZoomOut,
    ScImageCropperNextReset,
    ScImageCropperNextPreview,
    ScImageCropperNextPreviewImage,
    ScButton,
    ScSlider,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiFlipHorizontal2Icon,
    SiFlipVertical2Icon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: \`
    <div scImageCropperNext #cropper="scImageCropperNext" [(zoom)]="zoom">
      <div class="flex flex-wrap gap-6">
        <div
          scImageCropperNextStage
          class="h-80 min-w-0 flex-1 rounded-lg border"
        >
          <img scImageCropperNextImage [src]="src()" alt="Mountains at dawn" />
          <div scImageCropperNextSelection aria-label="Crop area">
            <div scImageCropperNextGrid></div>
            @for (handle of handles; track handle) {
              <div [scImageCropperNextHandle]="handle"></div>
            }
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium">Preview</p>
          <div scImageCropperNextPreview class="h-28 w-40 rounded-md border">
            <img scImageCropperNextPreviewImage alt="The crop" />
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
            <button [scImageCropperNextAspectRatio]="ratio.value">
              {{ ratio.label }}
            </button>
          }
        </div>
        <button scImageCropperNextRotateLeft>
          <svg siRotateCcwIcon></svg>
          <span class="sr-only">Rotate left</span>
        </button>
        <button scImageCropperNextRotateRight>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate right</span>
        </button>
        <button scImageCropperNextFlipHorizontal>
          <svg siFlipHorizontal2Icon></svg>
          <span class="sr-only">Flip horizontally</span>
        </button>
        <button scImageCropperNextFlipVertical>
          <svg siFlipVertical2Icon></svg>
          <span class="sr-only">Flip vertically</span>
        </button>
        <button scImageCropperNextZoomOut>
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
        <button scImageCropperNextZoomIn>
          <svg siZoomInIcon></svg>
          <span class="sr-only">Zoom in</span>
        </button>
        <button scImageCropperNextReset size="default">Reset</button>
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
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BoxImageCropperNextDemo {
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

  async crop(cropper: ScImageCropperNext): Promise<void> {
    const blob = await cropper.crop({ type: 'image/png' });
    const previous = this.result();
    if (previous) URL.revokeObjectURL(previous);
    this.result.set(URL.createObjectURL(blob));
  }
}`;
}
