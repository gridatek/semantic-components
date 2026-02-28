import { Directive, inject } from '@angular/core';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'input[scCropperFileInput]',
  host: {
    'data-slot': 'cropper-file-input',
    type: 'file',
    '(change)': 'onFileChange($event)',
  },
})
export class ScCropperFileInput {
  private readonly cropper = inject(SC_CROPPER);

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
