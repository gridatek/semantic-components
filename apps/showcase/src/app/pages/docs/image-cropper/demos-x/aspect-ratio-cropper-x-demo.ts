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
  ScCropperAspectRatio,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-aspect-ratio-cropper-demo',
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
    ScCropperAspectRatio,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div scCropper [containerHeight]="300" class="space-y-4">
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

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          @for (option of aspectRatioOptions; track option.value) {
            <button [scCropperAspectRatio]="option.value">
              {{ option.label }}
            </button>
          }
        </div>
        <div class="flex items-center gap-2">
          <button
            scButton
            scCropperZoomOut
            variant="outline"
            size="icon"
            aria-label="Zoom out"
          >
            <svg siZoomOutIcon class="size-4"></svg>
          </button>

          <div scCropperZoomSlider></div>

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
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatioCropperXDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly aspectRatioOptions = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '3:2', value: 3 / 2 },
  ];
}
