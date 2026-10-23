import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScImageCropper,
  ScImageCropperGrid,
  ScImageCropperImage,
  ScImageCropperSelection,
  ScImageCropperStage,
  ScSlider,
} from '@semantic-components/ui';

/**
 * No handles: a 16:9 frame that stays put, and the image moves under it —
 * drag, wheel, pinch, or the keys — as a cover is placed.
 */
@Component({
  selector: 'app-cover-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperStage,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperGrid,
    ScSlider,
  ],
  template: `
    <div
      scImageCropper
      #cropper="scImageCropper"
      [aspectRatio]="16 / 9"
      [(zoom)]="zoom"
    >
      <div scImageCropperStage class="h-72 rounded-lg border">
        <img
          scImageCropperImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div scImageCropperSelection aria-label="Cover">
          <div
            scImageCropperGrid
            [columns]="4"
            [rows]="2"
            class="*:border-amber-400"
          ></div>
        </div>
      </div>

      <div class="flex items-center gap-2">
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
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CoverImageCropperDemo {
  readonly zoom = signal(1);
  readonly percent = computed(() => Math.round(this.zoom() * 100));
}
