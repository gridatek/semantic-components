import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCropperArea,
  ScCropperResult,
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
  ScCropperReset,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-cropper-demo',
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
    ScCropperReset,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scCropper
      [(cropArea)]="cropArea"
      [containerHeight]="300"
      class="space-y-4"
    >
      <div
        scCropperCanvas
        #canvas="scCropperCanvas"
        class="overflow-hidden rounded-lg border"
      >
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

      <div class="flex gap-4">
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          (click)="cropImage(canvas)"
        >
          Crop Image
        </button>
        <button
          scCropperReset
          type="button"
          class="hover:bg-accent rounded-md border px-4 py-2"
        >
          Reset
        </button>
      </div>

      @if (croppedImage()) {
        <div class="space-y-2">
          <p class="text-sm font-medium">Cropped Result:</p>
          <img
            [src]="croppedImage()"
            class="max-w-xs rounded-md border"
            alt="Cropped result"
          />
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly cropArea = signal<ScCropperArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  readonly croppedImage = signal<string | null>(null);

  async cropImage(canvas: InstanceType<typeof ScCropperCanvas>): Promise<void> {
    try {
      const result: ScCropperResult = await canvas.crop();
      this.croppedImage.set(result.dataUrl);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }
}
