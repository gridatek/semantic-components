import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: 'button[scFileUploadTrigger]',
  template: `
    <input
      #fileInput
      type="file"
      class="sr-only"
      aria-label="Upload file"
      tabindex="-1"
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
    '[attr.aria-disabled]': 'fileUpload.disabled() || null',
    '(click)': 'openFilePicker()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadTrigger {
  readonly fileUpload = inject(SC_FILE_UPLOAD);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'default', size: 'lg' }), this.classInput()),
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
}
