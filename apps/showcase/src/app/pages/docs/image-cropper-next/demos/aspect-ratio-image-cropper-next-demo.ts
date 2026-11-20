import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScFrame,
  ScImageCropperNext,
  ScImageCropperNextFlip,
  ScImageCropperNextGrid,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiFlipHorizontal2Icon,
  SiFlipVertical2Icon,
} from '@semantic-icons/lucide-icons';

/**
 * The ratio from your own control, a toggle group here: the crop refits
 * about its middle. No less than 64 px either way; flips both ways.
 */
@Component({
  selector: 'app-aspect-ratio-image-cropper-next-demo',
  imports: [
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextGrid,
    ScImageCropperNextHandle,
    ScImageCropperNextFlip,
    ScToggleGroup,
    ScToggleGroupItem,
    SiFlipHorizontal2Icon,
    SiFlipVertical2Icon,
  ],
  template: `
    <div
      scImageCropperNext
      aria-label="Photo"
      [aspectRatio]="ratio()"
      [minWidth]="64"
      [minHeight]="64"
    >
      <div scImageCropperNextViewport scFrame class="h-72">
        <img
          scImageCropperNextImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div
          scImageCropperNextSelection
          aria-label="Crop"
          valueText="{width} by {height} pixels, at {x}, {y}"
        >
          <div scImageCropperNextGrid></div>
        </div>
        @for (handle of handles; track handle.position) {
          <div
            [scImageCropperNextHandle]="handle.position"
            [attr.aria-label]="handle.label"
            valueText="{width} by {height} pixels"
          ></div>
        }
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div
          scToggleGroup
          variant="outline"
          aria-label="Aspect ratio"
          [(value)]="choice"
        >
          <button scToggleGroupItem value="free">Free</button>
          <button scToggleGroupItem value="square">Square</button>
          <button scToggleGroupItem value="wide">Wide</button>
        </div>
        <button scImageCropperNextFlip>
          <svg siFlipHorizontal2Icon></svg>
          <span class="sr-only">Flip</span>
        </button>
        <button scImageCropperNextFlip direction="vertical">
          <svg siFlipVertical2Icon></svg>
          <span class="sr-only">Flip vertically</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioImageCropperNextDemo {
  private readonly choice = signal(['free']);

  private readonly ratio = computed(() => {
    const choice = this.choice()[0];
    return choice === 'square' ? 1 : choice === 'wide' ? 16 / 9 : null;
  });

  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'n', label: 'Top edge' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'e', label: 'Right edge' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 's', label: 'Bottom edge' },
    { position: 'sw', label: 'Bottom left corner' },
    { position: 'w', label: 'Left edge' },
  ] as const;
}
