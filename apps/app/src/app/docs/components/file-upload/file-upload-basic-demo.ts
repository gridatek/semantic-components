import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFileUpload } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-basic-demo',
  imports: [ScFileUpload],
  template: `
    <sc-file-upload (filesSelected)="onFilesSelected($event)" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadBasicDemo {
  protected onFilesSelected(fileList: FileList): void {
    console.log('Files selected:', Array.from(fileList));
  }
}
