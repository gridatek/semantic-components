import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  CropArea,
  CropResult,
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperControls,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-image-cropper-demo',
  imports: [ScImageCropper, ScImageCropperContainer, ScImageCropperControls],
  template: `
    <div
      sc-image-cropper
      #cropper="scImageCropper"
      [src]="imageSrc()"
      [(cropArea)]="cropArea"
      [containerHeight]="300"
      class="space-y-4"
    >
      <div
        sc-image-cropper-container
        #container
        class="rounded-lg overflow-hidden border"
      ></div>

      <div sc-image-cropper-controls></div>

      <div class="flex gap-4">
        <button
          type="button"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          (click)="cropImage(container)"
        >
          Crop Image
        </button>
        <button
          type="button"
          class="px-4 py-2 border rounded-md hover:bg-accent"
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

  readonly cropArea = signal<CropArea>({
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
      const result: CropResult = await container.crop();
      this.croppedImage.set(result.dataUrl);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }
}
