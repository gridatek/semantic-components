import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_FILE_UPLOAD } from './file-upload';
import { ScFileUploadInput } from './file-upload-input';

@Component({
  selector: 'button[scFileUploadTrigger]',
  imports: [ScFileUploadInput],
  template: `
    <input scFileUploadInput #fileInput />
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

  private readonly fileInputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'default', size: 'lg' }), this.classInput()),
  );

  openFilePicker(): void {
    if (this.fileUpload.disabled()) return;

    this.fileInputRef().nativeElement.click();
  }
}
