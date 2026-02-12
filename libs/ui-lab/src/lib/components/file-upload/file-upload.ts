import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '../../utils';

// Token for file upload context
export const SC_FILE_UPLOAD = new InjectionToken<ScFileUpload>(
  'SC_FILE_UPLOAD',
);

export interface FileUploadFile {
  file: File;
  id: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

@Directive({
  selector: '[sc-file-upload]',
  providers: [{ provide: SC_FILE_UPLOAD, useExisting: ScFileUpload }],
  host: {
    'data-slot': 'file-upload',
    '[class]': 'class()',
  },
})
export class ScFileUpload {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly multiple = input<boolean>(false);
  readonly accept = input<string>('');
  readonly maxSize = input<number>(0); // in bytes, 0 = no limit
  readonly maxFiles = input<number>(0); // 0 = no limit
  readonly disabled = input<boolean>(false);

  readonly files = model<FileUploadFile[]>([]);
  readonly filesSelected = output<File[]>();
  readonly fileRemoved = output<FileUploadFile>();
  readonly error = output<string>();

  protected readonly class = computed(() => cn('block', this.classInput()));

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  addFiles(fileList: FileList | File[]): void {
    if (this.disabled()) return;

    const newFiles = Array.from(fileList);
    const currentFiles = this.files();
    const maxFiles = this.maxFiles();
    const maxSize = this.maxSize();
    const accept = this.accept();

    const validFiles: File[] = [];

    for (const file of newFiles) {
      // Check max files limit
      if (maxFiles > 0 && currentFiles.length + validFiles.length >= maxFiles) {
        this.error.emit(`Maximum ${maxFiles} files allowed`);
        break;
      }

      // Check file size
      if (maxSize > 0 && file.size > maxSize) {
        this.error.emit(`File "${file.name}" exceeds maximum size`);
        continue;
      }

      // Check file type
      if (accept && !this.isAcceptedType(file, accept)) {
        this.error.emit(`File "${file.name}" is not an accepted type`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      const uploadFiles: FileUploadFile[] = validFiles.map((file) => ({
        file,
        id: this.generateId(),
        status: 'pending' as const,
      }));

      if (this.multiple()) {
        this.files.update((files) => [...files, ...uploadFiles]);
      } else {
        this.files.set(uploadFiles.slice(0, 1));
      }

      this.filesSelected.emit(validFiles);
    }
  }

  removeFile(fileId: string): void {
    const file = this.files().find((f) => f.id === fileId);
    if (file) {
      this.files.update((files) => files.filter((f) => f.id !== fileId));
      this.fileRemoved.emit(file);
    }
  }

  updateFileProgress(fileId: string, progress: number): void {
    this.files.update((files) =>
      files.map((f) =>
        f.id === fileId ? { ...f, progress, status: 'uploading' as const } : f,
      ),
    );
  }

  updateFileStatus(
    fileId: string,
    status: FileUploadFile['status'],
    error?: string,
  ): void {
    this.files.update((files) =>
      files.map((f) => (f.id === fileId ? { ...f, status, error } : f)),
    );
  }

  clearFiles(): void {
    this.files.set([]);
  }

  private isAcceptedType(file: File, accept: string): boolean {
    const acceptTypes = accept.split(',').map((t) => t.trim().toLowerCase());

    for (const acceptType of acceptTypes) {
      if (acceptType.startsWith('.')) {
        // Extension check
        if (file.name.toLowerCase().endsWith(acceptType)) {
          return true;
        }
      } else if (acceptType.endsWith('/*')) {
        // MIME type wildcard (e.g., image/*)
        const mimePrefix = acceptType.slice(0, -2);
        if (file.type.toLowerCase().startsWith(mimePrefix)) {
          return true;
        }
      } else {
        // Exact MIME type match
        if (file.type.toLowerCase() === acceptType) {
          return true;
        }
      }
    }

    return false;
  }
}
