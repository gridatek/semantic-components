import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: '[sc-file-upload-dropzone]',
  template: `
    <input
      #fileInput
      type="file"
      class="sr-only"
      [multiple]="fileUpload.multiple()"
      [accept]="fileUpload.accept()"
      [disabled]="fileUpload.disabled()"
      (change)="onFileSelect($event)"
    />
    <ng-content />
  `,
  host: {
    'data-slot': 'file-upload-dropzone',
    '[class]': 'class()',
    '[attr.data-dragging]': 'isDragging()',
    '[attr.data-disabled]': 'fileUpload.disabled() || null',
    '(click)': 'openFilePicker()',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadDropzone {
  readonly fileUpload = inject(SC_FILE_UPLOAD);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly isDragging = signal(false);

  protected readonly class = computed(() =>
    cn(
      'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed',
      'transition-colors hover:border-primary/50 hover:bg-accent/50',
      'data-[dragging=true]:border-primary data-[dragging=true]:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.classInput(),
    ),
  );

  openFilePicker(): void {
    if (this.fileUpload.disabled()) return;
    const input = this.elementRef.nativeElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    input?.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileUpload.addFiles(input.files);
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.fileUpload.disabled()) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (this.fileUpload.disabled()) return;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileUpload.addFiles(files);
    }
  }
}
