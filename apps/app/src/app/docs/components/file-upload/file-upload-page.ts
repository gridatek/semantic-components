import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FileUploadBasicDemoSection } from './file-upload-basic-demo-section';
import { FileUploadMultipleDemoSection } from './file-upload-multiple-demo-section';
import { FileUploadValidationDemoSection } from './file-upload-validation-demo-section';
import { FileUploaderDemoSection } from './file-uploader-demo-section';

@Component({
  selector: 'app-file-upload-page',
  imports: [
    FileUploadBasicDemoSection,
    FileUploadMultipleDemoSection,
    FileUploadValidationDemoSection,
    FileUploaderDemoSection,
  ],
  template: `
    <app-file-upload-basic-demo-section title="File Upload" />

    <app-file-upload-multiple-demo-section title="Multiple Files" />

    <app-file-upload-validation-demo-section title="With Validation" />

    <app-file-uploader-demo-section title="Cloud File Uploader" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FileUploadPage {}
