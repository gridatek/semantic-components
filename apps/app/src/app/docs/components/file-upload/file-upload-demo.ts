import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ScField, ScFieldErrorMessage, ScFileUpload, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-file-upload-demo',
  imports: [ScFileUpload, ScField, ScLabel, ScFieldErrorMessage, ReactiveFormsModule],
  template: `
    <form class="space-y-6" [formGroup]="uploadForm">
      <!-- Basic File Upload -->
      <div sc-field>
        <label sc-label>Upload Document</label>
        <sc-file-upload
          [maxSize]="5242880"
          (filesSelected)="onFilesSelected($event)"
          (uploadError)="onUploadError($event)"
          accept="image/*,.pdf,.doc,.docx"
        />
        @if (errorMessage) {
          <div sc-field-error-message>{{ errorMessage }}</div>
        }
      </div>

      <!-- Multiple Files -->
      <div sc-field>
        <label sc-label>Upload Images</label>
        <sc-file-upload
          [multiple]="true"
          [maxSize]="2097152"
          (filesSelected)="onMultipleFilesSelected($event)"
          (fileRemoved)="onFileRemoved($event)"
          accept="image/*"
          size="sm"
        />
      </div>

      <!-- Large Upload Area -->
      <div sc-field>
        <label sc-label>Large Upload Area</label>
        <sc-file-upload [multiple]="true" (filesSelected)="onLargeUploadFiles($event)" size="lg" />
      </div>

      <!-- Disabled State -->
      <div sc-field>
        <label sc-label>Disabled Upload</label>
        <sc-file-upload [disabled]="true" accept=".zip,.tar,.gz" />
      </div>
    </form>

    @if (uploadedFiles.length > 0) {
      <div class="mt-8 p-4 bg-muted rounded-lg">
        <h3 class="font-semibold mb-2">Uploaded Files Summary:</h3>
        <ul class="space-y-1">
          @for (file of uploadedFiles; track file.name) {
            <li class="text-sm">
              <span class="font-medium">{{ file.name }}</span>
              <span class="text-muted-foreground">({{ formatFileSize(file.size) }})</span>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDemo {
  protected readonly uploadForm = new FormGroup({
    documents: new FormControl([]),
    images: new FormControl([]),
  });

  protected uploadedFiles: File[] = [];
  protected errorMessage = '';

  protected onFilesSelected(fileList: FileList): void {
    console.log('Files selected:', Array.from(fileList));
    this.errorMessage = '';
  }

  protected onMultipleFilesSelected(fileList: FileList): void {
    const files = Array.from(fileList);
    this.uploadedFiles = [...this.uploadedFiles, ...files];
    console.log('Multiple files selected:', files);
  }

  protected onLargeUploadFiles(fileList: FileList): void {
    console.log('Large upload files:', Array.from(fileList));
  }

  protected onFileRemoved(file: File): void {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
    console.log('File removed:', file.name);
  }

  protected onUploadError(error: string): void {
    this.errorMessage = error;
    console.error('Upload error:', error);
  }

  protected formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
