import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCropper,
  ScCropperCanvas,
  ScCropperImage,
  ScCropperOverlay,
  ScCropperSelection,
  ScCropperDragRegion,
  ScCropperHandle,
  ScCropperGrid,
  ScCropperZoomIn,
  ScCropperZoomOut,
  ScCropperZoomSlider,
  ScCropperPreview,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-avatar-cropper-x-demo',
  imports: [
    ScCropper,
    ScCropperCanvas,
    ScCropperImage,
    ScCropperOverlay,
    ScCropperSelection,
    ScCropperDragRegion,
    ScCropperHandle,
    ScCropperGrid,
    ScCropperZoomIn,
    ScCropperZoomOut,
    ScCropperZoomSlider,
    ScCropperPreview,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scCropper
      [aspectRatio]="1"
      [containerHeight]="250"
      cropShape="circle"
      class="space-y-4"
    >
      <div scCropperCanvas class="overflow-hidden rounded-lg border">
        <img scCropperImage [src]="imageSrc()" alt="Image to crop" />
        <div scCropperOverlay></div>
        <div scCropperSelection>
          <div scCropperDragRegion></div>
          <div scCropperHandle position="top-left"></div>
          <div scCropperHandle position="top-right"></div>
          <div scCropperHandle position="bottom-left"></div>
          <div scCropperHandle position="bottom-right"></div>
          <div scCropperHandle position="top"></div>
          <div scCropperHandle position="right"></div>
          <div scCropperHandle position="bottom"></div>
          <div scCropperHandle position="left"></div>
          <div scCropperGrid [columns]="3" [rows]="3"></div>
        </div>
      </div>

      <div class="flex gap-8">
        <div class="flex flex-1 items-center gap-2">
          <button
            scButton
            scCropperZoomOut
            variant="outline"
            size="icon"
            aria-label="Zoom out"
          >
            <svg siZoomOutIcon class="size-4"></svg>
          </button>

          <div scCropperZoomSlider class="flex-1"></div>

          <button
            scButton
            scCropperZoomIn
            variant="outline"
            size="icon"
            aria-label="Zoom in"
          >
            <svg siZoomInIcon class="size-4"></svg>
          </button>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-medium">Preview:</p>
          <div class="space-y-3">
            <div class="text-muted-foreground text-xs">Large (100x100)</div>
            <div
              scCropperPreview
              [width]="100"
              [height]="100"
              class="rounded-full"
            ></div>

            <div class="text-muted-foreground text-xs">Medium (64x64)</div>
            <div
              scCropperPreview
              [width]="64"
              [height]="64"
              class="rounded-full"
            ></div>

            <div class="text-muted-foreground text-xs">Small (40x40)</div>
            <div
              scCropperPreview
              [width]="40"
              [height]="40"
              class="rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCropperXDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );
}
