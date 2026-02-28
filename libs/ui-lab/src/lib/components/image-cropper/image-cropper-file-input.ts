import { Directive, inject } from '@angular/core';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'input[scImageCropperFileInput]',
  host: {
    'data-slot': 'image-cropper-file-input',
    type: 'file',
    '(change)': 'onFileChange($event)',
  },
})
export class ScImageCropperFileInput {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      this.cropper.setImageSrc(dataUrl);
      this.cropper.rotation.set(0);
      this.cropper.flipH.set(false);
      this.cropper.flipV.set(false);
    };
    reader.readAsDataURL(file);
  }
}
