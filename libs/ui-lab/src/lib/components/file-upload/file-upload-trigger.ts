import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: 'button[sc-file-upload-trigger]',
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
    'data-slot': 'file-upload-trigger',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'fileUpload.disabled()',
    '(click)': 'openFilePicker($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadTrigger {
  readonly fileUpload = inject(SC_FILE_UPLOAD);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground',
      'ring-offset-background transition-colors',
      'hover:bg-primary/90',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  openFilePicker(event: Event): void {
    event.preventDefault();
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
}
