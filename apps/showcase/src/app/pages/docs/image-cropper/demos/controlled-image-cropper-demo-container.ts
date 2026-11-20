import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledImageCropperDemo } from './controlled-image-cropper-demo';

@Component({
  selector: 'app-controlled-image-cropper-demo-container',
  imports: [DemoContainer, ControlledImageCropperDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/image-cropper/controlled-image-cropper-demo"
    >
      <app-controlled-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledImageCropperDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  type ScImageCrop,
  ScImageCropper,
  ScImageCropperHandle,
  ScImageCropperImage,
  ScImageCropperSelection,
  ScImageCropperViewport,
} from '@semantic-components/ui';

/**
 * The crop is yours: a saved one restored when the image loads, its numbers
 * shown as it moves, a zoom from a button, and null to start again.
 */
@Component({
  selector: 'app-controlled-image-cropper-demo',
  imports: [
    ScButton,
    ScFrame,
    ScImageCropper,
    ScImageCropperViewport,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperHandle,
  ],
  template: \`
    <div
      scImageCropper
      #cropper="scImageCropper"
      aria-label="Photo"
      [(crop)]="crop"
    >
      <div scImageCropperViewport scFrame class="h-72">
        <img
          scImageCropperImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div
          scImageCropperSelection
          aria-label="Crop"
          valueText="{width} by {height} pixels, at {x}, {y}"
        ></div>
        @for (handle of handles; track handle.position) {
          <div
            [scImageCropperHandle]="handle.position"
            [attr.aria-label]="handle.label"
            valueText="{width} by {height} pixels"
          ></div>
        }
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button scButton variant="outline" (click)="cropper.setZoom(2)">
          Zoom 2×
        </button>
        <button scButton variant="outline" (click)="crop.set(saved)">
          Restore saved
        </button>
        <button scButton variant="outline" (click)="crop.set(null)">
          Start again
        </button>
        @if (crop(); as crop) {
          <output class="text-muted-foreground ms-auto text-sm tabular-nums">
            {{ crop.width }} × {{ crop.height }} at {{ crop.x }}, {{ crop.y }}
          </output>
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledImageCropperDemo {
  /** As if read back from where it was saved. */
  private readonly saved: ScImageCrop = {
    x: 520,
    y: 140,
    width: 560,
    height: 420,
  };

  private readonly crop = signal<ScImageCrop | null>(this.saved);

  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 'sw', label: 'Bottom left corner' },
  ] as const;
}`;
}
