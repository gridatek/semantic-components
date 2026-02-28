import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperAspectRatio,
  ScImageCropperControls,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-aspect-ratio-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperContainer,
    ScImageCropperControls,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScImageCropperAspectRatio,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scImageCropper
      [src]="imageSrc()"
      [aspectRatio]="selectedAspectRatio()"
      [containerHeight]="300"
      class="space-y-4"
    >
      <div
        scImageCropperContainer
        class="overflow-hidden rounded-lg border"
      ></div>

      <div class="flex items-center justify-between">
        <div
          scImageCropperAspectRatio
          [options]="aspectRatioOptions"
          (aspectRatioChange)="onAspectRatioChange($event)"
        ></div>
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

          <div scImageCropperControls></div>

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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectRatioImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly selectedAspectRatio = signal<number | null>(null);

  readonly aspectRatioOptions = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '3:2', value: 3 / 2 },
  ];

  onAspectRatioChange(ratio: number | null): void {
    this.selectedAspectRatio.set(ratio);
  }
}
