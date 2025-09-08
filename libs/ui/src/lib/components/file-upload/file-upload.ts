import { HttpClient, HttpEventType } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-file-upload',
  imports: [],
  template: `
    <div class="w-full">
      <!-- Drag & Drop area -->
      <div
        class="flex flex-col items-center justify-center p-8 text-center rounded-lg cursor-pointer transition-all duration-200"
        [class]="
          isDragging
            ? 'border-2 border-dashed border-blue-500 bg-blue-50'
            : 'border-2 border-dashed border-gray-300 hover:border-blue-400'
        "
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <svg
          class="w-12 h-12 text-gray-400 mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p class="mb-2 text-sm text-gray-600">
          <span class="font-semibold">Click to upload</span>
          or drag and drop
        </p>
        <p class="text-xs text-gray-500">
          {{
            acceptedFileTypes()
              ? 'Accepted file types: ' + acceptedFileTypes()
              : 'Any file type accepted'
          }}
          (Max: {{ maxFileSize() }}MB)
        </p>

        <!-- Hidden file input -->
        <input
          class="hidden"
          #fileInput
          [accept]="acceptedFileTypes()"
          [multiple]="multiple()"
          (change)="onFileSelected($event)"
          type="file"
        />

        <button
          class="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          (click)="fileInput.click()"
          type="button"
        >
          Select File{{ multiple() ? 's' : '' }}
        </button>
      </div>

      <!-- File list -->
      @if (files.length > 0) {
        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-700">Selected Files</h3>
          <ul class="mt-3 divide-y divide-gray-200">
            @for (file of files; track file; let i = $index) {
              <li class="py-3 flex justify-between items-center">
                <div class="flex items-center">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {{ file.name }}
                    </p>
                    <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                  </div>
                </div>
                <button
                  class="ml-2 text-red-600 hover:text-red-800"
                  (click)="removeFile(i)"
                  type="button"
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            }
          </ul>
          <!-- Upload progress -->
          @if (isUploading) {
            <div class="mt-4">
              <div class="flex justify-between mb-1">
                <span class="text-xs font-medium text-blue-700">Uploading...</span>
                <span class="text-xs font-medium text-blue-700">{{ uploadProgress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" [style.width.%]="uploadProgress"></div>
              </div>
            </div>
          }
          <!-- Error message -->
          @if (uploadError) {
            <div class="mt-4 text-sm text-red-600">
              {{ uploadError }}
            </div>
          }
          <!-- Success message -->
          @if (uploadSuccess) {
            <div class="mt-4 text-sm text-green-600">Files uploaded successfully!</div>
          }
          <!-- Action buttons -->
          <div class="mt-4 flex gap-2">
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              [disabled]="isUploading || files.length === 0"
              [class]="
                isUploading || files.length === 0
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              "
              (click)="uploadFiles()"
              type="button"
            >
              <svg
                class="h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload
            </button>
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              [disabled]="isUploading || files.length === 0"
              [class]="
                isUploading || files.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700'
              "
              (click)="clearFiles()"
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
      }
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUpload {
  private readonly http = inject(HttpClient);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('', this.classInput()));

  readonly acceptedFileTypes = input('');
  readonly maxFileSize = input(5); // Default max size in MB
  readonly multiple = input(false);
  readonly uploadUrl = input('/api/upload');
  readonly uploadComplete = output<any>();

  files: File[] = [];
  isDragging = false;
  uploadProgress = 0;
  isUploading = false;
  uploadError: string | null = null;
  uploadSuccess = false;

  onFileSelected(event: any): void {
    this.resetStatus();
    const selectedFiles = event.target.files;
    this.processFiles(selectedFiles);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    this.resetStatus();

    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  processFiles(fileList: FileList): void {
    if (!fileList.length) return;

    // Convert FileList to array
    const filesArray = Array.from(fileList);

    // Validate file types if needed
    const acceptedFileTypes = this.acceptedFileTypes();
    if (acceptedFileTypes) {
      const allowedTypes = acceptedFileTypes.split(',');
      const invalidFiles = filesArray.filter(
        (file) =>
          !allowedTypes.some(
            (type) =>
              file.type.includes(type.trim()) || file.name.endsWith(type.trim().replace('*', '')),
          ),
      );

      if (invalidFiles.length > 0) {
        this.uploadError = `Invalid file type(s): ${invalidFiles.map((f) => f.name).join(', ')}`;
        return;
      }
    }

    // Validate file size
    const oversizedFiles = filesArray.filter(
      (file) => file.size > this.maxFileSize() * 1024 * 1024,
    );
    if (oversizedFiles.length > 0) {
      this.uploadError = `File(s) exceed the ${this.maxFileSize()}MB limit: ${oversizedFiles.map((f) => f.name).join(', ')}`;
      return;
    }

    if (this.multiple()) {
      this.files = [...this.files, ...filesArray];
    } else {
      this.files = [filesArray[0]];
    }
  }

  uploadFiles(): void {
    if (!this.files.length) return;

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadError = null;

    const formData = new FormData();
    this.files.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    this.http
      .post(this.uploadUrl(), formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        finalize(() => {
          this.isUploading = false;
        }),
      )
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploadSuccess = true;
            this.uploadComplete.emit(event.body);
          }
        },
        error: (error) => {
          this.uploadError = error.message || 'Upload failed';
        },
      });
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.resetStatus();
  }

  resetStatus(): void {
    this.uploadProgress = 0;
    this.isUploading = false;
    this.uploadError = null;
    this.uploadSuccess = false;
  }

  clearFiles(): void {
    this.files = [];
    this.resetStatus();
  }

  // Helper methods for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
