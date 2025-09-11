import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FileUploadBasicDemoSection } from './file-upload-basic-demo-section';
import { FileUploadMultipleDemoSection } from './file-upload-multiple-demo-section';
import { FileUploadValidationDemoSection } from './file-upload-validation-demo-section';

@Component({
  selector: 'app-file-upload-page',
  imports: [
    FileUploadBasicDemoSection,
    FileUploadMultipleDemoSection,
    FileUploadValidationDemoSection,
  ],
  template: `
    <app-file-upload-basic-demo-section title="File Upload" />

    <app-file-upload-multiple-demo-section title="Multiple Files" />

    <app-file-upload-validation-demo-section title="With Validation" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FileUploadPage {}
