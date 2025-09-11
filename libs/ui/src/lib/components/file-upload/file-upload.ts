import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { cva } from 'class-variance-authority';

const fileUploadVariants = cva(
  'flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-muted-foreground/25 hover:border-muted-foreground/50',
        active: 'border-primary bg-primary/5',
        error: 'border-destructive bg-destructive/5',
      },
      size: {
        default: 'min-h-[200px] p-6',
        sm: 'min-h-[150px] p-4',
        lg: 'min-h-[250px] p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

@Component({
  selector: 'sc-file-upload',
  imports: [],
  template: `
    <div
      [class]="class()"
      (click)="triggerFileSelect()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <input
        class="sr-only"
        #fileInput
        [multiple]="multiple()"
        [accept]="accept()"
        (change)="onFileSelect($event)"
        type="file"
      />

      <div class="mx-auto max-w-[400px]">
        <svg
          class="mx-auto h-12 w-12 text-muted-foreground"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="mt-4 text-center">
          <div class="text-sm font-semibold text-foreground">Click to upload or drag and drop</div>

          @if (accept() || maxSize()) {
            <div class="mt-2 space-y-1">
              @if (accept()) {
                <p class="text-xs text-muted-foreground">{{ accept() }}</p>
              }
              @if (maxSize()) {
                <p class="text-xs text-muted-foreground">
                  Max file size: {{ formatFileSize(maxSize()) }}
                </p>
              }
            </div>
          }
        </div>
      </div>

      @if (selectedFiles().length > 0) {
        <div class="mt-4 space-y-2">
          @for (file of selectedFiles(); track file.name) {
            <div class="flex items-center justify-between rounded bg-muted p-2 text-sm">
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-muted-foreground"
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
                <span class="font-medium">{{ file.name }}</span>
                <span class="text-muted-foreground">({{ formatFileSize(file.size) }})</span>
              </div>
              <button
                class="text-destructive hover:text-destructive/80"
                (click)="removeFile($event, file)"
                type="button"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          }
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'control',
    '[id]': 'id()',
    class: 'block',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUpload {
  private readonly elementRef = inject(ElementRef);

  readonly id = signal('');

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly variant = input<'default' | 'active' | 'error'>('default');
  readonly size = input<'default' | 'sm' | 'lg'>('default');
  readonly multiple = input<boolean>(false);
  readonly accept = input<string>('');
  readonly maxSize = input<number>(0); // in bytes, 0 = no limit
  readonly disabled = input<boolean>(false);

  readonly filesSelected = output<FileList>();
  readonly fileRemoved = output<File>();
  readonly uploadError = output<string>();

  readonly selectedFiles = signal<File[]>([]);
  readonly isDragOver = signal<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      fileUploadVariants({
        variant: this.isDragOver() ? 'active' : this.variant(),
        size: this.size(),
      }),
      this.disabled() && 'opacity-50 cursor-not-allowed',
      this.classInput(),
    ),
  );

  protected triggerFileSelect(): void {
    if (this.disabled()) return;

    const fileInput = this.elementRef.nativeElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fileInput?.click();
  }

  protected onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      this.handleFiles(files);
    }
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  protected removeFile(event: Event, file: File): void {
    event.stopPropagation();

    const currentFiles = this.selectedFiles();
    const updatedFiles = currentFiles.filter((f) => f !== file);
    this.selectedFiles.set(updatedFiles);
    this.fileRemoved.emit(file);
  }

  protected formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private handleFiles(fileList: FileList): void {
    const files = Array.from(fileList);

    // Validate file size
    if (this.maxSize() > 0) {
      const oversizedFiles = files.filter((file) => file.size > this.maxSize());
      if (oversizedFiles.length > 0) {
        this.uploadError.emit(`File size exceeds limit of ${this.formatFileSize(this.maxSize())}`);
        return;
      }
    }

    // Handle multiple files
    if (this.multiple()) {
      const currentFiles = this.selectedFiles();
      this.selectedFiles.set([...currentFiles, ...files]);
    } else {
      this.selectedFiles.set([files[0]]);
    }

    this.filesSelected.emit(fileList);
  }
}
