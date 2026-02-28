import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
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
} from '@semantic-components/ui-lab';
import { ScButton } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-upload-cropper-x-demo',
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
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <label
          class="hover:bg-accent inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          Upload Image
          <input
            type="file"
            accept="image/*"
            class="hidden"
            (change)="onFileChange($event)"
          />
        </label>
        @if (uploadedImageSrc()) {
          <span class="text-muted-foreground text-sm">Image uploaded</span>
        }
      </div>

      @if (uploadedImageSrc()) {
        <div scCropper [containerHeight]="350" class="space-y-4">
          <div
            scCropperCanvas
            #canvas="scCropperCanvas"
            class="overflow-hidden rounded-lg border"
          >
            <img
              scCropperImage
              [src]="uploadedImageSrc()!"
              alt="Uploaded image to crop"
            />
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
            <div class="flex gap-2">
              <button
                type="button"
                class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
                (click)="cropImage(canvas)"
              >
                Crop & Download
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadCropperXDemo {
  readonly uploadedImageSrc = signal<string | null>(null);

  async cropImage(canvas: InstanceType<typeof ScCropperCanvas>): Promise<void> {
    try {
      const result: ScCropperResult = await canvas.crop();

      const link = document.createElement('a');
      link.href = result.dataUrl;
      link.download = 'cropped-image.png';
      link.click();
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageSrc.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
