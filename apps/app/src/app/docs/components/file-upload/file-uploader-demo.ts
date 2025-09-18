import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FileUploader, ProviderConfig, UploadEvent } from '@semantic-components/file-uploader';

@Component({
  selector: 'app-file-uploader-demo',
  imports: [FileUploader, JsonPipe],
  template: `
    <div class="space-y-6">
      <sc-file-uploader
        [providerConfig]="supabaseConfig"
        [config]="uploadConfig"
        (uploadComplete)="onUploadComplete($event)"
        (uploadProgress)="onProgress($event)"
        (uploadError)="onError($event)"
        bucket="uploads"
        uploadPath="demo-files/"
        variant="dashboard"
      />

      @if (uploadStatus) {
        <div class="mt-4 p-4 bg-gray-50 rounded">
          <h4 class="font-semibold text-gray-700 mb-2">Upload Status:</h4>
          <pre class="text-sm">{{ uploadStatus | json }}</pre>
        </div>
      }
    </div>
  `,
  styles: ``,
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
}
