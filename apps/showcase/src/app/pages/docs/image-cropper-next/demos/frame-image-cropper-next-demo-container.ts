import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FrameImageCropperNextDemo } from './frame-image-cropper-next-demo';

@Component({
  selector: 'app-frame-image-cropper-next-demo-container',
  imports: [DemoContainer, FrameImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Frame"
      [code]="code"
      demoUrl="/demos/image-cropper-next/frame-image-cropper-next-demo"
    >
      <app-frame-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FrameImageCropperNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  type ScImageCropNext,
  ScImageCropperNext,
  ScImageCropperNextImage,
  ScImageCropperNextPreview,
  ScImageCropperNextPreviewImage,
  ScImageCropperNextRotate,
  ScImageCropperNextSelection,
  ScImageCropperNextViewport,
  ScImageCropperNextZoom,
  cropImage,
} from '@semantic-components/ui';
import { SiRotateCwIcon } from '@semantic-icons/lucide-icons';

/**
 * An avatar: the frame stays, the image moves under it — drag, wheel or
 * pinch. It starts zoomed in (a crop of 640 px in the middle: 125%), so it
 * moves every way. A live round preview; Save makes a 128 px round PNG.
 */
@Component({
  selector: 'app-frame-image-cropper-next-demo',
  imports: [
    ScButton,
    ScFrame,
    ScImageCropperNext,
    ScImageCropperNextViewport,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextZoom,
    ScImageCropperNextRotate,
    ScImageCropperNextPreview,
    ScImageCropperNextPreviewImage,
    SiRotateCwIcon,
  ],
  template: \`
    <div
      scImageCropperNext
      aria-label="Avatar"
      mode="frame"
      shape="circle"
      [aspectRatio]="1"
      [maxZoom]="4"
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
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <input scImageCropperNextZoom aria-label="Zoom" class="w-40" />
        <button scImageCropperNextRotate>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate</span>
        </button>
        <div scImageCropperNextPreview class="ms-auto size-12 rounded-full">
          <img scImageCropperNextPreviewImage alt="Your avatar, as cropped" />
        </div>
        <button scButton (click)="save()">Save avatar</button>
        @if (result(); as result) {
          <img
            [src]="result"
            alt="The saved avatar"
            class="size-12 rounded-full"
          />
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FrameImageCropperNextDemo {
  // Set before the image loads: kept. Zoom 1 would show its whole height.
  private readonly crop = signal<ScImageCropNext | null>({
    x: 280,
    y: 80,
    width: 640,
    height: 640,
  });
  private readonly result = signal<string | null>(null);

  private async save(): Promise<void> {
    const crop = this.crop();
    if (!crop) return;
    const file = await cropImage('/images/cropper-mountains.jpg', crop, {
      width: 128,
      shape: 'circle',
    });
    const previous = this.result();
    if (previous) URL.revokeObjectURL(previous);
    this.result.set(URL.createObjectURL(file));
  }
}`;
}
