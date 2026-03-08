import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD } from './file-upload';
import { ScFileUploadInput } from './file-upload-input';

@Component({
  selector: '[scFileUploadDropzone]',
  imports: [ScFileUploadInput],
  template: `
    <input scFileUploadInput #fileInput />
    <ng-content />
  `,
  host: {
    'data-slot': 'file-upload-dropzone',
    '[class]': 'class()',
    '[attr.data-dragging]': 'isDragging()',
    '[attr.data-disabled]': 'fileUpload.disabled() || null',
    '(click)': 'openFilePicker($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadDropzone {
  readonly fileUpload = inject(SC_FILE_UPLOAD);

  private readonly fileInputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly isDragging = signal(false);

  protected readonly class = computed(() =>
    cn(
      'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed',
      'transition-colors hover:border-primary/50 hover:bg-accent/50',
      'data-[dragging=true]:border-primary data-[dragging=true]:bg-accent',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      this.classInput(),
    ),
  );

  openFilePicker(event: MouseEvent): void {
    if (this.fileUpload.disabled()) return;

    // Avoid triggering when clicking the input itself
    if (event.target === this.fileInputRef().nativeElement) return;

    this.fileInputRef().nativeElement.click();
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
