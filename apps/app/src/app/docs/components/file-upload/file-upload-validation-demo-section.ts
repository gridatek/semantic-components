import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FileUploadValidationDemo } from './file-upload-validation-demo';

@Component({
  selector: 'app-file-upload-validation-demo-section',
  imports: [PreviewCodeTabs, FileUploadValidationDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-file-upload-validation-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadValidationDemoSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScField, ScFieldErrorMessage, ScFileUpload, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-validation-demo',
  imports: [ScFileUpload, ScField, ScLabel, ScFieldErrorMessage],
  template: \`
    <div sc-field>
      <label sc-label>Upload Image (Max 2MB)</label>
      <sc-file-upload
        accept="image/*"
        [maxSize]="2097152"
        (filesSelected)="onFilesSelected($event)"
        (uploadError)="onUploadError($event)"
      />
      @if (errorMessage()) {
        <div sc-field-error-message>{{ errorMessage() }}</div>
      }
    </div>
  \`,
  styles: \`\`,
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
}`;
}
