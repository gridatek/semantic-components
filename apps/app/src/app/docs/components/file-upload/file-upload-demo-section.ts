import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FileUploadDemo } from './file-upload-demo';

@Component({
  selector: 'app-file-upload-demo-section',
  imports: [FileUploadDemo],
  template: `
    <app-file-upload-demo />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDemoSection {}
