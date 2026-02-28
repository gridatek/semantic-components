import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperControls,
  ScImageCropperPreview,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
} from '@semantic-components/ui-lab';
import { ScButton, ScSlider } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-avatar-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperContainer,
    ScImageCropperControls,
    ScImageCropperPreview,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScButton,
    ScSlider,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scImageCropper
      [src]="imageSrc()"
      [aspectRatio]="1"
      [containerHeight]="250"
      class="space-y-4"
    >
      <div
        scImageCropperContainer
        class="overflow-hidden rounded-lg border"
      ></div>

      <div class="flex gap-8">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <button
              scButton
              scImageCropperZoomOut
              variant="outline"
              size="icon"
              aria-label="Zoom out"
            >
              <svg siZoomOutIcon class="size-4"></svg>
            </button>

            <input
              scSlider
              scImageCropperControls
              #controls="scImageCropperControls"
            />
            <span
              class="text-muted-foreground min-w-[50px] text-center text-sm"
            >
              {{ controls.zoomPercentage() }}
            </span>

            <button
              scButton
              scImageCropperZoomIn
              variant="outline"
              size="icon"
              aria-label="Zoom in"
            >
              <svg siZoomInIcon class="size-4"></svg>
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-medium">Preview:</p>
          <div class="space-y-3">
            <div class="text-muted-foreground text-xs">Large (100x100)</div>
            <div
              scImageCropperPreview
              #previewLg="scImageCropperPreview"
              [width]="100"
              [height]="100"
              class="rounded-full"
            >
              <img
                [src]="previewLg.src()"
                class="max-w-none"
                [style.width.px]="previewLg.imageWidth()"
                [style.height.px]="previewLg.imageHeight()"
                [style.transform]="previewLg.imageTransform()"
                alt="Crop preview"
              />
            </div>

            <div class="text-muted-foreground text-xs">Medium (64x64)</div>
            <div
              scImageCropperPreview
              #previewMd="scImageCropperPreview"
              [width]="64"
              [height]="64"
              class="rounded-full"
            >
              <img
                [src]="previewMd.src()"
                class="max-w-none"
                [style.width.px]="previewMd.imageWidth()"
                [style.height.px]="previewMd.imageHeight()"
                [style.transform]="previewMd.imageTransform()"
                alt="Crop preview"
              />
            </div>

            <div class="text-muted-foreground text-xs">Small (40x40)</div>
            <div
              scImageCropperPreview
              #previewSm="scImageCropperPreview"
              [width]="40"
              [height]="40"
              class="rounded-full"
            >
              <img
                [src]="previewSm.src()"
                class="max-w-none"
                [style.width.px]="previewSm.imageWidth()"
                [style.height.px]="previewSm.imageHeight()"
                [style.transform]="previewSm.imageTransform()"
                alt="Crop preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );
}
