import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD } from './file-upload';

@Component({
  selector: 'input[scFileUploadInput]',
  template: '',
  host: {
    'data-slot': 'file-upload-input',
    type: 'file',
    '[class]': 'class()',
    '[multiple]': 'fileUpload.multiple()',
    '[accept]': 'fileUpload.accept() || null',
    '[disabled]': 'fileUpload.disabled()',
    '[attr.aria-disabled]': 'fileUpload.disabled() || null',
    tabindex: '-1',
    '(change)': 'onChange($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFileUploadInput {
  readonly fileUpload = inject(SC_FILE_UPLOAD);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('sr-only', this.classInput()));

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.fileUpload.addFiles(input.files);
    }

    // Reset so the same file can be selected again
    input.value = '';
  }
}
