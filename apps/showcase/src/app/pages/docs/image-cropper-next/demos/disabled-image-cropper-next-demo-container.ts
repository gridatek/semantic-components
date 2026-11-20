import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledImageCropperNextDemo } from './disabled-image-cropper-next-demo';

@Component({
  selector: 'app-disabled-image-cropper-next-demo-container',
  imports: [DemoContainer, DisabledImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/image-cropper-next/disabled-image-cropper-next-demo"
    >
      <app-disabled-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledImageCropperNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScImageCropperNext,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextRotate,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  ScImageCropperNextZoom,
} from '@semantic-components/ui';
import { SiRotateCwIcon } from '@semantic-icons/lucide-icons';

/** Disabled: nothing moves, the selection and handles leave the tab order, the controls are off. */
@Component({
  selector: 'app-disabled-image-cropper-next-demo',
  imports: [
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextHandle,
    ScImageCropperNextZoom,
    ScImageCropperNextRotate,
    SiRotateCwIcon,
  ],
  template: \`
    <div scImageCropperNext aria-label="Photo" disabled>
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
        ></div>
        @for (handle of handles; track handle.position) {
          <div
            [scImageCropperNextHandle]="handle.position"
            [attr.aria-label]="handle.label"
            valueText="{width} by {height} pixels"
          ></div>
        }
      </div>
      <div class="flex items-center gap-2">
        <input scImageCropperNextZoom aria-label="Zoom" class="w-40" />
        <button scImageCropperNextRotate>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledImageCropperNextDemo {
  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 'sw', label: 'Bottom left corner' },
  ] as const;
}`;
}
