import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScImageCropperNext,
  ScImageCropperNextGrid,
  ScImageCropperNextImage,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  ScImageCropperNextZoom,
} from '@semantic-components/ui';

/**
 * A cover, wide: a frame the image moves under, with a grid of your own —
 * four columns, two rows, its lines in amber, always clear.
 */
@Component({
  selector: 'app-grid-image-cropper-next-demo',
  imports: [
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextGrid,
    ScImageCropperNextZoom,
  ],
  template: `
    <div scImageCropperNext aria-label="Cover" mode="frame" [aspectRatio]="3">
      <div scImageCropperNextViewport scFrame class="h-60">
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
          <div
            scImageCropperNextGrid
            [columns]="4"
            [rows]="2"
            class="opacity-100 *:border-amber-400"
          ></div>
        </div>
      </div>
      <input scImageCropperNextZoom aria-label="Zoom" class="w-48" />
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridImageCropperNextDemo {}
