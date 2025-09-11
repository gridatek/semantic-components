import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFileUpload } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-multiple-demo',
  imports: [ScFileUpload],
  template: `
    <sc-file-upload
      [multiple]="true"
      (filesSelected)="onFilesSelected($event)"
      (fileRemoved)="onFileRemoved($event)"
      accept="image/*"
    />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadMultipleDemo {
  protected onFilesSelected(fileList: FileList): void {
    console.log('Multiple files selected:', Array.from(fileList));
  }

  protected onFileRemoved(file: File): void {
    console.log('File removed:', file.name);
  }
}
