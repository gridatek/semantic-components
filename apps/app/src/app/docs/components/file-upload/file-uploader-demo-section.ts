import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FileUploaderDemo } from './file-uploader-demo';

@Component({
  selector: 'app-file-uploader-demo-section',
  imports: [PreviewCodeTabs, FileUploaderDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-file-uploader-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FileUploader, ProviderConfig, UploadEvent } from '@semantic-components/file-uploader';

@Component({
  selector: 'app-file-uploader-demo',
  imports: [FileUploader],
  template: \`
    <div class="space-y-6">
      <sc-file-uploader
        [providerConfig]="supabaseConfig"
        [config]="uploadConfig"
        bucket="uploads"
        uploadPath="demo-files/"
        variant="dashboard"
        (uploadComplete)="onUploadComplete($event)"
        (uploadProgress)="onProgress($event)"
        (uploadError)="onError($event)"
      />

      @if (uploadStatus) {
        <div class="mt-4 p-4 bg-gray-50 rounded">
          <h4 class="font-semibold text-gray-700 mb-2">Upload Status:</h4>
          <pre class="text-sm">{{ uploadStatus | json }}</pre>
        </div>
      }
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderDemo {
  supabaseConfig: ProviderConfig = {
    provider: 'supabase',
    config: {
      url: 'your-supabase-url',
      anonKey: 'your-supabase-anon-key',
      defaultBucket: 'uploads',
    },
  };

  uploadConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['image/*', '.pdf', '.docx'],
    maxNumberOfFiles: 5,
    autoProceed: false,
    showProgressDetails: true,
  };

  uploadStatus: any = null;

  onUploadComplete(event: UploadEvent) {
    this.uploadStatus = {
      type: 'complete',
      successful: event.successful.length,
      failed: event.failed.length,
      files: event.successful,
    };
    console.log('Upload completed:', event);
  }

  onProgress(progress: number) {
    this.uploadStatus = {
      type: 'progress',
      progress: Math.round(progress),
    };
    console.log('Upload progress:', progress);
  }

  onError(error: Error) {
    this.uploadStatus = {
      type: 'error',
      message: error.message,
    };
    console.error('Upload error:', error);
  }
}`;
}
