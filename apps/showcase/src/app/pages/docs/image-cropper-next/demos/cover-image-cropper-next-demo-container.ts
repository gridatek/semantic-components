import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CoverImageCropperNextDemo } from './cover-image-cropper-next-demo';

@Component({
  selector: 'app-cover-image-cropper-next-demo-container',
  imports: [DemoContainer, CoverImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Cover"
      [code]="code"
      demoUrl="/demos/image-cropper-next/cover-image-cropper-next-demo"
    >
      <app-cover-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CoverImageCropperNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';
import {
  ScImageCropperNext,
  ScImageCropperNextGrid,
  ScImageCropperNextImage,
  ScImageCropperNextSelection,
  ScImageCropperNextStage,
} from '@semantic-components/ui-lab';

/**
 * No handles: a 16:9 frame that stays put, and the image moves under it —
 * drag, wheel, pinch, or the keys — as a cover is placed.
 */
@Component({
  selector: 'app-cover-image-cropper-next-demo',
  imports: [
    ScImageCropperNext,
    ScImageCropperNextStage,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextGrid,
    ScSlider,
  ],
  template: \`
    <div
      scImageCropperNext
      #cropper="scImageCropperNext"
      [aspectRatio]="16 / 9"
      [(zoom)]="zoom"
    >
      <div scImageCropperNextStage class="h-72 rounded-lg border">
        <img
          scImageCropperNextImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div scImageCropperNextSelection aria-label="Cover">
          <div scImageCropperNextGrid></div>
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
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CoverImageCropperNextDemo {
  readonly zoom = signal(1);
  readonly percent = computed(() => Math.round(this.zoom() * 100));
}`;
}
