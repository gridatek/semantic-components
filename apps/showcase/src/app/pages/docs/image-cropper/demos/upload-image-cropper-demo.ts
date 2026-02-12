import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  CropResult,
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperControls,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-upload-image-cropper-demo',
  imports: [ScImageCropper, ScImageCropperContainer, ScImageCropperControls],
  template: `
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <label
          class="px-4 py-2 border rounded-md hover:bg-accent cursor-pointer inline-flex items-center gap-2"
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
          <span class="text-sm text-muted-foreground">Image uploaded</span>
        }
      </div>

      @if (uploadedImageSrc()) {
        <div
          sc-image-cropper
          [src]="uploadedImageSrc()!"
          [containerHeight]="350"
          class="space-y-4"
        >
          <div
            sc-image-cropper-container
            #container
            class="rounded-lg overflow-hidden border"
          ></div>

          <div class="flex items-center justify-between">
            <div sc-image-cropper-controls></div>
            <div class="flex gap-2">
              <button
                type="button"
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                (click)="cropImage(container)"
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
export class UploadImageCropperDemo {
  readonly uploadedImageSrc = signal<string | null>(null);

  async cropImage(
    container: InstanceType<typeof ScImageCropperContainer>,
  ): Promise<void> {
    try {
      const result: CropResult = await container.crop();

      // Download the cropped image
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
