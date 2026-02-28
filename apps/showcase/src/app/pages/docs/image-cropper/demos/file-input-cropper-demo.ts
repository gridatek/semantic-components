import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCropper,
  ScImageCropperCanvas,
  ScImageCropperImage,
  ScImageCropperOverlay,
  ScImageCropperSelection,
  ScImageCropperDragRegion,
  ScImageCropperHandle,
  ScImageCropperGrid,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
  ScImageCropperZoomSlider,
  ScImageCropperFileInput,
  ScImageCropperReset,
  ScImageCropperResult,
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-file-input-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperCanvas,
    ScImageCropperImage,
    ScImageCropperOverlay,
    ScImageCropperSelection,
    ScImageCropperDragRegion,
    ScImageCropperHandle,
    ScImageCropperGrid,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScImageCropperZoomSlider,
    ScImageCropperFileInput,
    ScImageCropperReset,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div scImageCropper [containerHeight]="350" class="space-y-4">
      <div
        scImageCropperCanvas
        #canvas="scImageCropperCanvas"
        class="overflow-hidden rounded-lg border"
      >
        <img scImageCropperImage [src]="imageSrc()" alt="Image to crop" />
        <div scImageCropperOverlay></div>
        <div scImageCropperSelection>
          <div scImageCropperDragRegion></div>
          <div scImageCropperHandle position="top-left"></div>
          <div scImageCropperHandle position="top-right"></div>
          <div scImageCropperHandle position="bottom-left"></div>
          <div scImageCropperHandle position="bottom-right"></div>
          <div scImageCropperHandle position="top"></div>
          <div scImageCropperHandle position="right"></div>
          <div scImageCropperHandle position="bottom"></div>
          <div scImageCropperHandle position="left"></div>
          <div scImageCropperGrid [columns]="3" [rows]="3"></div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <label
            class="hover:bg-accent inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm"
          >
            Choose file
            <input scImageCropperFileInput accept="image/*" class="hidden" />
          </label>
        </div>

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

          <div scImageCropperZoomSlider></div>

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

      <div class="flex gap-4">
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          (click)="cropImage(canvas)"
        >
          Crop & Download
        </button>
        <button
          scImageCropperReset
          type="button"
          class="hover:bg-accent rounded-md border px-4 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  async cropImage(
    canvas: InstanceType<typeof ScImageCropperCanvas>,
  ): Promise<void> {
    try {
      const result: ScImageCropperResult = await canvas.crop();

      const link = document.createElement('a');
      link.href = result.dataUrl;
      link.download = 'cropped-image.png';
      link.click();
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }
}
