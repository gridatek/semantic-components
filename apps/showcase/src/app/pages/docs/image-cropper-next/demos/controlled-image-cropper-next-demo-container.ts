import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledImageCropperNextDemo } from './controlled-image-cropper-next-demo';

@Component({
  selector: 'app-controlled-image-cropper-next-demo-container',
  imports: [DemoContainer, ControlledImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/image-cropper-next/controlled-image-cropper-next-demo"
    >
      <app-controlled-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledImageCropperNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScImageCropNext,
  ScButton,
  ScFrame,
  ScImageCropperNext,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
} from '@semantic-components/ui';

/**
 * The crop is yours: a saved one restored when the image loads, its numbers
 * shown as it moves, a zoom from a button, and null to start again.
 */
@Component({
  selector: 'app-controlled-image-cropper-next-demo',
  imports: [
    ScButton,
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextHandle,
  ],
  template: \`
    <div
      scImageCropperNext
      #cropper="scImageCropperNext"
      aria-label="Photo"
      [(crop)]="crop"
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
        ></div>
        @for (handle of handles; track handle.position) {
          <div
            [scImageCropperNextHandle]="handle.position"
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
export class ControlledImageCropperNextDemo {
  /** As if read back from where it was saved. */
  private readonly saved: ScImageCropNext = {
    x: 520,
    y: 140,
    width: 560,
    height: 420,
  };

  private readonly crop = signal<ScImageCropNext | null>(this.saved);

  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 'sw', label: 'Bottom left corner' },
  ] as const;
}`;
}
