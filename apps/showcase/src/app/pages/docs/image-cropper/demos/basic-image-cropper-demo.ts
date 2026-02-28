import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCropArea,
  ScCropResult,
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperControls,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperContainer,
    ScImageCropperControls,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div
      scImageCropper
      [src]="imageSrc()"
      [(cropArea)]="cropArea"
      [containerHeight]="300"
      class="space-y-4"
    >
      <div
        scImageCropperContainer
        #container="scImageCropperContainer"
        class="overflow-hidden rounded-lg border"
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

      <div class="flex gap-4">
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          (click)="cropImage(container)"
        >
          Crop Image
        </button>
        <button
          type="button"
          class="hover:bg-accent rounded-md border px-4 py-2"
          (click)="container.resetCropArea()"
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
export class BasicImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly cropArea = signal<ScCropArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  readonly croppedImage = signal<string | null>(null);

  async cropImage(
    container: InstanceType<typeof ScImageCropperContainer>,
  ): Promise<void> {
    try {
      const result: ScCropResult = await container.crop();
      this.croppedImage.set(result.dataUrl);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }
}
