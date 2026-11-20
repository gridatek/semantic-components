import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GridImageCropperDemo } from './grid-image-cropper-demo';

@Component({
  selector: 'app-grid-image-cropper-demo-container',
  imports: [DemoContainer, GridImageCropperDemo],
  template: `
    <app-demo-container
      title="Grid"
      [code]="code"
      demoUrl="/demos/image-cropper/grid-image-cropper-demo"
    >
      <app-grid-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridImageCropperDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  template: \`
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
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GridImageCropperDemo {}`;
}
