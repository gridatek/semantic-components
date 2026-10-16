import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScButton, ScSlider } from '@semantic-components/ui';
import {
  ScImageCropper,
  ScImageCropperHandle,
  ScImageCropperImage,
  ScImageCropperPreview,
  ScImageCropperPreviewImage,
  ScImageCropperSelection,
  ScImageCropperStage,
} from '@semantic-components/ui-lab';

/**
 * A circle: its handles resize it; the wheel, a pinch or the slider
 * zoom, and dragging around it moves the image.
 */
@Component({
  selector: 'app-avatar-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperStage,
    ScImageCropperImage,
    ScImageCropperSelection,
    ScImageCropperHandle,
    ScImageCropperPreview,
    ScImageCropperPreviewImage,
    ScButton,
    ScSlider,
  ],
  template: `
    <div
      scImageCropper
      #cropper="scImageCropper"
      shape="circle"
      [aspectRatio]="1"
      [(zoom)]="zoom"
    >
      <div scImageCropperStage class="h-72 rounded-lg border">
        <img
          scImageCropperImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div scImageCropperSelection aria-label="Profile picture">
          @for (handle of handles; track handle) {
            <div [scImageCropperHandle]="handle"></div>
          }
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

      <div class="flex flex-wrap items-end gap-4">
        @for (size of sizes; track size.class) {
          <div scImageCropperPreview [class]="size.class + ' rounded-full'">
            <img scImageCropperPreviewImage [alt]="size.alt" />
          </div>
        }
        <button scButton (click)="crop(cropper)">Use this picture</button>
      </div>

      @if (result(); as result) {
        <p class="text-muted-foreground text-sm">
          Cropped to {{ result.width }} × {{ result.height }} px.
        </p>
      }
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarImageCropperDemo {
  readonly zoom = signal(1);
  readonly result = signal<{ width: number; height: number } | null>(null);
  readonly percent = computed(() => Math.round(this.zoom() * 100));

  readonly handles = [
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
  ] as const;

  readonly sizes = [
    { class: 'size-24', alt: 'Large preview' },
    { class: 'size-16', alt: 'Medium preview' },
    { class: 'size-10', alt: 'Small preview' },
  ];

  async crop(cropper: ScImageCropper): Promise<void> {
    // A 256 px avatar, its corners transparent.
    const blob = await cropper.crop({ type: 'image/png', width: 256 });
    const bitmap = await createImageBitmap(blob);
    this.result.set({ width: bitmap.width, height: bitmap.height });
    bitmap.close();
  }
}
