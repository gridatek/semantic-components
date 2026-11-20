import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  type ScImageCrop,
  ScImageCropper,
  ScImageCropperImage,
  ScImageCropperPreview,
  ScImageCropperPreviewImage,
  ScImageCropperRotate,
  ScImageCropperSelection,
  ScImageCropperViewport,
  ScImageCropperZoom,
  cropImage,
} from '@semantic-components/ui';
import { SiRotateCwIcon } from '@semantic-icons/lucide-icons';

/**
 * An avatar: the frame stays, the image moves under it — drag, wheel or
 * pinch. It starts zoomed in (a crop of 640 px in the middle: 125%), so it
 * moves every way. A live round preview; Save makes a 128 px round PNG.
 */
@Component({
  selector: 'app-frame-image-cropper-demo',
  imports: [
    ScButton,
    ScFrame,
    ScImageCropper,
    ScImageCropperViewport,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperZoom,
    ScImageCropperRotate,
    ScImageCropperPreview,
    ScImageCropperPreviewImage,
    SiRotateCwIcon,
  ],
  template: `
    <div
      scImageCropper
      aria-label="Avatar"
      mode="frame"
      shape="circle"
      [aspectRatio]="1"
      [maxZoom]="4"
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
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <input scImageCropperZoom aria-label="Zoom" class="w-40" />
        <button scImageCropperRotate>
          <svg siRotateCwIcon></svg>
          <span class="sr-only">Rotate</span>
        </button>
        <div scImageCropperPreview class="ms-auto size-12 rounded-full">
          <img scImageCropperPreviewImage alt="Your avatar, as cropped" />
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
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FrameImageCropperDemo {
  // Set before the image loads: kept. Zoom 1 would show its whole height.
  private readonly crop = signal<ScImageCrop | null>({
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
}
