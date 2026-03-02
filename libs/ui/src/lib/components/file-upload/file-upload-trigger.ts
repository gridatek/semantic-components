import {
  ChangeDetectionStrategy,
  Component,
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

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'default', size: 'lg' }), this.classInput()),
  );

  openFilePicker(): void {
    if (this.fileUpload.disabled()) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = this.fileUpload.multiple();
    input.accept = this.fileUpload.accept();
    input.addEventListener('change', () => {
      if (input.files && input.files.length > 0) {
        this.fileUpload.addFiles(input.files);
      }
    });
    input.click();
  }
}
