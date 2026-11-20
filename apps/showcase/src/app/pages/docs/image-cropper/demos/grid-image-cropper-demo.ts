import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScImageCropper,
  ScImageCropperGrid,
  ScImageCropperImage,
  ScImageCropperSelection,
  ScImageCropperViewport,
  ScImageCropperZoom,
} from '@semantic-components/ui';

/**
 * A cover, wide: a frame the image moves under, with a grid of your own —
 * four columns, two rows, its lines in amber, always clear.
 */
@Component({
  selector: 'app-grid-image-cropper-demo',
  imports: [
    ScFrame,
    ScImageCropper,
    ScImageCropperViewport,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperGrid,
    ScImageCropperZoom,
  ],
  template: `
    <div scImageCropper aria-label="Cover" mode="frame" [aspectRatio]="3">
      <div scImageCropperViewport scFrame class="h-60">
        <img
          scImageCropperImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div
          scImageCropperSelection
          aria-label="Crop"
          valueText="{width} by {height} pixels, at {x}, {y}"
        >
          <div
            scImageCropperGrid
            [columns]="4"
            [rows]="2"
            class="opacity-100 *:border-amber-400"
          ></div>
        </div>
      </div>
      <input scImageCropperZoom aria-label="Zoom" class="w-48" />
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridImageCropperDemo {}
