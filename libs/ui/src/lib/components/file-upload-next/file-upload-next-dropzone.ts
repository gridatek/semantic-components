import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '../../utils';
import { ScFileUploadNext } from './file-upload-next';

/**
 * Where files are dropped. A click on it opens the picker too (the mouse's
 * way); put a trigger in it for the keyboard's.
 */
@Directive({
  selector: '[scFileUploadNextDropzone]',
  host: {
    'data-slot': 'file-upload-dropzone',
    '[attr.data-dragging]': 'dragging() || null',
    '[attr.data-disabled]': 'upload.disabled() || null',
    '[attr.data-invalid]': 'upload.showInvalid() || null',
    '[class]': 'class()',
    '(dragenter)': 'onDragOver($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
    '(click)': 'onClick($event)',
  },
})
export class ScFileUploadNextDropzone {
  protected readonly upload = inject(ScFileUploadNext);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Files are dragged over it. */
  readonly dragging = signal(false);

  protected readonly class = computed(() =>
    cn(
      'border-input text-muted-foreground flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center text-sm transition-colors',
      'hover:bg-accent/50 data-dragging:border-primary data-dragging:bg-accent',
      'data-invalid:border-destructive',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected onDragOver(event: DragEvent): void {
    if (this.upload.disabled() || !this.hasFiles(event)) return;
    // Ours to take: not the browser's to open.
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    this.dragging.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    // Out of the zone — not into one of its children.
    const to = event.relatedTarget as Node | null;
    if (!to || !(event.currentTarget as Node).contains(to)) {
      this.dragging.set(false);
    }
  }

  protected onDrop(event: DragEvent): void {
    this.dragging.set(false);
    if (this.upload.disabled() || !this.hasFiles(event)) return;
    event.preventDefault();
    this.upload.add(event.dataTransfer?.files ?? []);
    this.upload.touch.emit();
  }

  protected onClick(event: MouseEvent): void {
    // A button or link in it does its own thing (the trigger opens it).
    const target = event.target as Element;
    if (target.closest('button, a, input, label')) return;
    this.upload.browse();
  }

  private hasFiles(event: DragEvent): boolean {
    return !!event.dataTransfer?.types.includes('Files');
  }
}
