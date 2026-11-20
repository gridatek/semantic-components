import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledImageCropperDemo } from './disabled-image-cropper-demo';

@Component({
  selector: 'app-disabled-image-cropper-demo-container',
  imports: [DemoContainer, DisabledImageCropperDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/image-cropper/disabled-image-cropper-demo"
    >
      <app-disabled-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledImageCropperDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScImageCropper,
  ScImageCropperHandle,
  ScImageCropperImage,
  ScImageCropperRotate,
  ScImageCropperSelection,
  ScImageCropperViewport,
  ScImageCropperZoom,
} from '@semantic-components/ui';
import { SiRotateCwIcon } from '@semantic-icons/lucide-icons';

/** Disabled: nothing moves, the selection and handles leave the tab order, the controls are off. */
@Component({
  selector: 'app-disabled-image-cropper-demo',
  imports: [
    ScFrame,
    ScImageCropper,
    ScImageCropperViewport,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperHandle,
    ScImageCropperZoom,
    ScImageCropperRotate,
    SiRotateCwIcon,
  ],
  template: \`
    <div scImageCropper aria-label="Photo" disabled>
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
        ></div>
        @for (handle of handles; track handle.position) {
          <div
            [scImageCropperHandle]="handle.position"
            [attr.aria-label]="handle.label"
            valueText="{width} by {height} pixels"
          ></div>
        }
      </div>
      <div class="flex items-center gap-2">
        <input scImageCropperZoom aria-label="Zoom" class="w-40" />
        <button scImageCropperRotate>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledImageCropperDemo {
  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 'sw', label: 'Bottom left corner' },
  ] as const;
}`;
}
