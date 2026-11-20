import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CircleImageCropperNextDemo } from './circle-image-cropper-next-demo';

@Component({
  selector: 'app-circle-image-cropper-next-demo-container',
  imports: [DemoContainer, CircleImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Circle"
      [code]="code"
      demoUrl="/demos/image-cropper-next/circle-image-cropper-next-demo"
    >
      <app-circle-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CircleImageCropperNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScImageCropNext,
  ScButton,
  ScFrame,
  ScImageCropperNext,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextPreview,
  ScImageCropperNextPreviewImage,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  cropImage,
} from '@semantic-components/ui';

/**
 * A circle over the image: drag it anywhere, resize it by its corners (it
 * stays round), a live preview, and a 256 px round PNG.
 */
@Component({
  selector: 'app-circle-image-cropper-next-demo',
  imports: [
    ScButton,
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextHandle,
    ScImageCropperNextPreview,
    ScImageCropperNextPreviewImage,
  ],
  template: \`
    <div
      scImageCropperNext
      aria-label="Photo"
      shape="circle"
      [aspectRatio]="1"
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
        <div scImageCropperNextPreview class="size-12 rounded-full">
          <img scImageCropperNextPreviewImage alt="The circle, as cropped" />
        </div>
        <button scButton class="ms-auto" (click)="save()">Crop</button>
        @if (result(); as result) {
          <img
            [src]="result"
            alt="The cropped circle"
            class="size-12 rounded-full"
          />
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CircleImageCropperNextDemo {
  private readonly crop = signal<ScImageCropNext | null>(null);
  private readonly result = signal<string | null>(null);

  private readonly handles = [
    { position: 'nw', label: 'Top left corner' },
    { position: 'ne', label: 'Top right corner' },
    { position: 'se', label: 'Bottom right corner' },
    { position: 'sw', label: 'Bottom left corner' },
  ] as const;

  private async save(): Promise<void> {
    const crop = this.crop();
    if (!crop) return;
    const file = await cropImage('/images/cropper-mountains.jpg', crop, {
      width: 256,
      shape: 'circle',
    });
    const previous = this.result();
    if (previous) URL.revokeObjectURL(previous);
    this.result.set(URL.createObjectURL(file));
  }
}`;
}
