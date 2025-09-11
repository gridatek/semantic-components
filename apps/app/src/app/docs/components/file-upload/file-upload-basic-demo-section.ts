import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FileUploadBasicDemo } from './file-upload-basic-demo';

@Component({
  selector: 'app-file-upload-basic-demo-section',
  imports: [PreviewCodeTabs, FileUploadBasicDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-file-upload-basic-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadBasicDemoSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFileUpload } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-basic-demo',
  imports: [ScFileUpload],
  template: \`
    <sc-file-upload (filesSelected)="onFilesSelected($event)" />
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadBasicDemo {
  protected onFilesSelected(fileList: FileList): void {
    console.log('Files selected:', Array.from(fileList));
  }
}`;
}
