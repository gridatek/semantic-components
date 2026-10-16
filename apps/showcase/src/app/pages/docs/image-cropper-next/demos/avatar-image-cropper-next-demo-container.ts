import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarImageCropperNextDemo } from './avatar-image-cropper-next-demo';

@Component({
  selector: 'app-avatar-image-cropper-next-demo-container',
  imports: [DemoContainer, AvatarImageCropperNextDemo],
  template: `
    <app-demo-container
      title="Avatar"
      [code]="code"
      demoUrl="/demos/image-cropper-next/avatar-image-cropper-next-demo"
    >
      <app-avatar-image-cropper-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarImageCropperNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScButton, ScSlider } from '@semantic-components/ui';
import {
  ScImageCropperNext,
  ScImageCropperNextHandle,
  ScImageCropperNextImage,
  ScImageCropperNextPreview,
  ScImageCropperNextPreviewImage,
  ScImageCropperNextSelection,
  ScImageCropperNextStage,
} from '@semantic-components/ui-lab';

/**
 * A circle: its corner handles resize it; the wheel, a pinch or the slider
 * zoom, and dragging around it moves the image.
 */
@Component({
  selector: 'app-avatar-image-cropper-next-demo',
  imports: [
    ScImageCropperNext,
    ScImageCropperNextStage,
    ScImageCropperNextImage,
    ScImageCropperNextSelection,
    ScImageCropperNextHandle,
    ScImageCropperNextPreview,
    ScImageCropperNextPreviewImage,
    ScButton,
    ScSlider,
  ],
  template: \`
    <div
      scImageCropperNext
      #cropper="scImageCropperNext"
      shape="circle"
      [aspectRatio]="1"
      [(zoom)]="zoom"
    >
      <div scImageCropperNextStage class="h-72 rounded-lg border">
        <img
          scImageCropperNextImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn"
        />
        <div scImageCropperNextSelection aria-label="Profile picture">
          @for (handle of handles; track handle) {
            <div [scImageCropperNextHandle]="handle"></div>
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
          <div scImageCropperNextPreview [class]="size.class + ' rounded-full'">
            <img scImageCropperNextPreviewImage [alt]="size.alt" />
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
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarImageCropperNextDemo {
  readonly zoom = signal(1);
  readonly result = signal<{ width: number; height: number } | null>(null);
  readonly percent = computed(() => Math.round(this.zoom() * 100));

  readonly handles = [
    'top-left',
    'top-right',
    'bottom-right',
    'bottom-left',
  ] as const;

  readonly sizes = [
    { class: 'size-24', alt: 'Large preview' },
    { class: 'size-16', alt: 'Medium preview' },
    { class: 'size-10', alt: 'Small preview' },
  ];

  async crop(cropper: ScImageCropperNext): Promise<void> {
    // A 256 px avatar, its corners transparent.
    const blob = await cropper.crop({ type: 'image/png', width: 256 });
    const bitmap = await createImageBitmap(blob);
    this.result.set({ width: bitmap.width, height: bitmap.height });
    bitmap.close();
  }
}`;
}
