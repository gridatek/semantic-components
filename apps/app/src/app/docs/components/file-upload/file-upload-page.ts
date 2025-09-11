import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FileUploadDemoSection } from './file-upload-demo-section';

@Component({
  selector: 'app-file-upload-page',
  imports: [FileUploadDemoSection],
  template: `
    <app-file-upload-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FileUploadPage {}
