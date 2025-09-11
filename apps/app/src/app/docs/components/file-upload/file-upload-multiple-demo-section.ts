import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FileUploadMultipleDemo } from './file-upload-multiple-demo';

@Component({
  selector: 'app-file-upload-multiple-demo-section',
  imports: [PreviewCodeTabs, FileUploadMultipleDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-file-upload-multiple-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadMultipleDemoSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFileUpload } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-multiple-demo',
  imports: [ScFileUpload],
  template: \`
    <sc-file-upload
      [multiple]="true"
      accept="image/*"
      (filesSelected)="onFilesSelected($event)"
      (fileRemoved)="onFileRemoved($event)"
    />
  \`,
  styles: \`\`,
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
}`;
}
