import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScField, ScFieldErrorMessage, ScFileUpload, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-validation-demo',
  imports: [ScFileUpload, ScField, ScLabel, ScFieldErrorMessage],
  template: `
    <div sc-field>
      <label sc-label>Upload Image (Max 2MB)</label>
      <sc-file-upload
        [maxSize]="2097152"
        (filesSelected)="onFilesSelected($event)"
        (uploadError)="onUploadError($event)"
        accept="image/*"
      />
      @if (errorMessage()) {
        <div sc-field-error-message>{{ errorMessage() }}</div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadValidationDemo {
  protected readonly errorMessage = signal('');

  protected onFilesSelected(fileList: FileList): void {
    this.errorMessage.set('');
    console.log('Files selected:', Array.from(fileList));
  }

  protected onUploadError(error: string): void {
    this.errorMessage.set(error);
    console.error('Upload error:', error);
  }
}
